import { resumeData } from "@/data/resumeData";
import { Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";

const Experience = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
              Career Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Professional Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A track record of delivering exceptional IT support across diverse industries
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/20 transform md:-translate-x-1/2" />

            {resumeData.experience.map((job, index) => (
              <div
                key={index}
                className={`relative mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%]"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 ring-4 ring-background shadow-lg z-10" />

                {/* Content card */}
                <div
                  className={`ml-8 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
                    {/* Job header */}
                    <div className={`flex flex-col gap-2 mb-4 ${index % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
                      <div className="flex items-center gap-2 text-primary">
                        <Briefcase className="w-4 h-4" />
                        <h3 className="font-bold text-lg">{job.title}</h3>
                      </div>
                      <div className="text-foreground font-semibold">{job.company}</div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {job.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-muted-foreground mb-4 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      {job.description}
                    </p>

                    {/* Highlights */}
                    {job.highlights.length > 0 && (
                      <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                        {job.highlights.map((highlight, hIndex) => (
                          <li
                            key={hIndex}
                            className={`flex items-start gap-2 text-sm text-muted-foreground ${
                              index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
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

export default Experience;
