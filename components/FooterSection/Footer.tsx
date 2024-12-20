"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Youtube,
  XIcon,
} from "lucide-react";
import { IconBrandTelegram, IconBrandTiktok } from "@tabler/icons-react";

const Footer = () => {
  return (
    <div className="w-full px-4 py-8 bg-light-background dark:bg-dark-background">
      <footer className="bg-slate-50/80 dark:bg-[#0c1222]/50 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-white/10 overflow-hidden">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Company Info Section */}
            <div className="md:col-span-4 space-y-8">
              <Link href="/" className="block">
                <div className="relative h-12 w-48">
                  <Image
                    src="/logo-facesearch.svg"
                    alt="FaceSearch AI Logo"
                    fill
                    className="object-contain dark:bg-slate-950 rounded-md"
                  />
                </div>
              </Link>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
                Revolutionizing face matching technology with advanced AI
                solutions for a more connected and secure future.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: IconBrandTiktok, href: "https://www.tiktok.com/@facesearchai/video/7432635005890743595", label: "TikTok" },
                  { icon: Linkedin, href: "https://www.linkedin.com/feed/update/urn:li:activity:7258436636349235201", label: "LinkedIn" },
                  { icon: XIcon, href: "https://twitter.com/FacesearchAI/status/1852667105914609805", label: "X (Twitter)" },
                  { icon: Facebook, href: "https://www.facebook.com/reel/1782310318840217", label: "Facebook" },
                  { icon: Instagram, href: "https://www.instagram.com/reel/DB3dz_zoKqG/", label: "Instagram" },
                  { icon: Youtube, href: "https://www.youtube.com/shorts/6ftL04hu0u0", label: "YouTube" },
                ].map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="p-2.5 rounded-full bg-white/50 dark:bg-white/5 hover:bg-blue-100 dark:hover:bg-white/10 text-blue-600 dark:text-blue-400 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="md:col-span-3 space-y-8">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {["Home", "About", "Features", "Pricing", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center group"
                      >
                        <span className="relative overflow-hidden inline-block">
                          <span className="absolute bottom-0 h-[1px] w-full bg-blue-600 dark:bg-blue-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                          {item}
                        </span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="md:col-span-5">
              <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 space-y-8 md:space-y-0">
                {/* Contact Section */}
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    Contact Us
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-4 group">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-slate-600 dark:text-slate-300">
                        support@facesearch.ai
                      </span>
                    </li>
                    <li className="flex items-center space-x-4 group">
                      <IconBrandTelegram className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      <a href="https://t.me/facesearchaibot" className="text-slate-600 dark:text-slate-300">
                        @facesearch_ai bot
                      </a>
                    </li>
                  </ul>
                </div>

                {/* App Store Buttons */}
                <div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    Download Our App
                  </h3>
                  <div className="flex flex-col">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.facesearch.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-105 w-full"
                    >
                      <Image
                        src="/google-badge.svg"
                        alt="Google Play Store"
                        width={100}
                        height={100}
                        className="h-[120px] w-full"
                      />
                    </a>
                    <a
                      href="https://apps.apple.com/us/app/face-search-ai-pimeyes/id6504996249"
                      className="transition-transform hover:scale-105 w-full"
                    >
                      <Image
                        src="/apple-badge.svg"
                        alt="Apple App Store"
                        width={100}
                        height={100}
                        className="h-[120px] w-full"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02]">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                © {new Date().getFullYear()} FaceSearch AI. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Cookie Policy", href: "/cookies" },
                ].map(({ label, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
