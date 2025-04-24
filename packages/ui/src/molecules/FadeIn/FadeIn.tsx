import React from 'react';
import { motion } from 'framer-motion';
import { transitions } from '../../animations/transitions';

export interface FadeInProps {
  /**
   * The content to be animated
   */
  children: React.ReactNode;
  
  /**
   * The duration of the animation in seconds
   * @default 0.5
   */
  duration?: number;
  
  /**
   * The delay before the animation starts in seconds
   * @default 0
   */
  delay?: number;
  
  /**
   * Custom style for the container
   */
  style?: React.CSSProperties;
  
  /**
   * Custom class name for the container
   */
  className?: string;
}

/**
 * FadeIn component
 * 
 * A simple wrapper component that fades in its children.
 */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 0.5,
  delay = 0,
  style,
  className,
}) => {
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration,
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeVariants}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};