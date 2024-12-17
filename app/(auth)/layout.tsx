import { HomeIcon } from "lucide-react";
import Link from "next/link";

const AuthLayout = ({ children }: any) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen ">
      {/* Home Button */}
      <div className="absolute top-4 left-4">
        <Link href="/">
          <div className="p-3 rounded-full bg-[#007BFF]/10 hover:bg-[#007BFF]/20 transition-all duration-300 shadow-md">
            <HomeIcon className="h-8 w-8 text-[#007BFF]" />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="w-full max-w-md p-4">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
