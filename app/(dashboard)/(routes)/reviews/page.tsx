"use client";

import TestimonialForm from "@/components/TestimonialForm";

const Reviews = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full bg-secondary max-w-5xl grid lg:grid-cols-2 gap-8  rounded-2xl overflow-hidden shadow-md">
        <div className="relative hidden lg:block xl:block ">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-4xl font-bold mb-4 text-primary">
                Share Your Experience
              </h1>
              <p className="text-lg text-black">
                Your feedback helps us improve and serves as inspiration for
                others.
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
