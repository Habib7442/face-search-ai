"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { clearUser } from "@/lib/redux/slices/userSlice";
import { useAppSelector } from "@/lib/redux";

const links = [
  { href: "/view-reviews", label: "Reviews" },
  { href: "/reviews", label: "Give Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function NavLinks() {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  
  const handleLogout = () => {
    dispatch(clearUser());
  };

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
      
      <Link href="/payment">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium"
        >
          Buy Plan
        </motion.button>
      </Link>
      
      {user.id ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {/* <span className="text-sm font-medium">
              {user.name || user.email}
            </span> */}
            {/* Optional: User avatar or initials */}
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {user.name 
                ? user.name.charAt(0).toUpperCase() 
                : user.email?.charAt(0).toUpperCase()}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/auth"
          className="text-sm px-4 py-2 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:text-white transition-colors"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}