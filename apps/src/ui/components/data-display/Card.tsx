import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import { motion } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';

export interface CardProps extends AntCardProps {
  animated?: boolean;
  hoverable?: boolean;
  glowOnHover?: boolean;
  cyberpunk?: boolean;
}

/**
 * Enhanced Card component with animation support
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    animated = true, 
    hoverable = false,
    glowOnHover = false,
    cyberpunk = false,
    className = '', 
    children, 
    ...props 
  }, ref) => {
    const { reducedMotion } = useMotion();
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return (
        <AntCard 
          ref={ref} 
          hoverable={hoverable}
          className={`
            enhanced-card 
            ${glowOnHover ? 'glow-on-hover' : ''} 
            ${cyberpunk ? 'cyberpunk-card' : ''} 
            ${className}
          `} 
          {...props}
        >
          {children}
        </AntCard>
      );
    }

    return (
      <motion.div
        whileHover={hoverable ? { y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' } : undefined}
        transition={{ duration: 0.3 }}
      >
        <AntCard 
          ref={ref} 
          hoverable={false} // We're handling hover effects with motion
          className={`
            enhanced-card 
            ${glowOnHover ? 'glow-on-hover' : ''} 
            ${cyberpunk ? 'cyberpunk-card' : ''} 
            ${className}
          `} 
          {...props}
        >
          {children}
        </AntCard>
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// Re-export sub-components
Card.Grid = AntCard.Grid;
Card.Meta = AntCard.Meta;

export default Card;