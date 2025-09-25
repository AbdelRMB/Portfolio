import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedRouteProps {
  children: ReactNode;
}

// Variants d'animation pour chaque page
const routeVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
    rotateX: -15,
    y: 50
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    rotateX: 0,
    y: 0
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
    rotateX: -10,
    y: 20
  }
};

const routeTransition = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 20,
  duration: 0.6
};

export default function AnimatedRoute({ children }: AnimatedRouteProps) {
  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={routeTransition}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}