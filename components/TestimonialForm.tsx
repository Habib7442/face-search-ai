"use client";

import { useState } from "react";
import { Loader2, Star, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function TestimonialForm() {
  const user = useAppSelector((state: RootState) => state.user);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      setCustomImage(file);
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

      // Handle image upload if an image was selected
      if (customImage) {
        const fileExt = customImage.name.split(".").pop();
        const fileName = `${user.id}_${Date.now()}.${fileExt}`;

        // First upload the file
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("testimonial-images")
          .upload(fileName, customImage, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // Get the public URL after successful upload
        const { data: urlData } = supabase.storage
          .from("testimonial-images")
          .getPublicUrl(fileName);

        imageUrl = fileName; // Store just the filename
      }

      // Insert testimonial with image URL
      const { error: insertError } = await supabase
        .from("testimonials")
        .insert({
          user_id: user.id,
          name: user.name || "Anonymous",
          email: user.email,
          rating: rating,
          message: message,
          user_image_url: imageUrl, // This will store just the filename
        });

      if (insertError) throw insertError;

      // Reset form
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

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((starValue) => (
      <Star
        key={starValue}
        onClick={() => setRating(starValue)}
        className={`cursor-pointer transition-colors duration-200 ${
          starValue <= rating
            ? "text-yellow-400 fill-current"
            : "text-neutral-600 hover:text-neutral-400"
        }`}
        size={32}
      />
    ));
  };

  if (!user.id) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-8">
            <p className="text-center text-gray-500">
              Please login to submit a testimonial.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg mx-auto"
        >
          <Card className="border bg-transparent border-neutral">
            <CardContent className="space-y-6 mt-6 p-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Rating
                  </label>
                  <div className="flex justify-start gap-2">
                    {renderStars()}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Review
                  </label>
                  <Textarea
                    placeholder="Share your experience with us..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="min-h-[120px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
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
                      className="w-full h-11 bg-accent border-none"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {customImage ? "Image Selected" : "Upload Image"}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="w-full h-11 bg-primary text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Submitting...
                    </div>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
