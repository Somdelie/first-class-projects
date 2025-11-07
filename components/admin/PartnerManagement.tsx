"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageViewer } from "@/components/ui/ImageViewer";
import { PartnerDialog } from "./PartnerDialog";
import { PartnerActions } from "./PartnerActions";
import { RefreshCw, ExternalLink, FileText } from "lucide-react";
import { Partner } from "@prisma/client";
import { getPartnersAction } from "@/lib/actions";
import { toast } from "sonner";

export function PartnerManagement({
  initialPartners,
}: {
  initialPartners: Partner[];
}) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const result = await getPartnersAction();
      if (result.success && "data" in result) {
        setPartners(result.data);
        toast.success("Partners refreshed successfully");
      } else {
        toast.error("Failed to refresh partners");
      }
    } catch (error) {
      console.error("Error refreshing partners:", error);
      toast.error("Failed to refresh partners");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handlePartnerChange = () => {
    handleRefresh();
  };

  return (
    <>
      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Partner Management
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your application partners
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Application Partners</CardTitle>
          <PartnerDialog onPartnerSaved={handlePartnerChange} />
        </CardHeader>
        <CardContent>
          {partners.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No partners added yet. Add your first partner to get started.
              </p>
              <PartnerDialog onPartnerSaved={handlePartnerChange} />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {partners.map((partner) => (
                <Card
                  key={partner.id}
                  className="group hover:shadow transition-shadow p-0"
                >
                  <CardContent className="p-4">
                    {/* Actions Menu */}
                    <div className="flex justify-end mb-2">
                      <PartnerActions
                        partner={partner}
                        onPartnerDeleted={handlePartnerChange}
                      />
                    </div>

                    {/* Partner Logo */}
                    <div className="aspect-video relative rounded-lg overflow-hidden border bg-gray-50 mb-3">
                      <Image
                        src={partner.logoUrl}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>

                    {/* Partner Info */}
                    <div className="space-y-3">
                      <div>
                        <h3
                          className="font-semibold text-base line-clamp-1"
                          title={partner.name}
                        >
                          {partner.name}
                        </h3>
                        {partner.website && (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Visit Website
                          </a>
                        )}
                      </div>

                      {/* Certificate Button */}
                      <ImageViewer
                        imageUrl={partner.certificate}
                        title={partner.name}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          View Certificate
                        </Button>
                      </ImageViewer>

                      {/* Status */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <Badge variant="default" className="text-xs">
                          Active
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          #{partner.id}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
