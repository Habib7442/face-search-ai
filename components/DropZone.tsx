"use client";

import { Upload as UploadIcon, FileImage, FileUp } from "lucide-react";
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
      className="relative h-80"
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <motion.div
        className={cn(
          "h-full rounded-2xl transition-all duration-300 backdrop-blur-sm",
          "border-2 border-dashed",
          dragActive
            ? "border-blue-500 dark:border-blue-400 bg-blue-500/10 dark:bg-blue-400/10"
            : "border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800",
          "bg-white/50 dark:bg-slate-800/50",
          "shadow-lg hover:shadow-xl"
        )}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center h-full cursor-pointer p-6"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "p-4 rounded-full",
              "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40",
              "shadow-lg"
            )}
          >
            <UploadIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </motion.div>

          <motion.div
            className="mt-6 space-y-2 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Drop your image here
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              or click to browse files
            </p>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-col items-center gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <FileImage className="h-4 w-4" />
              <span>Supports: JPG, PNG, GIF</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <FileUp className="h-4 w-4" />
              <span>Max file size: 5MB</span>
            </div>
          </motion.div>

          {dragActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 dark:from-blue-400/20 dark:to-indigo-400/20 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white/90 dark:bg-slate-800/90 p-4 rounded-xl shadow-lg">
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  Release to upload
                </p>
              </div>
            </motion.div>
          )}
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