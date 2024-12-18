"use client";

import { useState } from "react";
import { Loader2, Star, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function TestimonialForm() {
  const user = useAppSelector((state: RootState) => state.user);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      setCustomImage(file);
      toast.success("Image selected successfully");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.id || rating === 0) {
      toast.error("Please login and provide a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (customImage) {
        const fileExt = customImage.name.split(".").pop();
        const fileName = `${user.id}_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("testimonial-images")
          .upload(fileName, customImage, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;
        imageUrl = fileName;
      }

      const { error: insertError } = await supabase
        .from("testimonials")
        .insert({
          user_id: user.id,
          name: user.name || "Anonymous",
          email: user.email,
          rating,
          message,
          user_image_url: imageUrl,
        });

      if (insertError) throw insertError;

      setRating(0);
      setMessage("");
      setCustomImage(null);

      toast.success("Thank you for your testimonial!");
    } catch (error: any) {
      console.error("Testimonial submission error:", error);
      toast.error("Failed to submit testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user.id) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[400px] items-center justify-center"
      >
        <div className="text-center space-y-4">
          <p className="text-slate-600">Please login to submit a testimonial.</p>
          <Button
            onClick={() => window.location.href = '/sign-in'}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Sign In
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Your Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <motion.button
                key={starValue}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoveredStar(starValue)}
                onMouseLeave={() => setHoveredStar(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 transition-colors duration-200 ${
                    starValue <= (hoveredStar || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-slate-300 hover:text-yellow-200"
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Review Text Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Your Review
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your experience with us..."
            required
            className="min-h-[120px] bg-white/50 backdrop-blur-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl resize-none"
          />
        </div>

        {/* Image Upload Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Profile Picture (Optional)
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/50 backdrop-blur-sm border-slate-200 hover:bg-slate-100 text-slate-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              {customImage ? "Image Selected" : "Upload Image"}
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isSubmitting ? "submitting" : "idle"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl h-11 transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit Review"
              )}
            </Button>
          </motion.div>
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
