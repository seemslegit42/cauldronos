import React, { useState } from 'react';
import { ProLayout as AntProLayout, ProLayoutProps as AntProLayoutProps } from '@ant-design/pro-components';
import { useThemeStore } from '@/styles/themeStore';
import { motion, AnimatePresence } from 'framer-motion';
import { transitions } from '@/ui/animations/transitions';

export interface ProLayoutProps extends AntProLayoutProps {
  animated?: boolean;
  cyberpunk?: boolean;
}

/**
 * Enhanced ProLayout component with animation support
 * Wraps Ant Design Pro's ProLayout with animations and theme integration
 */
export const ProLayout: React.FC<ProLayoutProps> = ({
  animated = true,
  cyberpunk = false,
  className = '',
  children,
  ...props
}) => {
  const { getEffectiveMode } = useThemeStore();
  const isDarkMode = getEffectiveMode() === 'dark';
  const [collapsed, setCollapsed] = useState(false);

  // Handle menu collapse
  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    if (props.onCollapse) {
      props.onCollapse(collapsed);
    }
  };

  return (
    <AntProLayout
      className={`
        enhanced-pro-layout 
        ${cyberpunk ? 'cyberpunk-pro-layout' : ''} 
        ${className}
      `}
      navTheme={isDarkMode ? 'dark' : 'light'}
      colorPrimary={isDarkMode ? '#3DAA9D' : '#3DAA9D'}
      collapsed={collapsed}
      onCollapse={handleCollapse}
      {...props}
    >
      {animated ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${collapsed ? 'collapsed' : 'expanded'}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={transitions.fadeIn}
            style={{ height: '100%' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      ) : (
        children
      )}
    </AntProLayout>
  );
};

export default ProLayout;