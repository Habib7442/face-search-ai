"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Eye } from "lucide-react";
import { useState, useEffect } from "react";
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

      const formattedTestimonials = await Promise.all(
        (data || []).map(async (item) => {
          let avatarUrl = "/default-avatar.png";

          if (item.user_image_url) {
            try {
              const { data: signedData, error: signedError } =
                await supabase.storage
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

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-white dark:bg-gradient-to-b dark:from-[#020617] dark:to-[#0F172A]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          <p className="text-slate-600 dark:text-blue-200">
            Loading testimonials...
          </p>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-white dark:bg-gradient-to-b dark:from-[#020617] dark:to-[#0F172A]">
        <p className="text-slate-600 dark:text-blue-200">
          No testimonials available
        </p>
      </div>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden bg-light-background dark:bg-dark-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 dark:opacity-50" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-blue-200 mb-4"
          >
            What people say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-blue-100 max-w-2xl mx-auto"
          >
            Discover what our satisfied customers have to say about their
            experiences with our products/services.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-[#0c1222]/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/[0.2] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
            >
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/20 dark:from-white/[0.02] dark:via-transparent dark:to-white/[0.02] group-hover:opacity-100 opacity-0 transition-opacity duration-300" />

              <div className="relative flex flex-col h-full">
                <div className="mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 ring-2 ring-slate-100 dark:ring-white/10 group-hover:ring-slate-200 dark:group-hover:ring-white/20 transition-all duration-300">
                    <Image
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-slate-500 dark:text-blue-200/80">
                    {testimonial.title}
                  </p>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-blue-100/80 leading-relaxed flex-grow">
                  {testimonial.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link href="/view-reviews">
            <Button className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 dark:bg-[#0c1222]/50 dark:hover:bg-[#0c1222]/70 dark:text-white dark:border-white/10 dark:hover:border-white/20 px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md">
              <Eye className="mr-2 h-5 w-5" />
              View All Reviews
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
