"use client";

import { LoginForm } from "@/components/LoginForm";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Decorative Background */}
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br">
        <div className="absolute inset-0">
          <Image
            src="/hero2.jpg"
            alt="Facial recognition technology"
            className="object-cover opacity-50" // Slightly lighter for better visibility
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027]/60 via-[#203a43]/50 to-[#2c5364]/40" />
        </div>

        <div className="relative z-10 text-center flex flex-col items-center justify-center h-full w-full">
          <h1 className="playfair-display-sc-bold text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome Back
          </h1>
          <p className="playfair-display-sc-regular text-blue-100  text-lg max-w-sm">
            Sign in to continue to your account
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:from-gray-900 dark:to-gray-800 bg-gradient-to-b p-8">
        <div className="w-full max-w-md">
          {/* Centered Lock Icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <Lock className="h-10 w-10" />
            </div>
          </div>

          <div className="bg-white bg-gradient-to-b dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8">
            <LoginForm />

            <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center group"
              >
                Register here
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
