"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SidebarDemo } from "@/components/Sidebar";
import { RootState } from "@/lib/redux/store";
import { useAppSelector } from "@/lib/redux";
import Loading from "@/components/Loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state: RootState) => state.user);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user.id === null) {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        toast.error("Please sign in to access the dashboard", {
          position: "top-right",
          duration: 3000,
        });
        router.push("/sign-in");
      }
    }
  }, [user, router, mounted]);

  if (!mounted) return null;

  // Show loading state with modern glassmorphism effect
  if (user.id === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/80 to-indigo-50/80 dark:from-slate-950/80 dark:via-slate-900/80 dark:to-indigo-950/80 backdrop-blur-lg" />
        <div className="relative z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-400/10 dark:to-indigo-400/10 rounded-full blur-3xl" />
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="flex min-h-screen">
        {/* Sidebar with glassmorphism */}
        <div className="fixed h-screen z-20">
          <div className="h-full bg-white/80 dark:bg-dark-background backdrop-blur-xl  shadow-lg">
            <SidebarDemo />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-2 lg:ml-20 md:p-8 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Welcome to Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Hello, {user.name || "User"}
                </p>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
