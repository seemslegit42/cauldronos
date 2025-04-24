import React from 'react';
import { motion } from 'framer-motion';
import { transitions } from '../../animations/transitions';

export interface SlideInProps {
  /**
   * The content to be animated
   */
  children: React.ReactNode;
  
  /**
   * The direction of the slide animation
   * @default "up"
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  
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
   * The distance to slide in pixels
   * @default 20
   */
  distance?: number;
  
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
 * SlideIn component
 * 
 * A wrapper component that slides in its children from a specified direction.
 */
export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'up',
  duration = 0.5,
  delay = 0,
  distance = 20,
  style,
  className,
}) => {
  // Define initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  const slideVariants = {
    hidden: getInitialPosition(),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom ease for smooth slide
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideVariants}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};