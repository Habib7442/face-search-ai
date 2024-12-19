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
import { cn } from "@/lib/utils";
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
        router.push("/sign-in");
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
        router.push("/sign-in");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-100/50 p-8"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 mb-10">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600">
              <ImageIcon className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Visual Search Engine
              </h1>
              <p className="text-gray-600 text-lg">
                Upload an image to discover similar visuals across the web
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
                  className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                  <Button
                    onClick={() =>
                      selectedImage &&
                      handleImageUpload(selectedImage, adultContentFilter)
                    }
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-white/90 backdrop-blur-sm border border-blue-100/50 hover:bg-blue-50/50 text-blue-600 px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[240px]"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Search className="h-5 w-5" />
                        <span>Search Similar Images</span>
                      </div>
                    )}
                  </Button>

                  <div className="w-full sm:w-auto flex items-center justify-between gap-4 bg-white/90 backdrop-blur-sm border border-blue-100/50 px-6 py-4 rounded-xl shadow-lg min-w-[240px]">
                    <span className="text-sm font-medium text-gray-700">
                      Adult Content Filter
                    </span>
                    <Switch
                      checked={adultContentFilter}
                      onCheckedChange={() => dispatch(toggleAdultFilter())}
                      disabled={!isSearchCompleted}
                      className={cn(
                        "data-[state=checked]:bg-gradient-to-r from-blue-600 to-indigo-600",
                        "data-[state=unchecked]:bg-gray-200"
                      )}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {(selectedImage || uploadedImage) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-10"
              >
                <div className="relative rounded-2xl overflow-hidden mx-auto w-full max-w-[500px] h-[500px] shadow-md">
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full">
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
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 flex items-center justify-center mt-6">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                      <p className="text-gray-600 font-medium">
                        Analyzing your image...
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {reduxSearchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Search Results
              </h2>
              <div className="flex items-center gap-4">
                {selectedImages.length > 0 && (
                  <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
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
              className="w-full sm:w-auto bg-blue-50/50 backdrop-blur-sm border border-blue-100/50 hover:bg-blue-50/50 text-blue-600 px-6 py-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 min-w-[240px]"
            >
              <Info className="h-5 w-5 mr-2" />
              View Detailed Analysis
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
