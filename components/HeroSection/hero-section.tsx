"use client";

import { useState, useRef } from "react";
import { Shield, Search, Upload } from "lucide-react";
import ImageUpload from "@/components/HeroSection/upload/image-upload";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { features } from "@/lib/data/data";
import { useDispatch } from "react-redux";
import { setUploadedImage } from "@/lib/redux/slices/uploadedImageSlice";
import Image from "next/image";

const HeroSection = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(setUploadedImage(e.target?.result as string));
        setDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <section className="relative min-h-full bg-light-background dark:bg-dark-background overflow-hidden">
      <div className="container mx-auto px-6 py-24 text-center relative">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-light-primary dark:text-dark-primary font-medium mb-4"
          >
            WELCOME
          </motion.p>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold tracking-tight text-light-foreground dark:text-dark-foreground sm:text-6xl mb-6">
              <Balancer>
                Advanced Facial Recognition
                <span className="block mt-2 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent bg-clip-text text-transparent">
                  Made Simple & Secure
                </span>
              </Balancer>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-light-muted-foreground dark:text-dark-muted-foreground">
              Upload an image to instantly search and find similar faces across
              our secure database. Enterprise-grade facial recognition, now
              accessible to everyone.
            </p>
          </motion.div>

          {/* Download Buttons */}
          <div className="mt-4">
            <div className="flex flex-row items-center justify-center gap-8">
              <a
                href="https://play.google.com/store/apps/details?id=com.facesearch.app"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="/google-badge.svg"
                  alt="Google Play Store"
                  width={100}
                  height={100}
                  className="h-[120px] w-[120px]"
                />
              </a>
              <a href="#" className="transition-transform hover:scale-105">
                <Image
                  src="/apple-badge.svg"
                  alt="Apple App Store"
                  width={100}
                  height={100}
                  className="h-[120px] w-[120px]"
                />
              </a>
            </div>
          </div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 mb-16"
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                max-w-3xl mx-auto p-8 rounded-[20px] transition-all cursor-pointer relative
                ${
                  isDragging
                    ? "bg-white dark:bg-[rgba(32,45,72,0.9)] border-light-primary dark:border-indigo-500"
                    : "bg-white/80 hover:bg-white dark:bg-[rgba(32,45,72,0.4)] dark:hover:bg-[rgba(32,45,72,0.6)]"
                }
                border border-light-border dark:border-[rgba(255,255,255,0.1)]
                shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]
                dark:backdrop-blur-[20px]
              `}
            >
              {/* Gradient glow effect - only in dark mode */}
              <div className="absolute -z-10 inset-0 hidden dark:block">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-[20px]" />
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-light-primary/10 dark:bg-gradient-to-br dark:from-indigo-500/10 dark:to-purple-500/10 dark:backdrop-blur-sm dark:border dark:border-indigo-500/20">
                  <Upload className="w-8 h-8 text-light-primary dark:text-indigo-400" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-light-foreground dark:text-white">
                    Drop your image here or
                    <span className="text-light-primary hover:text-light-primary/90 dark:text-indigo-400 dark:hover:text-indigo-300 mx-2 cursor-pointer">
                      browse
                    </span>
                  </h3>
                  <p className="text-sm text-light-muted-foreground dark:text-slate-400 mt-1">
                    Supports JPG, PNG, WEBP up to 10MB
                  </p>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-[rgba(32,45,72,0.4)] backdrop-blur-sm dark:backdrop-blur-[20px] px-4 py-2 rounded-full border border-light-border dark:border-[rgba(255,255,255,0.1)]">
                <Shield className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span className="text-sm text-light-muted-foreground dark:text-slate-300">
                  End-to-end encrypted
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-[rgba(32,45,72,0.4)] backdrop-blur-sm dark:backdrop-blur-[20px] px-4 py-2 rounded-full border border-light-border dark:border-[rgba(255,255,255,0.1)]">
                <Search className="w-5 h-5 text-light-primary dark:text-indigo-400" />
                <span className="text-sm text-light-muted-foreground dark:text-slate-300">
                  99.9% accuracy rate
                </span>
              </div>
            </div>
          </motion.div>

          {/* Features Cards */}
          <div className="hidden lg:flex justify-center gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-[280px] bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-light-border dark:border-dark-border hover:border-light-primary/50 dark:hover:border-dark-primary/50 transition-all duration-300"
              >
                <div className="mb-4 text-light-primary dark:text-dark-primary flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-light-foreground dark:text-dark-foreground text-center">
                  {feature.title}
                </h3>
                <p className="text-light-muted-foreground dark:text-dark-muted-foreground text-sm text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Features Stack */}
          <div className="lg:hidden">
            <div className="md:grid md:grid-cols-2 md:gap-6 space-y-4 md:space-y-0">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-light-border dark:border-dark-border"
                >
                  <div className="mb-4 text-light-primary dark:text-dark-primary flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-light-foreground dark:text-dark-foreground text-center">
                    {feature.title}
                  </h3>
                  <p className="text-light-muted-foreground dark:text-dark-muted-foreground text-sm text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImageUpload open={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </section>
  );
};

export default HeroSection;
