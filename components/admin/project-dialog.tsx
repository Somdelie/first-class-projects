"use client";

import { useState, useTransition } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MultipleImageUpload } from "@/components/MultipleImageUpload"; // Changed from ImageUpload
import { createProject } from "@/lib/db";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";

export const categories = [
  "Residential",
  "Commercial",
  "Industrial",
  "Renovation",
] as const;

export function ProjectDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: "",
    category: "Residential" as (typeof categories)[number],
    images: [] as string[], // Changed from image to images
    description: "",
  });

  const handleAddProject = async () => {
    if (!formData.title) return;

    try {
      startTransition(async () => {
        const response = await createProject({
          title: formData.title,
          description: formData.description,
          images: formData.images, // Changed from image to images
          category: formData.category,
        });
        if (response.success) {
          toast.success("Project has been created successfully💐", {
            style: {
              backgroundColor: "#22c55e",
              color: "#fff",
            },
          });
          setIsOpen(false);
        } else {
          toast.error("Failed to create project");
        }
      });
    } catch (error) {
      console.error(error);
    }

    setFormData({
      title: "",
      category: "Residential",
      images: [], // Changed from image to images
      description: "",
    });
  };

  return (
    <Card className="bg-linear-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700">
      <CardContent className="p-6">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full h-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 backdrop-blur transition-all duration-200 hover:scale-105">
              <Plus className="mr-2 h-5 w-5" />
              Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Project</DialogTitle>
              <DialogDescription className="text-base">
                Fill in the project details below
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pl-2 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Project Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Modern Kitchen Renovation"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-medium">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: string) =>
                    setFormData({
                      ...formData,
                      category: value as typeof formData.category,
                    })
                  }
                >
                  <SelectTrigger className="w-full h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <MultipleImageUpload
                values={formData.images}
                onChange={(urls) => setFormData({ ...formData, images: urls })}
              />

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter project description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t dark:border-slate-700">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddProject}
                  className="bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 shadow-lg"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" /> Creating...
                    </span>
                  ) : (
                    "Add Project"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
