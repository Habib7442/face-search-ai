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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6 mb-10"
        >
          <div className="p-4 rounded-full bg-white shadow-lg">
            <History className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Search History
            </h1>
            <p className="text-gray-600 mt-1">
              View your previous search results and findings
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600">Loading history...</p>
            </div>
          </div>
        ) : history ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-100/50 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Search ID</p>
                <p className="font-mono text-sm text-gray-900">{history.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-mono text-sm text-gray-900">
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
                  className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <HistoryCard result={result} />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Platform:{" "}
                <span className="text-gray-700">{history.platform}</span>
              </p>
              <p className="text-sm text-gray-500">
                Total Results:{" "}
                <span className="text-gray-700">{history.result_count}</span>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-100/50 p-8"
          >
            <div className="p-4 rounded-full bg-gray-50 mb-4">
              <History className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-gray-600">No history available</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
