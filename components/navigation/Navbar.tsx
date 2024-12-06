"use client";

import Logo from "../Logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";


const Navbar = () => {
  return (
    <nav className="z-50 lg:bg-gradient-to-b from-[#dfd0ee] to-[#cce7ff] lg:rounded-3xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavLinks />
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}

export default Navbar