"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { SidebarDemo } from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Check authentication status after it's loaded
    if (isLoaded && !isSignedIn) {
      // Show toast notification
      toast.error("Please sign in to access the dashboard", {
        position: "top-right",
        duration: 3000,
      });

      // Redirect to sign-in page
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // If not loaded yet, show a loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // If signed in, render the dashboard layout
  if (isSignedIn) {
    return (
      <div className="flex h-screen">
        {/* Sidebar takes 1/7 of the screen */}
        <div className="w-1/7 h-full bg-gray-800 fixed z-10">
          <SidebarDemo />
        </div>
        
        {/* Main content takes 2/3 of the screen */}
        <div className="relative w-full lg:px-16 bg-gray-50 dark:bg-gray-900">
          {children}
        </div>
      </div>
    );
  }

  // This will be replaced by the redirection in useEffect
  return null;
};

export default DashboardLayout;