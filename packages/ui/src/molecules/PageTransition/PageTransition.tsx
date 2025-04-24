import React from 'react';
import { motion } from 'framer-motion';
import { transitions } from '../../animations/transitions';

export interface PageTransitionProps {
  /**
   * The content to be animated
   */
  children: React.ReactNode;
  
  /**
   * The transition variant to use
   * @default "fade"
   */
  variant?: 'fade' | 'slide' | 'scale' | 'flip' | 'perspective' | 'blur' | 'elastic';
  
  /**
   * The direction for slide transitions
   * @default "up"
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  
  /**
   * The duration of the transition in seconds
   * @default 0.5
   */
  duration?: number;
  
  /**
   * Whether to stagger child animations
   * @default false
   */
  staggerChildren?: boolean;
  
  /**
   * The delay between staggered children in seconds
   * @default 0.1
   */
  staggerDelay?: number;
  
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
 * PageTransition component
 * 
 * A wrapper component that adds smooth transitions to page content
 * using Framer Motion animations.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  variant = 'fade',
  direction = 'up',
  duration = 0.5,
  staggerChildren = false,
  staggerDelay = 0.1,
  style,
  className,
}) => {
  // Select the appropriate transition variant
  const getVariants = () => {
    switch (variant) {
      case 'slide':
        switch (direction) {
          case 'up': return transitions.slideUpVariants;
          case 'down': return transitions.slideDownVariants;
          case 'left': return transitions.slideLeftVariants;
          case 'right': return transitions.slideRightVariants;
          default: return transitions.slideUpVariants;
        }
      case 'scale': return transitions.scaleVariants;
      case 'flip':
        return direction === 'left' || direction === 'right' 
          ? transitions.flipYVariants 
          : transitions.flipXVariants;
      case 'perspective': return transitions.perspectiveVariants;
      case 'blur': return transitions.blurVariants;
      case 'elastic': return transitions.elasticScaleVariants;
      case 'fade':
      default: return transitions.fadeInVariants;
    }
  };

  // Get container variants for staggering children
  const containerVariants = staggerChildren ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: staggerDelay,
        duration: duration,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        staggerChildren: staggerDelay / 2,
        staggerDirection: -1,
        duration: duration / 2,
      },
    },
  } : getVariants();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      style={style}
      className={className}
    >
      {staggerChildren ? (
        React.Children.map(children, (child) => (
          <motion.div variants={getVariants()}>
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};