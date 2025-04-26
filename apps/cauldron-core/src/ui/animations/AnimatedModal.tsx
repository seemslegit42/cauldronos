import React from 'react';
import { Modal, ModalProps } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { transitions } from './transitions';
import { useMotion } from './MotionProvider';

export interface AnimatedModalProps extends ModalProps {
  children: React.ReactNode;
  motionPreset?: 'fade' | 'scale' | 'slideUp' | 'none';
}

/**
 * Enhanced Modal component with animation presets
 */
export const AnimatedModal: React.FC<AnimatedModalProps> = ({
  children,
  motionPreset = 'scale',
  open,
  className = '',
  ...props
}) => {
  const { reducedMotion } = useMotion();
  
  // Skip animation if reduced motion is enabled or preset is none
  if (reducedMotion || motionPreset === 'none') {
    return (
      <Modal
        open={open}
        className={`animated-modal ${className}`}
        {...props}
      >
        {children}
      </Modal>
    );
  }

  // Select the appropriate variant based on preset
  let variants;
  switch (motionPreset) {
    case 'fade':
      variants = transitions.fadeIn;
      break;
    case 'slideUp':
      variants = transitions.slideUp;
      break;
    case 'scale':
    default:
      variants = transitions.modal;
      break;
  }

  return (
    <Modal
      open={open}
      className={`animated-modal ${className}`}
      modalRender={(modal) => (
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {modal}
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default AnimatedModal;