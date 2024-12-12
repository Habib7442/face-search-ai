"use client";

import { useEffect, useState } from "react";
import { HistoryResponse } from "@/types/types";
import { HistoryCard } from "@/components/HistoryCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Get access token from client cookie
        const cookies = document.cookie.split(";");
        const tokenCookie = cookies.find((cookie) =>
          cookie.trim().startsWith("client_token=")
        );
        const accessToken = tokenCookie
          ? tokenCookie.split("=")[1].trim()
          : null;

        if (!accessToken) {
          toast.error("Please login to view history");
          router.push("/login");
          return;
        }

        const response = await fetch("/api/history?email=premium@example.com", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 401) {
          toast.error("Session expired. Please login again");
          router.push("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch history");
        }

        setHistory(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to fetch history"
        );
        if ((error as Error).message === "Premium access required") {
          // Handle premium access error specifically
          toast.error("This feature requires premium access");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  // Check for token on mount
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("client_token=")
    );

    if (!tokenCookie) {
      toast.error("Please login to view history");
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen  text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button
            variant="outline"
            className="mb-8 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-primary/10 text-gray-800">
              <History className="h-6 w-6 text-gray-800 drop-shadow-md" />
            </div>
            <h1 className="poppins-semibold text-3xl font-bold text-gray-800">
              Search History
            </h1>
          </div>
          <p className="text-black">
            View your previous search results and findings
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-800 rounded-lg aspect-video"
              />
            ))}
          </div>
        ) : history ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Search ID</p>
                <p className="font-mono text-sm">{history.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Time</p>
                <p className="font-mono text-sm">{history.timestamp}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.search_results.map((result, index) => (
                <HistoryCard key={index} result={result} />
              ))}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-400">
              <p>Platform: {history.platform}</p>
              <p>Total Results: {history.result_count}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No history available</p>
          </div>
        )}
      </div>
    </main>
  );
}
