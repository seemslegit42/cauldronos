import React, { useState, useEffect } from 'react';
import { motion, MotionProps, AnimatePresence } from 'framer-motion';
import { transitions } from './transitions';
import { useMotion } from './MotionProvider';
import { useSwipe } from './hooks/useGesture';

export interface PageTransitionProps {
  /**
   * Children to render
   */
  children: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Additional motion props
   */
  motionProps?: MotionProps;

  /**
   * Transition type
   * @default "fade"
   */
  type?: 'fade' | 'slide' | 'scale' | 'flip' | 'blur' | 'perspective' | 'swipe';

  /**
   * Direction for slide transitions
   * @default "up"
   */
  direction?: 'up' | 'down' | 'left' | 'right';

  /**
   * Whether to enable gesture-based navigation
   * @default false
   */
  gestureEnabled?: boolean;

  /**
   * Callback when swiped left
   */
  onSwipeLeft?: () => void;

  /**
   * Callback when swiped right
   */
  onSwipeRight?: () => void;

  /**
   * Callback when swiped up
   */
  onSwipeUp?: () => void;

  /**
   * Callback when swiped down
   */
  onSwipeDown?: () => void;

  /**
   * Unique key for the page (for AnimatePresence)
   */
  pageKey?: string;

  /**
   * Whether to apply 3D perspective
   * @default false
   */
  perspective?: boolean;

  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
}

/**
 * Enhanced page transition component for smooth transitions between pages/routes
 * Supports multiple transition types and gesture-based navigation
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
  motionProps = {},
  type = 'fade',
  direction = 'up',
  gestureEnabled = false,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  pageKey,
  perspective = false,
  cyberpunk = false,
}) => {
  const { reducedMotion } = useMotion();
  const [isVisible, setIsVisible] = useState(false);

  // Set visible after mount for entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Configure swipe handlers
  const swipeHandlers = useSwipe(
    {
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown,
    },
    {
      threshold: 50,
      velocity: 0.3,
    }
  );

  // Skip animation if reduced motion is enabled
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Get the appropriate variants based on type and direction
  const getVariants = () => {
    switch (type) {
      case 'slide':
        switch (direction) {
          case 'up':
            return transitions.pageSlideUp;
          case 'down':
            return transitions.slideDown;
          case 'left':
            return transitions.slideLeft;
          case 'right':
            return transitions.slideRight;
          default:
            return transitions.pageSlideUp;
        }
      case 'scale':
        return transitions.pageFadeScale;
      case 'flip':
        return transitions.pageFlip;
      case 'blur':
        return transitions.blur;
      case 'perspective':
        return transitions.perspective;
      case 'swipe':
        return direction === 'left' ? transitions.swipeLeft : transitions.swipeRight;
      default:
        return transitions.page;
    }
  };

  // Apply perspective style if needed
  const perspectiveStyle = perspective ? {
    perspective: '1000px',
    transformStyle: 'preserve-3d',
  } : {};

  // Apply cyberpunk style if needed
  const cyberpunkStyle = cyberpunk ? {
    boxShadow: isVisible ? '0 0 15px rgba(0, 240, 255, 0.5)' : 'none',
    transition: 'box-shadow 0.3s ease',
  } : {};

  const content = (
    <motion.div
      className={`page-transition ${className} ${cyberpunk ? 'cyberpunk' : ''}`}
      variants={getVariants()}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      exit="exit"
      style={{
        width: '100%',
        height: '100%',
        ...perspectiveStyle,
        ...cyberpunkStyle,
      }}
      {...(gestureEnabled ? swipeHandlers : {})}
      {...motionProps}
    >
      {children}
    </motion.div>
  );

  // If pageKey is provided, wrap with AnimatePresence for key-based transitions
  if (pageKey) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key={pageKey} style={{ width: '100%', height: '100%' }}>
          {content}
        </motion.div>
      </AnimatePresence>
    );
  }

  return content;
};

export default PageTransition;