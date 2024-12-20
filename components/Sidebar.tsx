"use client";
import React, { useState } from "react";
import { IconBrandTabler, IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar,  SidebarBody,  SidebarLink } from "./ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { HistoryIcon, HomeIcon, NotebookIcon, LogOut } from "lucide-react";
import { clearUser } from "@/lib/redux/slices/userSlice";
import { useRouter, usePathname } from "next/navigation";
import { RootState } from "@/lib/redux/rootReducer";

export function SidebarDemo() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state: RootState) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    dispatch(clearUser());
    document.cookie = "client_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      label: "Dashboard",
      href: "/upload",
      icon: <IconBrandTabler className="h-5 w-5" />,
    },
    {
      label: "Reviews",
      href: "/reviews",
      icon: <NotebookIcon className="h-5 w-5" />,
    },
    {
      label: "History",
      href: "/history",
      icon: <HistoryIcon className="h-5 w-5" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <LogOut className="h-5 w-5" />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-slate-50/50 to-white/50 dark:from-slate-950/50 dark:to-slate-900/50">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col h-screen">
          <div className="flex flex-col flex-1">
            <motion.div 
              className="mb-8 p-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {open ? <Logo /> : <LogoIcon />}
            </motion.div>

            <div className="space-y-2">
              {links.map((link, idx) => {
                const isActive = link.href === "#" ? false : pathname === link.href;
                return (
                  <SidebarLink
                    key={idx}
                    link={link}
                    className={cn(
                      link.label === "Logout" && 
                        "text-red-500 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20",
                      isActive && 
                        "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400"
                    )}
                  />
                );
              })}
            </div>
          </div>

          {user.id && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-auto pt-8"
            >
              <div className={cn(
                "p-3 rounded-xl",
                "bg-gradient-to-br from-white/80 to-slate-50/80",
                "dark:from-slate-800/80 dark:to-slate-900/80",
                "backdrop-blur-md",
                "shadow-lg dark:shadow-slate-900/20",
                "border border-slate-200/50 dark:border-slate-700/50",
                "hover:border-blue-200/50 dark:hover:border-blue-800/50",
                "transition-all duration-300"
              )}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg",
                    "bg-gradient-to-br from-blue-500 to-indigo-500",
                    "dark:from-blue-400 dark:to-indigo-400",
                    "flex items-center justify-center",
                    "text-white font-medium",
                    "shadow-md"
                  )}>
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : user.email?.charAt(0).toUpperCase()}
                  </div>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col"
                    >
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {user.name || "User"}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className={cn(
        "relative overflow-hidden",
        "rounded-xl",
        "bg-slate-950 dark:bg-slate-900",
        "shadow-lg",
        "transition-transform duration-300"
      )}>
        <Image
          src="/logo-facesearch.svg"
          alt="FaceSearch AI Logo"
          width={100}
          height={100}
          className="object-contain w-12 h-12"
        />
      </div>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link href="/" className="inline-block">
      <div className={cn(
        "relative overflow-hidden",
        "rounded-xl",
        "bg-slate-950 dark:bg-slate-900",
        "shadow-lg",
        "transition-transform duration-300"
      )}>
        <Image
          src="/logo-facesearch.svg"
          alt="FaceSearch AI Logo"
          width={100}
          height={100}
          className="object-contain w-10 h-10"
        />
      </div>
    </Link>
  );
};
