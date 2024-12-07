"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScanningAnimation } from "./scanning-animation";
import { ProgressIndicator } from "./progress-indicator";
import Image from "next/image";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export const UploadDialog = ({ open, onClose }: UploadDialogProps) => {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      // Save uploaded image to local storage
      if (uploadedImage) {
        localStorage.setItem("uploadedImage", uploadedImage);
      }

      setTimeout(() => {
        router.push("/upload");
      }, 500);
    }
  }, [progress, router, uploadedImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setIsUploading(true);
        simulateProgress();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gradient-to-b from-[#ccf4e6] to-white rounded-lg shadow-xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Upload & Process Image
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Section */}
            <div className="space-y-4">
              <label
                htmlFor="image-upload"
                className="relative group cursor-pointer"
              >
                <motion.div
                  className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden group-hover:border-blue-500 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {!uploadedImage ? (
                    <div className="text-center p-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400 mb-4"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-gray-500">
                          Drop your image here or{" "}
                          <span className="text-blue-600 font-medium">
                            browse
                          </span>
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Supports JPG, PNG files
                        </p>
                      </motion.div>
                    </div>
                  ) : (
                    <motion.img
                      src={uploadedImage}
                      alt="Preview"
                      className="h-full w-full object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Preview & Scanning Section */}
            <AnimatePresence>
              {!uploadedImage && (
                <div className="relative h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                  <p className="text-gray-500">
                    Uploaded {""}
                    <span className="text-blue-600 font-medium">Image</span>
                  </p>
                </div>
              )}
              {uploadedImage && (
                <motion.div
                  className="relative h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Image
                    src={uploadedImage}
                    width={100}
                    height={100}
                    alt="Processing Preview"
                    className="h-full w-full object-contain"
                  />
                  {isUploading && <ScanningAnimation />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Section */}
          <AnimatePresence>
            {isUploading && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressIndicator progress={progress} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};
