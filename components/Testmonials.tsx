"use client";
import React, { useState, useEffect } from "react";

import { ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { supabase } from "@/lib/supabase";



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
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);

      // Load signed URLs for all testimonial images
      const urls: Record<string, string> = {};
      for (const testimonial of data || []) {
        if (testimonial.user_image_url) {
          try {
            const { data: signedData, error: signedError } =
              await supabase.storage
                .from("testimonial-images")
                .createSignedUrl(testimonial.user_image_url, 3600);

            if (!signedError && signedData) {
              urls[testimonial.id] = signedData.signedUrl;
            }
          } catch (err) {
            console.error("Error getting signed URL:", err);
            urls[testimonial.id] = "/default-avatar.png";
          }
        }
      }
      setImageUrls(urls);
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
        className={`h-4 w-4 ${
          starValue <= rating
            ? "text-[#FF8C00] fill-[#FF8C00]"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dfeeff] to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Customer Reviews
            </h1>
            <p className="text-gray-600">
              Real experiences from our valued users
            </p>
          </div>
          <Link href="/">
            <Button
              variant="outline"
              className="bg-primary hover:primary-hover text-primary-foreground border-gray-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center text-gray-500 text-xl py-16 bg-white rounded-lg shadow-sm">
            No testimonials yet. Be the first to share your experience!
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={imageUrls[testimonial.id] || "/default-avatar.png"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover ring-2 ring-[#007BFF]/10"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/default-avatar.png";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 font-semibold truncate">
                      {testimonial.name}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(testimonial.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
                <blockquote className="mt-4 text-gray-700 text-sm leading-relaxed">
                  "{testimonial.message}"
                </blockquote>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
