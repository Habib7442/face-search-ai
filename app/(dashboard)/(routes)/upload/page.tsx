"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Upload as UploadIcon, Loader2, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import type { SearchResult } from "@/types/search";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/redux";
import { selectAdultFilter, toggleAdultFilter } from "@/lib/redux/slices/adultFilterSlice";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageSourceUrl, setImageSourceUrl] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const dispatch = useDispatch();
  const adultContentFilter = useAppSelector(selectAdultFilter);

  const handleImageUpload = useCallback(async (file: File, filterEnabled: boolean) => {
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
  }, []);

  // Effect to handle image upload when filter changes
  useEffect(() => {
    if (selectedImage) {
      handleImageUpload(selectedImage, adultContentFilter);
    }
  }, [adultContentFilter, selectedImage, handleImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    }
  }, []);

  const renderGroupResults = useCallback(() => {
    const groups = [...new Set(searchResults.map((result) => result.group))].sort(
      (a, b) => a - b
    );

    return (
      <div className="space-y-6">
        {groups.map((groupNumber) => {
          const groupResults = searchResults.filter(
            (result) => result.group === groupNumber
          );

          return (
            <motion.div
              key={groupNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 hover:bg-slate-800 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-slate-200">
                Group {groupNumber}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setResultImage(result.imageUrl);
                      setImageSourceUrl(result.sourceUrl);
                    }}
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-900/50">
                      <Image
                        src={result.imageUrl}
                        alt={`Result ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="mt-2 text-sm text-slate-400">
                      <a
                        href={result.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors truncate block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {result.sourceUrl}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }, [searchResults]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-slate-200 py-6 px-4 md:py-10 md:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700/50">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300">
            Image Search & Analysis
          </h1>

          <div className="flex justify-end mb-6">
            <label className="flex items-center gap-3 bg-slate-700/50 px-4 py-2 rounded-lg cursor-pointer">
              <span className="text-sm font-medium text-slate-300">
                Adult Content Filter
              </span>
              <input
                type="checkbox"
                checked={adultContentFilter}
                onChange={() => dispatch(toggleAdultFilter())}
                className="w-5 h-5 rounded border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800"
              />
            </label>
          </div>

          <div
            className={`relative mb-8 ${!selectedImage ? "h-64" : "h-auto"}`}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {!selectedImage ? (
              <div
                className={`h-full border-2 border-dashed rounded-xl transition-all duration-300 ${
                  dragActive
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center h-full cursor-pointer"
                >
                  <UploadIcon className="h-12 w-12 mb-4 text-slate-400" />
                  <span className="text-lg font-medium text-slate-300 text-center">
                    Drag and drop your image here
                  </span>
                  <span className="text-sm text-slate-400 mt-2">
                    Supports: JPG, PNG, GIF (max 5MB)
                  </span>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedImage(file);
                    }
                  }}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => handleImageUpload(selectedImage, adultContentFilter)}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  Search Image
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {(selectedImage || resultImage) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="grid md:grid-cols-2 gap-8 mb-8"
              >
                {selectedImage && (
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                    <h2 className="text-xl font-semibold mb-4 text-slate-300">
                      Uploaded Image
                    </h2>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={URL.createObjectURL(selectedImage)}
                        alt="Uploaded preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {isLoading ? (
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  </div>
                ) : (
                  resultImage && (
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                      <h2 className="text-xl font-semibold mb-4 text-slate-300">
                        Selected Result
                      </h2>
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={resultImage}
                          alt="Result preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      {imageSourceUrl && (
                        <p className="mt-4 text-sm text-slate-400 break-words">
                          Source:{" "}
                          <a
                            href={imageSourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            {imageSourceUrl}
                          </a>
                        </p>
                      )}
                    </div>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {searchResults.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-slate-200">
                Search Results
              </h2>
              <div className="overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
                {renderGroupResults()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload