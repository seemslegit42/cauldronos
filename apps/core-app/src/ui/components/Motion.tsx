import React from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { clsx } from 'clsx';

/**
 * Fade animation component
 */
export const Fade: React.FC<{
  children: React.ReactNode;
  show?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  motionProps?: MotionProps;
}> = ({ 
  children, 
  show = true, 
  duration = 0.3, 
  delay = 0, 
  className,
  motionProps = {}
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, delay }}
          className={className}
          {...motionProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Slide animation component
 */
export const Slide: React.FC<{
  children: React.ReactNode;
  show?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
  motionProps?: MotionProps;
}> = ({ 
  children, 
  show = true, 
  direction = 'up', 
  distance = 20, 
  duration = 0.3, 
  delay = 0,
  className,
  motionProps = {}
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, ...getInitialPosition() }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, ...getInitialPosition() }}
          transition={{ duration, delay }}
          className={className}
          {...motionProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Scale animation component
 */
export const Scale: React.FC<{
  children: React.ReactNode;
  show?: boolean;
  initialScale?: number;
  duration?: number;
  delay?: number;
  className?: string;
  motionProps?: MotionProps;
}> = ({ 
  children, 
  show = true, 
  initialScale = 0.95, 
  duration = 0.3, 
  delay = 0,
  className,
  motionProps = {}
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: initialScale }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: initialScale }}
          transition={{ duration, delay }}
          className={className}
          {...motionProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Staggered animation component for lists
 */
export const StaggeredList: React.FC<{
  children: React.ReactNode[];
  show?: boolean;
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  className?: string;
  itemClassName?: string;
  motionProps?: MotionProps;
}> = ({ 
  children, 
  show = true, 
  staggerDelay = 0.05, 
  duration = 0.3, 
  delay = 0,
  className,
  itemClassName,
  motionProps = {}
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={className}
          {...motionProps}
        >
          {React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ duration }}
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

/**
 * Hover animation component
 */
export const Hover: React.FC<{
  children: React.ReactNode;
  scale?: number;
  className?: string;
  motionProps?: MotionProps;
}> = ({ 
  children, 
  scale = 1.05,
  className,
  motionProps = {}
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

/**
 * Tap animation component
 */
export const Tap: React.FC<{
  children: React.ReactNode;
  scale?: number;
  className?: string;
  motionProps?: MotionProps;
}> = ({ 
  children, 
  scale = 0.95,
  className,
  motionProps = {}
}) => {
  return (
    <motion.div
      whileTap={{ scale }}
      transition={{ duration: 0.1 }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

/**
 * Combined hover and tap animation component
 */
export const Interactive: React.FC<{
  children: React.ReactNode;
  hoverScale?: number;
  tapScale?: number;
  className?: string;
  motionProps?: MotionProps;
}> = ({ 
  children, 
  hoverScale = 1.05,
  tapScale = 0.95,
  className,
  motionProps = {}
}) => {
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{ duration: 0.2 }}
      className={clsx('interactive', className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

/**
 * Scroll animation component
 */
export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  motionProps?: MotionProps;
}> = ({ 
  children, 
  direction = 'up', 
  distance = 50, 
  duration = 0.5, 
  delay = 0,
  threshold = 0.1,
  className,
  motionProps = {}
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default {
  Fade,
  Slide,
  Scale,
  StaggeredList,
  Hover,
  Tap,
  Interactive,
  ScrollReveal,
};