import React from 'react';
import { Checkbox as AntCheckbox, CheckboxProps as AntCheckboxProps } from 'antd';
import { motion } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';

export interface CheckboxProps extends AntCheckboxProps {
  animated?: boolean;
}

/**
 * Enhanced Checkbox component with animation support
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ animated = true, className = '', children, ...props }, ref) => {
    const { reducedMotion } = useMotion();
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return (
        <AntCheckbox 
          ref={ref} 
          className={`enhanced-checkbox ${className}`} 
          {...props}
        >
          {children}
        </AntCheckbox>
      );
    }

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'inline-block' }}
      >
        <AntCheckbox 
          ref={ref} 
          className={`enhanced-checkbox ${className}`} 
          {...props}
        >
          {children}
        </AntCheckbox>
      </motion.div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Re-export Group component
Checkbox.Group = AntCheckbox.Group;

export default Checkbox;