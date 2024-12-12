"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SidebarDemo } from "@/components/Sidebar";
import { RootState } from "@/lib/redux/store";
import { useAppSelector } from "@/lib/redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state: RootState) => state.user);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user.id === null) {
      // Check if we have a user in localStorage as backup
      const savedUser = localStorage.getItem('user');
      if (!savedUser) {
        toast.error("Please sign in to access the dashboard", {
          position: "top-right",
          duration: 3000,
        });
        router.push("/auth");
      }
    }
  }, [user, router, mounted]);

  // Don't render anything until component is mounted
  if (!mounted) {
    return null;
  }

  // Show loading state while checking authentication
  if (user.id === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent"></div>
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