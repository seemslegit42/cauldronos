import React from 'react';
import { Input as AntInput, InputProps as AntInputProps, InputRef } from 'antd';
import { motion } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';

export interface InputProps extends AntInputProps {
  animated?: boolean;
  status?: 'error' | 'warning';
}

/**
 * Enhanced Input component with animation support
 */
export const Input = React.forwardRef<InputRef, InputProps>(
  ({ animated = true, className = '', ...props }, ref) => {
    const { reducedMotion } = useMotion();
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return <AntInput ref={ref} className={`enhanced-input ${className}`} {...props} />;
    }

    return (
      <motion.div
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <AntInput ref={ref} className={`enhanced-input ${className}`} {...props} />
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Enhanced Password Input component with animation support
 */
export const Password = React.forwardRef<InputRef, InputProps>(
  ({ animated = true, className = '', ...props }, ref) => {
    const { reducedMotion } = useMotion();
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return <AntInput.Password ref={ref} className={`enhanced-input-password ${className}`} {...props} />;
    }

    return (
      <motion.div
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <AntInput.Password ref={ref} className={`enhanced-input-password ${className}`} {...props} />
      </motion.div>
    );
  }
);

Password.displayName = 'Password';

/**
 * Enhanced TextArea component with animation support
 */
export const TextArea = React.forwardRef<InputRef, InputProps>(
  ({ animated = true, className = '', ...props }, ref) => {
    const { reducedMotion } = useMotion();
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return <AntInput.TextArea ref={ref} className={`enhanced-textarea ${className}`} {...props} />;
    }

    return (
      <motion.div
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <AntInput.TextArea ref={ref} className={`enhanced-textarea ${className}`} {...props} />
      </motion.div>
    );
  }
);

TextArea.displayName = 'TextArea';

// Export all components
Input.Password = Password;
Input.TextArea = TextArea;

export default Input;