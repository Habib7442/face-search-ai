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
    document.cookie = "client_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon className="h-5 w-5 text-slate-600" />,
    },
    {
      label: "Dashboard",
      href: "/upload",
      icon: <IconBrandTabler className="h-5 w-5 text-slate-600" />,
    },
    {
      label: "Reviews",
      href: "/reviews",
      icon: <NotebookIcon className="h-5 w-5 text-slate-600" />,
    },
    {
      label: "History",
      href: "/history",
      icon: <HistoryIcon className="h-5 w-5 text-slate-600" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconLogout className="h-5 w-5 text-red-500" />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-slate-50/50 to-white/50">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col h-screen">
          <div className="flex flex-col flex-1">
            <div className="mb-8 px-3">{open ? <Logo /> : <LogoIcon />}</div>

            <div className="space-y-2">
              {links.map((link, idx) => {
                const isActive = link.href === "#" ? false : pathname === link.href;
                return (
                  <SidebarLink
                    key={idx}
                    link={link}
                    className={cn(
                      link.label === "Logout" && "text-red-500 hover:bg-red-50",
                      isActive && "bg-indigo-50 text-indigo-600"
                    )}
                  />
                );
              })}
            </div>
          </div>

          {user.id && (
            <div className="mt-auto pt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
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
                      <span className="text-sm font-medium text-slate-900">
                        {user.name || "User"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {user.email}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

// Logo components remain the same
export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo-facesearch.svg"
        alt="FaceSearch AI Logo"
        width={40}
        height={40}
        className="object-contain"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-slate-900"
      >
        FaceSearch AI
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link href="/" className="inline-block">
      <Image
        src="/logo-facesearch.svg"
        alt="FaceSearch AI Logo"
        width={40}
        height={40}
        className="object-contain"
      />
    </Link>
  );
};
