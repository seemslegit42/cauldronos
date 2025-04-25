import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { motion } from 'framer-motion';
import { useMotion } from '../animations/MotionProvider';
import { transitions } from '../animations/transitions';

export interface ButtonProps extends AntButtonProps {
  animated?: boolean;
  variant?: 'default' | 'primary' | 'cyber' | 'ghost' | 'text';
  glowOnHover?: boolean;
  glitchOnHover?: boolean;
}

const MotionButton = motion(AntButton);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    animated = true, 
    variant = 'default', 
    glowOnHover = false,
    glitchOnHover = false,
    className = '',
    ...props 
  }, ref) => {
    const { reducedMotion } = useMotion();
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return (
        <AntButton
          ref={ref}
          className={`${getVariantClass(variant)} ${glowOnHover ? 'glow-hover' : ''} ${className}`}
          {...props}
        />
      );
    }

    return (
      <MotionButton
        ref={ref}
        className={`${getVariantClass(variant)} ${glowOnHover ? 'glow-hover' : ''} ${className}`}
        whileHover={glitchOnHover ? transitions.glitch.visible : transitions.hover}
        whileTap={transitions.tap}
        transition={{ duration: 0.2 }}
        {...props}
      />
    );
  }
);

// Helper function to get the appropriate class based on variant
function getVariantClass(variant: ButtonProps['variant']): string {
  switch (variant) {
    case 'cyber':
      return 'cyber-button';
    case 'ghost':
      return 'ghost-button';
    case 'text':
      return 'text-button';
    default:
      return '';
  }
}

Button.displayName = 'Button';

export default Button;
