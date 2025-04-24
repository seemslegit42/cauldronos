import React, { useState } from 'react';
import { Card, CardProps } from 'antd';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { useAccessibility } from '../../hooks/useAccessibility';

export interface AnimatedCardProps extends CardProps {
  /**
   * Animation variant to use
   * @default "hover"
   */
  animationVariant?: 'hover' | 'pulse' | 'glow' | 'none';

  /**
   * Whether to animate on mount
   * @default true
   */
  animateOnMount?: boolean;

  /**
   * Animation delay in seconds
   * @default 0
   */
  delay?: number;

  /**
   * Custom hover animation values
   */
  hoverAnimation?: {
    scale?: number;
    y?: number;
    rotate?: number;
  };
}

/**
 * AnimatedCard component
 *
 * An enhanced Card component with fluid animations and micro-interactions.
 */
export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  animationVariant = 'hover',
  animateOnMount = true,
  delay = 0,
  hoverAnimation,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { token } = useTheme();

  // Use accessibility hook to check for reduced motion preference
  const { reducedMotionEnabled } = useAccessibility();

  // Default animation variants
  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      scale: hoverAnimation?.scale || 1.02,
      y: hoverAnimation?.y || -5,
      rotate: hoverAnimation?.rotate || 0,
      boxShadow: `0 10px 30px -10px rgba(0,0,0,0.2), 0 0 10px ${token.colorPrimary}20`,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    pulse: {
      scale: [1, 1.01, 1],
      boxShadow: [
        `0 5px 15px -5px rgba(0,0,0,0.1)`,
        `0 10px 25px -5px rgba(0,0,0,0.2), 0 0 10px ${token.colorPrimary}30`,
        `0 5px 15px -5px rgba(0,0,0,0.1)`
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }
    },
    glow: {
      boxShadow: [
        `0 5px 15px -5px rgba(0,0,0,0.1)`,
        `0 5px 15px -5px rgba(0,0,0,0.1), 0 0 20px ${token.colorPrimary}50`,
        `0 5px 15px -5px rgba(0,0,0,0.1)`
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }
    }
  };

  // Get the appropriate animation variant
  const getAnimationState = () => {
    // If reduced motion is enabled or animations are disabled, return minimal animations
    if (reducedMotionEnabled || !animateOnMount) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
      };
    }

    if (animationVariant === 'none') {
      return { initial: false };
    }

    if (animationVariant === 'hover') {
      return {
        initial: 'hidden',
        animate: 'visible',
        whileHover: 'hover',
        variants
      };
    }

    return {
      initial: 'hidden',
      animate: ['visible', animationVariant],
      whileHover: 'hover',
      variants
    };
  };

  return (
    <motion.div
      {...getAnimationState()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: token.borderRadius,
        willChange: 'transform, box-shadow',
        transformOrigin: 'center center'
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <Card
        className={className}
        tabIndex={0}
        role="article"
        aria-label={typeof props.title === 'string' ? props.title : 'Card'}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
