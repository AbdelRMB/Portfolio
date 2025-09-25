import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        when: "beforeChildren" as const,
        staggerChildren: 0.1,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}