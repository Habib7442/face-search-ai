"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { SidebarDemo } from "@/components/Sidebar";
import { RootState } from "@/lib/redux/store";
import { useAppSelector } from "@/lib/redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    if (user.id === null) {
      // Show toast notification
      toast.error("Please sign in to access the dashboard", {
        position: "top-right",
        duration: 3000,
      });

      // Redirect to sign-in page
      router.push("/sign-in");
    }
  }, [user, router]);

  // If no user is logged in, show nothing (will be redirected by useEffect)
  if (user.id === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // If user is logged in, render the dashboard layout
  return (
    <div className="flex h-full">
      {/* Sidebar takes 1/7 of the screen */}
      <div className="w-1/7 h-full fixed z-10">
        <SidebarDemo />
      </div>

      {/* Main content takes 2/3 of the screen */}
      <div className="relative w-full h-full lg:ml-16 md:ml-20 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;