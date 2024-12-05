"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SearchResult } from "@/types/search";

interface SearchResultsProps {
  results: SearchResult[];
  onSelectResult: (imageUrl: string, sourceUrl: string) => void;
}

export function SearchResults({ results, onSelectResult }: SearchResultsProps) {
  const groups = [...new Set(results.map((result) => result.group))].sort(
    (a, b) => a - b
  );

  return (
    <motion.div
      className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-min"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {groups.map((groupNumber) => {
        const groupResults = results.filter(
          (result) => result.group === groupNumber
        );

        return (
          <motion.div
            key={groupNumber}
            className="bg-slate-900/40 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-slate-200">
              Group {groupNumber}
            </h3>
            <div className="grid gap-4">
              {groupResults.map((result, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => onSelectResult(result.imageUrl, result.sourceUrl)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900/50">
                    <Image
                      src={result.imageUrl}
                      alt={`Result ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="mt-2">
                    <a
                      href={result.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors truncate block"
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
    </motion.div>
  );
}