"use client";

import { useEffect, useState } from "react";
import { HistoryResponse } from "@/types/types";
import { HistoryCard } from "@/components/HistoryCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history?email=premium@example.com");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch history");
        }

        setHistory(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <main className="min-h-screen  text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <History className="h-6 w-6 text-primary" />
            </div>
            <h1 className="poppins-semibold text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-400">Search History</h1>
          </div>
          <p className="text-gray-400">
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
                <p className="font-mono text-sm">{history.details.uuid}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Time</p>
                <p className="font-mono text-sm">{history.details.UST_time}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.details.results.map((result, index) => (
                <HistoryCard key={index} result={result} />
              ))}
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