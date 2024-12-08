"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-900 hover:text-slate-800"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 z-20 left-0 right-0 bg-blue-50"
          >
            <div className="p-4 space-y-4">
              
              <Link
                href="/view-reviews"
                className="block text-gray-800 hover:text-black"
              >
                Reviews
              </Link>
              
              <a href="#faq" className="block text-gray-800 hover:text-black">
                FAQ
              </a>
              <Link href="/payment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 mt-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium"
                >
                  Buy Plan
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
