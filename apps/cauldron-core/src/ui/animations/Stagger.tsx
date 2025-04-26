import React from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { transitions } from './transitions';
import { useMotion } from './MotionProvider';

export interface StaggerProps {
  children: React.ReactNode[];
  show?: boolean;
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  className?: string;
  itemClassName?: string;
  motionProps?: MotionProps;
  as?: React.ElementType;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  show = true,
  staggerDelay = 0.05,
  duration,
  delay = 0,
  className = '',
  itemClassName = '',
  motionProps = {},
  as = 'div',
}) => {
  const { reducedMotion } = useMotion();
  
  // Skip animation if reduced motion is enabled
  if (reducedMotion) {
    const Component = as;
    return show ? (
      <Component className={className} {...motionProps}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className={itemClassName}>
            {child}
          </div>
        ))}
      </Component>
    ) : null;
  }

  const containerVariants = {
    ...transitions.staggerContainer,
    visible: {
      ...transitions.staggerContainer.visible,
      transition: {
        ...transitions.staggerContainer.visible.transition,
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    ...transitions.staggerItem,
    visible: {
      ...transitions.staggerItem.visible,
      transition: {
        ...transitions.staggerItem.visible.transition,
        duration: duration || transitions.defaults.duration,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className={className}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          {...motionProps}
        >
          {React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={itemClassName}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Stagger;