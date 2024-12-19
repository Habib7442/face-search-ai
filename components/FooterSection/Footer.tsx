"use client";

import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    setEmail("");
  };

  return (
    <div className="w-full px-4 py-8 mt-10">
      <footer className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100/50 overflow-hidden">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info Section */}
            <div className="space-y-6">
              <Link href="/" className="block">
                <div className="relative h-12 w-48">
                  <Image
                    src="/logo-facesearch.png"
                    alt="FaceSearch AI Logo"
                    fill
                    className="object-contain bg-slate-950 rounded-md"
                  />
                </div>
              </Link>
              <p className="text-gray-600 leading-relaxed">
                Revolutionizing face matching technology with advanced AI
                solutions for a more connected and secure future.
              </p>
              <div className="flex space-x-5">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map(({ icon: Icon, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {["Home", "About", "Features", "Pricing", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group"
                      >
                        <ArrowRight className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:ml-0 group-hover:opacity-100 transition-all duration-300" />
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Contact Us
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4 group">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-600 leading-relaxed">
                    123 AI Street, Tech Valley, CA 94043
                  </span>
                </li>
                <li className="flex items-center space-x-4 group">
                  <Phone className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-4 group">
                  <Mail className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-600">support@facesearch.ai</span>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Newsletter
              </h3>
              <p className="text-gray-600">
                Stay updated with our latest features and releases.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-2.5 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
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
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-300"
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
