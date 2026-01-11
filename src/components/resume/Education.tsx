import { resumeData } from "@/data/resumeData";
import { GraduationCap, BookOpen } from "lucide-react";

const Education = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
              Academic Background
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Education
            </h2>
          </div>

          {/* Education cards */}
          <div className="grid gap-6">
            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <GraduationCap className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-primary font-semibold mb-3">
                      {edu.institution}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Major:</span>
                        <span className="text-foreground font-medium">{edu.major}</span>
                      </div>
                      {edu.subMajor && (
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Sub-Major:</span>
                          <span className="text-foreground font-medium">{edu.subMajor}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Year badge */}
                  <div className="flex-shrink-0">
                    <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                      {edu.year}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
