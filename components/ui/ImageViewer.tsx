"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface ImageViewerProps {
  imageUrl: string;
  title: string;
  children: React.ReactNode;
}

export function ImageViewer({ imageUrl, title, children }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.replace(/\s+/g, "_")}_certificate.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleOpenInNewTab = () => {
    window.open(imageUrl, "_blank");
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 flex flex-col">
          <DialogHeader className="p-4 pb-3 shrink-0 border-b">
            <DialogTitle className="flex items-center justify-between gap-4">
              <span className="truncate">{title} - Certificate</span>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenInNewTab}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={`${title} certificate`}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
