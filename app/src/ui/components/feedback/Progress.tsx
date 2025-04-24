import React from 'react';
import { Progress as AntProgress } from 'antd';
import type { ProgressProps } from 'antd';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import classNames from 'classnames';
import './styles/Progress.css';

export interface EnhancedProgressProps extends ProgressProps {
  variant?: 'default' | 'cyber' | 'terminal' | 'glass';
  glowEffect?: boolean;
  animated?: boolean;
  pulseEffect?: boolean;
}

/**
 * Enhanced Progress component with cyberpunk styling options
 */
const Progress: React.FC<EnhancedProgressProps> = ({
  variant = 'default',
  glowEffect = false,
  animated = true,
  pulseEffect = false,
  className,
  ...props
}) => {
  const { isDarkMode, glowEffectsEnabled } = useUIStore();
  
  // Apply glow effect only if enabled in UI settings
  const shouldGlow = glowEffect && glowEffectsEnabled;
  
  const progressClass = classNames(
    className,
    {
      'cauldron-progress': true,
      'cauldron-progress-cyber': variant === 'cyber',
      'cauldron-progress-terminal': variant === 'terminal',
      'cauldron-progress-glass': variant === 'glass',
      'cauldron-progress-glow': shouldGlow,
      'cauldron-progress-pulse': pulseEffect,
      'cauldron-progress-dark': isDarkMode,
      'cauldron-progress-light': !isDarkMode,
    }
  );
  
  // Animation variants
  const progressAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  return animated ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={progressAnimation}
    >
      <AntProgress
        className={progressClass}
        {...props}
      />
    </motion.div>
  ) : (
    <AntProgress
      className={progressClass}
      {...props}
    />
  );
};

export default Progress;