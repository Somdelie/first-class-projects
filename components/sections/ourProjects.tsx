"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  category: string;
  images: string[]; // Changed from image to images array
  description: string;
};

export default function OurProjects({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Residential",
    "Commercial",
    "Industrial",
    "Renovation",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-emerald-500 dark:text-emerald-400 text-base sm:text-lg font-semibold uppercase tracking-wide mb-3">
            Our Portfolio
          </h3>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
            Recent Projects We&apos;ve Completed
          </h2>
          <p className="text-gray-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
            Take a look at some of our finest work. We pride ourselves on
            delivering exceptional plumbing solutions for homes and businesses.
          </p>
        </div>

        <Tabs
          value={activeFilter}
          onValueChange={setActiveFilter}
          className="w-full"
        >
          <TabsList className="flex w-full justify-center mb-10 sm:mb-12 flex-wrap h-auto gap-2 bg-transparent p-0">
            {filters.map((filter) => (
              <TabsTrigger
                key={filter}
                value={filter}
                className="px-5 sm:px-8 py-2.5 sm:py-3 rounded font-semibold text-sm sm:text-base data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=inactive]:bg-white dark:data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-slate-300 data-[state=inactive]:shadow dark:data-[state=inactive]:shadow-slate-700/50"
              >
                {filter}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="px-4 py-8 sm:py-10 relative">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="gap-2">
                {filteredProjects.map((project) => (
                  <CarouselItem
                    key={project.id}
                    className="basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="group bg-white dark:bg-slate-800 rounded overflow-hidden shadow dark:shadow-slate-700/50 transition-all duration-300 hover:-translate-y-2 h-full">
                      {/* Project Image */}
                      <div className="relative h-56 sm:h-64 overflow-hidden">
                        <Image
                          width={300}
                          height={200}
                          src={project.images?.[0] || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 bg-emerald-500 dark:bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
                          {project.category}
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-5 sm:p-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors truncate">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base mb-4 sm:mb-5">
                          {project.description}
                        </p>

                        {/* View Details Button */}
                        <button className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 font-semibold hover:gap-3 transition-all duration-300 text-sm sm:text-base">
                          View Details
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border-2 border-emerald-500 dark:border-emerald-400 text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 shadow-lg" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border-2 border-emerald-500 dark:border-emerald-400 text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 shadow-lg" />
            </Carousel>
          </div>
        </Tabs>

        {/* Load More Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/projects"
            className="bg-emerald-500 dark:bg-emerald-600 text-white px-8 sm:px-12 py-3.5 sm:py-4 rounded font-semibold hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors shadow hover:shadow-lg dark:shadow-slate-700/50 text-base sm:text-lg"
          >
            Load More Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
