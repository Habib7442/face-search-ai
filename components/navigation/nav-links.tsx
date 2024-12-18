"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, RootState } from "@/lib/redux";
import { clearUser } from "@/lib/redux/slices/userSlice";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Dashboard" },
  // { href: "/pricing", label: "Pricing" },
  { href: "/reviews", label: "Feedback" },
];

export const NavLinks = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    router.push('/sign-in');
  };

  const handleLogout = () => {
    // Clear redux state
    dispatch(clearUser());

    // Clear cookies
    document.cookie = "client_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear localStorage
    localStorage.removeItem("user");

    // Show success message
    toast.success('Logged out successfully');

    // Redirect to login
    router.push("/sign-in");
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="hidden lg:flex items-center space-x-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="relative group"
        >
          <span className={`text-sm font-medium transition-colors duration-300 ${
            pathname === link.href 
              ? "text-indigo-600" 
              : "text-slate-600 hover:text-slate-900"
          }`}>
            {link.label}
          </span>
          
          {/* Animated underline */}
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          
          {/* Active indicator */}
          {pathname === link.href && (
            <motion.span
              layoutId="activeNav"
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600"
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      ))}

      {/* Conditional Button: Show Logout if user is logged in, otherwise show Get Started */}
      {user.id ? (
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </motion.button>
      ) : (
        <motion.button
          onClick={handleGetStarted}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Get Started
        </motion.button>
      )}
    </div>
  );
};
