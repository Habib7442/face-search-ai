"use client";

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Star, Upload, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { toast } from "sonner";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TestimonialForm() {
  const user = useAppSelector((state: RootState) => state.user);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useInitialAvatar, setUseInitialAvatar] = useState(true);

  const getSupabaseClient = () => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('client_token='));
    const accessToken = tokenCookie ? tokenCookie.split('=')[1].trim() : null;
  
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      }
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCustomImage(file);
      setUseInitialAvatar(false);
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
      const supabase = getSupabaseClient();
      let imageUrl = '';

      if (useInitialAvatar) {
        // Create canvas for initial avatar
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Draw background
          ctx.fillStyle = '#3B82F6';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw initial
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 100px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const initial = (user.name || user.email || 'A').charAt(0).toUpperCase();
          ctx.fillText(initial, canvas.width/2, canvas.height/2);
          
          try {
            // Convert to blob
            const blob = await new Promise<Blob>((resolve, reject) => {
              canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject(new Error('Failed to create blob'));
              }, 'image/png');
            });
            
            // Upload to Supabase
            const fileName = `avatars/${user.id}_${Date.now()}.png`;
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('testimonial-images')
              .upload(fileName, blob, {
                contentType: 'image/png',
                cacheControl: '3600',
                upsert: true
              });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: urlData } = supabase.storage
              .from('testimonial-images')
              .getPublicUrl(fileName);

            imageUrl = urlData?.publicUrl || '';
          } catch (imageError) {
            console.error('Image processing error:', imageError);
            throw new Error('Failed to process avatar image');
          }
        }
      } else if (customImage) {
        try {
          const fileExt = customImage.name.split('.').pop();
          const fileName = `uploads/${user.id}_${Date.now()}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('testimonial-images')
            .upload(fileName, customImage, {
              cacheControl: '3600',
              upsert: true
            });

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from('testimonial-images')
            .getPublicUrl(fileName);

          imageUrl = urlData?.publicUrl || '';
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error('Failed to upload image');
        }
      }

      // Insert testimonial with image URL
      const { error: insertError } = await supabase
        .from('testimonials')
        .insert({
          user_id: user.id,
          name: user.name || 'Anonymous',
          email: user.email,
          rating: rating,
          message: message,
          user_image_url: imageUrl
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }

      // Reset form
      setRating(0);
      setMessage('');
      setCustomImage(null);
      setUseInitialAvatar(true);
      
      toast.success('Thank you for your testimonial!');
    } catch (error: any) {
      console.error('Testimonial submission error:', error);
      toast.error(error.message || 'Failed to submit testimonial. Please try again.');
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

  if (!user.id) {
    return (
      <div className="w-full bg-neutral-900 rounded-xl p-8">
        <p className="text-neutral-400 text-center">Please login to submit a testimonial.</p>
      </div>
    );
  }

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
            placeholder="Write your review..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => setUseInitialAvatar(true)}
              className={`flex-1 ${useInitialAvatar ? 'bg-blue-500' : 'bg-neutral-700'}`}
            >
              <Camera className="mr-2 h-4 w-4" />
              Use Initial Avatar
            </Button>
            
            <div className="flex-1 relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button
                type="button"
                className={`w-full ${!useInitialAvatar ? 'bg-blue-500' : 'bg-neutral-700'}`}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </div>
          </div>
          
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