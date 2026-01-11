import { resumeData } from "@/data/resumeData";
import { MapPin, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section header */}
          <span className="text-sm uppercase tracking-widest text-primary-foreground/70 mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-12">
            I'm always open to discussing new opportunities in IT support, 
            system administration, and technical solutions.
          </p>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto mb-12">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-sm text-primary-foreground/70 mb-1">Location</div>
              <div className="font-medium text-sm">{resumeData.contact.location}</div>
            </div>

            <a
              href={resumeData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all hover:scale-105"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:bg-primary-foreground/30 transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="text-sm text-primary-foreground/70 mb-1">LinkedIn</div>
              <div className="font-medium text-sm">Connect with me</div>
            </a>
          </div>

          {/* CTA */}
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-6 text-lg rounded-full shadow-2xl shadow-black/20 transition-all hover:scale-105"
            asChild
          >
            <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Send Me a Message
            </a>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-primary-foreground/20">
        <div className="container mx-auto px-6 text-center text-primary-foreground/60 text-sm">
          © {new Date().getFullYear()} {resumeData.name}. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Contact;
