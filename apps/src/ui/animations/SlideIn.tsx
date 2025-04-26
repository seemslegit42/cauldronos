import React from 'react';
import { motion, AnimatePresence, MotionProps, Variants } from 'framer-motion';
import { transitions } from './transitions';
import { useMotion } from './MotionProvider';

export interface SlideInProps {
  children: React.ReactNode;
  show?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
  motionProps?: MotionProps;
  as?: React.ElementType;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  show = true,
  direction = 'up',
  distance = 20,
  duration,
  delay = 0,
  className = '',
  motionProps = {},
  as = 'div',
}) => {
  const { reducedMotion } = useMotion();
  
  // Skip animation if reduced motion is enabled
  if (reducedMotion) {
    const Component = as;
    return show ? (
      <Component className={className} {...motionProps}>
        {children}
      </Component>
    ) : null;
  }

  // Select the appropriate variant based on direction
  let baseVariants: Variants;
  switch (direction) {
    case 'down':
      baseVariants = transitions.slideDown;
      break;
    case 'left':
      baseVariants = transitions.slideLeft;
      break;
    case 'right':
      baseVariants = transitions.slideRight;
      break;
    case 'up':
    default:
      baseVariants = transitions.slideUp;
      break;
  }

  // Customize the distance if needed
  const variants: Variants = {
    ...baseVariants,
    hidden: {
      ...baseVariants.hidden,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    },
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVariants.visible.transition,
        duration: duration || transitions.defaults.duration,
        delay,
      },
    },
    exit: {
      ...baseVariants.exit,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    },
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className={className}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          {...motionProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideIn;