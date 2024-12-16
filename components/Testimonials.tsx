"use client";


import { useState, useEffect } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import {supabase} from "@/lib/supabase"
import Loading from "./Loading";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar_url: string;
  rating: number;
}

export function InfiniteMovingCardsDemo() {
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

      // Transform the data to match the required format
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
      <Loading/>
    );
  }

  return (
    <div className="h-full rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="fast"
      />
    </div>
  );
}
