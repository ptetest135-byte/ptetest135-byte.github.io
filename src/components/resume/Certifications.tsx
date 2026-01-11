import { resumeData } from "@/data/resumeData";
import { Award } from "lucide-react";

const Certifications = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
              Credentials
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Certifications
            </h2>
          </div>

          {/* Certifications grid */}
          <div className="flex flex-wrap justify-center gap-4">
            {resumeData.certifications.map((cert, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-foreground">{cert.code}</div>
                  <div className="text-sm text-muted-foreground">{cert.name}</div>
                  <div className="text-xs text-primary">{cert.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
