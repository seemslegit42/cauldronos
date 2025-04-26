import { Variants } from 'framer-motion';
import { tokens } from '../design-system/tokens';

/**
 * Transition presets for Framer Motion animations
 */

// Basic transition settings
export const transitionDefaults = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1], // easeInOut
};

export const transitionFast = {
  duration: 0.2,
  ease: [0, 0, 0.2, 1], // easeOut
};

export const transitionSlow = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1], // easeInOut
};

export const springTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

export const bounceTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 10,
};

// Fade variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: transitionDefaults,
  },
  exit: { 
    opacity: 0,
    transition: transitionFast,
  },
};

// Slide variants
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitionDefaults,
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: transitionFast,
  },
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitionDefaults,
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: transitionFast,
  },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitionDefaults,
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: transitionFast,
  },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitionDefaults,
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: transitionFast,
  },
};

// Scale variants
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitionDefaults,
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: transitionFast,
  },
};

// Stagger children variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitionDefaults,
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: transitionFast,
  },
};

// Modal/dialog variants
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      ...transitionDefaults,
      duration: 0.4,
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 10,
    transition: transitionFast,
  },
};

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: { 
    opacity: 0,
    transition: {
      delay: 0.1,
      duration: 0.2,
    },
  },
};

// Drawer variants
export const drawerRightVariants: Variants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      ...transitionDefaults,
      duration: 0.4,
    },
  },
  exit: { 
    opacity: 0, 
    x: '100%',
    transition: {
      ...transitionFast,
      duration: 0.3,
    },
  },
};

export const drawerLeftVariants: Variants = {
  hidden: { opacity: 0, x: '-100%' },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      ...transitionDefaults,
      duration: 0.4,
    },
  },
  exit: { 
    opacity: 0, 
    x: '-100%',
    transition: {
      ...transitionFast,
      duration: 0.3,
    },
  },
};

export const drawerTopVariants: Variants = {
  hidden: { opacity: 0, y: '-100%' },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      ...transitionDefaults,
      duration: 0.4,
    },
  },
  exit: { 
    opacity: 0, 
    y: '-100%',
    transition: {
      ...transitionFast,
      duration: 0.3,
    },
  },
};

export const drawerBottomVariants: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      ...transitionDefaults,
      duration: 0.4,
    },
  },
  exit: { 
    opacity: 0, 
    y: '100%',
    transition: {
      ...transitionFast,
      duration: 0.3,
    },
  },
};

// Page transition variants
export const pageTransitionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Notification variants
export const notificationVariants: Variants = {
  hidden: { opacity: 0, y: -20, x: 0 },
  visible: { 
    opacity: 1, 
    y: 0, 
    x: 0,
    transition: springTransition,
  },
  exit: { 
    opacity: 0, 
    x: 100,
    transition: {
      ...transitionFast,
      duration: 0.2,
    },
  },
};

// Tooltip variants
export const tooltipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.15,
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: {
      duration: 0.1,
    },
  },
};

// Dropdown/menu variants
export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -5, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: { 
    opacity: 0, 
    y: -5, 
    scale: 0.98,
    transition: {
      duration: 0.15,
    },
  },
};

// Hover/tap animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 },
};

// Cyberpunk-specific animations
export const glitchVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  glitch: {
    x: [0, -2, 2, -2, 2, 0],
    y: [0, 2, -2, 2, -2, 0],
    transition: {
      duration: 0.3,
      repeat: 0,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const scanlineVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: { 
    opacity: 0.05, 
    scaleY: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const pulseGlowVariants: Variants = {
  hidden: { opacity: 0.5 },
  visible: { 
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

// Export all transitions
export const transitions = {
  defaults: transitionDefaults,
  fast: transitionFast,
  slow: transitionSlow,
  spring: springTransition,
  bounce: bounceTransition,
  fadeIn: fadeInVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  scale: scaleVariants,
  staggerContainer: staggerContainerVariants,
  staggerItem: staggerItemVariants,
  modal: modalVariants,
  modalBackdrop: modalBackdropVariants,
  drawerRight: drawerRightVariants,
  drawerLeft: drawerLeftVariants,
  drawerTop: drawerTopVariants,
  drawerBottom: drawerBottomVariants,
  page: pageTransitionVariants,
  notification: notificationVariants,
  tooltip: tooltipVariants,
  dropdown: dropdownVariants,
  hover: hoverScale,
  tap: tapScale,
  glitch: glitchVariants,
  scanline: scanlineVariants,
  pulseGlow: pulseGlowVariants,
};

export default transitions;