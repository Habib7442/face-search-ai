"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Define the links array
const links = [
  { href: "/reviews", label: "Give Review" },
  { href: "/upload", label: "Dashboard" },
  { href: "https://play.google.com/store/apps/details?id=com.facesearch.app&hl=en_IN", label: "Download app" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[80px] left-0 right-0 bg-white shadow-lg border-t border-gray-100 overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="p-6 space-y-4"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 space-y-3">
                <Link href="/sign-in" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium"
                  >
                    Sign In
                  </motion.button>
                </Link>
                
                <Link href="/payment" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium"
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