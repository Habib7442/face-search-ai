"use client";
import React, { useState } from "react";
import { IconBrandTabler, IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { HistoryIcon, HomeIcon, NotebookIcon } from "lucide-react";
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
    document.cookie =
      "client_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    router.push("/auth");
  };

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Dashboard",
      href: "/upload",
      icon: <IconBrandTabler className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Reviews",
      href: "/reviews",
      icon: <NotebookIcon className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "History",
      href: "/history",
      icon: <HistoryIcon className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconLogout className="h-5 w-5 flex-shrink-0" />,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full flex-1 max-w-7xl mx-auto overflow-hidden h-full",
        "bg-gradient-to-b from-lightBlue to-white"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mb-8">{open ? <Logo /> : <LogoIcon />}</div>

            <div className="flex flex-col gap-2">
              {links.map((link, idx) => {
                const isActive =
                  link.href === "#" ? false : pathname === link.href;
                return (
                  <SidebarLink
                    key={idx}
                    link={link}
                    className={cn(
                      "transition-all duration-200 rounded-lg py-2",
                      "hover:bg-blue-50",
                      link.label === "Logout"
                        ? "text-red-500 hover:bg-red-50"
                        : "text-gray-700",
                      isActive && "bg-blue-100 text-blue-600 font-medium"
                    )}
                    onClick={link.onClick}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-auto">
            {user.id && (
              <div className=" bg-white/40 backdrop-blur-sm rounded-full shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : user.email?.charAt(0).toUpperCase()}
                  </div>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col"
                    >
                      <span className="text-sm font-medium text-gray-900">
                        {user.name || "User"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user.email}
                      </span>
                    </motion.div>
                  )}
                </div>
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
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative"
    >
      <Image
        src="/logo-facesearch.svg"
        alt="FaceSearch AI Logo"
        width={40}
        height={40}
        className="object-contain rounded-lg"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-black  whitespace-pre"
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
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative"
    >
      <Image
        src="/logo-facesearch.svg"
        alt="FaceSearch AI Logo"
        width={40}
        height={40}
        className="object-contain rounded-lg"
      />
    </Link>
  );
};
