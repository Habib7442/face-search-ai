"use client";

import { SidebarDemo } from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar takes 1/3 of the screen */}
      <div className="w-1/7 h-full bg-gray-800 fixed z-10">
        <SidebarDemo />
      </div>
      
      {/* Main content takes 2/3 of the screen */}
      <div className="relative w-full lg:px-16 bg-gray-50 dark:bg-gray-900">{children}</div>
    </div>
  );
};

export default DashboardLayout;
