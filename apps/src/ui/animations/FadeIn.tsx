import React from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { transitions } from './transitions';
import { useMotion } from './MotionProvider';

export interface FadeInProps {
  children: React.ReactNode;
  show?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  motionProps?: MotionProps;
  as?: React.ElementType;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  show = true,
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

  const variants = {
    ...transitions.fadeIn,
    visible: {
      ...transitions.fadeIn.visible,
      transition: {
        ...transitions.fadeIn.visible.transition,
        duration: duration || transitions.defaults.duration,
        delay,
      },
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

export default FadeIn;