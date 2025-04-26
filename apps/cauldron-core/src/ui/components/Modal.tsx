import React from 'react';
import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '../animations/MotionProvider';
import { transitions } from '../animations/transitions';

export interface ModalProps extends AntModalProps {
  animated?: boolean;
  variant?: 'default' | 'cyber' | 'terminal' | 'glass';
  glowEffect?: boolean;
  scanlineEffect?: boolean;
}

const MotionModal = ({ children, ...props }: any) => (
  <motion.div {...props}>{children}</motion.div>
);

export const Modal: React.FC<ModalProps> = ({
  animated = true,
  variant = 'default',
  glowEffect = false,
  scanlineEffect = false,
  className = '',
  open,
  children,
  ...props
}) => {
  const { reducedMotion } = useMotion();

  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotion || !animated) {
    return (
      <AntModal
        open={open}
        className={`${getVariantClass(variant)} ${
          glowEffect ? 'glow-effect' : ''
        } ${scanlineEffect ? 'scanlines' : ''} ${className}`}
        {...props}
      >
        {children}
      </AntModal>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <AntModal
          open={open}
          className={`${getVariantClass(variant)} ${
            glowEffect ? 'glow-effect' : ''
          } ${scanlineEffect ? 'scanlines' : ''} ${className}`}
          modalRender={(modal) => (
            <MotionModal
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={transitions.modal}
            >
              {modal}
            </MotionModal>
          )}
          {...props}
        >
          {children}
        </AntModal>
      )}
    </AnimatePresence>
  );
};

// Helper function to get the appropriate class based on variant
function getVariantClass(variant: ModalProps['variant']): string {
  switch (variant) {
    case 'cyber':
      return 'cyber-modal';
    case 'terminal':
      return 'terminal-modal';
    case 'glass':
      return 'glass-modal';
    default:
      return '';
  }
}

export default Modal;