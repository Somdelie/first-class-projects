"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Image as ImageIcon, Plus } from "lucide-react";
import Image from "next/image";

interface MultipleImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
  maxImages?: number;
}

export function MultipleImageUpload({
  values = [],
  onChange,
  disabled,
  maxImages = 5,
}: MultipleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>(values);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    // Use setTimeout to defer the click to avoid immediate event propagation
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    // Check if adding files would exceed max limit
    if (previewUrls.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);

    try {
      const newUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith("image/")) {
          alert(`File ${file.name} is not an image`);
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} must be less than 5MB`);
          continue;
        }

        // Generate filename with timestamp
        const timestamp = Date.now() + i;
        const extension = file.name.split(".").pop();
        const filename = `project-${timestamp}.${extension}`;

        // Create FormData for upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", filename);

        // Upload to Vercel Blob
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        newUrls.push(data.url);
      }

      const updatedUrls = [...previewUrls, ...newUrls];
      setPreviewUrls(updatedUrls);
      onChange(updatedUrls);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = async (index: number) => {
    const urlToRemove = previewUrls[index];

    try {
      // Delete from Vercel Blob
      if (urlToRemove) {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: urlToRemove }),
        });
      }

      const updatedUrls = previewUrls.filter((_, i) => i !== index);
      setPreviewUrls(updatedUrls);
      onChange(updatedUrls);
    } catch (error) {
      console.error("Failed to delete image:", error);
      // Still remove from UI even if deletion fails
      const updatedUrls = previewUrls.filter((_, i) => i !== index);
      setPreviewUrls(updatedUrls);
      onChange(updatedUrls);
    }
  };

  const canAddMore = previewUrls.length < maxImages;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Project Images ({previewUrls.length}/{maxImages})
        </Label>
        {canAddMore && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleButtonClick}
            disabled={disabled || isUploading}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Images
          </Button>
        )}
      </div>

      {/* Hidden file input */}
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={handleFileSelect}
        disabled={disabled || isUploading}
      />

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="group relative">
            <div className="aspect-square relative overflow-hidden rounded-lg border-2 border-gray-200">
              <Image
                src={url}
                alt={`Project image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove(index);
              }}
              disabled={disabled || isUploading}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}

        {/* Add More Button */}
        {canAddMore && (
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={disabled || isUploading}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors disabled:opacity-50"
          >
            <Plus className="w-8 h-8 mb-2" />
            <span className="text-sm">Add Image</span>
          </button>
        )}
      </div>

      {previewUrls.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900">
                No images uploaded yet
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Click &quot;Add Images&quot; to upload project photos
              </p>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              PNG, JPG, GIF up to 5MB each. Maximum {maxImages} images.
            </p>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="text-center">
          <p className="text-sm text-blue-600">Uploading images...</p>
        </div>
      )}
    </div>
  );
}
