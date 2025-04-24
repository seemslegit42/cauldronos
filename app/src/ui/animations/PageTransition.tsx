import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { transitions } from './transitions';
import { useMotion } from './MotionProvider';

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  motionProps?: MotionProps;
}

/**
 * Page transition component for smooth transitions between pages/routes
 * Wrap your page content with this component to add transition effects
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
  motionProps = {},
}) => {
  const { reducedMotion } = useMotion();
  
  // Skip animation if reduced motion is enabled
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={transitions.page}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;