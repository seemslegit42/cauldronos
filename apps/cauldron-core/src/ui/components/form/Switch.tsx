import React from 'react';
import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from 'antd';
import { motion } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';

export interface SwitchProps extends AntSwitchProps {
  animated?: boolean;
  cyberpunk?: boolean;
}

/**
 * Enhanced Switch component with animation support
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ animated = true, cyberpunk = false, className = '', ...props }, ref) => {
    const { reducedMotion } = useMotion();
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return (
        <AntSwitch 
          ref={ref} 
          className={`
            enhanced-switch 
            ${cyberpunk ? 'cyberpunk-switch' : ''} 
            ${className}
          `} 
          {...props} 
        />
      );
    }

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'inline-block' }}
      >
        <AntSwitch 
          ref={ref} 
          className={`
            enhanced-switch 
            ${cyberpunk ? 'cyberpunk-switch' : ''} 
            ${className}
          `} 
          {...props} 
        />
      </motion.div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;