"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Search,
  Cpu,
  PhoneCall,
  ImageIcon,
  Star,
} from "lucide-react";
import ImageUpload from "@/components/HeroSection/upload/image-upload";
import Image from "next/image";

import { motion } from "framer-motion";
import Navbar from "../navigation/Navbar";
import Balancer from "react-wrap-balancer";
import imageData from "@/lib/images";

const HeroSection = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogToggle = () => setDialogOpen((prev) => !prev);
  

  return (
    <section className="text-gray-800">
      <div className="lg:px-28 lg:py-3">
        <Navbar />
      </div>

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
            <span className="relative text-blue-600 drop-shadow-xl">
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
            onClick={handleDialogToggle}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg shadow-md hover:from-[#818cf8] hover:to-[#a5b4fc] hover:shadow-lg transition duration-300 ease-in-out flex items-center drop-shadow-xl"
          >
            Upload Image
            <ImageIcon className="ml-2 text-slate-800 drop-shadow-lg" />
          </button>
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
          {/* Box 1 */}
          <motion.div
            className="bg-purple-100 p-6 rounded-lg shadow flex flex-col items-center text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
          >
            <Cpu className="text-purple-600 w-12 h-12 mb-4" />
            <h3 className="text-lg font-bold mb-2">
              Advanced Face Recognition
            </h3>
            <p className="text-sm text-gray-600">
              State-of-the-art AI algorithms that can identify faces from images
              or videos with exceptional accuracy.
            </p>
          </motion.div>

          {/* Box 2 */}
          <motion.div
            className="bg-blue-100 p-6 rounded-lg shadow flex flex-col items-center text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
          >
            <Search className="text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-lg font-bold mb-2">Web-Wide Search</h3>
            <p className="text-sm text-gray-600">
              Comprehensive search across the entire web to find matching faces
              and their associated information.
            </p>
          </motion.div>

          {/* Box 3 */}
          <motion.div
            className="bg-green-100 p-6 rounded-lg shadow flex flex-col items-center text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
          >
            <ShieldCheck className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-lg font-bold mb-2">Secure & Reliable</h3>
            <p className="text-sm text-gray-600">
              Enterprise-grade security measures to protect user data and ensure
              reliable search results.
            </p>
          </motion.div>

          {/* Box 4 */}
          <motion.div
            className="bg-yellow-100 p-6 rounded-lg shadow flex flex-col items-center text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
          >
            <PhoneCall className="text-yellow-600 w-12 h-12 mb-4" />
            <h3 className="text-lg font-bold mb-2">Contact Discovery</h3>
            <p className="text-sm text-gray-600">
              Advanced contact information retrieval system to find email
              addresses and phone numbers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* DialogModal */}
      <ImageUpload open={isDialogOpen} onClose={handleDialogToggle} />
    </section>
  );
};

export default HeroSection;
