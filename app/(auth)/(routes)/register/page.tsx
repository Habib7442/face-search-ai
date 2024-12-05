import { RegisterForm } from "@/components/RegistrationForm";
import Image from "next/image";
import React from "react";

const Register = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Decorative Background */}
      <div className="hidden md:flex w-1/2 relative">
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="background"
            className="object-cover"
            fill
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027]/90 via-[#203a43]/80 to-[#2c5364]/70" />
        </div>
        <div className="relative z-10 text-center  px-12 flex flex-col justify-center items-center h-full">
          <h1 className="playfair-display-sc-bold text-white text-4xl font-bold mb-4">FaceSearch AI</h1>
          <p className="text-xl mb-6 playfair-display-sc-regular text-blue-100">
            Discover the future of facial recognition and contact discovery.
            Join us to unlock the potential of advanced AI technology!
          </p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full md:w-1/2 bg-gradient-to-b flex items-center justify-center dark:from-gray-900 dark:to-gray-800 p-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
