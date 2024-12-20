"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignUp = async () => {
    try {
      window.location.href = "/api/auth/google";
    } catch (error) {
      toast.error("Failed to initialize Google Sign Up");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Account created successfully!");
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 dark:opacity-50" />

      <div className="max-w-md w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="group relative bg-white/80 dark:bg-[#0c1222]/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/[0.2] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
        >
          {/* Glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/20 dark:from-white/[0.02] dark:via-transparent dark:to-white/[0.02] group-hover:opacity-100 opacity-0 transition-opacity duration-300" />

          <div className="relative">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-blue-200">
                Create Account
              </h2>
              <p className="text-slate-600 dark:text-blue-100/80 mt-2">
                Join our community today
              </p>
            </div>

            {/* Google Sign Up Button */}
            <div className="mb-8">
              <button
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 group"
              >
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-medium">Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-[#0c1222] text-slate-500 dark:text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-white mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={form.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-white mb-1"
                  >
                    Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 dark:text-white mb-1"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      value={form.password}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="Create a password"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="rounded-md border-slate-300 dark:border-slate-600 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white py-2.5 px-4 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Create Account"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}