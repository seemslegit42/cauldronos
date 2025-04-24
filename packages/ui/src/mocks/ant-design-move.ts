import React from 'react';
import { motion } from 'framer-motion';
import { Input, Button } from 'antd';

// Mock AnimatedInput component
export const AnimatedInput = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  const MotionInput = motion(Input);
  
  return (
    <MotionInput
      ref={ref}
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  );
});

// Mock AnimatedButton component
export const AnimatedButton = React.forwardRef<HTMLButtonElement, any>((props, ref) => {
  const MotionButton = motion(Button);
  
  return (
    <MotionButton
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  );
});

AnimatedInput.displayName = 'AnimatedInput';
AnimatedButton.displayName = 'AnimatedButton';

export default {
  AnimatedInput,
  AnimatedButton
};
