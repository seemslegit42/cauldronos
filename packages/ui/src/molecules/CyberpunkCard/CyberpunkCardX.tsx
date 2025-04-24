import React, { useState, useEffect, useRef } from 'react';
import { Card, CardProps, Typography, Space, Tooltip, Badge } from 'antd';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from '../../theme';
import { transitions } from '../../animations/transitions';
import { AnimatedCard } from '@ant-design/move';
import { InfoCircleOutlined, RobotOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

export interface CyberpunkCardXProps extends Omit<CardProps, 'type'> {
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

  /**
   * Whether to enable AI-powered features
   * @default false
   */
  aiPowered?: boolean;

  /**
   * AI model used for generating content
   * @default "default"
   */
  aiModel?: string;

  /**
   * AI-generated insights about the card content
   */
  aiInsights?: string[];

  /**
   * Whether to show AI-generated insights
   * @default false
   */
  showAiInsights?: boolean;

  /**
   * Whether to enable gesture interactions
   * @default false
   */
  gestureEnabled?: boolean;

  /**
   * Whether to enable drag interaction
   * @default false
   */
  draggable?: boolean;

  /**
   * Whether to enable swipe interaction
   * @default false
   */
  swipeable?: boolean;

  /**
   * Callback when card is swiped
   */
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;

  /**
   * Whether to enable parallax effect on card content
   * @default false
   */
  parallaxEffect?: boolean;

  /**
   * Whether to show a floating action button
   * @default false
   */
  floatingAction?: boolean;

  /**
   * Callback when floating action button is clicked
   */
  onFloatingActionClick?: () => void;

  /**
   * Whether to show a badge on the card
   * @default false
   */
  showBadge?: boolean;

  /**
   * Badge content
   */
  badgeContent?: React.ReactNode;

  /**
   * Badge status
   */
  badgeStatus?: 'success' | 'processing' | 'default' | 'error' | 'warning';
}

/**
 * CyberpunkCardX component
 * 
 * An enhanced stylized card component with cyberpunk aesthetics, AI features,
 * advanced animations, and gesture interactions.
 */
export const CyberpunkCardX: React.FC<CyberpunkCardXProps> = ({
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
  className = '',
  aiPowered = false,
  aiModel = 'default',
  aiInsights = [],
  showAiInsights = false,
  gestureEnabled = false,
  draggable = false,
  swipeable = false,
  onSwipe,
  parallaxEffect = false,
  floatingAction = false,
  onFloatingActionClick,
  showBadge = false,
  badgeContent,
  badgeStatus = 'default',
  ...props
}) => {
  const { token } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showInsights, setShowInsights] = useState(showAiInsights);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);
  
  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!parallaxEffect || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  // Reset parallax effect when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (parallaxEffect) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };
  
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

  // Drag constraints
  const dragConstraints = {
    top: -50,
    left: -50,
    right: 50,
    bottom: 50,
  };

  // Swipe handlers
  const handleSwipe = (info: any) => {
    if (!swipeable || !onSwipe) return;
    
    const { offset, velocity } = info;
    const swipeThreshold = 10000;
    
    if (Math.abs(offset.x) * velocity.x > swipeThreshold) {
      onSwipe(offset.x > 0 ? 'right' : 'left');
    } else if (Math.abs(offset.y) * velocity.y > swipeThreshold) {
      onSwipe(offset.y > 0 ? 'down' : 'up');
    }
  };

  // Render AI insights
  const renderAiInsights = () => {
    if (!aiPowered || !showInsights || aiInsights.length === 0) return null;
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="ai-insights"
        >
          <Space direction="vertical" style={{ width: '100%', padding: '8px 12px' }}>
            <Text type="secondary">
              <RobotOutlined /> AI Insights
            </Text>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {aiInsights.map((insight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Text>{insight}</Text>
                </motion.li>
              ))}
            </ul>
          </Space>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Render AI model info
  const renderAiModelInfo = () => {
    if (!aiPowered) return null;
    
    return (
      <div className="ai-model-info">
        <Tooltip title={`This card is powered by ${aiModel} AI model`}>
          <Space size={4}>
            <RobotOutlined style={{ color: token.colorPrimary, fontSize: '0.8em' }} />
            <Text type="secondary" style={{ fontSize: '0.8em' }}>
              AI-Powered
            </Text>
          </Space>
        </Tooltip>
      </div>
    );
  };

  // Render floating action button
  const renderFloatingAction = () => {
    if (!floatingAction) return null;
    
    return (
      <motion.div
        className="floating-action"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onFloatingActionClick}
      >
        <ThunderboltOutlined />
      </motion.div>
    );
  };

  // Combine variants
  const combinedVariants = {
    ...pulseVariants,
    ...(glitchOnHover ? glitchVariants : {})
  };

  // Render the card with all enhancements
  return (
    <motion.div
      ref={cardRef}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      animate={pulseGlow ? 'pulse' : 'static'}
      variants={combinedVariants}
      whileHover={glitchOnHover ? 'hover' : undefined}
      style={{
        ...combinedStyle,
        ...perspectiveStyle,
      }}
      className={`cyberpunk-card-x ${className}`}
      drag={draggable && gestureEnabled}
      dragConstraints={dragConstraints}
      dragElastic={0.1}
      whileDrag={{ scale: 1.02 }}
      onDragEnd={handleSwipe}
    >
      {showBadge ? (
        <Badge.Ribbon
          text={badgeContent}
          color={badgeStatus === 'success' ? 'green' : 
                 badgeStatus === 'error' ? 'red' :
                 badgeStatus === 'warning' ? 'orange' :
                 badgeStatus === 'processing' ? 'blue' : 'cyan'}
        >
          <AnimatedCard
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{title}</span>
                {aiPowered && (
                  <Tooltip title="Toggle AI Insights">
                    <InfoCircleOutlined 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowInsights(!showInsights);
                      }}
                      style={{ cursor: 'pointer', color: token.colorPrimary }}
                    />
                  </Tooltip>
                )}
              </div>
            }
            extra={
              <Space>
                {renderAiModelInfo()}
                {extra}
              </Space>
            }
            bordered={false}
            style={parallaxEffect ? {
              transform: `rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
              transformStyle: 'preserve-3d',
            } : undefined}
            {...props}
          >
            <motion.div
              style={parallaxEffect ? {
                transformStyle: 'preserve-3d',
                transform: 'translateZ(20px)',
              } : undefined}
            >
              {children}
            </motion.div>
            
            {renderAiInsights()}
          </AnimatedCard>
        </Badge.Ribbon>
      ) : (
        <AnimatedCard
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{title}</span>
              {aiPowered && (
                <Tooltip title="Toggle AI Insights">
                  <InfoCircleOutlined 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInsights(!showInsights);
                    }}
                    style={{ cursor: 'pointer', color: token.colorPrimary }}
                  />
                </Tooltip>
              )}
            </div>
          }
          extra={
            <Space>
              {renderAiModelInfo()}
              {extra}
            </Space>
          }
          bordered={false}
          style={parallaxEffect ? {
            transform: `rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
            transformStyle: 'preserve-3d',
          } : undefined}
          {...props}
        >
          <motion.div
            style={parallaxEffect ? {
              transformStyle: 'preserve-3d',
              transform: 'translateZ(20px)',
            } : undefined}
          >
            {children}
          </motion.div>
          
          {renderAiInsights()}
        </AnimatedCard>
      )}
      
      {scanlines && (
        <motion.div
          style={scanlinesStyle}
          initial={{ opacity: 0.05 }}
          animate={{ opacity: isHovered ? 0.1 : 0.05 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {renderFloatingAction()}
      
      <style jsx>{`
        .cyberpunk-card-x {
          position: relative;
          border-radius: ${token.borderRadius}px;
        }
        
        .ai-insights {
          margin-top: 16px;
          border-top: 1px solid ${token.colorBorderSecondary};
          background-color: ${token.colorBgElevated};
          border-radius: 0 0 ${token.borderRadius}px ${token.borderRadius}px;
          overflow: hidden;
        }
        
        .ai-model-info {
          display: flex;
          align-items: center;
        }
        
        .floating-action {
          position: absolute;
          bottom: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: ${token.colorPrimary};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }
      `}</style>
    </motion.div>
  );
};

export default CyberpunkCardX;
