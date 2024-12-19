"use client";

import Image from "next/image";
import TestimonialForm from "@/components/TestimonialForm";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const Reviews = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-white/50 py-8 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-violet-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-xl bg-indigo-100/50 backdrop-blur-sm">
              <MessageSquare className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Share Your Experience
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your feedback helps us improve and serves as inspiration for others.
            Tell us about your journey with FaceSearch AI.
          </p>
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
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl -z-10" />
              <Image
                src="/reviews.jpg"
                alt="Reviews Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Features or Benefits */}
            <div className="mt-8 space-y-4 max-w-lg mx-auto">
              {[
                "Help us improve our services",
                "Share your success stories",
                "Guide other users with your experience",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <div className="h-2 w-2 rounded-full bg-indigo-600" />
                  <span>{item}</span>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8">
              <TestimonialForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;