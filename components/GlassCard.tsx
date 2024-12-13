"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden backdrop-blur-lg bg-white/20", // Frosted effect
        "rounded-2xl", // Subtle border and shadow
        " duration-300 ease-in-out", // Hover effect
        className
      )}
    >
      {/* Gradient background overlay */}
      {/* <div className="absolute inset-0 -z-10 " /> */}
      {children}
    </motion.div>
  );
}
