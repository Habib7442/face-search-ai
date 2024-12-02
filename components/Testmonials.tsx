"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Star } from "lucide-react";
import Image from "next/image";

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
        className={
          starValue <= rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }
        size={20}
      />
    ));
  };

  if (isLoading) {
    return <div>Loading testimonials...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Users Say
      </h2>

      {testimonials.length === 0 ? (
        <p className="text-center text-gray-500">
          No testimonials yet. Be the first to share your experience!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.user_image_url}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
              <p className="text-gray-600 italic">{testimonial.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(testimonial.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
