"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SearchResult } from "@/types/search";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface SearchResultsProps {
  results: SearchResult[];
  onSelectResult: (imageUrl: string, sourceUrl: string) => void;
}

export function SearchResults({ results, onSelectResult }: SearchResultsProps) {
  return (
    <motion.div
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {results.map((result, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => onSelectResult(result.imageUrl, result.sourceUrl)}
          className="cursor-pointer group"
        >
          <Card className="overflow-hidden bg-gray-900 border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg">
            <div className="relative aspect-video">
              <Image
                src={result.imageUrl}
                alt={`Search result ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">
                  Group {result.group}
                </Badge>
                <a
                  href={result.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                  Source
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}