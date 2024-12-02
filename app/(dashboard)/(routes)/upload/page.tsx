"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { Upload as UploadIcon,  Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner"
import { UserCredits } from "@/types/database";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);


  useEffect(() => {
    checkCredits();
  }, []);

  const checkCredits = async () => {
    try {
      const response = await fetch('/api/credits/check');
      const data = await response.json();
      setUserCredits(data);
    } catch (error) {
      console.error('Error checking credits:', error);
      toast.error('Failed to check credits');
    }
  };

  // const handleUpgradeClick = async () => {
  //   try {
  //     const response = await fetch('/api/create-checkout-session', {
  //       method: 'POST',
  //     });
  //     const data = await response.json();
  //     if (data.url) {
  //       window.location.href = data.url;
  //     }
  //   } catch (error) {
  //     console.error('Error creating checkout session:', error);
  //     toast.error('Failed to start checkout process');
  //   }
  // };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check credits
    if (!userCredits?.is_unlimited && userCredits?.credits_remaining === 0) {
      toast.error('No credits remaining. Please upgrade to continue.');
      return;
    }

    try {
      setIsLoading(true);
      setSelectedImage(file);

      // Use a credit
      const response = await fetch('/api/credits/use', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to use credit');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResultImage("/dummy.jpg");
      
      // Refresh credits
      await checkCredits();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to process image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setIsLoading(true);
      setSelectedImage(file);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResultImage("/dummy.jpg");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-slate-200 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto lg:p-4 md:p-4">
         {/* Credits Display */}
          {/* <div className="mb-8 flex justify-between items-center bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-4">
            <div className="text-lg">
              {userCredits?.is_unlimited ? (
                <span className="text-green-400">Unlimited Credits</span>
              ) : (
                <span>Credits Remaining: <span className="font-bold text-blue-400">{userCredits?.credits_remaining || 0}</span></span>
              )}
            </div>
          </div>
          {userCredits?.credits_remaining === 0 && (
            <Link href="/payment">
            <Button
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Upgrade
            </Button>
            </Link>
          )}
        </div> */}
        {/* Top Navigation */}
        {/* <div className="flex justify-between items-center mb-12">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <SignOutButton>
            <Button
              className="bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white transition-all duration-300"
            >
              Sign Out
            </Button>
          </SignOutButton>
        </div> */}

        {/* Main Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-700/50">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300">
            Image Upload & Analysis
          </h1>

          {/* Upload Area */}
          <div
            className={`relative mb-8 ${
              !selectedImage ? 'h-64' : 'h-auto'
            }`}
            onDragEnter={handleDrag}
          >
            {!selectedImage && (
              <div
                className={`h-full border-2 border-dashed rounded-xl transition-all duration-300 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center h-full cursor-pointer"
                >
                  <UploadIcon className="h-12 w-12 mb-4 text-slate-400" />
                  <span className="text-lg font-medium text-slate-300">
                    Drag and drop your image here or click to browse
                  </span>
                  <span className="text-sm text-slate-400 mt-2">
                    Supports: JPG, PNG, GIF (max 5MB)
                  </span>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Images Display */}
          <AnimatePresence>
            {(selectedImage || resultImage) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* Uploaded Image */}
                {selectedImage && (
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                    <h2 className="text-xl font-semibold mb-4 text-slate-300">
                      Uploaded Image
                    </h2>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={URL.createObjectURL(selectedImage)}
                        alt="Uploaded preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Result Image */}
                {isLoading ? (
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  </div>
                ) : (
                  resultImage && (
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                      <h2 className="text-xl font-semibold mb-4 text-slate-300">
                        Result
                      </h2>
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={resultImage}
                          alt="Result preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Upload;