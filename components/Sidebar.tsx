"use client";
import React, { useState } from "react";
import {
  
  IconBrandTabler,
  IconLogout,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
// import { fetchUserCredits } from "@/lib/redux/features/credits/creditsSlice";
// import { SignOutButton } from "@clerk/nextjs";
import { HistoryIcon, HomeIcon, NotebookIcon } from "lucide-react";
import { clearUser } from "@/lib/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/rootReducer";

export function SidebarDemo() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state: RootState) => state.user);
  const router = useRouter()
  
  
  // Use Redux state for user information
  // const { isVerified } = useAppSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(fetchUserCredits());
  // }, [dispatch]);

  const handleLogout = () => {
    dispatch(clearUser());
    document.cookie = "client_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('user');
    router.push('/auth');
  };

  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <HomeIcon className="text-neutral-700 dark:text-pink-300 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Dashboard",
      href: "/upload",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-orange-300 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-blue-300 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Reviews",
      href: "/reviews",
      icon: (
        <NotebookIcon className="text-neutral-700 dark:text-green-300 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "History",
      href: "/history",
      icon: (
        <HistoryIcon className="text-yellow-700 dark:text-yellow-300 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconLogout className="text-red-600 dark:text-red-400 h-5 w-5 flex-shrink-0" />,
      onClick: handleLogout
    }
  ];

  return (
    <div className={cn(
      "flex flex-col md:flex-row bg-[#cbd5e1] w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
      "h-full"
    )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link}
                  onClick={link.onClick}
                />
              ))}
            </div>
          </div>

          <div className="px-3 py-4">
            {user.id && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : user.email?.charAt(0).toUpperCase()}
                </div>
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {user.name || user.email}
                  </motion.span>
                )}
              </div>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

// Logo components remain the same
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-50"
    >
      <Image
        src="/logo-facesearch.png"
        alt="FaceSearch AI Logo"
        width={40}
        height={40}
        className="object-contain"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        FaceSearch AI
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-50"
    >
      <Image
        src="/logo-facesearch.png"
        alt="FaceSearch AI Logo"
        width={40}
        height={40}
        className="object-contain"
      />
    </Link>
  );
};