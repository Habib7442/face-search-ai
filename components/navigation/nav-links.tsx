"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs"; // Import UserButton and useUser

const links = [
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#benefits", label: "Benefits" },
  { href: "#faq", label: "FAQ" },
];

export function NavLinks() {
  const { isSignedIn } = useUser(); // Get the user signed-in status

  return (
    <div className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-gray-300 hover:text-white transition-colors"
        >
          {link.label}
        </Link>
      ))}
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
              avatarBox: "w-8 h-8 border border-gray-300 rounded-full",
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
