"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs"; // Import UserButton and useUser

const links = [
  { href: "/view-reviews", label: "Reviews" },
  { href: "/reviews", label: "Give Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function NavLinks() {
  const { isSignedIn } = useUser(); // Get the user signed-in status

  return (
    <div className="hidden md:flex items-center justify-between w-full">
      
      <div className="flex justify-center items-center space-x-8 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-slate-900 hover:text-black font-bold transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
      
      {/* Other elements remain aligned as before */}
      <Link href="/payment">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium"
        >
          Buy Plan
        </motion.button>
      </Link>
      {isSignedIn ? (
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8 border border-gray-300 rounded-full ml-2",
            },
          }}
        />
      ) : (
        <Link
          href="/sign-in"
          className="text-sm px-4 py-2 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:text-white transition-colors"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}
