"use client";

import { Upload as UploadIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onDrop: (file: File) => void;
  dragActive: boolean;
  setDragActive: (active: boolean) => void;
}

export function DropZone({ onDrop, dragActive, setDragActive }: DropZoneProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onDrop(file);
    }
  };

  return (
    <div
      className="relative h-64"
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <motion.div
        className={cn(
          "h-full border-2 border-dashed rounded-xl transition-all duration-300",
          dragActive
            ? "border-blue-500 bg-blue-500/10"
            : "border-slate-700/50 hover:border-slate-600/50"
        )}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center h-full cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <UploadIcon className="h-12 w-12 mb-4 text-slate-600" />
          </motion.div>
          <motion.span
            className="text-lg font-medium text-teal-950 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Drag and drop your image here
          </motion.span>
          <motion.span
            className="text-sm text-slate-400 mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Supports: JPG, PNG, GIF (max 5MB)
          </motion.span>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onDrop(file);
            }
          }}
          className="hidden"
        />
      </motion.div>
    </div>
  );
}