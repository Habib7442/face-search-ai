import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: ReactNode;
  isSignUp: boolean;
  onToggleMode: () => void;
}

export function AuthLayout({ children, isSignUp, onToggleMode }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col-reverse md:flex-row">
      {/* Left Panel - Appears below on mobile, left on desktop */}
      <div className="relative w-full md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600" />
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-16" />
        <div className="relative flex h-full min-h-[400px] flex-col items-center justify-center px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {isSignUp ? (
              <>
                <h1 className="text-3xl font-extrabold tracking-wide sm:text-4xl">
                  Welcome to Facesearch AI!
                </h1>
                <p className="mt-4 text-base sm:text-lg">
                  Already have an account? Sign in to continue your journey!
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-extrabold tracking-wide sm:text-4xl">
                  Welcome Back!
                </h1>
                <p className="mt-4 text-base sm:text-lg">
                  Don&apos;t have an account yet? Join us today!
                </p>
              </>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleMode}
              className="mt-8 rounded-full bg-white px-8 py-3 font-bold text-green-600 shadow-lg transition-shadow hover:shadow-xl"
            >
              {isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Appears on top for mobile, right for desktop */}
      <div className="w-full md:w-1/2">
        <div className="flex min-h-[600px] flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
          {children}
        </div>
      </div>
    </div>
  );
}