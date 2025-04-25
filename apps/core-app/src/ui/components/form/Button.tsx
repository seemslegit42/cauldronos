import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { motion } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';

export interface ButtonProps extends AntButtonProps {
  animated?: boolean;
  glowOnHover?: boolean;
  cyberpunk?: boolean;
}

/**
 * Enhanced Button component with animation support
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    animated = true, 
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
        <AntButton 
          ref={ref} 
          className={`
            enhanced-button 
            ${glowOnHover ? 'glow-on-hover' : ''} 
            ${cyberpunk ? 'cyberpunk-button' : ''} 
            ${className}
          `} 
          {...props}
        >
          {children}
        </AntButton>
      );
    }

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <AntButton 
          ref={ref} 
          className={`
            enhanced-button 
            ${glowOnHover ? 'glow-on-hover' : ''} 
            ${cyberpunk ? 'cyberpunk-button' : ''} 
            ${className}
          `} 
          {...props}
        >
          {children}
        </AntButton>
      </motion.div>
    );
  }
);

Button.displayName = 'Button';

export default Button;