import { resumeData } from "@/data/resumeData";

const About = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Professional Summary
            </h2>
          </div>

          {/* Summary card */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-l-4 border-t-4 border-primary/20 rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-4 border-b-4 border-primary/20 rounded-br-3xl" />

            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-t-2xl" />
              
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                {resumeData.summary}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-border">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">APAC</div>
                  <div className="text-sm text-muted-foreground">Region Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">End Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
