import { MapPin, Linkedin, Download, Monitor, Server, Wifi, HardDrive, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resumeData";
import jsPDF from "jspdf";

const Hero = () => {
  const handleDownloadResume = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 15;

    // Colors
    const primaryColor: [number, number, number] = [30, 41, 59]; // slate-800
    const accentColor: [number, number, number] = [59, 130, 246]; // blue-500
    const mutedColor: [number, number, number] = [100, 116, 139]; // slate-500

    // Helper function to add text with word wrap
    const addWrappedText = (text: string, x: number, startY: number, maxWidth: number, lineHeight: number) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, startY);
      return startY + lines.length * lineHeight;
    };

    // Helper to draw section header with line
    const drawSectionHeader = (title: string, yPos: number) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...accentColor);
      doc.text(title, margin, yPos);
      doc.setDrawColor(...accentColor);
      doc.setLineWidth(0.5);
      doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);
      doc.setTextColor(...primaryColor);
      return yPos + 8;
    };

    // Header background
    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, pageWidth, 45, "F");

    // Name
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(resumeData.name, pageWidth / 2, 18, { align: "center" });

    // Title
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 200, 200);
    doc.text(resumeData.title, pageWidth / 2, 27, { align: "center" });

    // Contact info
    doc.setFontSize(9);
    doc.setTextColor(180, 180, 180);
    doc.text(`${resumeData.contact.location}  •  linkedin.com/in/biswash-shrestha`, pageWidth / 2, 36, { align: "center" });

    y = 55;

    // Professional Summary
    doc.setTextColor(...primaryColor);
    y = drawSectionHeader("PROFESSIONAL SUMMARY", y);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...mutedColor);
    y = addWrappedText(resumeData.summary, margin, y, contentWidth, 4.5);
    y += 8;

    // Two column layout for skills
    const colWidth = (contentWidth - 10) / 2;
    const leftColX = margin;
    const rightColX = margin + colWidth + 10;
    let leftY = y;
    let rightY = y;

    // Technical Skills (left column)
    doc.setTextColor(...primaryColor);
    leftY = drawSectionHeader("TECHNICAL SKILLS", leftY);
    doc.setFontSize(8);
    resumeData.technicalSkills.forEach((skill) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(skill.category + ":", leftColX, leftY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...mutedColor);
      leftY = addWrappedText(skill.skills.join(", "), leftColX, leftY + 4, colWidth, 4);
      leftY += 2;
    });

    // Core Abilities (right column)
    rightY = drawSectionHeader("CORE ABILITIES", rightY);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...mutedColor);
    resumeData.coreAbilities.forEach((ability) => {
      doc.setFillColor(...accentColor);
      doc.circle(rightColX + 2, rightY - 1.5, 1, "F");
      doc.text(ability, rightColX + 6, rightY);
      rightY += 5;
    });

    // Certification
    rightY += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...accentColor);
    doc.text("CERTIFICATION", rightColX, rightY);
    rightY += 5;
    resumeData.certifications.forEach((cert) => {
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(cert.code, rightColX, rightY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...mutedColor);
      doc.text(` - ${cert.name}`, rightColX + doc.getTextWidth(cert.code), rightY);
      rightY += 4;
    });

    y = Math.max(leftY, rightY) + 8;

    // Experience
    y = drawSectionHeader("PROFESSIONAL EXPERIENCE", y);

    resumeData.experience.filter(exp => exp.highlighted).forEach((exp) => {
      if (y > pageHeight - 40) {
        doc.addPage();
        y = 20;
      }

      // Job title with accent
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(exp.title, margin, y);
      
      // Company and period on same line
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...accentColor);
      doc.text(exp.company, margin, y + 5);
      doc.setTextColor(...mutedColor);
      doc.text(`${exp.period}  •  ${exp.location}`, margin, y + 10);
      y += 15;

      // Description
      doc.setFontSize(8);
      doc.setTextColor(...mutedColor);
      y = addWrappedText(exp.description, margin, y, contentWidth, 4);
      y += 3;

      // Highlights (limited to first 4)
      if (exp.highlights.length > 0) {
        const limitedHighlights = exp.highlights.slice(0, 4);
        limitedHighlights.forEach((highlight) => {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          doc.setFillColor(...accentColor);
          doc.circle(margin + 2, y - 1.5, 0.8, "F");
          y = addWrappedText(highlight, margin + 6, y, contentWidth - 6, 4);
          y += 1;
        });
      }
      y += 6;
    });

    // Education
    if (y > pageHeight - 50) {
      doc.addPage();
      y = 20;
    }
    y = drawSectionHeader("EDUCATION", y);

    resumeData.education.forEach((edu) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(`${edu.degree} in ${edu.major}`, margin, y);
      y += 5;
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...mutedColor);
      doc.text(`${edu.subMajor ? `Sub-major: ${edu.subMajor}  •  ` : ""}${edu.institution}  •  ${edu.year}`, margin, y);
      y += 8;
    });

    // Languages
    y += 2;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...accentColor);
    doc.text("LANGUAGES: ", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...mutedColor);
    doc.text(resumeData.languages.join(", "), margin + doc.getTextWidth("LANGUAGES: "), y);

    // Footer line
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(2);
    doc.line(0, pageHeight - 5, pageWidth, pageHeight - 5);

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
