import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale';
  cyberpunk?: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  type = 'fade',
  cyberpunk = false
}) => {
  let variants = {};
  
  switch (type) {
    case 'fade':
      variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };
      break;
    case 'slide':
      variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 }
      };
      break;
    case 'scale':
      variants = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
      };
      break;
    default:
      variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };
  }
  
  // Add cyberpunk effect if enabled
  if (cyberpunk) {
    variants = {
      ...variants,
      animate: {
        ...variants.animate,
        transition: {
          duration: 0.4,
          ease: [0.19, 1, 0.22, 1]
        }
      }
    };
  }
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
