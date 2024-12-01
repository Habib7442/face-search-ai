import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative w-full h-full p-4 flex justify-center items-center">
      {/* Background Image with Overlay */}
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

      {/* SignIn Content */}
      <div className="relative z-10 text-center space-y-6 p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl">
        {/* <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 drop-shadow-lg">
          Sign Up to FaceSearch AI
        </h1> */}
        <SignUp />
      </div>
    </div>
  );
}
