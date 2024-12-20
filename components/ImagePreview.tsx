"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";

interface ImagePreviewProps {
  src: string;
  alt: string;
  title: string;
  sourceUrl?: string;
}

export function ImagePreview({ src, alt, title, sourceUrl }: ImagePreviewProps) {
  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">{title}</h2>
      <motion.div
        className="relative aspect-square rounded-lg overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
      {sourceUrl && (
        <motion.p
          className="mt-4 text-sm text-slate-400 break-words"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Source:{" "}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            {sourceUrl}
          </a>
        </motion.p>
      )}
    </GlassCard>
  );
}