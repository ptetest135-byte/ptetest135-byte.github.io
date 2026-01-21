import { resumeData } from "@/data/resumeData";
import { Award, BookOpen } from "lucide-react";

const Certifications = () => {
  // Safe access to certifications in case the structure is still migrating
  const certifications = resumeData.certifications as any;
  const completed = Array.isArray(certifications) ? certifications : certifications?.completed || [];
  const studying = certifications?.studying || [];

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

          <div className="space-y-12">
            {/* Completed Certifications */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Completed
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {completed.map((cert: any, index: number) => (
                  <div
                    key={index}
                    className="group flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 min-w-[300px]"
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

            {/* Studying Certifications */}
            {studying.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Currently Studying
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {studying.map((cert: any, index: number) => (
                    <div
                      key={index}
                      className="group flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-blue-400/50 hover:shadow-lg transition-all duration-300 min-w-[300px] opacity-90"
                    >
                      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
                        <BookOpen className="w-6 h-6" />
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
