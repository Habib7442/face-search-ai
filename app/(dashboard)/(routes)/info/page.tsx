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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6 mb-10"
        >
          <Link href="/upload">
            <Button
              variant="ghost"
              size="icon"
              className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Deep Analysis
            </h1>
            <p className="text-gray-600 mt-1">Detailed insights from your selected images</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-100/50 p-8"
        >
          {/* Selected Images Grid */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Selected Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {searchResults.map((result, index) => (
                <motion.div
                  key={index}
                  className={`relative group rounded-2xl overflow-hidden shadow-lg ${
                    selectedImages.includes(result.imageUrl)
                      ? "ring-4 ring-blue-500 ring-offset-2"
                      : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={result.imageUrl}
                    alt={`Result ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity ${
                      selectedImages.includes(result.imageUrl)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium">
                    {result.sourceUrl}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* API Search Results */}
          {apiSearchResults.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Search Results
              </h2>
              <BentoGrid className="gap-6">
                {apiSearchResults.map((result, index) => (
                  <BentoGridItem
                    key={index}
                    className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
              className="space-y-8 bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Analysis Results
              </h2>

              {/* Full Name */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Full Name
                </h3>
                <p className="text-gray-700">{gptResult["Full Name"]}</p>
              </div>

              {/* Confidential Score */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Confidential Analysis Score
                </h3>
                <p className="text-gray-700">{gptResult["Confidential Analysis Score"]}</p>
              </div>

              {/* Topics */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {gptResult.Topics.map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* More Information */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  More Information
                </h3>
                <p className="text-gray-700 leading-relaxed">{gptResult["More Information"]}</p>
              </div>

              {/* AI Generated Poem */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  AI Generated Poem
                </h3>
                <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-6 rounded-xl font-serif italic">
                  {gptResult["Poem"]}
                </pre>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
