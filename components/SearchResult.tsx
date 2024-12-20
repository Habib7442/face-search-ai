"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { SearchResult } from "@/types/search";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSelectedImage,
  selectSelectedImages,
} from "@/lib/redux/slices/selectedImagesSlice";
import { cn } from "@/lib/utils";

interface SearchResultsProps {
  results: SearchResult[];
  onSelectResult: (imageUrl: string, sourceUrl: string) => void;
}

export function SearchResults({ results, onSelectResult }: SearchResultsProps) {
  const dispatch = useDispatch();
  const selectedImages = useSelector(selectSelectedImages);

  // Group results by group number
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.group]) {
      acc[result.group] = [];
    }
    acc[result.group].push(result);
    return acc;
  }, {} as Record<number, SearchResult[]>);

  // Sort group numbers
  const sortedGroups = Object.keys(groupedResults)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {sortedGroups.map((groupNumber) => (
        <motion.div
          key={groupNumber}
          className="space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <Badge
              variant="secondary"
              className={cn(
                "px-4 py-2 text-base font-medium rounded-full",
                "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40",
                "text-blue-700 dark:text-blue-300",
                "border border-blue-200/50 dark:border-blue-800/50"
              )}
            >
              Group {groupNumber}
            </Badge>
            <div className="h-[1px] bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 dark:to-transparent flex-grow" />
          </div>

          <div className="relative">
            <div className="flex overflow-x-auto pb-6 space-x-4 scrollbar-thin scrollbar-track-slate-200 dark:scrollbar-track-slate-800 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
              {groupedResults[groupNumber].map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="cursor-pointer group flex-shrink-0 w-80"
                  onClick={() => dispatch(toggleSelectedImage(result.imageUrl))}
                >
                  <Card
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      "bg-white dark:bg-slate-900",
                      "border border-slate-200 dark:border-slate-800",
                      "hover:border-blue-300 dark:hover:border-blue-700",
                      "group-hover:shadow-lg dark:group-hover:shadow-slate-900/50",
                      "relative",
                      selectedImages.includes(result.imageUrl) &&
                        "ring-2 ring-blue-500 dark:ring-blue-400"
                    )}
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={result.imageUrl}
                        alt={`Search result ${index + 1}`}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div
                        className={cn(
                          "absolute inset-0 transition-opacity duration-300",
                          "bg-gradient-to-t from-black/60 via-transparent to-transparent",
                          "opacity-0 group-hover:opacity-100"
                        )}
                      />
                      {selectedImages.includes(result.imageUrl) && (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute top-3 right-3 bg-blue-500 dark:bg-blue-400 text-white rounded-full p-2 shadow-lg"
                        >
                          <Check className="h-4 w-4" />
                        </motion.div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <a
                          href={result.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            "text-sm flex items-center gap-2 max-w-[90%] truncate",
                            "text-slate-600 dark:text-slate-400",
                            "hover:text-blue-600 dark:hover:text-blue-400",
                            "transition-colors duration-300"
                          )}
                        >
                          <ExternalLink className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{result.sourceUrl}</span>
                        </a>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "p-2 rounded-full",
                            "bg-slate-100 dark:bg-slate-800",
                            "hover:bg-blue-100 dark:hover:bg-blue-900",
                            "transition-colors duration-300"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add your info/details handler here
                          }}
                        >
                          <Info className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        </motion.button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
