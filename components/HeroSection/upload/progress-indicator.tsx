"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
    progress: number;
}

export const ProgressIndicator = ({ progress }: ProgressIndicatorProps) => {
    return (
        <div className="w-full space-y-2">
            {/* Progress bar with improved height and background color */}
            <Progress
                value={progress}
                className="h-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full"
            />
            <motion.div
                className="flex justify-between text-sm text-gray-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <span>Processing image...</span>
                <span>{progress}%</span>
            </motion.div>
        </div>
    );
};
