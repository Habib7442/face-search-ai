"use client";
import React, { useState, useEffect } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserBolt,
  IconCreditCard,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { fetchUserCredits } from "@/lib/redux/features/credits/creditsSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { SignOutButton } from "@clerk/nextjs";
import { UserButton, useUser } from "@clerk/nextjs";
import { HomeIcon, NotebookIcon } from "lucide-react";

export function SidebarDemo() {
  const dispatch = useAppDispatch();
  const { credits } = useAppSelector((state) => state.credits);
  const [open, setOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    dispatch(fetchUserCredits());
  }, [dispatch]);

  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <HomeIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Dashboard",
      href: "/upload",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Reviews",
      href: "/reviews",
      icon: (
        <NotebookIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Settings",
    //   href: "#",
    //   icon: (
    //     <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: "Logout",
      href: "#",
      icon: (
        <SignOutButton>
          <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        </SignOutButton>
      ),
    },
  ];

  // Calculate progress percentage
  const calculateProgressPercentage = () => {
    if (credits?.is_unlimited) return 100;
    const totalCredits = 10;
    return credits ? (credits.credits_remaining / totalCredits) * 100 : 0;
  };

  const progressPercentage = calculateProgressPercentage();

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-full"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          {/* Credits Progress Bar */}
          <div className=" pb-4 space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-neutral-300">
              Your Credits
            </h3>
            {credits?.is_unlimited ? (
              <div className="flex items-center text-green-500 font-medium">
                <IconCreditCard className="mr-2 h-5 w-5" />
                Unlimited Credits
              </div>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="relative w-full max-w-[180px] h-6">
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className="h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPercentage}%`,
                          backgroundColor:
                            progressPercentage < 20
                              ? "red"
                              : progressPercentage < 50
                              ? "orange"
                              : "green",
                        }}
                        animate={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1 text-sm">
                      <p>
                        Credits Remaining: {credits?.credits_remaining || 0} /
                        3000
                      </p>
                      {progressPercentage < 20 && (
                        <p className="text-red-500">
                          Low credits! Consider upgrading.
                        </p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <div>
            {isSignedIn && (
              <div className="flex items-center space-x-2">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 border border-gray-300 rounded-full",
                    },
                  }}
                />
                {/* Display username */}
                {user && (
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.username || user.firstName}
                  </span>
                )}
              </div>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

// Logo components remain the same as in your original code
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/logo-facesearch.jpeg"
        alt="FaceSearch AI Logo"
        width={40} // Set a specific width
        height={40} // Set a specific height
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
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/logo-facesearch.jpeg"
        alt="FaceSearch AI Logo"
        width={40} // Set a specific width
        height={40} // Set a specific height
        className="object-contain"
      />
    </Link>
  );
};
