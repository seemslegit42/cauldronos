import React from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import { motion } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';
import { transitions } from '@/ui/animations/transitions';

export interface SelectProps extends AntSelectProps {
  animated?: boolean;
}

/**
 * Enhanced Select component with animation support
 */
export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ animated = true, className = '', dropdownClassName = '', ...props }, ref) => {
    const { reducedMotion } = useMotion();
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return (
        <AntSelect 
          ref={ref} 
          className={`enhanced-select ${className}`} 
          popupClassName={`enhanced-select-dropdown ${dropdownClassName}`}
          {...props} 
        />
      );
    }

    return (
      <motion.div
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <AntSelect 
          ref={ref} 
          className={`enhanced-select ${className}`} 
          popupClassName={`enhanced-select-dropdown ${dropdownClassName}`}
          dropdownAnimation={{
            name: 'antFadeIn',
            enterFromStyle: { opacity: 0, transform: 'translateY(-5px)' },
            enterActiveStyle: { opacity: 1, transform: 'translateY(0)' },
            leaveActiveStyle: { opacity: 0, transform: 'translateY(-5px)' },
            leaveToStyle: { opacity: 0, transform: 'translateY(-5px)' },
          }}
          {...props} 
        />
      </motion.div>
    );
  }
);

Select.displayName = 'Select';

// Re-export Option component
Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;

export default Select;