"use client";

import Image from "next/image";
import TestimonialForm from "@/components/TestimonialForm";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const Reviews = () => {
  return (
    <div className="min-h-screen bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-100/50 dark:border-slate-800/50 py-8 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="flex justify-center">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 shadow-lg">
              <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Share Your Experience
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Your feedback helps us improve and serves as inspiration for
              others. Tell us about your journey with FaceSearch AI.
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="w-full grid lg:grid-cols-2 gap-12">
          {/* Left Side - Illustration and Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl -z-10" />
              <Image
                src="/reviews.jpg"
                alt="Reviews Illustration"
                fill
                className="object-contain p-8"
                priority
              />
            </div>

            {/* Features List */}
            <div className="mt-12 space-y-6 max-w-lg mx-auto">
              {[
                {
                  title: "Help us improve",
                  description: "Your feedback shapes our future updates",
                },
                {
                  title: "Share success stories",
                  description: "Inspire others with your achievements",
                },
                {
                  title: "Guide the community",
                  description: "Help others make the most of FaceSearch AI",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300"
                >
                  <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400" />
                  <div className="space-y-1">
                    <h3 className="font-medium text-slate-900 dark:text-slate-200">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Testimonial Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-xl mx-auto"
          >
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6 md:p-8">
              <TestimonialForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
