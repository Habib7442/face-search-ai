"use client";

import { motion } from "framer-motion";
import { Github, Facebook, Linkedin, Mail } from "lucide-react";

const iconVariants = {
  hover: { scale: 1.1, rotate: 5 },
  tap: { scale: 0.95 }
};

export function SocialIcons() {
  return (
    <div className="flex gap-4 my-6">
      {[
        { Icon: Mail, color: "text-red-500" },
        { Icon: Facebook, color: "text-blue-600" },
        { Icon: Github, color: "text-gray-800" },
        { Icon: Linkedin, color: "text-blue-500" }
      ].map(({ Icon, color }, index) => (
        <motion.a
          key={index}
          href="#"
          className={`w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center ${color} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Icon size={20} />
        </motion.a>
      ))}
    </div>
  );
}