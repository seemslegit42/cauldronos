import React from 'react';
import { Alert as AntAlert } from 'antd';
import type { AlertProps } from 'antd';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import classNames from 'classnames';
import './styles/Alert.css';

export interface EnhancedAlertProps extends AlertProps {
  variant?: 'default' | 'cyber' | 'terminal' | 'glass';
  glowEffect?: boolean;
  animated?: boolean;
}

/**
 * Enhanced Alert component with cyberpunk styling options
 */
const Alert: React.FC<EnhancedAlertProps> = ({
  variant = 'default',
  glowEffect = false,
  animated = true,
  className,
  ...props
}) => {
  const { isDarkMode, glowEffectsEnabled } = useUIStore();
  
  // Apply glow effect only if enabled in UI settings
  const shouldGlow = glowEffect && glowEffectsEnabled;
  
  const alertClass = classNames(
    className,
    {
      'cauldron-alert': true,
      'cauldron-alert-cyber': variant === 'cyber',
      'cauldron-alert-terminal': variant === 'terminal',
      'cauldron-alert-glass': variant === 'glass',
      'cauldron-alert-glow': shouldGlow,
      'cauldron-alert-dark': isDarkMode,
      'cauldron-alert-light': !isDarkMode,
    }
  );
  
  // Animation variants
  const alertAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
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
      variants={alertAnimation}
    >
      <AntAlert
        className={alertClass}
        {...props}
      />
    </motion.div>
  ) : (
    <AntAlert
      className={alertClass}
      {...props}
    />
  );
};

export default Alert;