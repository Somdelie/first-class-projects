import { getAllProjects } from "@/lib/db";
import ProjectsClient from "@/components/projects/ProjectsClient";

export default async function ProjectsPage() {
  const result = await getAllProjects();
  const projects = result?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-2">
        Our Projects Portfolio
      </h1>
      <p className="text-xl sm:text-2xl text-emerald-300 max-w-3xl mx-auto mb-2 text-center">
        Discover our exceptional painting and renovation work across
        residential, commercial, and industrial projects
      </p>
      {/* Hero Section */}
      {/* <section className="relative py-20 sm:py-28 lg:py-32 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-800 dark:via-emerald-900 dark:to-teal-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-8 lg:px-20 text-center">
      
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-2xl font-bold text-white">
                {projects.length}+
              </span>
              <span className="text-emerald-100 ml-2">Completed Projects</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-emerald-100 ml-2">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Projects Grid Section */}
      <ProjectsClient projects={projects} />
    </div>
  );
}
