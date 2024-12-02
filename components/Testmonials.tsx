"use client"
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  message: string;
  user_image_url: string;
  created_at: string;
}

export default function TestimonialsDisplay() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((starValue) => (
      <Star
        key={starValue}
        className={`h-5 w-5 ${
          starValue <= rating 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px] bg-gray-900 text-white">
        <p className="text-xl animate-pulse">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            What Our Users Say
          </h2>
          <Link href="/">
            <Button variant="outline" className="bg-transparent text-white border-gray-700 hover:bg-gray-800">
              Back to Home
            </Button>
          </Link>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-16">
            No testimonials yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.user_image_url || "/default-avatar.png"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic mb-4">
                  {testimonial.message}
                </p>
                <p className="text-sm text-gray-500 text-right">
                  {new Date(testimonial.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const ViewReviews = () => {
  return (
    <Link href="/">
      <Button variant="outline" className="bg-transparent text-white border-gray-700 hover:bg-gray-800">
        Back to Home
      </Button>
    </Link>
  );
};