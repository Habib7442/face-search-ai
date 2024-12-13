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
        router.push('/auth');
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
      <DialogContent className="max-w-4xl p-6 bg-gradient-to-b from-[#ccf4e6] to-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Upload Your Image
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6 relative">
          <div className="relative h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:border-blue-500 transition-colors">
            {!uploadedImage ? (
              <div className="text-center p-4">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">
                  No image uploaded
                </p>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={uploadedImage}
                  alt="Uploaded preview"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
                {isUploading && <ScanningAnimation />}
              </div>
            )}
          </div>

          {uploadedImage && <ProgressIndicator progress={progress} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;