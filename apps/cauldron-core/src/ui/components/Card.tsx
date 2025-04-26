import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import { motion } from 'framer-motion';
import { useMotion } from '../animations/MotionProvider';
import { transitions } from '../animations/transitions';

export interface CardProps extends AntCardProps {
  animated?: boolean;
  variant?: 'default' | 'cyber' | 'terminal' | 'glass';
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'border' | 'none';
  glitchOnHover?: boolean;
}

const MotionCard = motion(AntCard);

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    animated = true, 
    variant = 'default', 
    hoverEffect = 'none',
    glitchOnHover = false,
    className = '',
    ...props 
  }, ref) => {
    const { reducedMotion } = useMotion();
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return (
        <AntCard
          ref={ref}
          className={`${getVariantClass(variant)} ${getHoverClass(hoverEffect)} ${className}`}
          {...props}
        />
      );
    }

    // Define hover animation based on the hover effect
    const hoverAnimation = getHoverAnimation(hoverEffect, glitchOnHover);

    return (
      <MotionCard
        ref={ref}
        className={`${getVariantClass(variant)} ${getHoverClass(hoverEffect)} ${className}`}
        whileHover={hoverAnimation}
        transition={{ duration: 0.3 }}
        {...props}
      />
    );
  }
);

// Helper function to get the appropriate class based on variant
function getVariantClass(variant: CardProps['variant']): string {
  switch (variant) {
    case 'cyber':
      return 'cauldron-card';
    case 'terminal':
      return 'terminal';
    case 'glass':
      return 'glass-card';
    default:
      return '';
  }
}

// Helper function to get the appropriate class based on hover effect
function getHoverClass(hoverEffect: CardProps['hoverEffect']): string {
  switch (hoverEffect) {
    case 'glow':
      return 'hover-glow';
    case 'border':
      return 'hover-border';
    default:
      return '';
  }
}

// Helper function to get the appropriate hover animation
function getHoverAnimation(hoverEffect: CardProps['hoverEffect'], glitchOnHover: boolean) {
  if (glitchOnHover) {
    return transitions.glitch.visible;
  }

  switch (hoverEffect) {
    case 'lift':
      return { y: -8, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' };
    case 'scale':
      return { scale: 1.02 };
    case 'glow':
      // The glow effect is handled via CSS
      return { scale: 1.01 };
    case 'border':
      // The border effect is handled via CSS
      return { scale: 1.01 };
    default:
      return {};
  }
}

Card.displayName = 'Card';

// Re-export Meta component
Card.Meta = AntCard.Meta;

export default Card;