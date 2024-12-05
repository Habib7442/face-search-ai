"use client";

import { useState, useCallback } from "react";
import { Loader2, Search, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/redux";
import {
  selectAdultFilter,
  toggleAdultFilter,
} from "@/lib/redux/slices/adultFilterSlice";
import type { SearchResult } from "@/types/search";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { DropZone } from "@/components/DropZone";
import { ImagePreview } from "@/components/ImagePreview";
import { InfoModal } from "@/components/InfoModal";
import { SearchResults } from "@/components/SearchResult";

export default function Upload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageSourceUrl, setImageSourceUrl] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const dispatch = useDispatch();
  const adultContentFilter = useAppSelector(selectAdultFilter);

  const handleImageUpload = async (file: File, filterEnabled: boolean) => {
    try {
      setIsLoading(true);
      setSearchResults([]);

      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });

      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64Image.split(",")[1],
          adultFilter: filterEnabled,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.results && Array.isArray(data.results)) {
        setSearchResults(data.results);
        setResultImage(data.results[0]?.imageUrl || null);
        setImageSourceUrl(data.results[0]?.sourceUrl || null);
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectResult = useCallback(
    (imageUrl: string, sourceUrl: string) => {
      setResultImage(imageUrl);
      setImageSourceUrl(sourceUrl);
    },
    []
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 text-slate-200 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <GlassCard className="p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            <motion.h1
              className="playfair-display-sc-regular text-center text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Image Search & Analysis
            </motion.h1>
            <motion.label
              className="flex items-center gap-3 bg-slate-800/50 px-6 py-3 rounded-xl cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-sm font-medium text-slate-300">
                Adult Content Filter
              </span>
              <input
                type="checkbox"
                checked={adultContentFilter}
                onChange={() => dispatch(toggleAdultFilter())}
                className="w-5 h-5 rounded border-slate-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-slate-800"
              />
            </motion.label>
          </div>

          <DropZone
            onDrop={(file) => setSelectedImage(file)}
            dragActive={dragActive}
            setDragActive={setDragActive}
          />

          <AnimatePresence mode="wait">
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 flex justify-center"
              >
                <Button
                  onClick={() =>
                    handleImageUpload(selectedImage, adultContentFilter)
                  }
                  disabled={isLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-xl text-lg transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Search className="h-5 w-5 mr-2" />
                  )}
                  {isLoading ? "Processing..." : "Search Image"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {(selectedImage || resultImage) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="grid md:grid-cols-2 gap-8 mt-8"
              >
                {selectedImage && (
                  <ImagePreview
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded preview"
                    title="Uploaded Image"
                  />
                )}

                {isLoading ? (
                  <GlassCard className="p-6 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                  </GlassCard>
                ) : (
                  resultImage && (
                    <ImagePreview
                      src={resultImage}
                      alt="Result preview"
                      title="Selected Result"
                      sourceUrl={imageSourceUrl || undefined}
                    />
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center ">
              <h2 className="text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Deep Search Results
              </h2>
            </div>
            <SearchResults
              results={searchResults}
              onSelectResult={handleSelectResult}
            />
            <div className="w-full flex justify-center items-center">
              <Button
                onClick={() => setIsInfoModalOpen(true)}
                className="bg-teal-800 hover:bg-slate-700 text-white"
              >
                <Info className="h-4 w-4 mr-2" />
                Find More Info
              </Button>
            </div>
          </motion.div>
        )}

        <InfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          searchResults={searchResults}
          onSelectResult={handleSelectResult}
        />
      </div>
    </div>
  );
}
