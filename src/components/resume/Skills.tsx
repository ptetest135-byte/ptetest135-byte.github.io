import { resumeData } from "@/data/resumeData";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Network, 
  AppWindow, 
  Shield, 
  Cloud, 
  Ticket, 
  HardDrive, 
  Wrench, 
  Video 
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "Operating Systems": <Monitor className="w-5 h-5" />,
  "Networking": <Network className="w-5 h-5" />,
  "Applications": <AppWindow className="w-5 h-5" />,
  "MDM": <Shield className="w-5 h-5" />,
  "Virtual Technologies": <Cloud className="w-5 h-5" />,
  "Ticketing": <Ticket className="w-5 h-5" />,
  "Backup Technologies": <HardDrive className="w-5 h-5" />,
  "Hardware & Network": <Wrench className="w-5 h-5" />,
  "AV": <Video className="w-5 h-5" />,
};

const Skills = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
              Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Technical Skills
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit built through years of hands-on experience in IT support
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeData.technicalSkills.map((skillGroup, index) => (
              <div
                key={skillGroup.category}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {iconMap[skillGroup.category] || <Wrench className="w-5 h-5" />}
                  </div>
                  <h3 className="font-semibold text-foreground">{skillGroup.category}</h3>
                </div>

                {/* Skills badges */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-muted hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Core abilities */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              Core Abilities
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {resumeData.coreAbilities.map((ability, index) => (
                <div
                  key={ability}
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:scale-105 transition-transform cursor-default"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {ability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
