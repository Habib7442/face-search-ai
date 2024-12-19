"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatar_url: string;
  rating: number;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedTestimonials = await Promise.all(
        (data || []).map(async (item) => {
          let avatarUrl = "/default-avatar.png";

          if (item.user_image_url) {
            try {
              const { data: signedData, error: signedError } = await supabase.storage
                .from("testimonial-images")
                .createSignedUrl(item.user_image_url, 3600);

              if (!signedError && signedData) {
                avatarUrl = signedData.signedUrl;
              }
            } catch (err) {
              console.error("Error getting signed URL:", err);
            }
          }

          return {
            id: item.id,
            quote: item.message,
            name: item.name,
            title: new Date(item.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            avatar_url: avatarUrl,
            rating: item.rating,
          };
        })
      );

      setTestimonials(formattedTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-slate-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-slate-600">No testimonials available</p>
      </div>
    );
  }

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-slate-50/50 to-white/50">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-32 left-1/3 w-96 h-96 bg-violet-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Join thousands of satisfied customers using FaceSearch AI
          </p>
          <Link href="/view-reviews">
            <Button
              className="w-full sm:w-auto bg-blue-50/50 backdrop-blur-sm border border-blue-100/50 hover:bg-blue-50/50 text-blue-600 px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[240px]"
            >
              <Eye className="mr-2 h-4 w-4" />
              View All Reviews
            </Button>
          </Link>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            {testimonials[currentIndex] && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl relative"
              >
                {/* Rest of your testimonial card content */}
                <div className="absolute -top-6 left-8">
                  <div className="bg-indigo-600 rounded-full p-4 shadow-lg">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="mb-8 pt-6">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-xl text-slate-700 mb-8 italic">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-indigo-50">
                      <Image
                        src={testimonials[currentIndex].avatar_url}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-slate-900">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-slate-600">
                        {testimonials[currentIndex].title}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <button
                    onClick={handlePrevious}
                    className="bg-white rounded-full p-3 shadow-lg hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-white rounded-full p-3 shadow-lg hover:bg-slate-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-indigo-600 w-8" 
                    : "bg-slate-300 hover:bg-slate-400"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 