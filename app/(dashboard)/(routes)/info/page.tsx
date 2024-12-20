"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import Link from "next/link";
import type { SearchResult } from "@/types/search";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useAppSelector } from "@/lib/redux";
import { selectSearchResults } from "@/lib/redux/slices/searchResultsSlice";
import { selectSelectedImages } from "@/lib/redux/slices/selectedImagesSlice";
import { cn } from "@/lib/utils";

interface GPTResult {
  "Full Name": string;
  Topics: string[];
  "More Information": string;
  "Confidential Analysis Score": string;
  Poem: string;
}

export default function InfoPage() {
  // const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const selectedImages = useAppSelector(selectSelectedImages);
  const [isLoading, setIsLoading] = useState(false);
  const [gptResult, setGPTResult] = useState<GPTResult | null>(null);
  const [apiSearchResults, setApiSearchResults] = useState<SearchResult[]>([]);

  const searchResults = useAppSelector(selectSearchResults);

  useEffect(() => {
    // Automatically analyze when component mounts
    if (selectedImages.length > 0) {
      handleAnalyze();
    }
  }, []);

  const handleAnalyze = async () => {
    if (selectedImages.length === 0) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/get-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrls: selectedImages }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch info");
      }

      const data = await response.json();
      setGPTResult(data.result);
      setApiSearchResults(data.search_results);
    } catch (error) {
      console.error("Error analyzing images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If there are no search results, show a message and link back to upload
  if (!searchResults.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-200 py-8 px-4">
        <GlassCard className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            No Search Results Available
          </h2>
          <p className="mb-6">Please perform a search first to see results.</p>
          <Link href="/upload">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Go to Search
            </Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-100/50 dark:border-slate-800/50 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-6 mb-12"
        >
          <Link href="/upload">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "p-4 rounded-xl",
                "bg-gradient-to-br from-blue-100/50 to-indigo-100/50",
                "dark:from-blue-900/30 dark:to-indigo-900/30",
                "backdrop-blur-md",
                "shadow-lg dark:shadow-slate-900/20",
                "border border-blue-200/50 dark:border-blue-800/50",
                "hover:border-blue-300/50 dark:hover:border-blue-700/50",
                "transition-all duration-300"
              )}
            >
              <ArrowLeft className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </Button>
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Deep Analysis
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Detailed insights from your selected images
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "rounded-2xl",
            "bg-white/80 dark:bg-slate-900/80",
            "backdrop-blur-md",
            "shadow-xl dark:shadow-slate-900/20",
            "border border-slate-200/50 dark:border-slate-700/50",
            "p-8"
          )}
        >
          {/* Selected Images Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Selected Images
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {searchResults.map((result, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "relative group rounded-xl overflow-hidden",
                    "bg-slate-100 dark:bg-slate-800",
                    "shadow-lg dark:shadow-slate-900/20",
                    selectedImages.includes(result.imageUrl) && 
                      "ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-slate-900"
                  )}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={result.imageUrl}
                    alt={`Result ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-t from-slate-900/80 to-transparent",
                    "transition-opacity duration-300",
                    selectedImages.includes(result.imageUrl) 
                      ? "opacity-100" 
                      : "opacity-0 group-hover:opacity-100"
                  )} />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium truncate">
                      {result.sourceUrl}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* API Search Results */}
          {apiSearchResults.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6">
                Search Results
              </h2>
              <BentoGrid className="gap-6">
                {apiSearchResults.map((result, index) => (
                  <BentoGridItem
                    key={index}
                    className={cn(
                      "rounded-xl overflow-hidden",
                      "bg-slate-50/50 dark:bg-slate-800/50",
                      "backdrop-blur-sm",
                      "shadow-lg hover:shadow-xl dark:shadow-slate-900/20",
                      "border border-slate-200/50 dark:border-slate-700/50",
                      "hover:border-blue-200/50 dark:hover:border-blue-800/50",
                      "transition-all duration-300"
                    )}
                    header={
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={result.imageUrl}
                          alt={`Search Result ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    }
                    title={`Source: ${result.sourceUrl}`}
                    description={`Group: ${result.group}`}
                  />
                ))}
              </BentoGrid>
            </div>
          )}

          {/* GPT Analysis Results */}
          {gptResult && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "space-y-8",
                "bg-gradient-to-br from-slate-50/50 to-white/50",
                "dark:from-slate-800/50 dark:to-slate-900/50",
                "p-8 rounded-xl",
                "shadow-lg dark:shadow-slate-900/20",
                "border border-slate-200/50 dark:border-slate-700/50"
              )}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Analysis Results
              </h2>

              {/* Analysis Cards */}
              {[
                { title: "Full Name", content: gptResult["Full Name"] },
                { title: "Confidential Analysis Score", content: gptResult["Confidential Analysis Score"] },
                { 
                  title: "Topics", 
                  content: (
                    <div className="flex flex-wrap gap-2">
                      {gptResult.Topics.map((topic, index) => (
                        <span 
                          key={index} 
                          className={cn(
                            "px-3 py-1 rounded-full text-sm",
                            "bg-blue-100/50 dark:bg-blue-900/50",
                            "text-blue-600 dark:text-blue-400",
                            "border border-blue-200/50 dark:border-blue-800/50"
                          )}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )
                },
                { title: "More Information", content: gptResult["More Information"] },
                { 
                  title: "AI Generated Poem", 
                  content: (
                    <pre className={cn(
                      "whitespace-pre-wrap font-serif italic",
                      "bg-slate-50/50 dark:bg-slate-800/50",
                      "p-6 rounded-xl",
                      "text-slate-700 dark:text-slate-300",
                      "border border-slate-200/50 dark:border-slate-700/50"
                    )}>
                      {gptResult["Poem"]}
                    </pre>
                  )
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "p-6 rounded-xl",
                    "bg-white/80 dark:bg-slate-900/80",
                    "backdrop-blur-sm",
                    "shadow-lg dark:shadow-slate-900/20",
                    "border border-slate-200/50 dark:border-slate-700/50"
                  )}
                >
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    {section.title}
                  </h3>
                  <div className="text-slate-700 dark:text-slate-300">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
