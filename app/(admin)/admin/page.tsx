import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";
import { ImageIcon, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectDialog } from "@/components/admin/project-dialog";
import { ProjectActions } from "@/components/admin/project-actions";
import { getAllProjects } from "@/lib/db";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const categories = [
  "Residential",
  "Commercial",
  "Industrial",
  "Renovation",
] as const;

const categoryColors = {
  Residential:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  Commercial:
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  Industrial:
    "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
  Renovation:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
};

export default async function AdminPage() {
  const projects = await getAllProjects();
  const projectData = projects?.data || [];

  // console.log(projectData, "These are the projects");

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
                  Project Management
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg ml-14">
                Manage and organize your portfolio projects with ease
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card className="border-none shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Total Projects
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        {projects?.data?.length}
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-950 rounded-xl">
                      <ImageIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Categories
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        {categories.length}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-xl">
                      <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ProjectDialog />
            </div>

            {/* Projects Table */}
            <Card className="border-none shadow bg-white dark:bg-slate-900 overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/80 dark:bg-slate-800/50 border-b-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                        <TableHead className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider py-4 px-6">
                          Project
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider py-4 px-6">
                          Category
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider py-4 px-6">
                          Preview
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider py-4 px-6 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projectData?.map((project: Project, index: number) => (
                        <TableRow
                          key={project.id}
                          className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-200 group"
                        >
                          <TableCell className="py-5 px-6">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500 to-teal-600 text-white font-semibold text-sm shadow-md">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                  {project.title}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                  {project.description}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-5 px-6">
                            <span
                              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold border shadow-sm ${
                                categoryColors[
                                  project.category as keyof typeof categoryColors
                                ]
                              }`}
                            >
                              {project.category}
                            </span>
                          </TableCell>
                          <TableCell className="py-5 px-6">
                            {project.image ? (
                              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                                <Image
                                  src={project.image || "/placeholder.svg"}
                                  alt={project.title}
                                  fill
                                  className="object-cover"
                                  sizes="80px"
                                />
                              </div>
                            ) : (
                              <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500 transition-colors">
                                <ImageIcon className="w-7 h-7 text-slate-400 dark:text-slate-500" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="py-5 px-6">
                            <div className="flex justify-end">
                              <ProjectActions project={project} />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {projectData.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center py-12 text-slate-500 dark:text-slate-400"
                          >
                            <div className="flex flex-col items-center gap-3">
                              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <ImageIcon className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                              </div>
                              <p className="text-lg font-medium">
                                No projects yet
                              </p>
                              <p className="text-sm">
                                Get started by adding your first project
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
