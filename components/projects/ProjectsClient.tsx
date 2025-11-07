"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Grid3X3,
  LayoutList,
  ArrowRight,
  Calendar,
  Undo2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  category: string;
  images: string[]; // Changed from image to images array
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const router = useRouter();

  // Get unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((project) => project.category))
    );
    return ["all", ...uniqueCategories];
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort projects
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [projects, searchQuery, selectedCategory, sortBy]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        {/* Filters and Search */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center justify-between">
            <Button size="sm" onClick={handleGoBack}>
              <Undo2 className="h-4 w-4 mr-2" />
            </Button>
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-slate-800">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-slate-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Alphabetical</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600 dark:text-slate-400">
              Showing {filteredProjects.length} of {projects.length} projects
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="ml-2">
                  {selectedCategory}
                </Badge>
              )}
            </p>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Clear search
              </Button>
            )}
          </div>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
                : "space-y-6"
            }
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  viewMode,
}: {
  project: Project;
  viewMode: "grid" | "list";
}) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (viewMode === "list") {
    return (
      <div className="group bg-white dark:bg-slate-800 rounded shadow hover:shadow dark:shadow-slate-700/30 transition-all duration-300 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-80 h-64 sm:h-48 overflow-hidden">
            <Image
              src={project.images?.[0] || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
                {project.category}
              </Badge>
            </div>
          </div>
          <div className="flex-1 p-6 sm:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-slate-400 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(project.createdAt)}
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-slate-300 mb-4 leading-relaxed">
              {project.description}
            </p>
            <Button
              variant="outline"
              className="group/btn border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white dark:border-emerald-400 dark:text-emerald-400"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white dark:bg-slate-800 rounded shadow hover:shadow-xl dark:shadow-slate-700/30 transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.images?.[0] || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
            {project.category}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(project.createdAt)}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        <Button
          variant="ghost"
          className="w-full justify-center group/btn text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
        >
          View Project Details
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
