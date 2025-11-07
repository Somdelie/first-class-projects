import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { ImageIcon, Sparkles, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectManagement } from "@/components/admin/ProjectManagement";
import { PartnerManagement } from "@/components/admin/PartnerManagement";
import { getProjectsAction, getPartnersAction } from "@/lib/actions";

export default async function AdminPage() {
  // Fetch data on the server
  const [projectsResult, partnersResult] = await Promise.all([
    getProjectsAction(),
    getPartnersAction(),
  ]);

  const projects =
    projectsResult.success && "data" in projectsResult
      ? projectsResult.data
      : [];
  const partners =
    partnersResult.success && "data" in partnersResult
      ? partnersResult.data
      : [];
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:bg-linear-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="max-w-7xl mx-auto p-6 sm:p-8 lg:p-12">
            {/* Header Section */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg ml-14">
                Manage your projects and partners with ease
              </p>
            </div>

            {/* Main Content with Tabs */}
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger
                  value="projects"
                  className="flex items-center gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="partners"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Partners
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects">
                <ProjectManagement initialProjects={projects} />
              </TabsContent>

              <TabsContent value="partners">
                <PartnerManagement initialPartners={partners} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
