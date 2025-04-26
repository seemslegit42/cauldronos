import React from 'react';
import { motion } from 'framer-motion';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

interface AnimatedMenuItemProps {
  item: MenuItemType;
  collapsed: boolean;
  index: number;
}

const AnimatedMenuItem: React.FC<AnimatedMenuItemProps> = ({ item, collapsed, index }) => {
  // Animation variants for menu items
  const menuItemVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        delay: index * 0.05 // Staggered animation
      }
    },
    collapsed: {
      opacity: collapsed ? 0.8 : 0,
      x: collapsed ? 0 : -10,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Animation variants for menu item text
  const textVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      display: "inline-block",
      transition: {
        duration: 0.2,
        ease: "easeOut",
        delay: 0.1
      }
    },
    collapsed: {
      opacity: 0,
      x: -10,
      transitionEnd: {
        display: "none"
      },
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      variants={menuItemVariants}
      initial="collapsed"
      animate="expanded"
      exit="collapsed"
      className="menu-item"
    >
      {item.icon && (
        <span className="anticon">
          {item.icon}
        </span>
      )}
      {!collapsed && (
        <motion.span
          variants={textVariants}
          className="menu-item-text"
        >
          {item.label}
        </motion.span>
      )}
    </motion.div>
  );
};

export default AnimatedMenuItem;