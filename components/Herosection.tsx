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

const Herosection = () => {
  const { userId } = useAuth();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen opacity-30 rotate-45"
          fill="purple"
        />
        <Spotlight
          className=" -right-1/4 md:-right-1/3 h-screen opacity-20 -rotate-45"
          fill="white"
        />
      </div>

      {/* <div className="relative w-full bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 h-screen flex justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-slate-900/20 to-cyan-900/10 animate-gradient-x" />

        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="montserrat-landing text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 drop-shadow-lg"
          >
            Welcome to FaceSearch AI
          </motion.h1>
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-cyan-300 to-slate-400 font-medium"
          >
            Experience AI-Powered Face Matching Like Never Before
          </motion.h2>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-800/50 p-4 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-6 h-6 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="ml-2 text-white font-medium">5.0</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-slate-600" />
              <div className="flex items-center text-white">
                <Download className="w-5 h-5 mr-2" />
                <span className="font-medium">
                  1K+ Downloads on Playstore & Appstore
                </span>
              </div>
            </div>

            <Link href={userId ? "/upload" : "/sign-in"}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-700 text-cyan-300 font-semibold px-8 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  {userId ? "Explore" : "Get Started"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div> */}
      <div className="relative min-h-screen bg-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black to-transparent" />
        </div>

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

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium"
            >
              Our Pricing
            </motion.button> */}
              <Link href={userId ? "/upload" : "/sign-in"}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-700 text-cyan-300 font-semibold px-8 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 
      shadow-[0_0_15px_rgba(0,255,255,0.7),0_0_30px_rgba(0,255,255,0.5)] hover:shadow-[0_0_20px_rgba(0,255,255,1),0_0_40px_rgba(0,255,255,0.8)]"
                  >
                    {userId ? "Explore" : "Get Started"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </div>
            {/* className="w-8 h-8 rounded-full bg-gray-800 border-2 border-black" */}
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
