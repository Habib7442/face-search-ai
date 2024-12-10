import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '@/lib/redux/slices/searchResultsSlice';
import { setUploadedImage } from '@/lib/redux/slices/uploadedImageSlice';
import { RootState, useAppSelector } from '@/lib/redux';



interface ImageUploadProps {
  open: boolean;
  onClose: () => void;
}

const ImageUpload = ({ open, onClose }: ImageUploadProps) => {
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const uploadedImage = useAppSelector((state: RootState) => state.uploadedImage.image);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        simulateUploadProgress(file);
      };
      reader.readAsDataURL(file);

    } catch (error) {
      console.error('Error handling file:', error);
      toast.error('Failed to process image');
      setIsUploading(false);
    }
  };

  const simulateUploadProgress = (file: File) => {
    setProgress(0);
    const interval = setInterval(async () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleSearchUpload(file);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleSearchUpload = async (file: File) => {
    try {
      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });

      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64Image.split(",")[1],
          adultFilter: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.results && Array.isArray(data.results)) {
        // Dispatch actions as plain objects
        dispatch(setSearchResults(data.results));
        dispatch(setUploadedImage(base64Image));
        
        // Close the dialog
        onClose();
        
        // Navigate to upload page
        setTimeout(() => {
          router.push('/upload');
        }, 500);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to process image');
    } finally {
      setIsUploading(false);
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

        <div className="mt-6 space-y-6">
          <label className="cursor-pointer block">
            <div className="relative h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:border-blue-500 transition-colors">
              {!uploadedImage ? (
                <div className="text-center p-4">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Drop your image here or{" "}
                    <span className="text-blue-600 font-medium">browse</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Supports JPG, PNG files
                  </p>
                </div>
              ) : (
                <Image
                  src={uploadedImage}
                  alt="Uploaded preview"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </label>
          
          {uploadedImage && (
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-gray-600">
                {progress === 100 ? 'Processing search...' : `Uploading... ${progress}%`}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;