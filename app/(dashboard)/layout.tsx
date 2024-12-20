"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SidebarDemo } from "@/components/Sidebar";
import { RootState } from "@/lib/redux/store";
import { useAppSelector } from "@/lib/redux";
import Loading from "@/components/Loading";
import { motion, AnimatePresence } from "framer-motion";

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
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/50 to-indigo-50/50 dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-800/70 backdrop-blur-lg" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-400/5 dark:to-indigo-400/5 rounded-full blur-3xl" />
          <Loading />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 dark:opacity-10" />

      <div className="flex min-h-screen">
        {/* Sidebar with glassmorphism */}
        <div className="fixed h-screen z-20">
          <div className="h-full bg-white/80 dark:bg-dark-background backdrop-blur-xl  shadow-lg">
            <SidebarDemo />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-2 lg:ml-20 md:ml-20 md:p-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="relative min-h-[calc(100vh-4rem)]">
              {/* Content Container with Glassmorphism */}
              <div className="relative rounded-3xl overflow-hidden bg-white/90 dark:bg-slate-950/50 backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-white/[0.1]">
                {/* Gradient Overlays */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-400/5 dark:to-indigo-400/5" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/20 dark:from-white/[0.02] dark:via-transparent dark:to-white/[0.02]" />
                </div>

                {/* Content with Custom Scrollbar */}
                <div className="relative h-full overflow-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  <div className="p-6 md:p-8">
                    {/* Page Header */}
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

                    {/* Main Content */}
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;        
