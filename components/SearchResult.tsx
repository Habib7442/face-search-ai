"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { SearchResult } from "@/types/search";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectedImage, selectSelectedImages } from '@/lib/redux/slices/selectedImagesSlice';

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
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {sortedGroups.map((groupNumber) => (
        <div key={groupNumber} className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-base">
              Group {groupNumber}
            </Badge>
            <div className="h-[1px] bg-gray-700 flex-grow" />
          </div>
          
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700">
            {groupedResults[groupNumber].map((result, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer group flex-shrink-0 w-72"
                onClick={() => dispatch(toggleSelectedImage(result.imageUrl))}
              >
                <Card className={`overflow-hidden bg-gray-900 border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg relative ${
                  selectedImages.includes(result.imageUrl) ? 'ring-2 ring-[#007BFF]' : ''
                }`}>
                  <div className="relative aspect-video">
                    <Image
                      src={result.imageUrl}
                      alt={`Search result ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {selectedImages.includes(result.imageUrl) && (
                      <div className="absolute top-2 right-2 bg-[#007BFF] text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <a
                        href={result.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                        {result.sourceUrl}
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}