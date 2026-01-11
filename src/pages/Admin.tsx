import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, ArrowLeft, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { resumeData } from "@/data/resumeData";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [data, setData] = useState(resumeData);
  const [newAbility, setNewAbility] = useState("");
  const [newSkill, setNewSkill] = useState({ category: "", skill: "" });

  const handleBasicInfoChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }));
    } else {
      setData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleExperienceChange = (index: number, field: string, value: string | boolean) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleAddAbility = () => {
    if (newAbility.trim()) {
      setData((prev) => ({
        ...prev,
        coreAbilities: [...prev.coreAbilities, newAbility.trim()],
      }));
      setNewAbility("");
    }
  };

  const handleRemoveAbility = (index: number) => {
    setData((prev) => ({
      ...prev,
      coreAbilities: prev.coreAbilities.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    // For now, we'll just show a toast
    toast({
      title: "Changes Saved",
      description: "Note: Changes are temporary. For permanent changes, update the resumeData.ts file directly.",
    });
    console.log("Updated data:", data);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resume
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">Resume Admin</h1>
          </div>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Basic Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => handleBasicInfoChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => handleBasicInfoChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={data.contact.location}
                  onChange={(e) => handleBasicInfoChange("contact.location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={data.contact.linkedin}
                  onChange={(e) => handleBasicInfoChange("contact.linkedin", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={data.summary}
                onChange={(e) => handleBasicInfoChange("summary", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Core Abilities */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Core Abilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.coreAbilities.map((ability, index) => (
                <Badge key={index} variant="secondary" className="gap-1 pr-1">
                  {ability}
                  <button
                    onClick={() => handleRemoveAbility(index)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new ability..."
                value={newAbility}
                onChange={(e) => setNewAbility(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddAbility()}
              />
              <Button onClick={handleAddAbility} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Professional Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="p-4 border border-border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`highlighted-${index}`} className="text-sm">
                      Highlighted
                    </Label>
                    <input
                      type="checkbox"
                      id={`highlighted-${index}`}
                      checked={exp.highlighted}
                      onChange={(e) => handleExperienceChange(index, "highlighted", e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Input
                      value={exp.period}
                      onChange={(e) => handleExperienceChange(index, "period", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            {data.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input value={edu.degree} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Major</Label>
                  <Input value={edu.major} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input value={edu.institution} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input value={edu.year} readOnly className="bg-muted" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            {data.certifications.map((cert, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Code</Label>
                  <Input value={cert.code} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={cert.name} readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Issuer</Label>
                  <Input value={cert.issuer} readOnly className="bg-muted" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
          <p>
            <strong>Note:</strong> To make permanent changes, you need to enable a database backend 
            or edit the <code className="bg-background px-1 rounded">src/data/resumeData.ts</code> file directly.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Admin;
