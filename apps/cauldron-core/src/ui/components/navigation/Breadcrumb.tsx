import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import classNames from 'classnames';
import './styles/Breadcrumb.css';

export interface EnhancedBreadcrumbProps extends BreadcrumbProps {
  variant?: 'default' | 'cyber' | 'terminal' | 'glass';
  glowOnHover?: boolean;
  animated?: boolean;
}

/**
 * Enhanced Breadcrumb component with cyberpunk styling options
 */
const Breadcrumb: React.FC<EnhancedBreadcrumbProps> = ({
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
  
  const breadcrumbClass = classNames(
    className,
    {
      'cauldron-breadcrumb': true,
      'cauldron-breadcrumb-cyber': variant === 'cyber',
      'cauldron-breadcrumb-terminal': variant === 'terminal',
      'cauldron-breadcrumb-glass': variant === 'glass',
      'cauldron-breadcrumb-glow': shouldGlow,
      'cauldron-breadcrumb-dark': isDarkMode,
      'cauldron-breadcrumb-light': !isDarkMode,
    }
  );
  
  // Animation variants
  const breadcrumbAnimation = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 }
  };
  
  // Wrap children with animation if enabled
  const animatedChildren = animated ? React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    
    return (
      <motion.div variants={itemAnimation} style={{ display: 'inline-block' }}>
        {child}
      </motion.div>
    );
  }) : children;
  
  return animated ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={breadcrumbAnimation}
    >
      <AntBreadcrumb
        className={breadcrumbClass}
        {...props}
      >
        {animatedChildren}
      </AntBreadcrumb>
    </motion.div>
  ) : (
    <AntBreadcrumb
      className={breadcrumbClass}
      {...props}
    >
      {children}
    </AntBreadcrumb>
  );
};

export default Breadcrumb;