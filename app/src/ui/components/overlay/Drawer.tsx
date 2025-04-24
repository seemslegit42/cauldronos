import React from 'react';
import { Drawer as AntDrawer } from 'antd';
import type { DrawerProps } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import classNames from 'classnames';
import './styles/Drawer.css';

export interface EnhancedDrawerProps extends DrawerProps {
  variant?: 'default' | 'cyber' | 'terminal' | 'glass';
  glowEffect?: boolean;
  animated?: boolean;
}

/**
 * Enhanced Drawer component with cyberpunk styling options
 */
const Drawer: React.FC<EnhancedDrawerProps> = ({
  variant = 'default',
  glowEffect = false,
  animated = true,
  className,
  children,
  ...props
}) => {
  const { isDarkMode, glowEffectsEnabled, reducedMotion } = useUIStore();
  
  // Apply glow effect only if enabled in UI settings
  const shouldGlow = glowEffect && glowEffectsEnabled;
  
  // Disable animations if reduced motion is enabled
  const shouldAnimate = animated && !reducedMotion;
  
  const drawerClass = classNames(
    className,
    {
      'cauldron-drawer': true,
      'cauldron-drawer-cyber': variant === 'cyber',
      'cauldron-drawer-terminal': variant === 'terminal',
      'cauldron-drawer-glass': variant === 'glass',
      'cauldron-drawer-glow': shouldGlow,
      'cauldron-drawer-dark': isDarkMode,
      'cauldron-drawer-light': !isDarkMode,
    }
  );
  
  // Animation variants
  const drawerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };
  
  // Wrap children with animation if enabled
  const animatedChildren = shouldAnimate ? (
    <motion.div
      initial={{ opacity: 0, x: props.placement === 'right' ? 20 : props.placement === 'left' ? -20 : 0, y: props.placement === 'top' ? -20 : props.placement === 'bottom' ? 20 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      {children}
    </motion.div>
  ) : children;
  
  return (
    <AntDrawer
      className={drawerClass}
      {...props}
    >
      {animatedChildren}
    </AntDrawer>
  );
};

export default Drawer;