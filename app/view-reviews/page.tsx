"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Loading from "@/components/Loading";

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
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

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

      const urls: Record<string, string> = {};
      for (const testimonial of data || []) {
        if (testimonial.user_image_url) {
          try {
            const { data: signedData, error: signedError } = await supabase.storage
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
            ? "text-yellow-400 fill-yellow-400"
            : "text-slate-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <Loading />
          <p className="text-slate-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

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
          className="mb-12"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-100/50 backdrop-blur-sm">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Customer Reviews
                </h1>
                <p className="text-slate-600">
                  Real experiences from our valued users
                </p>
              </div>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="bg-white/50 backdrop-blur-sm hover:bg-slate-100 text-slate-900 border-slate-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        {testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          >
            <MessageSquare className="h-12 w-12 text-slate-400 mb-4" />
            <p className="text-slate-600">No reviews yet. Be the first to share your experience!</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-4 ring-indigo-50">
                      <Image
                        src={imageUrls[testimonial.id] || "/default-avatar.png"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/default-avatar.png";
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-900 font-semibold truncate">
                      {testimonial.name}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {new Date(testimonial.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <blockquote className="mt-4 text-slate-700 text-sm leading-relaxed italic">
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
