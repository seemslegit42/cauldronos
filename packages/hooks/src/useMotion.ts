import { useCallback } from 'react';
import type { Variants } from 'framer-motion';

/**
 * Hook for creating staggered animation variants
 * @param staggerChildren Delay between children animations
 * @param delayChildren Initial delay before starting animations
 * @returns Framer Motion variants object
 */
export const useStaggerAnimation = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

/**
 * Hook for creating fade-in animation variants
 * @param duration Animation duration
 * @returns Framer Motion variants object
 */
export const useFadeAnimation = (duration = 0.3): Variants => {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration },
    },
  };
};

/**
 * Hook for creating slide-in animation variants
 * @param direction Direction to slide from ('left', 'right', 'top', 'bottom')
 * @param distance Distance to slide (in pixels)
 * @param duration Animation duration
 * @returns Framer Motion variants object
 */
export const useSlideAnimation = (
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  distance = 20,
  duration = 0.3
): Variants => {
  const getInitialPosition = useCallback(() => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0 };
      case 'right':
        return { x: distance, y: 0 };
      case 'top':
        return { x: 0, y: -distance };
      case 'bottom':
        return { x: 0, y: distance };
      default:
        return { x: -distance, y: 0 };
    }
  }, [direction, distance]);

  return {
    hidden: { opacity: 0, ...getInitialPosition() },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration },
    },
  };
};