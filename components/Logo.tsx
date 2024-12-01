import { Scan } from 'lucide-react'
import { motion } from "framer-motion";
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Scan className="h-8 w-8 text-blue-500" />
    </motion.div>
    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
      FaceSearchAI
    </span>
  </Link>
  )
}

export default Logo