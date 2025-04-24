import React from 'react';
import { motion } from 'framer-motion';
import { transitions } from '../../animations/transitions';

export interface StaggerProps {
  /**
   * The children to be animated in a staggered sequence
   */
  children: React.ReactNode;
  
  /**
   * The delay between each child animation in seconds
   * @default 0.1
   */
  staggerDelay?: number;
  
  /**
   * The initial delay before the first animation starts in seconds
   * @default 0
   */
  initialDelay?: number;
  
  /**
   * The animation variant to apply to each child
   * @default "fade"
   */
  childVariant?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  
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
 * Stagger component
 * 
 * A container component that animates its children in a staggered sequence.
 */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  childVariant = 'fade',
  style,
  className,
}) => {
  // Get the appropriate variant for child animations
  const getChildVariant = () => {
    switch (childVariant) {
      case 'slideUp': return transitions.slideUpVariants;
      case 'slideDown': return transitions.slideDownVariants;
      case 'slideLeft': return transitions.slideLeftVariants;
      case 'slideRight': return transitions.slideRightVariants;
      case 'scale': return transitions.scaleVariants;
      case 'fade':
      default: return transitions.fadeInVariants;
    }
  };

  // Container variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: initialDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={style}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={getChildVariant()}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};