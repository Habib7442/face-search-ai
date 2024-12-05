"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

export function AuthToggle({ isLogin, onToggle }: AuthToggleProps) {
  return (
    <motion.div
      initial={false}
      animate={{ x: isLogin ? 0 : "100%" }}
      className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8 flex flex-col items-center justify-center transform transition-transform duration-500 ease-in-out rounded-l-[100px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">
          {isLogin ? "Hello, Friend!" : "Welcome Back!"}
        </h2>
        <p className="text-gray-200 mb-8">
          {isLogin
            ? "Register with your personal details to use all of site features"
            : "Enter your personal details to use all of site features"}
        </p>
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white/10"
          onClick={onToggle}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </Button>
      </motion.div>
    </motion.div>
  );
}