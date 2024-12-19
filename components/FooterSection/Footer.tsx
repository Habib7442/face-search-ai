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
    <div className="w-full h-full px-4">
  <footer className="bg-gradient-to-b rounded-2xl from-secondary text-gray-800 shadow-md">
    {/* Main Footer Content */}
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info Section */}
        <div className="space-y-4">
          <Link href="/" className="block">
            <div className="relative h-12 w-48">
              <Image
                src="/logo-facesearch.png"
                alt="FaceSearch AI Logo"
                fill
                className="object-contain bg-slate-950 w-12 h-12 rounded-md"
              />
            </div>
          </Link>
          <p className="text-gray-600">
            Revolutionizing face matching technology with advanced AI solutions
            for a more connected and secure future.
          </p>
          <div className="flex space-x-4 mt-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Linkedin, href: "#" },
            ].map(({ icon: Icon, href }, index) => (
              <Link
                key={index}
                href={href}
                className="hover:text-blue-500 transition-colors"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "About", "Features", "Pricing", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 text-gray-600">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span>123 AI Street, Tech Valley, CA 94043</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-600">
              <Phone className="h-5 w-5 text-blue-500" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-600">
              <Mail className="h-5 w-5 text-blue-500" />
              <span>support@facesearch.ai</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Newsletter</h3>
          <p className="text-gray-600 mb-4">
            Subscribe to our newsletter for the latest updates and features.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <Button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg shadow-md"
            >
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-200">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 text-sm text-center md:text-left">
            © {new Date().getFullYear()} FaceSearch AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
            ].map(({ label, href }, index) => (
              <Link
                key={index}
                href={href}
                className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
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
