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
              " backdrop-blur-xl border border-white/50 rounded-2xl hover:shadow-md",
              "relative overflow-hidden",
              className
          )}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-lightBlue to-white opacity-50 animate-bubble-background" />
        {children}
      </motion.div>
  );
}