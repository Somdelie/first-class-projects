import { getProjectsAction } from "@/lib/actions";
import ProjectsClient from "@/components/projects/ProjectsClient";

export default async function ProjectsPage() {
  const result = await getProjectsAction();
  const projects = result.success && "data" in result ? result.data : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-2">
        Our Projects Portfolio
      </h1>
      <p className="text-xl sm:text-2xl text-emerald-300 max-w-3xl mx-auto mb-2 text-center">
        Discover our exceptional painting and renovation work across
        residential, commercial, and industrial projects
      </p>

      {/* Projects Grid Section */}
      <ProjectsClient projects={projects} />
    </div>
  );
}
