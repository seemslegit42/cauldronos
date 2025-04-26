import React, { createContext, useContext, useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { tokens } from '../design-system/tokens';

interface MotionContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  getTransitionDefaults: (type?: 'default' | 'fast' | 'slow' | 'bounce' | 'elastic') => {
    type: string;
    duration: number;
    ease: string | number[];
  };
}

const defaultContext: MotionContextType = {
  reducedMotion: false,
  toggleReducedMotion: () => {},
  getTransitionDefaults: () => ({
    type: 'tween',
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1], // easeInOut
  }),
};

const MotionContext = createContext<MotionContextType>(defaultContext);

export const useMotion = () => useContext(MotionContext);

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for user's reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const getTransitionDefaults = (type: 'default' | 'fast' | 'slow' | 'bounce' | 'elastic' = 'default') => {
    // Convert string easings to arrays for Framer Motion
    const easings = {
      linear: [0, 0, 1, 1],
      easeIn: [0.4, 0, 1, 1],
      easeOut: [0, 0, 0.2, 1],
      easeInOut: [0.4, 0, 0.2, 1],
      bounce: [0.175, 0.885, 0.32, 1.275],
      elastic: [0.68, -0.55, 0.265, 1.55],
    };

    switch (type) {
      case 'fast':
        return {
          type: 'tween',
          duration: 0.2,
          ease: easings.easeOut,
        };
      case 'slow':
        return {
          type: 'tween',
          duration: 0.5,
          ease: easings.easeInOut,
        };
      case 'bounce':
        return {
          type: 'spring',
          duration: 0.5,
          bounce: 0.25,
          ease: easings.bounce,
        };
      case 'elastic':
        return {
          type: 'spring',
          duration: 0.6,
          bounce: 0.4,
          ease: easings.elastic,
        };
      default:
        return {
          type: 'tween',
          duration: 0.3,
          ease: easings.easeInOut,
        };
    }
  };

  const value = {
    reducedMotion,
    toggleReducedMotion,
    getTransitionDefaults,
  };

  return (
    <MotionContext.Provider value={value}>
      <MotionConfig
        reducedMotion={reducedMotion ? 'always' : 'never'}
        transition={{
          ...getTransitionDefaults(),
        }}
      >
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
};

export default MotionProvider;