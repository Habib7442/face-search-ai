"use client";

import { useEffect, useState } from "react";
import { HistoryResponse } from "@/types/types";
import { HistoryCard } from "@/components/HistoryCard";
import { History, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const cookies = document.cookie.split(";");
        const tokenCookie = cookies.find((cookie) =>
          cookie.trim().startsWith("client_token=")
        );
        const accessToken = tokenCookie
          ? tokenCookie.split("=")[1].trim()
          : null;

        if (!accessToken) {
          toast.error("Please login to view history");
          router.push("/sign-in");
          return;
        }

        const response = await fetch("/api/history?email=premium@example.com", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 401) {
          toast.error("Session expired. Please login again");
          router.push("/sign-in");
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
          toast.error("This feature requires premium access");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-white/50 py-8 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-violet-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-indigo-100/50 backdrop-blur-sm">
              <History className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              Search History
            </h1>
          </div>
          <p className="text-slate-600">
            View your previous search results and findings
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <p className="text-slate-600">Loading history...</p>
            </div>
          </div>
        ) : history ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-slate-500">Search ID</p>
                  <p className="font-mono text-sm text-slate-900">{history.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Time</p>
                  <p className="font-mono text-sm text-slate-900">{history.timestamp}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.search_results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <HistoryCard result={result} />
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  Platform: <span className="text-slate-700">{history.platform}</span>
                </p>
                <p className="text-sm text-slate-500">
                  Total Results: <span className="text-slate-700">{history.result_count}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center"
          >
            <div className="p-4 rounded-full bg-slate-100 mb-4">
              <History className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-600">No history available</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
