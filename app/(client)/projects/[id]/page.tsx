"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Custom Image Gallery Component
interface ImageGalleryProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  title: string;
}

function ImageGallery({
  images,
  initialIndex,
  onClose,
  title,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white"
          onClick={onClose}
        >
          ✕
        </Button>

        {/* Previous Button */}
        {images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects`);
        const data = await response.json();

        if (response.ok && data.projects) {
          const foundProject = data.projects.find(
            (p: Project) => p.id === params.id
          );
          if (foundProject) {
            setProject(foundProject);
          } else {
            setError("Project not found");
          }
        } else {
          setError(data.error || "Failed to load project");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  const handleShare = async () => {
    if (navigator.share && project) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!project) return;

    if (direction === "prev") {
      setSelectedImageIndex((prev) =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              {error || "Project Not Found"}
            </h2>
            <p className="text-muted-foreground mb-6">
              The project you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Button onClick={() => router.push("/projects")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push("/projects")}
            className="mb-6 hover:bg-emerald-100 dark:hover:bg-emerald-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>

          {/* Project Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-sm">
                  <Tag className="mr-1 h-3 w-3" />
                  {project.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {project.title}
              </h1>

              <p className="text-lg text-muted-foreground max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Share Button */}
            <Button
              variant="outline"
              onClick={handleShare}
              className="self-start"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {project.images && project.images.length > 0 && (
            <div className="space-y-8">
              {/* Featured Image */}
              <div className="relative">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video relative group cursor-pointer">
                      <Image
                        src={project.images[selectedImageIndex]}
                        alt={`${project.title} - Image ${
                          selectedImageIndex + 1
                        }`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                        onClick={() => setShowImageViewer(true)}
                      />

                      {/* Navigation Arrows for Featured Image */}
                      {project.images.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateImage("prev");
                            }}
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateImage("next");
                            }}
                          >
                            <ChevronRight className="h-6 w-6" />
                          </Button>
                        </>
                      )}

                      {/* Image Counter */}
                      {project.images.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-background/80 text-foreground px-3 py-1 rounded-full text-sm">
                          {selectedImageIndex + 1} / {project.images.length}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Thumbnail Gallery */}
              {project.images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {project.images.map((image, index) => (
                    <Card
                      key={index}
                      className={`overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                        index === selectedImageIndex
                          ? "ring-2 ring-primary"
                          : "hover:ring-1 hover:ring-primary/50"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <CardContent className="p-0">
                        <div className="aspect-square relative">
                          <Image
                            src={image}
                            alt={`${project.title} - Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Project Details Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Project Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Category</h3>
                  <p className="text-muted-foreground">{project.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Completion Date
                  </h3>
                  <p className="text-muted-foreground">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Let&apos;s discuss how we can bring your vision to life with our
            professional painting services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => router.push("/contact")}
            >
              Get Free Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600"
              onClick={() => (window.location.href = "tel:0861125277")}
            >
              Call Now: 0861 125 277
            </Button>
          </div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      {showImageViewer && project.images && (
        <ImageGallery
          images={project.images}
          initialIndex={selectedImageIndex}
          onClose={() => setShowImageViewer(false)}
          title={project.title}
        />
      )}
    </div>
  );
}
