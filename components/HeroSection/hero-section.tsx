"use client";

import { useState, useRef } from "react";
import { Shield, Search, Upload, PlayCircle, Apple } from "lucide-react";
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
    <section className="min-h-full bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-6 py-24 text-center relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-violet-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
              <Balancer>
                Advanced Facial Recognition
                <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Made Simple & Secure
                </span>
              </Balancer>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Upload an image to instantly search and find similar faces across
              our secure database. Enterprise-grade facial recognition, now
              accessible to everyone.
            </p>
          </motion.div>

          {/* Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-row items-center justify-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.facesearch.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/google-badge.svg"
                  alt="App Store"
                  width={100}
                  height={100}
                  className="w-40"
                />
              </a>
              <a href="#">
                <Image
                  src="/apple-badge.svg"
                  alt="App Store"
                  width={100}
                  height={100}
                  className="w-40"
                />
              </a>
            </div>
          </motion.div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                max-w-3xl mx-auto p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer
                ${
                  isDragging
                    ? "border-indigo-400 bg-indigo-50/50"
                    : "border-slate-200 bg-white/50 hover:border-indigo-200 hover:bg-slate-50/50"
                }
                backdrop-blur-sm shadow-lg
              `}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-indigo-50">
                  <Upload className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Drop your image here or
                    <span
                      onClick={() => fileInputRef.current?.click()}
                      className="text-indigo-600 hover:text-indigo-700 mx-2"
                    >
                      browse
                    </span>
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
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
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600">
                  End-to-end encrypted
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-600" />
                <span className="text-sm text-slate-600">
                  99.9% accuracy rate
                </span>
              </div>
            </div>
          </motion.div>

          {/* Features Cards */}
          <div className="hidden lg:flex justify-center gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="w-[280px] bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-slate-200/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 text-indigo-600 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-slate-900 text-center">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Features Stack */}
          <div className="lg:hidden">
            <div className="md:grid md:grid-cols-2 md:gap-6 space-y-4 md:space-y-0">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-slate-200/50"
                >
                  <div className="mb-4 text-indigo-600 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-slate-900 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm text-center">
                    {feature.description}
                  </p>
                </div>
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
