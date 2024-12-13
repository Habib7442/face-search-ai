import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconBrandGoogle } from '@tabler/icons-react';

export function SocialAuth() {
  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full h-12 bg-white border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200 relative overflow-hidden group"
            onClick={() => {}}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="relative flex items-center justify-center gap-3">
              <IconBrandGoogle className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-500 text-sm flex items-center gap-3">
            <span className="h-px w-6 bg-gray-300" />
            Or continue with email
            <span className="h-px w-6 bg-gray-300" />
          </span>
        </div>
      </div>
    </div>
  );
}