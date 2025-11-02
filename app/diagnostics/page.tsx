"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HealthStatus {
  status: string;
  message: string;
  data?: {
    projectsCount?: number;
    sampleProject?: { id: string; title: string } | null;
    databaseUrl?: string;
    environment?: string;
  };
  error?: string;
  databaseUrl?: string;
  environment?: string;
  timestamp?: string;
}

export default function DiagnosticsPage() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      setHealthStatus(data);
    } catch (error) {
      setHealthStatus({
        status: "error",
        message: "Failed to fetch health status",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const testProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      console.log("Projects API response:", data);
      alert(`Projects API Response: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error("Projects API error:", error);
      alert(
        `Projects API Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">System Diagnostics</h1>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Database Health Check</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={checkHealth} disabled={loading}>
                {loading ? "Checking..." : "Check Database Health"}
              </Button>
              <Button
                onClick={testProjects}
                disabled={loading}
                variant="outline"
              >
                {loading ? "Testing..." : "Test Projects API"}
              </Button>
            </div>

            {healthStatus && (
              <div className="space-y-2">
                <div
                  className={`p-3 rounded ${
                    healthStatus.status === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  <strong>Status:</strong> {healthStatus.status}
                </div>

                <div className="p-3 bg-gray-100 rounded">
                  <strong>Message:</strong> {healthStatus.message}
                </div>

                {healthStatus.error && (
                  <div className="p-3 bg-red-50 rounded text-red-700">
                    <strong>Error:</strong> {healthStatus.error}
                  </div>
                )}

                <div className="p-3 bg-blue-50 rounded text-sm">
                  <div>
                    <strong>Environment:</strong> {healthStatus.environment}
                  </div>
                  <div>
                    <strong>Database URL:</strong> {healthStatus.databaseUrl}
                  </div>
                  <div>
                    <strong>Timestamp:</strong> {healthStatus.timestamp}
                  </div>
                </div>

                {healthStatus.data && (
                  <div className="p-3 bg-gray-50 rounded">
                    <strong>Data:</strong>
                    <pre className="mt-2 text-xs overflow-x-auto">
                      {JSON.stringify(healthStatus.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
