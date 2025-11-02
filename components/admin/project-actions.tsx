"use client";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { deleteProject, updateProject } from "@/lib/db";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { ImageUpload } from "../ImageUpload";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { categories } from "./project-dialog";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export function ProjectActions({ project }: { project: Project }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title,
    category: project.category,
    image: project.image,
    description: project.description,
  });

  const handleEditDialog = () => {
    setIsOpen(true);
  };

  const handleEdit = () => {
    try {
      startTransition(async () => {
        const response = await updateProject(project.id, formData);
        if (response.success) {
          toast.success("Project has been updated");
          setIsOpen(false);
        } else {
          toast.error("Failed to update project");
        }
      });
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDelete = (id: string) => {
    try {
      startTransition(async () => {
        const response = await deleteProject(id);
        if (response.success) {
          toast.success("Project has been deleted");
          setIsDeleteDialogOpen(false);
        } else {
          toast.error("Failed to delete project");
        }
      });
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEditDialog}
            className="hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-200 hover:scale-105"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        {/* Dialog content for editing project would go here */}
        <DialogContent>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Make changes to your project settings.
          </DialogDescription>
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

            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
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
                onClick={handleEdit}
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

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDeleteDialogOpen(true)}
          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-200 hover:scale-105"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>

        <DialogContent className="sm:max-w-sm">
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{project.title}&quot;? This
            action cannot be undone.
          </DialogDescription>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isPending}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(project.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-6"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
