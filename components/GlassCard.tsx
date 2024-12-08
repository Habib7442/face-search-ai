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
        "border border-white/30 rounded-2xl shadow-lg", // Subtle border and shadow
        "hover:shadow-xl transition-shadow duration-300 ease-in-out", // Hover effect
        className
      )}
    >
      {/* Gradient background overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/50 to-transparent opacity-50" />
      {children}
    </motion.div>
  );
}
