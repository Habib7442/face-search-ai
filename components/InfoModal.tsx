"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SearchResult } from "@/types/search";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchResults: SearchResult[];
  onSelectResult: (imageUrl: string, sourceUrl: string) => void;
}

interface GPTResult {
  "Full Name": string;
  "Topics": string[];
  "More Information": string;
  "Confidential Analysis Score": string;
  "Poem": string;
}

export function InfoModal({ isOpen, onClose, searchResults, onSelectResult }: InfoModalProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gptResult, setGPTResult] = useState<GPTResult | null>(null);
  const [apiSearchResults, setApiSearchResults] = useState<SearchResult[]>([]);

  // Reset state when modal closes
  const handleClose = () => {
    onClose();
    setSelectedImages([]);
    setGPTResult(null);
    setIsLoading(false);
    setApiSearchResults([]);
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImages((prev) => {
      if (prev.includes(imageUrl)) {
        return prev.filter((url) => url !== imageUrl);
      }
      return [...prev, imageUrl];
    });
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/get-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrls: selectedImages }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch info');
      }

      const data = await response.json();
      
      setGPTResult(data.result);
      setApiSearchResults(data.search_results);
    } catch (error) {
      console.error("Error fetching GPT results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Group search results (for both initial and API results)
  const groupResults = (results: SearchResult[]) => {
    return results.reduce((acc, result) => {
      const group = result.group;
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(result);
      return acc;
    }, {} as Record<number, SearchResult[]>);
  };

  const groupedInitialResults = groupResults(searchResults);
  const groupedApiResults = groupResults(apiSearchResults);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl bg-slate-900/95 border-slate-700 text-slate-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Find More Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Initial Search Results */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-300">Select Images for Analysis</h3>
            {Object.entries(groupedInitialResults).map(([group, results]) => (
              <div key={group} className="mb-4">
                <h4 className="text-md font-medium text-slate-400 mb-2">Group {group}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
                  {results.map((result, index) => (
                    <motion.div
                      key={index}
                      className={`relative cursor-pointer rounded-lg overflow-hidden ${
                        selectedImages.includes(result.imageUrl) ? "ring-2 ring-purple-500" : ""
                      }`}
                      onClick={() => handleImageSelect(result.imageUrl)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={result.imageUrl}
                        alt={`Result ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />
                      <div className={`absolute inset-0 bg-purple-500/20 transition-opacity ${
                        selectedImages.includes(result.imageUrl) ? "opacity-100" : "opacity-0"
                      }`} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSearch}
              disabled={selectedImages.length === 0 || isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                "Analyze Selected Images"
              )}
            </Button>
          </div>

          {/* API Search Results */}
          {apiSearchResults.length > 0 && (
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold text-slate-300">API Search Results</h3>
              {Object.entries(groupedApiResults).map(([group, results]) => (
                <div key={group} className="mb-4">
                  <h4 className="text-md font-medium text-slate-400 mb-2">Group {group}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
                    {results.map((result, index) => (
                      <motion.div
                        key={index}
                        className="relative rounded-lg overflow-hidden"
                      >
                        <img
                          src={result.imageUrl}
                          alt={`API Result ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-white text-xs">
                          Source: {result.sourceUrl}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* GPT Result */}
          {gptResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 mt-6"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {gptResult["Full Name"]}
                </h3>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-300">Topics of Interest</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {gptResult.Topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-300">Additional Information</h4>
                  <p className="text-slate-300">{gptResult["More Information"]}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-300">Analysis Score</h4>
                  <p className="text-purple-400 font-semibold">{gptResult["Confidential Analysis Score"]}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-300">Generated Poem</h4>
                  <p className="text-slate-300 whitespace-pre-line italic">{gptResult["Poem"]}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}