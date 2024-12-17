"use client";
import { useState, useCallback, useEffect } from "react";
import { Loader2, Search, Info, ImageIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "@/lib/redux";
import {
  selectAdultFilter,
  toggleAdultFilter,
} from "@/lib/redux/slices/adultFilterSlice";
import { Button } from "@/components/ui/button";
import { ImagePreview } from "@/components/ImagePreview";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/GlassCard";
import { DropZone } from "@/components/DropZone";
import { SearchResults } from "@/components/SearchResult";
import {
  selectSearchResults,
  setSearchResults,
} from "@/lib/redux/slices/searchResultsSlice";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { selectSelectedImages } from "@/lib/redux/slices/selectedImagesSlice";
// import { clearUploadedImage } from "@/lib/redux/slices/uploadedImageSlice";

export default function Upload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageSourceUrl, setImageSourceUrl] = useState<string | null>(null);
  // const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const adultContentFilter = useAppSelector(selectAdultFilter);

  const reduxSearchResults = useAppSelector(selectSearchResults);
  const uploadedImage = useAppSelector(
    (state: RootState) => state.uploadedImage.image
  );
  const selectedImages = useAppSelector(selectSelectedImages);

  const handleImageUpload = async (file: File, filterEnabled: boolean) => {
    try {
      setIsLoading(true);
      setIsSearchCompleted(false);
  
      // Get access token from cookies
      const cookies = document.cookie.split(";");
      const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("client_token=")
      );
      const accessToken = tokenCookie ? tokenCookie.split("=")[1].trim() : null;
  
      if (!accessToken) {
        toast.error("Please login to search images");
        router.push("/auth");
        return;
      }
  
      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
  
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          image: base64Image.split(",")[1],
          adultFilter: filterEnabled,
        }),
      });
  
      if (response.status === 401) {
        toast.error("Session expired. Please login again");
        router.push("/auth");
        return;
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.results && Array.isArray(data.results)) {
        dispatch(setSearchResults(data.results));
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image");
    } finally {
      setIsLoading(false);
      setIsSearchCompleted(true);
    }
  };

  useEffect(() => {
    if (selectedImage && isSearchCompleted) {
      handleImageUpload(selectedImage, adultContentFilter);
    }
  }, [adultContentFilter]);

  // Handle image selection from search results
  const handleSelectResult = useCallback(
    (imageUrl: string, sourceUrl: string) => {
      setResultImage(imageUrl);
      setImageSourceUrl(sourceUrl);
    },
    []
  );

  // Navigate to info page
  const handleMoreInfoClick = () => {
    router.push("/info");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dfeeff] to-white py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8 mt-4 lg:mt-0">
        <GlassCard className="lg:p-8 md:p-6 p-6 bg-white/80 backdrop-blur-lg">
          <div className="flex flex-col lg:flex-row items-center gap-6 mb-12">
            <div className="p-4 rounded-full bg-[#007BFF]/10">
              <ImageIcon className="h-8 w-8 text-[#007BFF]" />
            </div>
            <div className="space-y-2 text-center lg:text-left">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-primary"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Image Search & Analysis
              </motion.h1>
              <p className="text-gray-600">
                Upload an image to start searching
              </p>
            </div>
          </div>

          <div className="relative">
            <DropZone
              onDrop={(file) => {
                setSelectedImage(file);
                handleImageUpload(file, adultContentFilter);
              }}
              dragActive={dragActive}
              setDragActive={setDragActive}
            />

            <AnimatePresence mode="wait">
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 flex flex-col lg:flex-row md:flex-row xl:flex-row justify-center items-center gap-4"
                >
                  <Button
                    onClick={() =>
                      selectedImage &&
                      handleImageUpload(selectedImage, adultContentFilter)
                    }
                    disabled={isLoading}
                    className="bg-[#007BFF] hover:bg-[#66B2FF] text-white px-4 text-sm font-medium py-5 rounded-xl transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Search Image
                      </>
                    )}
                  </Button>

                  <div
                    className={`flex items-center gap-3 bg-[#F0F4FA] px-4 py-3 rounded-xl ${
                      isSearchCompleted ? "" : "opacity-50"
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      Adult Filter
                    </span>
                    <Switch
                      checked={adultContentFilter}
                      onCheckedChange={() => dispatch(toggleAdultFilter())}
                      disabled={!isSearchCompleted}
                      className="data-[state=checked]:bg-[#007BFF] data-[state=unchecked]:bg-[#007BFF]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
  {(selectedImage || uploadedImage) && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-8"
    >
      <div className="relative rounded-xl overflow-hidden mx-auto w-full max-w-[400px] h-[400px]">
        <Badge className="absolute top-4 left-4 bg-[#007BFF] text-white">
          Uploaded Image
        </Badge>
        <ImagePreview
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : uploadedImage || ""
          }
          alt="Uploaded preview"
          title="Uploaded Image"
        />
      </div>

      {isLoading && (
        <div className="bg-white/80 rounded-xl shadow-lg p-8 flex items-center justify-center mt-4">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#007BFF]" />
            <p className="text-gray-600">Analyzing image...</p>
          </div>
        </div>
      )}
    </motion.div>
  )}
</AnimatePresence>
        </GlassCard>

        {reduxSearchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">
                Deep Search Results
              </h2>
              <div className="flex items-center gap-4">
                {selectedImages.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F0F4FA] text-gray-700"
                  >
                    {selectedImages.length} images selected
                  </Badge>
                )}
              </div>
            </div>
            <SearchResults
              results={reduxSearchResults}
              onSelectResult={handleSelectResult}
            />
            <Button
              onClick={handleMoreInfoClick}
              disabled={selectedImages.length === 0}
              className=" bg-accent  hover:bg-[#007BFF] text-white transition-all duration-200 disabled:opacity-50"
            >
              <Info className="h-4 w-4 mr-2" />
              Find More Info
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
