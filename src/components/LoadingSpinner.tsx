import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="relative">

        <Film className="w-12 h-12 text-gold" />
      </motion.div>
      <p className="mt-4 text-text-secondary animate-pulse">
        Loading cinema...
      </p>
    </div>);

}