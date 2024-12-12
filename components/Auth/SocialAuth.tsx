import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconBrandGoogle } from '@tabler/icons-react';

export function SocialAuth() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
          <Button
            variant="outline"
            className="h-11 w-full gap-2"
            onClick={() => {}}
          >
            <IconBrandGoogle className="h-5 w-5 text-blue-600" />
            <span className="hidden sm:inline">Google</span>
          </Button>
        </motion.div>
        {/* <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
          <Button
            variant="outline"
            className="h-11 w-full gap-2"
            onClick={() => {}}
          >
            <Github className="h-5 w-5" />
            <span className="hidden sm:inline">GitHub</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
          <Button
            variant="outline"
            className="h-11 w-full gap-2"
            onClick={() => {}}
          >
            <Linkedin className="h-5 w-5 text-blue-500" />
            <span className="hidden sm:inline">LinkedIn</span>
          </Button>
        </motion.div> */}
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  );
}