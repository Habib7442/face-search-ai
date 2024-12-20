"use client";
import { useState, useCallback, useEffect } from "react";
import { Loader2, Search, Info, ImageIcon, CheckCircle, Lock, LockOpen } from "lucide-react";
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-100/50 dark:border-slate-800/50 p-8"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 mb-10">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700">
              <ImageIcon className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Visual Search Engine
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
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
                    className="w-full sm:w-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-blue-100/50 dark:border-slate-700/50 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 text-blue-600 dark:text-blue-400 px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[240px]"
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

                  <div className="w-full sm:w-auto flex items-center justify-between gap-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-blue-100/50 dark:border-slate-700/50 px-6 py-4 rounded-xl shadow-lg min-w-[240px]">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Adult Content Filter
                    </span>
                    <Switch
                      checked={adultContentFilter}
                      onCheckedChange={() => dispatch(toggleAdultFilter())}
                      disabled={!isSearchCompleted}
                      className={cn(
                        "relative shrink-0 cursor-pointer rounded-full transition-all duration-300",
                        "h-6 w-11",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "data-[state=checked]:bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500",
                        "data-[state=unchecked]:bg-slate-200 dark:data-[state=unchecked]:bg-slate-700"
                      )}
                    >
                      <div
                        className={cn(
                          "absolute top-0.5 left-0.5",
                          "h-5 w-5 rounded-full bg-white shadow-lg",
                          "transition-all duration-300",
                          "data-[state=checked]:translate-x-5",
                          "data-[state=checked]:bg-white dark:data-[state=checked]:bg-white",
                          "data-[state=unchecked]:translate-x-0",
                          "data-[state=unchecked]:bg-white dark:data-[state=unchecked]:bg-white"
                        )}
                      >
                        <div className="h-full w-full flex items-center justify-center">
                          {adultContentFilter ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-blue-600 dark:text-blue-500"
                            >
                              <Lock className="h-3 w-3" />
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-slate-400"
                            >
                              <LockOpen className="h-3 w-3" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </Switch>
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
                <div className="relative rounded-2xl  overflow-hidden mx-auto w-full max-w-[500px] h-[500px] shadow-md">
                  
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
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 flex items-center justify-center mt-6">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
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
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-lg"
            >
              <div className="space-y-2">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
                >
                  Search Results
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-600 dark:text-slate-400 text-sm"
                >
                  Discover visually similar images from our database
                </motion.p>
              </div>

              <div className="flex items-center gap-3">
                {selectedImages.length > 0 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>{selectedImages.length} images selected</span>
                      </div>
                    </Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <div className="relative">
              <SearchResults
                results={reduxSearchResults}
                onSelectResult={handleSelectResult}
              />
            </div>

            {/* Only show the button if there are selected images */}
            {selectedImages.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center"
              >
                <Button
                  onClick={handleMoreInfoClick}
                  className={cn(
                    "group relative overflow-hidden",
                    "w-full sm:w-auto px-8 py-6 rounded-xl",
                    "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500",
                    "hover:from-blue-500 hover:to-indigo-500 dark:hover:from-blue-400 dark:hover:to-indigo-400",
                    "text-white font-medium",
                    "shadow-lg hover:shadow-xl",
                    "transition-all duration-300"
                  )}
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <Info className="h-5 w-5" />
                    <span>View Detailed Analysis</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-300 dark:to-indigo-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Button>
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-2xl"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full border-4 border-blue-200 dark:border-blue-900 animate-spin border-t-blue-600 dark:border-t-blue-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    Processing results...
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
