"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { clearUser } from "@/lib/redux/slices/userSlice";
import { useAppSelector } from "@/lib/redux";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  { href: "/view-reviews", label: "Reviews" },
  { href: "/reviews", label: "Give Review" },
  { href: "/upload", label: "Dashboard" },
  // { href: "#faq", label: "FAQ" },
];

export function NavLinks() {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    // Clear redux state
    dispatch(clearUser());
    
    // Clear cookies
    document.cookie = "client_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Clear localStorage
    localStorage.removeItem('user');
    
    // Redirect to login
    router.push('/auth');
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="hidden md:flex items-center justify-between w-full">
      <div className="flex justify-center items-center space-x-8 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-md text-primary hover:text-primary-hover transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link href="/payment">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 mx-1 rounded-full bg-primary  text-white text-sm font-medium"
        >
          Buy Plan
        </motion.button>
      </Link>

      <div className="flex items-center space-x-4">
        {user.id ? (
          <>
            {/* <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : user.email?.charAt(0).toUpperCase()}
              </div>
            </div> */}
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-full text-white bg-red-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/auth"
            className="text-sm px-4 py-2 rounded-full text-white bg-primary hover:text-white transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}