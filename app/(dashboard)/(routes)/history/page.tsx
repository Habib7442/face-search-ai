"use client";

import { useEffect, useState } from "react";
import { HistoryResponse } from "@/types/types";
import { HistoryCard } from "@/components/HistoryCard";
import { History, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-100/50 dark:border-slate-800/50  py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-6 mb-12"
        >
          <div className={cn(
            "p-4 rounded-xl",
            "bg-gradient-to-br from-blue-100/50 to-indigo-100/50",
            "dark:from-blue-900/30 dark:to-indigo-900/30",
            "backdrop-blur-md",
            "shadow-lg dark:shadow-slate-900/20",
            "border border-blue-200/50 dark:border-blue-800/50"
          )}>
            <History className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Search History
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              View your previous search results and findings
            </p>
          </div>
        </motion.div>

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-[400px]"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-blue-200 dark:border-blue-900 animate-spin border-t-blue-600 dark:border-t-blue-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                Loading history...
              </p>
            </div>
          </motion.div>
        ) : history ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-2xl overflow-hidden",
              "bg-white/80 dark:bg-slate-900/80",
              "backdrop-blur-md",
              "shadow-xl dark:shadow-slate-900/20",
              "border border-slate-200/50 dark:border-slate-700/50",
              "p-8"
            )}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">Search ID</p>
                <p className="font-mono text-sm text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md">
                  {history.id}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">Time</p>
                <p className="font-mono text-sm text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md">
                  {history.timestamp}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.search_results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "group",
                    "rounded-xl overflow-hidden",
                    "bg-slate-50/50 dark:bg-slate-800/50",
                    "backdrop-blur-sm",
                    "shadow-lg hover:shadow-xl",
                    "border border-slate-200/50 dark:border-slate-700/50",
                    "hover:border-blue-200/50 dark:hover:border-blue-800/50",
                    "transition-all duration-300"
                  )}
                >
                  <HistoryCard result={result} />
                </motion.div>
              ))}
            </div>

            <div className={cn(
              "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
              "mt-8 pt-8",
              "border-t border-slate-200/50 dark:border-slate-700/50"
            )}>
              <div className="space-y-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Platform
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {history.platform}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Results
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {history.result_count}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "flex flex-col items-center justify-center",
              "min-h-[400px] text-center",
              "bg-white/80 dark:bg-slate-900/80",
              "backdrop-blur-md",
              "rounded-2xl",
              "shadow-xl dark:shadow-slate-900/20",
              "border border-slate-200/50 dark:border-slate-700/50",
              "p-8"
            )}
          >
            <div className={cn(
              "p-4 rounded-xl mb-4",
              "bg-slate-50 dark:bg-slate-800",
              "shadow-lg dark:shadow-slate-900/20"
            )}>
              <History className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              No history available
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
