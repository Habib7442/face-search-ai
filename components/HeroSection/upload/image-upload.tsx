import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSearchResults } from "@/lib/redux/slices/searchResultsSlice";
import { setUploadedImage } from "@/lib/redux/slices/uploadedImageSlice";
import { RootState, useAppSelector } from "@/lib/redux";
import { ScanningAnimation } from "./scanning-animation";
import { ProgressIndicator } from "./progress-indicator";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
  open: boolean;
  onClose: () => void;
}

const ImageUpload = ({ open, onClose }: ImageUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const uploadedImage = useAppSelector(
    (state: RootState) => state.uploadedImage.image
  );

  useEffect(() => {
    if (uploadedImage && open) {
      // Automatically start upload process when image is set
      simulateUploadProgress();
    }
  }, [uploadedImage, open]);

  const simulateUploadProgress = () => {
    setIsUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleSearchUpload();
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleSearchUpload = async () => {
    try {
      // Get access token from client cookie
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('client_token='));
      const accessToken = tokenCookie ? tokenCookie.split('=')[1].trim() : null;
  
      if (!accessToken) {
        toast.error("Please login to search images");
        onClose();
        router.push('/sign-in');
        return;
      }
  
      // Remove the data:image prefix and get base64 part
      const base64Image = uploadedImage.split(",")[1];
  
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          image: base64Image,
          adultFilter: false,
        }),
      });
  
      if (response.status === 401) {
        toast.error("Session expired. Please login again");
        onClose();
        router.push('/login');
        return;
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.results && Array.isArray(data.results)) {
        dispatch(setSearchResults(data.results));
        dispatch(setUploadedImage(uploadedImage));
        onClose();
        setTimeout(() => {
          router.push("/upload");
        }, 500);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to process image");
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-gradient-to-b from-slate-50/50 to-white/50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-violet-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-slate-900 text-center">
              Upload Your Image
            </DialogTitle>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-slate-600 text-center mt-2"
            >
              We'll analyze your image and find similar faces
            </motion.p>
          </DialogHeader>

          <div className="mt-8 space-y-6 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-80 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-white/50 backdrop-blur-sm hover:border-indigo-400 transition-colors"
            >
              <AnimatePresence mode="wait">
                {!uploadedImage ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center p-8"
                  >
                    <div className="bg-indigo-50 rounded-full p-4 inline-block mb-4">
                      <ImageIcon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <p className="text-slate-600">
                      Processing your image...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={uploadedImage}
                      alt="Uploaded preview"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-xl"
                    />
                    {isUploading && <ScanningAnimation />}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {uploadedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ProgressIndicator progress={progress} />
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;