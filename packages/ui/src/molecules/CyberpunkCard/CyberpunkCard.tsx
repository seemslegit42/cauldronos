import React, { useState } from 'react';
import { Card, CardProps } from 'antd';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { transitions } from '../../animations/transitions';
import { AnimatedCard } from '@ant-design/move';

export interface CyberpunkCardProps extends Omit<CardProps, 'type'> {
  /**
   * The content to be displayed in the card
   */
  children: React.ReactNode;

  /**
   * The title of the card
   */
  title?: React.ReactNode;

  /**
   * The extra content in the top-right corner of the card
   */
  extra?: React.ReactNode;

  /**
   * The color of the glow effect
   * @default "primary"
   */
  glowColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | string;

  /**
   * Whether to show a glow effect on hover
   * @default true
   */
  glowOnHover?: boolean;

  /**
   * Whether to show a permanent glow effect
   * @default false
   */
  alwaysGlow?: boolean;

  /**
   * Whether to show a pulsing glow effect
   * @default false
   */
  pulseGlow?: boolean;

  /**
   * Whether to show scanlines effect
   * @default true
   */
  scanlines?: boolean;

  /**
   * Whether to show a border highlight
   * @default true
   */
  borderHighlight?: boolean;

  /**
   * Whether to show a glitch effect on hover
   * @default false
   */
  glitchOnHover?: boolean;

  /**
   * The intensity of the glow effect (0-1)
   * @default 0.5
   */
  glowIntensity?: number;

  /**
   * The border style
   * @default "solid"
   */
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';

  /**
   * Whether to show a 3D perspective effect
   * @default false
   */
  perspective?: boolean;

  /**
   * Custom style for the card
   */
  style?: React.CSSProperties;

  /**
   * Custom class name for the card
   */
  className?: string;
}

/**
 * CyberpunkCard component
 *
 * A stylized card component with cyberpunk aesthetics including glow effects,
 * scanlines, and animated interactions.
 */
export const CyberpunkCard: React.FC<CyberpunkCardProps> = ({
  children,
  title,
  extra,
  glowColor = 'primary',
  glowOnHover = true,
  alwaysGlow = false,
  pulseGlow = false,
  scanlines = true,
  borderHighlight = true,
  glitchOnHover = false,
  glowIntensity = 0.5,
  borderStyle = 'solid',
  perspective = false,
  style,
  className,
  ...props
}) => {
  const { token } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Determine the glow color
  const getGlowColor = () => {
    switch (glowColor) {
      case 'primary': return token.colorPrimary;
      case 'secondary': return token.colorSecondary;
      case 'accent': return token.colorAccent;
      case 'success': return token.colorSuccess;
      case 'warning': return token.colorWarning;
      case 'error': return token.colorError;
      case 'info': return token.colorInfo;
      default: return glowColor;
    }
  };

  // Calculate the glow shadow
  const glowShadow = `0 0 ${10 * glowIntensity}px ${getGlowColor()}`;

  // Determine if glow should be shown
  const showGlow = (alwaysGlow || (glowOnHover && isHovered));

  // Scanline styles
  const scanlinesStyle: React.CSSProperties = scanlines ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.05) 50%)',
    backgroundSize: '100% 4px',
    pointerEvents: 'none',
    zIndex: 1,
  } : {};

  // Border highlight styles
  const borderHighlightStyle: React.CSSProperties = borderHighlight ? {
    borderColor: getGlowColor(),
    borderStyle,
    borderWidth: '1px',
  } : {};

  // Combine styles
  const combinedStyle: React.CSSProperties = {
    backgroundColor: token.colorBgContainer,
    color: token.colorText,
    boxShadow: showGlow ? glowShadow : 'none',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    ...borderHighlightStyle,
    ...style,
  };

  // Perspective styles
  const perspectiveStyle: React.CSSProperties = perspective ? {
    transform: isHovered ? 'perspective(1000px) rotateX(5deg)' : 'perspective(1000px) rotateX(0deg)',
    transformOrigin: 'center bottom',
  } : {};

  // Pulse glow animation variants
  const pulseVariants = {
    pulse: {
      boxShadow: [
        `0 0 ${5 * glowIntensity}px ${getGlowColor()}`,
        `0 0 ${15 * glowIntensity}px ${getGlowColor()}`,
        `0 0 ${5 * glowIntensity}px ${getGlowColor()}`,
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    },
    static: {
      boxShadow: showGlow ? glowShadow : 'none',
    },
  };

  // Glitch animation variants
  const glitchVariants = {
    hover: {
      x: [0, -2, 2, -2, 2, 0],
      y: [0, 2, -2, 2, -2, 0],
      transition: {
        duration: 0.3,
        repeat: 0,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
    idle: {
      x: 0,
      y: 0,
    },
  };

  // Combine variants
  const combinedVariants = {
    ...pulseVariants,
    ...(glitchOnHover ? glitchVariants : {})
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={pulseGlow ? 'pulse' : 'static'}
      variants={combinedVariants}
      whileHover={glitchOnHover ? 'hover' : undefined}
      style={{
        ...combinedStyle,
        ...perspectiveStyle,
      }}
      className={className}
    >
      <AnimatedCard
        title={title}
        extra={extra}
        bordered={false}
        {...props}
      >
        {children}
      </AnimatedCard>

      {scanlines && (
        <motion.div
          style={scanlinesStyle}
          initial={{ opacity: 0.05 }}
          animate={{ opacity: isHovered ? 0.1 : 0.05 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};