import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, ArrowLeft, Plus, X, Github, Settings, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { resumeData as initialData } from "@/data/resumeData";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define Types locally since they might not be exported from data file
interface ResumeData {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  technicalSkills: { category: string; skills: string[] }[];
  coreAbilities: string[];
  experience: any[];
  education: any[];
  certifications: any[];
  languages: string[];
}

const Admin = () => {
  const { toast } = useToast();
  const [data, setData] = useState<ResumeData>(initialData);
  const [newAbility, setNewAbility] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // GitHub Settings State
  const [githubToken, setGithubToken] = useState("");
  const [repoOwner, setRepoOwner] = useState("ptetest135-byte");
  const [repoName, setRepoName] = useState("ptetest135-byte.github.io");
  const [filePath, setFilePath] = useState("src/data/resumeData.ts");

  useEffect(() => {
    // Load settings from local storage
    const savedToken = localStorage.getItem("github_token");
    const savedOwner = localStorage.getItem("github_owner");
    const savedRepo = localStorage.getItem("github_repo");

    if (savedToken) setGithubToken(savedToken);
    if (savedOwner) setRepoOwner(savedOwner);
    if (savedRepo) setRepoName(savedRepo);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("github_token", githubToken);
    localStorage.setItem("github_owner", repoOwner);
    localStorage.setItem("github_repo", repoName);
    setShowSettings(false);
    toast({ title: "Settings Saved", description: "Your GitHub configuration has been saved locally." });
  };

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

  const handleAddNewJob = () => {
    setData(prev => ({
      ...prev,
      experience: [{
        title: "New Role",
        company: "Company Name",
        period: "Present",
        location: "Location",
        description: "Job description...",
        highlights: [],
        highlighted: false
      }, ...prev.experience]
    }))
  }

  const handleDeleteJob = (index: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setData(prev => ({
        ...prev,
        experience: prev.experience.filter((_, i) => i !== index)
      }))
    }
  }

  // --- GitHub Integration ---

  const getFileSha = async () => {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch file SHA. Check your token and repo settings.");
    const json = await response.json();
    return json.sha;
  };

  const handleSaveToGitHub = async () => {
    if (!githubToken) {
      toast({ title: "Missing Token", description: "Please configure your GitHub Token in settings.", variant: "destructive" });
      setShowSettings(true);
      return;
    }

    setIsSaving(true);
    try {
      // 1. Get current SHA
      const sha = await getFileSha();

      // 2. Serialize Data
      // We perform a "pretty print" of the JSON and wrap it in the export statement
      const fileContent = `export const resumeData = ${JSON.stringify(data, null, 2)};`;
      const base64Content = btoa(unescape(encodeURIComponent(fileContent))); // Handle UTF-8 characters

      // 3. Create Commit
      const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "update: resume content via Admin CMS",
          content: base64Content,
          sha: sha,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save to GitHub");
      }

      toast({
        title: "Success!",
        description: "Changes committed to GitHub. Site will redeploy in a few minutes.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>GitHub Configuration</DialogTitle>
            <DialogDescription>
              To save changes, you need a Personal Access Token with 'repo' scope.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>GitHub Personal Access Token</Label>
              <Input type="password" value={githubToken} onChange={e => setGithubToken(e.target.value)} placeholder="ghp_..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Repo Owner</Label>
                <Input value={repoOwner} onChange={e => setRepoOwner(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Repo Name</Label>
                <Input value={repoName} onChange={e => setRepoName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>File Path</Label>
              <Input value={filePath} onChange={e => setFilePath(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveSettings}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              Resume CMS <Badge variant="outline">v2.0 (GitHub)</Badge>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="w-4 h-4" />
            </Button>
            <Button onClick={handleSaveToGitHub} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Github className="w-4 h-4 mr-2" />}
              {isSaving ? "Committing..." : "Commit Changes"}
            </Button>
          </div>
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Professional Experience</CardTitle>
            <Button size="sm" onClick={handleAddNewJob}><Plus className="w-4 h-4 mr-2" /> Add Job</Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="p-4 border border-border rounded-lg space-y-4 relative group">
                {/* Delete Job Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteJob(index)}
                >
                  <X className="w-4 h-4" />
                </Button>

                <div className="flex items-center justify-between pr-8">
                  <h3 className="font-semibold text-lg">{exp.title || "New Position"}</h3>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`highlighted-${index}`} className="text-sm cursor-pointer select-none">
                      Featured Role
                    </Label>
                    <input
                      type="checkbox"
                      id={`highlighted-${index}`}
                      checked={exp.highlighted}
                      onChange={(e) => handleExperienceChange(index, "highlighted", e.target.checked)}
                      className="w-4 h-4 accent-primary"
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

        {/* Education (Editable now) */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 last:border-0">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={e => {
                      const newEd = [...data.education];
                      newEd[index].degree = e.target.value;
                      setData({ ...data, education: newEd });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Major</Label>
                  <Input
                    value={edu.major}
                    onChange={e => {
                      const newEd = [...data.education];
                      newEd[index].major = e.target.value;
                      setData({ ...data, education: newEd });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={e => {
                      const newEd = [...data.education];
                      newEd[index].institution = e.target.value;
                      setData({ ...data, education: newEd });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={edu.year}
                    onChange={e => {
                      const newEd = [...data.education];
                      newEd[index].year = e.target.value;
                      setData({ ...data, education: newEd });
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
          <p>
            <strong>GitHub CMS:</strong> Changes made here are verified by your Token and committed directly to the repository.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Admin;
