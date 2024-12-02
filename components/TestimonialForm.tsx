"use client";

import { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { createClient } from '@supabase/supabase-js';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TestimonialForm() {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setCustomImage(e.target.files[0]);
//     }
//   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || rating === 0) return;

    setIsSubmitting(true);

    try {
      let imageUrl = user.imageUrl;

      // If custom image is uploaded, store in Supabase storage
      if (customImage) {
        const fileExt = customImage.name.split('.').pop();
        const fileName = `${user.id}_${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
        .from('testimonial-images')
        .upload(`public/${fileName}`, customImage, {
          cacheControl: '3600',
          upsert: false
        });
        if (uploadError) {
          console.error('Image upload error:', uploadError);
          throw uploadError;
        }

        // Get public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from('testimonial-images')
          .getPublicUrl(fileName);

        imageUrl = urlData?.publicUrl || user.imageUrl;
      }

      // Submit testimonial to database
      const { error } = await supabase.from('testimonials').insert({
        user_id: user.id,
        name: user.fullName || user.username || 'Anonymous',
        email: user.emailAddresses[0].emailAddress,
        rating: rating,
        message: message,
        user_image_url: imageUrl
      });

      if (error) throw error;

      // Reset form
      setRating(0);
      setMessage('');
      setCustomImage(null);
      
      alert('Thank you for your testimonial!');
    } catch (error) {
      console.error('Testimonial submission error:', error);
      alert('Failed to submit testimonial. Please try again.');
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
            ? 'text-yellow-400 fill-current' 
            : 'text-neutral-600 hover:text-neutral-400'
        }`}
        size={32}
      />
    ));
  };

  if (!user) return null;

  return (
    <div className="w-full bg-neutral-900 rounded-xl">
      <div className="p-8 space-y-6">
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Share Your Experience
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-4">
            {renderStars()}
          </div>
          
          <Textarea 
            placeholder="Write your testimonial..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:ring-2 focus:ring-blue-500"
          />
          
          {/* <div className="relative">
            <Input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex items-center justify-center p-4 border-2 border-dashed border-neutral-700 rounded-lg hover:border-blue-500 transition-colors duration-300">
              <Upload className="mr-2 text-neutral-500" />
              <span className="text-neutral-400">
                {customImage ? customImage.name : 'Upload Profile Image (Optional)'}
              </span>
            </div>
          </div> */}
          
          <Button 
            type="submit" 
            disabled={isSubmitting || rating === 0}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </Button>
        </form>
      </div>
    </div>
  );
}