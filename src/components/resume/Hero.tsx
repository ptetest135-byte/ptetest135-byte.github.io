import { Mail, Phone, MapPin, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resumeData";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

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

          {/* Contact info */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
            <a
              href={`mailto:${resumeData.contact.email}`}
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
            >
              <div className="p-2 rounded-lg bg-primary-foreground/10 group-hover:bg-primary-foreground/20 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm">{resumeData.contact.email}</span>
            </a>
            <a
              href={`tel:${resumeData.contact.phone}`}
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
            >
              <div className="p-2 rounded-lg bg-primary-foreground/10 group-hover:bg-primary-foreground/20 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm">{resumeData.contact.phone}</span>
            </a>
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
