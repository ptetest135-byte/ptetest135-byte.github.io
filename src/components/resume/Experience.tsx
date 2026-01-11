import { useState } from "react";
import { resumeData } from "@/data/resumeData";
import { Briefcase, MapPin, Calendar, ChevronRight, ChevronDown, Star } from "lucide-react";

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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

            {resumeData.experience.map((job, index) => {
              const isExpanded = expandedIndex === index;
              const isHighlighted = job.highlighted;

              return (
                <div
                  key={index}
                  className={`relative mb-12 last:mb-0 ${
                    index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%]"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 ring-4 ring-background shadow-lg z-10 transition-colors ${
                    isHighlighted ? "bg-primary" : "bg-muted-foreground/50"
                  }`}>
                    {isHighlighted && (
                      <Star className="w-2 h-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground fill-current" />
                    )}
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-8 md:ml-0 ${
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <div 
                      className={`bg-card rounded-2xl p-6 border transition-all duration-300 group cursor-pointer ${
                        isHighlighted 
                          ? "border-primary/30 hover:border-primary hover:shadow-xl shadow-lg" 
                          : "border-border/50 hover:border-border opacity-75 hover:opacity-100"
                      }`}
                      onMouseEnter={() => setExpandedIndex(index)}
                      onMouseLeave={() => setExpandedIndex(null)}
                    >
                      {/* Highlighted badge */}
                      {isHighlighted && (
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 ${
                          index % 2 === 0 ? "md:float-right md:ml-3" : ""
                        }`}>
                          <Star className="w-3 h-3 fill-current" />
                          Featured Role
                        </div>
                      )}

                      {/* Job header */}
                      <div className={`flex flex-col gap-2 mb-4 ${index % 2 === 0 ? "md:items-end" : "md:items-start"} ${isHighlighted ? "" : ""}`}>
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

                      {/* Expand indicator */}
                      {job.highlights.length > 0 && (
                        <div className={`flex items-center gap-1 text-sm text-primary mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                          <span>{isExpanded ? "Hide details" : "Hover to see details"}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                      )}

                      {/* Highlights - shown on hover */}
                      {job.highlights.length > 0 && (
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        }`}>
                          <ul className={`space-y-2 pt-4 border-t border-border ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
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
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
