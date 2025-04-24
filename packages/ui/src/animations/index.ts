// Export animation components and utilities
export * from './transitions';
export * from './FadeIn';
export * from './SlideIn';
export * from './ScaleIn';
export * from './Stagger';
export * from './PageTransition';
export * from './AnimatedModal';
export * from './AnimatedDrawer';
export * from './MotionProvider';
export * from './hooks';

// Re-export motion from framer-motion for convenience
export {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
  useSpring,
  useCycle,
  useInView,
  useScroll,
  useVelocity
} from 'framer-motion';
