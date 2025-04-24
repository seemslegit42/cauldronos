import React, { useEffect } from 'react';
import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';

export interface ModalProps extends AntModalProps {
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Animation type for the modal
   * @default 'scale'
   */
  animationType?: 'fade' | 'scale' | 'slide' | 'flip' | 'glitch' | 'none';
  
  /**
   * Whether to apply a glow effect
   * @default false
   */
  glow?: boolean;
  
  /**
   * Whether to apply a backdrop blur effect
   * @default false
   */
  backdropBlur?: boolean;
  
  /**
   * Whether to enable gesture-based dismissal
   * @default false
   */
  gestureEnabled?: boolean;
}

/**
 * Enhanced Modal component with animation and styling options
 */
export const Modal: React.FC<ModalProps> = ({
  cyberpunk = false,
  animationType = 'scale',
  glow = false,
  backdropBlur = false,
  gestureEnabled = false,
  className = '',
  children,
  ...props
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled, createAriaAttributes } = useAccessibility();
  
  // Create ARIA attributes for the modal
  const ariaAttributes = createAriaAttributes({
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': props.title ? 'modal-title' : undefined,
    'aria-describedby': 'modal-content',
  });
  
  // Announce the modal to screen readers when it opens
  useEffect(() => {
    if (props.open) {
      // Use a slight delay to ensure the modal is rendered
      const timer = setTimeout(() => {
        const title = typeof props.title === 'string' ? props.title : 'Dialog';
        document.getElementById('modal-title')?.setAttribute('aria-live', 'assertive');
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [props.open, props.title]);
  
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
      case 'scale':
        return transitions.scale;
      case 'slide':
        return transitions.slideUp;
      case 'flip':
        return transitions.flipY;
      case 'glitch':
        return transitions.glitch;
      default:
        return transitions.scale;
    }
  };
  
  // Apply custom styles based on props
  const getCustomStyles = () => {
    const styles: React.CSSProperties = {};
    
    if (cyberpunk) {
      styles.borderColor = token.colorPrimary;
      styles.boxShadow = `0 0 10px ${token.colorPrimary}80`;
    }
    
    if (glow) {
      styles.boxShadow = `0 0 20px ${token.colorPrimary}80`;
    }
    
    return styles;
  };
  
  // Get class names based on props
  const getClassNames = () => {
    return [
      className,
      cyberpunk ? 'cyberpunk-modal' : '',
      glow ? 'glow-effect' : '',
      backdropBlur ? 'backdrop-blur' : '',
      gestureEnabled ? 'gesture-enabled' : '',
    ].filter(Boolean).join(' ');
  };
  
  // Custom modal content with animations
  const modalContent = (
    <motion.div
      {...getAnimationVariants()}
      style={getCustomStyles()}
    >
      {children}
    </motion.div>
  );
  
  return (
    <AntModal
      {...props}
      className={getClassNames()}
      modalRender={() => modalContent}
      {...ariaAttributes}
    />
  );
};

export default Modal;
