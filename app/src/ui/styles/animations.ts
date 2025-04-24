// Animation durations (in seconds)
export const durations = {
  fastest: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slowest: 0.8,
};

// Animation easings
export const easings = {
  // Standard easings
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Custom easings
  easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  easeInOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  easeInCirc: 'cubic-bezier(0.55, 0, 1, 0.45)',
  easeOutCirc: 'cubic-bezier(0, 0.55, 0.45, 1)',
  easeInOutCirc: 'cubic-bezier(0.85, 0, 0.15, 1)',
  cyberpunk: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
};

// Animation presets for Framer Motion
export const presets = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
  
  // Slide animations
  slideInRight: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
  
  slideInLeft: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
  
  slideInUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
  
  slideInDown: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
  
  // Scale animations
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
  
  // Cyberpunk-themed animations
  glitch: {
    initial: { opacity: 0, x: -2 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 2 },
    transition: { 
      duration: durations.fast,
      ease: easings.cyberpunk,
    },
  },
  
  // Page transitions
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: durations.normal, ease: easings.easeInOut },
  },
  
  // Stagger children
  staggerChildren: {
    animate: { transition: { staggerChildren: 0.07 } },
  },
  
  // Modal animations
  modal: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: durations.normal, ease: easings.easeOut },
  },
};

// CSS keyframes animations
export const keyframes = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  
  slideInRight: `
    @keyframes slideInRight {
      from { transform: translateX(20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  
  pulse: `
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  `,
  
  glitch: `
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
      100% { transform: translate(0); }
    }
  `,
  
  glow: `
    @keyframes glow {
      0% { box-shadow: 0 0 5px rgba(0, 240, 255, 0.5); }
      50% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.8); }
      100% { box-shadow: 0 0 5px rgba(0, 240, 255, 0.5); }
    }
  `,
};

// Animation utilities
export const animations = {
  durations,
  easings,
  presets,
  keyframes,
};

export default animations;
