import { MapPin, Linkedin, Download, Monitor, Server, Wifi, HardDrive, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resumeData";
import jsPDF from "jspdf";

const Hero = () => {
  const handleDownloadResume = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    // Helper function to add text with word wrap
    const addWrappedText = (text: string, x: number, startY: number, maxWidth: number, lineHeight: number) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, startY);
      return startY + lines.length * lineHeight;
    };

    // Header
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(resumeData.name, pageWidth / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(resumeData.title, pageWidth / 2, y, { align: "center" });
    y += 8;

    // Contact info
    doc.setFontSize(10);
    doc.text(`${resumeData.contact.location} | LinkedIn: linkedin.com/in/biswash-shrestha`, pageWidth / 2, y, { align: "center" });
    y += 12;

    // Divider
    doc.setDrawColor(100, 100, 100);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Professional Summary
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PROFESSIONAL SUMMARY", margin, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(resumeData.summary, margin, y, contentWidth, 5);
    y += 8;

    // Technical Skills
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("TECHNICAL SKILLS", margin, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    resumeData.technicalSkills.forEach((skill) => {
      const skillText = `${skill.category}: ${skill.skills.join(", ")}`;
      y = addWrappedText(skillText, margin, y, contentWidth, 5);
      y += 2;
    });
    y += 6;

    // Core Abilities
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("CORE ABILITIES", margin, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(resumeData.coreAbilities.join(" • "), margin, y, contentWidth, 5);
    y += 8;

    // Experience
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PROFESSIONAL EXPERIENCE", margin, y);
    y += 6;

    resumeData.experience.forEach((exp) => {
      // Check if we need a new page
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(exp.title, margin, y);
      y += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`${exp.company} | ${exp.period}`, margin, y);
      y += 5;
      doc.text(exp.location, margin, y);
      y += 5;
      y = addWrappedText(exp.description, margin, y, contentWidth, 5);
      y += 3;

      if (exp.highlights.length > 0) {
        exp.highlights.forEach((highlight) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          y = addWrappedText(`• ${highlight}`, margin + 5, y, contentWidth - 5, 5);
          y += 2;
        });
      }
      y += 5;
    });

    // Education
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", margin, y);
    y += 6;

    resumeData.education.forEach((edu) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`${edu.degree} in ${edu.major}`, margin, y);
      y += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`${edu.subMajor ? `Sub-major: ${edu.subMajor} | ` : ""}${edu.institution} | ${edu.year}`, margin, y);
    });

    doc.save(`${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80">
      {/* IT-themed animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        
        {/* Floating IT icons */}
        <div className="absolute top-20 left-[10%] text-primary-foreground/10 animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}>
          <Monitor className="w-12 h-12" />
        </div>
        <div className="absolute top-40 right-[15%] text-primary-foreground/10 animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}>
          <Server className="w-10 h-10" />
        </div>
        <div className="absolute bottom-32 left-[20%] text-primary-foreground/10 animate-bounce" style={{ animationDelay: "1s", animationDuration: "4s" }}>
          <Wifi className="w-14 h-14" />
        </div>
        <div className="absolute bottom-40 right-[25%] text-primary-foreground/10 animate-bounce" style={{ animationDelay: "1.5s", animationDuration: "3.2s" }}>
          <HardDrive className="w-8 h-8" />
        </div>
        <div className="absolute top-1/3 left-[5%] text-primary-foreground/10 animate-bounce" style={{ animationDelay: "2s", animationDuration: "4.5s" }}>
          <Cpu className="w-10 h-10" />
        </div>
      </div>

      {/* Circuit board pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.05)_1px,transparent_1px),radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Name with gradient */}
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-4 tracking-tight">
            {resumeData.name}
          </h1>

          {/* Title badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-primary-foreground/90 font-medium text-lg">
              {resumeData.title}
            </span>
          </div>

          {/* Contact info - Location and LinkedIn only */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <div className="p-2 rounded-lg bg-primary-foreground/10">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm">{resumeData.contact.location}</span>
            </div>
            <a
              href={resumeData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
            >
              <div className="p-2 rounded-lg bg-primary-foreground/10 group-hover:bg-primary-foreground/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={handleDownloadResume}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-6 text-lg rounded-full shadow-2xl shadow-primary-foreground/20 transition-all hover:scale-105"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-primary-foreground/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
