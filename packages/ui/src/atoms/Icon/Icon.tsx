import React from 'react';
import * as AntIcons from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { useAccessibility } from '../../hooks/useAccessibility';

export interface IconProps {
  /**
   * Name of the icon from @ant-design/icons
   */
  name: string;
  
  /**
   * Size of the icon in pixels
   * @default 16
   */
  size?: number;
  
  /**
   * Color of the icon
   */
  color?: string;
  
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to animate the icon
   * @default false
   */
  animated?: boolean;
  
  /**
   * Animation type
   * @default 'pulse'
   */
  animationType?: 'pulse' | 'spin' | 'bounce' | 'shake';
  
  /**
   * Whether to apply a glow effect
   * @default false
   */
  glow?: boolean;
  
  /**
   * Whether to apply a glitch effect
   * @default false
   */
  glitch?: boolean;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Additional style properties
   */
  style?: React.CSSProperties;
  
  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * Enhanced Icon component with animation and styling options
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  color,
  cyberpunk = false,
  animated = false,
  animationType = 'pulse',
  glow = false,
  glitch = false,
  className = '',
  style = {},
  onClick,
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  // Get the icon component from Ant Design icons
  const IconComponent = (AntIcons as any)[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @ant-design/icons`);
    return null;
  }
  
  const iconClassName = `
    ${className} 
    ${cyberpunk ? 'cyberpunk-icon' : ''} 
    ${glow ? 'glow-effect' : ''}
    ${glitch ? 'glitch-effect' : ''}
  `;
  
  const iconStyle: React.CSSProperties = {
    fontSize: size,
    color: color || (cyberpunk ? token.colorPrimary : undefined),
    ...style,
  };
  
  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotionEnabled || !animated) {
    return (
      <IconComponent
        className={iconClassName}
        style={iconStyle}
        onClick={onClick}
      />
    );
  }
  
  // Get animation variants based on animation type
  const getAnimationVariants = () => {
    switch (animationType) {
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        };
      case 'spin':
        return {
          animate: {
            rotate: 360,
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            },
          },
        };
      case 'bounce':
        return {
          animate: {
            y: [0, -5, 0],
            transition: {
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        };
      case 'shake':
        return {
          animate: {
            x: [0, -2, 2, -2, 0],
            transition: {
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            },
          },
        };
      default:
        return {};
    }
  };
  
  // Use motion for animated icons
  const MotionIcon = motion(IconComponent);
  
  return (
    <MotionIcon
      className={iconClassName}
      style={iconStyle}
      onClick={onClick}
      {...getAnimationVariants()}
    />
  );
};

export default Icon;
