import React from 'react';
import { Menu as AntMenu } from 'antd';
import type { MenuProps } from 'antd';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import classNames from 'classnames';
import './styles/Menu.css';

export interface EnhancedMenuProps extends MenuProps {
  variant?: 'default' | 'cyber' | 'terminal' | 'glass';
  glowOnHover?: boolean;
  animated?: boolean;
}

/**
 * Enhanced Menu component with cyberpunk styling options
 */
const Menu: React.FC<EnhancedMenuProps> = ({
  variant = 'default',
  glowOnHover = false,
  animated = true,
  className,
  children,
  ...props
}) => {
  const { isDarkMode, glowEffectsEnabled } = useUIStore();
  
  // Apply glow effect only if enabled in UI settings
  const shouldGlow = glowOnHover && glowEffectsEnabled;
  
  const menuClass = classNames(
    className,
    {
      'cauldron-menu': true,
      'cauldron-menu-cyber': variant === 'cyber',
      'cauldron-menu-terminal': variant === 'terminal',
      'cauldron-menu-glass': variant === 'glass',
      'cauldron-menu-glow': shouldGlow,
      'cauldron-menu-dark': isDarkMode,
      'cauldron-menu-light': !isDarkMode,
    }
  );
  
  // Animation variants
  const menuAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };
  
  // Wrap children with animation if enabled
  const animatedChildren = animated ? React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    
    return (
      <motion.div variants={itemAnimation}>
        {child}
      </motion.div>
    );
  }) : children;
  
  return animated ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={menuAnimation}
    >
      <AntMenu
        className={menuClass}
        theme={isDarkMode ? 'dark' : 'light'}
        {...props}
      >
        {animatedChildren}
      </AntMenu>
    </motion.div>
  ) : (
    <AntMenu
      className={menuClass}
      theme={isDarkMode ? 'dark' : 'light'}
      {...props}
    >
      {children}
    </AntMenu>
  );
};

export default Menu;