// Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Logo from "../Logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange(() => setScrolled(scrollY.get() > 20));
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : " bg-[#F0F4FA]/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Navigation Links */}
          <NavLinks />

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>

      {/* Animated Border Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className={`h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.nav>
  );
};

export default Navbar;
