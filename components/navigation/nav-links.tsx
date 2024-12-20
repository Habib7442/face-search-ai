"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, RootState } from "@/lib/redux";
import { clearUser } from "@/lib/redux/slices/userSlice";
import { LogOut, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const links = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Dashboard" },
  { href: "/reviews", label: "Feedback" },
];

export const NavLinks = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    router.push('/sign-in');
  };

  const handleLogout = () => {
    dispatch(clearUser());
    document.cookie = "client_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    toast.success('Logged out successfully');
    router.push("/sign-in");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="hidden lg:flex items-center w-full">
      {/* Centered Links */}
      <div className="flex-1 flex justify-center items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative group"
          >
            <span className={`text-sm font-medium transition-colors duration-300 ${
              pathname === link.href 
                ? "text-light-primary dark:text-dark-primary" 
                : "text-light-foreground dark:text-dark-foreground hover:text-light-primary dark:hover:text-dark-primary"
            }`}>
              {link.label}
            </span>
            
            {/* Animated underline */}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-light-primary dark:bg-dark-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            
            {/* Active indicator */}
            {pathname === link.href && (
              <motion.span
                layoutId="activeNav"
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-light-primary dark:bg-dark-primary"
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        ))}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 rounded-lg text-light-foreground dark:text-dark-foreground hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
        >
          {mounted && (theme === "dark" ? (
            <Sun className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Moon className="h-5 w-5" strokeWidth={1.5} />
          ))}
        </motion.button>

        {/* Conditional Button */}
        {user.id ? (
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 dark:bg-red-500 rounded-xl hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 shadow-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        ) : (
          <motion.button
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium text-white bg-light-primary dark:bg-dark-primary rounded-xl hover:bg-light-primary/90 dark:hover:bg-dark-primary/90 transition-colors duration-300 shadow-lg"
          >
            Get Started
          </motion.button>
        )}
      </div>
    </div>
  );
};

