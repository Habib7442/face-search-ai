"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import Link from "next/link";
import type { SearchResult } from "@/types/search";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

interface GPTResult {
  "Full Name": string;
  Topics: string[];
  "More Information": string;
  "Confidential Analysis Score": string;
  Poem: string;
}

export default function InfoPage() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gptResult, setGPTResult] = useState<GPTResult | null>(null);
  const [apiSearchResults, setApiSearchResults] = useState<SearchResult[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        setSearchResults(parsedResults);
        // Clean up storage after retrieving the data
        localStorage.removeItem("searchResults");
      } catch (error) {
        console.error("Error parsing search results:", error);
      }
    }
  }, []);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImages((prev) => {
      if (prev.includes(imageUrl)) {
        return prev.filter((url) => url !== imageUrl);
      }
      return [...prev, imageUrl];
    });
  };

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

  return (
    <div className="min-h-screen  text-slate-200 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/upload">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-800/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="poppins-semibold text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-400">
            Deep Analysis
          </h1>
        </div>

        <GlassCard className="p-8 mb-8">
          <div className="flex justify-center mb-8">
            <Button
              onClick={handleAnalyze}
              disabled={selectedImages.length === 0 || isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Analyzing Selected Images...
                </>
              ) : (
                "Analyze Selected Images"
              )}
            </Button>
          </div>

          <div className="flex mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {searchResults.map((result, index) => (
                <motion.div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden ${
                    selectedImages.includes(result.imageUrl)
                      ? "ring-2 ring-purple-500"
                      : ""
                  }`}
                  onClick={() => handleImageSelect(result.imageUrl)}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={result.imageUrl}
                    alt={`Result ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-purple-500/20 transition-opacity ${
                      selectedImages.includes(result.imageUrl)
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-white text-xs">
                    Source: {result.sourceUrl}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {apiSearchResults.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                Search Results
              </h2>
              <BentoGrid>
                {apiSearchResults.map((result, index) => (
                  <BentoGridItem
                    key={index}
                    header={
                      <img
                        src={result.imageUrl}
                        alt={`Search Result ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    }
                    title={`Source: ${result.sourceUrl}`}
                    description={`Group: ${result.group}`}
                  />
                ))}
              </BentoGrid>
            </div>
          )}

          {gptResult && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Analysis Results
              </h2>
              <div>
                <h3 className="text-xl font-semibold mb-2">Full Name</h3>
                <p>{gptResult["Full Name"]}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Confidential Analysis Score
                </h3>
                <p>{gptResult["Confidential Analysis Score"]}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Topics</h3>
                <ul className="list-disc pl-5">
                  {gptResult.Topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">More Information</h3>
                <p>{gptResult["More Information"]}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  AI Generated Poem
                </h3>
                <pre className="whitespace-pre-wrap">{gptResult["Poem"]}</pre>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
