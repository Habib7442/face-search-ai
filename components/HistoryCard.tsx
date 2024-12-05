"use client";

import { HistoryResult } from "@/types/types";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface HistoryCardProps {
  result: HistoryResult;
}

export function HistoryCard({ result }: HistoryCardProps) {
  return (
    <Card className="overflow-hidden bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
      <div className="relative aspect-video">
        <Image
          src={result.imageUrl}
          alt="Search result"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={result.adultContent ? "destructive" : "secondary"}>
            Group {result.group}
          </Badge>
          <a
            href={result.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            Source
          </a>
        </div>
      </div>
    </Card>
  );
}