import React from 'react';
import { Drawer, DrawerProps } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { transitions } from './transitions';
import { useMotion } from './MotionProvider';

export interface AnimatedDrawerProps extends DrawerProps {
  children: React.ReactNode;
}

/**
 * Enhanced Drawer component with animations
 */
export const AnimatedDrawer: React.FC<AnimatedDrawerProps> = ({
  children,
  open,
  placement = 'right',
  className = '',
  ...props
}) => {
  const { reducedMotion } = useMotion();
  
  // Skip animation if reduced motion is enabled
  if (reducedMotion) {
    return (
      <Drawer
        open={open}
        placement={placement}
        className={`animated-drawer ${className}`}
        {...props}
      >
        {children}
      </Drawer>
    );
  }

  // Select the appropriate variant based on placement
  let variants;
  switch (placement) {
    case 'top':
      variants = transitions.drawerTop;
      break;
    case 'bottom':
      variants = transitions.drawerBottom;
      break;
    case 'left':
      variants = transitions.drawerLeft;
      break;
    case 'right':
    default:
      variants = transitions.drawerRight;
      break;
  }

  return (
    <Drawer
      open={open}
      placement={placement}
      className={`animated-drawer ${className}`}
      styles={{
        mask: {
          opacity: 0, // Hide the default mask
        },
      }}
      maskClosable={false} // We'll handle this with our custom mask
      {...props}
    >
      <AnimatePresence mode="wait">
        {open && (
          <>
            <motion.div
              className="animated-drawer-mask"
              variants={transitions.modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.45)',
                zIndex: 1000,
              }}
              onClick={props.onClose ? () => props.onClose!({}, 'mask') : undefined}
            />
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                height: '100%',
                width: '100%',
              }}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Drawer>
  );
};

export default AnimatedDrawer;