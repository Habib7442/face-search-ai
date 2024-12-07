"use client";

import { useState, useCallback } from "react";
import { Upload as UploadIcon, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

interface UploadProps {
  onImageUpload: (imageUrl: string) => void;
}

export function Upload({ onImageUpload }: UploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"]
    },
    multiple: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer backdrop-blur-sm
          ${isDragging 
            ? "border-blue-500 bg-blue-500/10" 
            : "border-white/20 hover:border-white/40 hover:bg-white/5"
          }`}
      >
        <input {...getInputProps()} />
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <UploadIcon className="w-10 h-10 text-blue-400" />
        </motion.div>
        <h3 className="text-2xl font-semibold text-white mb-3">
          Drop your image here
        </h3>
        <p className="text-gray-400 mb-4">
          or click to select a file
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <ImageIcon className="w-4 h-4" />
          <span>Supports JPG, PNG</span>
        </div>
      </div>
    </motion.div>
  );
}