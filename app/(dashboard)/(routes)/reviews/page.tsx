"use client";
import Image from "next/image";
import TestimonialForm from "@/components/TestimonialForm";

const Reviews = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 rounded-2xl overflow-hidden">
        {/* Left Side - Illustration and Text */}
        <div className="relative hidden lg:block xl:block h-full">
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[300px] mb-6">
              <Image
                src="/reviews.jpg"
                alt="Reviews Illustration"
                fill
                className="object-contain rounded-md"
                priority
              />
            </div>
            <div className="text-center p-6">
              <h1 className="text-4xl font-bold mb-4 text-primary">
                Share Your Experience
              </h1>
              <p className="text-lg text-gray-600">
                Your feedback helps us improve and serves as inspiration for others.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Testimonial Form */}
        <div className="flex items-center justify-center p-2 md:p-12">
          <div className="w-full max-w-md">
            <TestimonialForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;