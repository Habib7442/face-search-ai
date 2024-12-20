"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

// Define the links array
const links = [
  { href: "/reviews", label: "Give Review" },
  { href: "/upload", label: "Dashboard" },
  { href: "https://play.google.com/store/apps/details?id=com.facesearch.app&hl=en_IN", label: "Download app" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <div className="flex items-center gap-2">
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

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-light-foreground dark:text-dark-foreground hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
        >
          {isOpen ? (
            <X className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[80px] left-0 right-0 bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-md shadow-lg border-t border-light-border dark:border-dark-border overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="p-8 space-y-6"
            >
              <div className="flex flex-col items-center space-y-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-light-foreground dark:text-dark-foreground hover:text-light-primary dark:hover:text-dark-primary py-2 transition-colors text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              <div className="pt-6 space-y-4">
                <Link href="/sign-in" className="block" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 rounded-xl bg-light-primary dark:bg-dark-primary text-white text-base font-medium shadow-lg hover:bg-light-primary/90 dark:hover:bg-dark-primary/90 transition-colors"
                  >
                    Sign In
                  </motion.button>
                </Link>
                
                <Link href="/payment" className="block" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 rounded-xl bg-light-accent dark:bg-dark-accent text-white text-base font-medium shadow-lg hover:bg-light-accent/90 dark:hover:bg-dark-accent/90 transition-colors"
                  >
                    Buy Plan
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}