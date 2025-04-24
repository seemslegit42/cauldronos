import React from 'react';
import { Menu as AntMenu, MenuProps as AntMenuProps } from 'antd';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';

export interface MenuProps extends AntMenuProps {
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to animate menu items on mount
   * @default false
   */
  animated?: boolean;
  
  /**
   * Animation delay between menu items in seconds
   * @default 0.05
   */
  staggerDelay?: number;
  
  /**
   * Whether to apply a glow effect on hover
   * @default false
   */
  glowOnHover?: boolean;
  
  /**
   * Whether to apply a glitch effect on select
   * @default false
   */
  glitchOnSelect?: boolean;
  
  /**
   * Whether to show hover indicators
   * @default true
   */
  showHoverIndicators?: boolean;
}

/**
 * Enhanced Menu component with animation and styling options
 */
export const Menu: React.FC<MenuProps> = ({
  cyberpunk = false,
  animated = false,
  staggerDelay = 0.05,
  glowOnHover = false,
  glitchOnSelect = false,
  showHoverIndicators = true,
  className = '',
  children,
  ...props
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled, createAriaAttributes } = useAccessibility();
  
  // Create ARIA attributes for the menu
  const ariaAttributes = createAriaAttributes({
    role: 'menu',
  });
  
  // Get class names based on props
  const getClassNames = () => {
    return [
      className,
      cyberpunk ? 'cyberpunk-menu' : '',
      glowOnHover ? 'glow-on-hover' : '',
      glitchOnSelect ? 'glitch-on-select' : '',
      showHoverIndicators ? 'show-hover-indicators' : '',
    ].filter(Boolean).join(' ');
  };
  
  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotionEnabled || !animated) {
    return (
      <AntMenu
        className={getClassNames()}
        {...props}
        {...ariaAttributes}
      >
        {children}
      </AntMenu>
    );
  }
  
  // Process children to add animations
  const processChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      
      // If it's a Menu.Item, wrap it with motion
      if (child.type === AntMenu.Item) {
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: index * staggerDelay,
                },
              },
            }}
          >
            {React.cloneElement(child, {
              ...child.props,
              className: `${child.props.className || ''} ${cyberpunk ? 'cyberpunk-menu-item' : ''} ${glowOnHover ? 'glow-on-hover-item' : ''}`,
            })}
          </motion.div>
        );
      }
      
      // If it's a Menu.SubMenu, process its children recursively
      if (child.type === AntMenu.SubMenu) {
        return React.cloneElement(child, {
          ...child.props,
          className: `${child.props.className || ''} ${cyberpunk ? 'cyberpunk-submenu' : ''} ${glowOnHover ? 'glow-on-hover-submenu' : ''}`,
          children: processChildren(child.props.children),
        });
      }
      
      // If it's a Menu.ItemGroup, process its children recursively
      if (child.type === AntMenu.ItemGroup) {
        return React.cloneElement(child, {
          ...child.props,
          className: `${child.props.className || ''} ${cyberpunk ? 'cyberpunk-item-group' : ''}`,
          children: processChildren(child.props.children),
        });
      }
      
      // If it has children, process them recursively
      if (child.props.children) {
        return React.cloneElement(child, {
          ...child.props,
          children: processChildren(child.props.children),
        });
      }
      
      return child;
    });
  };
  
  return (
    <AntMenu
      className={getClassNames()}
      {...props}
      {...ariaAttributes}
    >
      {processChildren(children)}
    </AntMenu>
  );
};

// Re-export Menu components
Menu.Item = AntMenu.Item;
Menu.SubMenu = AntMenu.SubMenu;
Menu.ItemGroup = AntMenu.ItemGroup;
Menu.Divider = AntMenu.Divider;

export default Menu;
