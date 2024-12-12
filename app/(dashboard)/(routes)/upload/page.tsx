"use client";
import { useState, useCallback } from "react";
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


  const handleImageUpload = async (file: File, filterEnabled: boolean) => {
    try {
      setIsLoading(true);
      setIsSearchCompleted(false);
  
      // Get access token from cookies
      const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('client_token='));
    const accessToken = tokenCookie ? tokenCookie.split('=')[1].trim() : null;

      console.log(accessToken)
  
      if (!accessToken) {
        toast.error("Please login to search images");
        router.push('/auth');
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
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          image: base64Image.split(",")[1],
          adultFilter: filterEnabled,
        }),
      });
  
      if (response.status === 401) {
        toast.error("Session expired. Please login again");
        router.push('/auth');
        return;
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.results && Array.isArray(data.results)) {
        setResultImage(data.results[0]?.imageUrl || null);
        setImageSourceUrl(data.results[0]?.sourceUrl || null);
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
    <div className="min-h-screen text-slate-200 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8 mt-4 lg:mt-0">
        <GlassCard className="lg:p-8 md:p-6 p-1">
          <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
            <div className="p-3 rounded-full bg-primary/10">
              <ImageIcon className="h-8 w-8 text-teal-800 drop-shadow-md" />
            </div>
            <motion.h1
              className="poppins-semibold text-center text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-800 to-slate-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Image Search & Analysis
            </motion.h1>
          </div>

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
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-xl text-lg transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Search className="h-5 w-5 mr-2" />
                  )}
                  {isLoading ? "Processing..." : "Search Image"}
                </Button>

                <label
                  className={`flex items-center gap-3 bg-amber-400/50 px-6 py-3 rounded-xl cursor-pointer ${
                    isSearchCompleted ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span className="text-sm font-medium text-slate-900">
                    Adult Filter
                  </span>
                  <input
                    type="checkbox"
                    checked={adultContentFilter}
                    onChange={() => dispatch(toggleAdultFilter())}
                    className="w-5 h-5 rounded border-slate-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-slate-300"
                    disabled={!isSearchCompleted}
                  />
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {(selectedImage || resultImage || uploadedImage) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="grid md:grid-cols-2 gap-8 mt-8"
              >
                {(selectedImage || uploadedImage) && (
                  <ImagePreview
                    // If uploadedImage is a base64 string, use it directly
                    // If selectedImage is a File, use URL.createObjectURL
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : uploadedImage || ""
                    }
                    alt="Uploaded preview"
                    title="Uploaded Image"
                  />
                )}

                {isLoading ? (
                  <GlassCard className="p-6 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                  </GlassCard>
                ) : (
                  resultImage && (
                    <ImagePreview
                      src={resultImage}
                      alt="Result preview"
                      title="Selected Result"
                      sourceUrl={imageSourceUrl || undefined}
                    />
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {reduxSearchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="poppins-semibold text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-800 to-slate-900">
                Deep Search Results
              </h2>
            </div>
            <SearchResults
              results={reduxSearchResults}
              onSelectResult={handleSelectResult}
            />
            <div className="w-full flex justify-center items-center">
              <Button
                onClick={handleMoreInfoClick}
                className="bg-teal-800 hover:bg-slate-700 text-white"
              >
                <Info className="h-4 w-4 mr-2" />
                Find More Info
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
