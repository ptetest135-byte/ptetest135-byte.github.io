import Hero from "@/components/resume/Hero";
import About from "@/components/resume/About";
import ProfessionalSkills from "@/components/resume/ProfessionalSkills";
import Skills from "@/components/resume/Skills";
import Experience from "@/components/resume/Experience";
import Education from "@/components/resume/Education";
import Contact from "@/components/resume/Contact";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <ProfessionalSkills />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
};

export default Index;
