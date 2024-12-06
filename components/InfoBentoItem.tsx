"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InfoBentoItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function InfoBentoItem({
  title,
  children,
  className,
}: InfoBentoItemProps) {
  return (
    <motion.div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-black dark:border-white/[0.2] bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-4">
        <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</div>
        <div className="text-slate-200">{children}</div>
      </div>
    </motion.div>
  );
}