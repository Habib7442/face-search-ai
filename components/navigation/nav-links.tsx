"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { clearUser } from "@/lib/redux/slices/userSlice";
import { useAppSelector } from "@/lib/redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOutIcon } from "lucide-react";

const links = [
  { href: "/reviews", label: "Give Review" },
  { href: "/upload", label: "Dashboard" },
  {
    href: "https://play.google.com/store/apps/details?id=com.facesearch.app&hl=en_IN",
    label: "Download app",
  },
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
    document.cookie =
      "client_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear localStorage
    localStorage.removeItem("user");

    // Redirect to login
    router.push("/sign-in");
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  const linkStyles =
    "relative text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2";
  const linkHoverStyles =
    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300";

  return (
    <div className="hidden md:flex items-center justify-between w-full">
      <div className="flex justify-center items-center space-x-6 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${linkStyles} ${linkHoverStyles}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        {/* <Link href="/payment">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            Buy Plan
          </motion.button>
        </Link> */}

        {user.id ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
          >
            <div
              className="p-3 rounded-full bg-red-300 hover:bg-[#FF3B3B]/20
 transition-all duration-300 shadow-md"
            >
              <LogOutIcon className="h-5 w-5 text-black" />
            </div>
          </motion.button>
        ) : (
          <Link href="/sign-in">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              Sign In
            </motion.button>
          </Link>
        )}
      </div>
    </div>
  );
}
