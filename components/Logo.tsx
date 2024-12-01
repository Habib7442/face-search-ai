import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Image
          src="/logo-facesearch.jpeg"
          alt="FaceSearch AI Logo"
          width={40} // Set a specific width
          height={40} // Set a specific height
          className="object-contain"
        />
      </motion.div>
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        FaceSearchAI
      </span>
    </Link>
  );
};

export default Logo;
