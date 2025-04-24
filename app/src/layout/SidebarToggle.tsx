import React from 'react';
import { Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarToggleProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  className?: string;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ 
  collapsed, 
  toggleCollapsed,
  className = ''
}) => {
  // Animation variants for the toggle button
  const toggleVariants = {
    expanded: {
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1],
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    collapsed: {
      rotate: 180,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1],
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  // Animation for the icon
  const iconVariants = {
    initial: { 
      opacity: 0,
      scale: 0.6,
      y: 10
    },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.645, 0.045, 0.355, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.6,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.645, 0.045, 0.355, 1]
      }
    }
  };

  return (
    <motion.div
      initial={false}
      animate={collapsed ? "collapsed" : "expanded"}
      variants={toggleVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="sidebar-toggle-icon"
    >
      <Button
        type="text"
        onClick={toggleCollapsed}
        className={`transition-all duration-300 ${className}`}
        icon={
          <AnimatePresence mode="wait" initial={false}>
            {collapsed ? (
              <motion.div
                key="unfold"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <MenuUnfoldOutlined />
              </motion.div>
            ) : (
              <motion.div
                key="fold"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <MenuFoldOutlined />
              </motion.div>
            )}
          </AnimatePresence>
        }
      />
    </motion.div>
  );
};

export default SidebarToggle;