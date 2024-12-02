"use client";

import Image from "next/image";
import TestimonialForm from "@/components/TestimonialForm";

const Reviews = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Side - Image Section */}
        <div className="relative hidden md:block">
          <Image
            src="/api/placeholder/600/900"
            alt="Testimonial Background"
            layout="fill"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Share Your Experience
              </h1>
              <p className="text-lg text-neutral-200">
                Your feedback helps us improve and serves as inspiration for
                others.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Testimonial Form */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <TestimonialForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
