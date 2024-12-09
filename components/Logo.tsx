import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Image
          src="/logo-facesearch.png"
          alt="FaceSearch AI Logo"
          width={40} // Set a specific width
          height={40} // Set a specific height
          className="object-contain rounded-md"
        />
      </motion.div>
      {/* <span className="text-ml font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-slate-900">
        FaceSearch AI
      </span> */}
    </Link>
  );
};

export default Logo;
