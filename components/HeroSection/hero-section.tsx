"use client";

import { useState, useRef } from "react";
import { ImageIcon, Star } from "lucide-react";
import ImageUpload from "@/components/HeroSection/upload/image-upload";
import Image from "next/image";

import { motion } from "framer-motion";
import Navbar from "../navigation/Navbar";
import Balancer from "react-wrap-balancer";
import imageData from "@/lib/images";
import { features } from "@/lib/data/data";
import { useDispatch } from "react-redux";
import { setUploadedImage } from "@/lib/redux/slices/uploadedImageSlice";

const HeroSection = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleDirectUpload = () => {
    // Programmatically click the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Read the file and convert to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        // Dispatch the uploaded image to Redux
        dispatch(setUploadedImage(e.target?.result as string));
        
        // Open the dialog
        setDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <section className="text-gray-800">
      {/* <div className="lg:px-28 lg:py-3">
        <Navbar />
      </div> */}

      <div className="container mx-auto px-6 py-16 text-center">
        {/* Hero Heading with animation */}
        <motion.h1
          className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
        >
          <Balancer>
            Face Search Made{" "}
            <span className="relative text-primary drop-shadow-xl">
              Flexible
              <span className="absolute bottom-[-2px] left-0 h-2 w-full bg-purple-400" />
            </span>{" "}
            <br className="lg:block hidden" />
            Use Credits, Unlock Potential
          </Balancer>
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          FaceSearch AI delivers premium facial recognition services within
          budget constraints, ensuring accessibility for everyone.
        </p>

        {/* Call-to-Action */}
        <div className="mt-8 w-full flex justify-center items-center">
          <button
            onClick={handleDirectUpload}
            className="px-8 py-3 bg-primary hover:primary-hover text-white font-bold rounded-lg shadow-md hover:from-[#818cf8] hover:to-[#a5b4fc] hover:shadow-lg transition duration-300 ease-in-out flex items-center drop-shadow-xl"
          >
            Upload Image
            <ImageIcon className="ml-2 text-accent-foreground" />
          </button>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="flex -space-x-2">
            {imageData.testImages.map((data) => (
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
          <span className="text-sm text-gray-300 flex justify-center items-center gap-5"></span>
        </div>

        {/* Info Boxes */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className={`${feature.bgColor} p-6 rounded-lg shadow flex flex-col items-center text-center`}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 50 }}
            >
              {feature.icon}
              <h3 className="text-md font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DialogModal */}
      <ImageUpload open={isDialogOpen} onClose={handleDialogClose} />
    </section>
  );
};

export default HeroSection;