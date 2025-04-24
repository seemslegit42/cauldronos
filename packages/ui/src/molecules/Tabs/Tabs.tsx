import React from 'react';
import { Tabs as AntTabs, TabsProps as AntTabsProps } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';

export interface TabsProps extends AntTabsProps {
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Animation type for tab content
   * @default 'fade'
   */
  animationType?: 'fade' | 'slide' | 'scale' | 'none';
  
  /**
   * Whether to apply a glow effect
   * @default false
   */
  glow?: boolean;
  
  /**
   * Whether to apply a glitch effect on tab change
   * @default false
   */
  glitchOnChange?: boolean;
}

/**
 * Enhanced Tabs component with animation and styling options
 */
export const Tabs: React.FC<TabsProps> = ({
  cyberpunk = false,
  animationType = 'fade',
  glow = false,
  glitchOnChange = false,
  className = '',
  children,
  ...props
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled, createAriaAttributes, createTabAriaAttributes } = useAccessibility();
  
  // Create ARIA attributes for the tabs
  const ariaAttributes = createAriaAttributes({
    role: 'tablist',
  });
  
  // Get animation variants based on animation type
  const getAnimationVariants = () => {
    if (reducedMotionEnabled || animationType === 'none') {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      };
    }
    
    switch (animationType) {
      case 'fade':
        return transitions.fadeIn;
      case 'slide':
        return transitions.slideUp;
      case 'scale':
        return transitions.scale;
      default:
        return transitions.fadeIn;
    }
  };
  
  // Get class names based on props
  const getClassNames = () => {
    return [
      className,
      cyberpunk ? 'cyberpunk-tabs' : '',
      glow ? 'glow-effect' : '',
      glitchOnChange ? 'glitch-effect' : '',
    ].filter(Boolean).join(' ');
  };
  
  // Custom tab content renderer with animations
  const renderTabBar = (tabBarProps: any, DefaultTabBar: any) => {
    return (
      <DefaultTabBar
        {...tabBarProps}
        className={`${tabBarProps.className} ${getClassNames()}`}
      />
    );
  };
  
  // Custom tab content renderer with animations
  const renderTabContent = ({ children, activeKey }: { children: React.ReactNode; activeKey: string }) => {
    if (reducedMotionEnabled || animationType === 'none') {
      return children;
    }
    
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          {...getAnimationVariants()}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  };
  
  return (
    <AntTabs
      {...props}
      className={getClassNames()}
      renderTabBar={renderTabBar}
      children={children}
      {...ariaAttributes}
    />
  );
};

// Re-export TabPane component
Tabs.TabPane = AntTabs.TabPane;

export default Tabs;
