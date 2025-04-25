import React from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { transitions } from './transitions';
import { useMotion } from './MotionProvider';

export interface ScaleInProps {
  children: React.ReactNode;
  show?: boolean;
  initialScale?: number;
  duration?: number;
  delay?: number;
  className?: string;
  motionProps?: MotionProps;
  as?: React.ElementType;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  show = true,
  initialScale = 0.95,
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
    ...transitions.scale,
    hidden: {
      ...transitions.scale.hidden,
      scale: initialScale,
    },
    visible: {
      ...transitions.scale.visible,
      transition: {
        ...transitions.scale.visible.transition,
        duration: duration || transitions.defaults.duration,
        delay,
      },
    },
    exit: {
      ...transitions.scale.exit,
      scale: initialScale,
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

export default ScaleIn;