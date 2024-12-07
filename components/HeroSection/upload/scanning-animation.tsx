"use client";

import { motion } from "framer-motion";

export const ScanningAnimation = () => {
    return (
        <div className="relative h-full w-full">
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent"
                initial={{ top: "0%" }}
                animate={{
                    top: ["0%", "100%", "0%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <motion.div
                className="absolute inset-0 border-2 border-blue-500"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
};