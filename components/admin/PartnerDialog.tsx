"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ImageUpload";
import { Plus, Loader2 } from "lucide-react";
import { Partner } from "@prisma/client";

interface PartnerDialogProps {
  partner?: Partner | null;
  onPartnerSaved: () => void;
}

export function PartnerDialog({ partner, onPartnerSaved }: PartnerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
    website: "",
    certificate: "",
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        name: partner.name,
        logoUrl: partner.logoUrl,
        website: partner.website || "",
        certificate: partner.certificate,
      });
    } else {
      setFormData({
        name: "",
        logoUrl: "",
        website: "",
        certificate: "",
      });
    }
  }, [partner, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.logoUrl || !formData.certificate) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const url = partner ? `/api/partners/${partner.id}` : "/api/partners";
      const method = partner ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${partner ? "update" : "create"} partner`);
      }

      setIsOpen(false);
      onPartnerSaved();
    } catch (error) {
      console.error(
        `Error ${partner ? "updating" : "creating"} partner:`,
        error
      );
      alert(
        `Failed to ${partner ? "update" : "create"} partner. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {partner ? (
          <Button variant="outline" size="sm">
            Edit
          </Button>
        ) : (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Partner
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {partner ? "Edit Partner" : "Add New Partner"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Partner Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter partner name"
              required
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, website: e.target.value }))
              }
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label>Partner Logo *</Label>
            <ImageUpload
              value={formData.logoUrl}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, logoUrl: url }))
              }
              disabled={isLoading}
            />
          </div>

          <div>
            <Label>Certificate *</Label>
            <ImageUpload
              value={formData.certificate}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, certificate: url }))
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {partner ? "Updating..." : "Creating..."}
                </>
              ) : partner ? (
                "Update Partner"
              ) : (
                "Add Partner"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
