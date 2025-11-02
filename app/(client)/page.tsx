import AboutUs from "@/components/sections/AboutUs";
import ApplicationPartners from "@/components/sections/ApplicationPartners";
import Footer from "@/components/sections/Footer";
import HeroFooter from "@/components/sections/HeroFooter";
import HeroSection from "@/components/sections/HeroSection";
import OurProjects from "@/components/sections/ourProjects";
import { getAllProjects } from "@/lib/db";

export default async function HomePage() {
  const projects = await getAllProjects();
  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* hero section */}
      <section id="home">
        <HeroSection />
      </section>
      <section id="about" className="w-full ">
        <AboutUs />
      </section>
      <section
        id="application-partners"
        className="w-full bg-gray-100 dark:bg-gray-800 py-16"
      >
        <ApplicationPartners />
      </section>
      <section id="projects" className="w-full">
        <OurProjects projects={projects.success ? projects.data ?? [] : []} />
      </section>
      <section id="contact" className="w-full">
        <HeroFooter />
        <Footer />
      </section>
    </div>
  );
}
