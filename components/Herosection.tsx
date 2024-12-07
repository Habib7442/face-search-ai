"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Spotlight } from "./ui/Spotlight";
import testImages from "@/lib/images";
import Image from "next/image";
import Playstore from "@/public/playstore.png";
import { Upload } from "./ui/upload";
import { ScanningAnimation } from "./ui/scanning-animation";
import { Results } from "./Results";
import { useState } from "react";

const Herosection = () => {
  const { userId } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };


  return (
    <div className="relative overflow-hidden">
    <div className="absolute hidden lg:block xl:block inset-0 pointer-events-none">
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen opacity-30 rotate-45"
        fill="purple"
      />
      <Spotlight
        className="-right-1/4 md:-right-1/3 h-screen opacity-20 -rotate-45"
        fill="white"
      />
    </div>

    <div className="relative min-h-screen overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm text-gray-300">
              100% Premium Face Search Services
            </span>
          </div>

          <h1 className="montserrat-landing text-4xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Face Search Made Flexible,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Use Credits, Unlock Potential
            </span>
          </h1>

          <p className="playfair-landing text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            FaceSearchAI delivers premium facial recognition services within
            budget constraints, ensuring accessibility for everyone.
          </p>

          {!uploadedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <Upload onImageUpload={handleImageUpload} />
            </motion.div>
          )}

          {uploadedImage && (isScanning || scanComplete) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto mb-12 bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10"
            >
              {isScanning && (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-[100px] rounded-lg"
                  />
                  <ScanningAnimation />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 rounded-b-lg backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Analyzing face...</span>
                      <span className="text-sm">{scanProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {scanComplete && <Results imageUrl={uploadedImage} />}
            </motion.div>
          )}

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex -space-x-2">
              {testImages.map((data) => (
                <div
                  key={data.id}
                  className="w-8 h-8 rounded-full bg-gray-800 border-2 border-black overflow-hidden"
                >
                  <Image
                    width={100}
                    height={100}
                    src={data.image}
                    alt="test-images"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            </div>
            <span className="text-sm text-gray-300 flex justify-center items-center gap-5">
              <Link href="https://play.google.com/store/apps/details?id=com.facesearch.app&hl=en_IN">
                <Image
                  src={Playstore}
                  width={100}
                  height={100}
                  className="w-8 h-8 rounded-full cursor-pointer"
                  alt="playstore-icon"
                />
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
  );
};

export default Herosection;
