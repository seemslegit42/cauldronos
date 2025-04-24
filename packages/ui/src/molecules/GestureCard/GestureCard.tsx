import React, { useState, useRef } from 'react';
import { Card, CardProps, Typography, Space, Badge, Tooltip } from 'antd';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useTheme } from '../../theme';
import { useDrag, useSwipe, usePinch } from '../../animations/hooks/useGesture';
import { transitions } from '../../animations/transitions';

const { Title, Text } = Typography;

export interface GestureCardProps extends Omit<CardProps, 'ref'> {
  /**
   * Title of the card
   */
  title: React.ReactNode;
  
  /**
   * Content of the card
   */
  children: React.ReactNode;
  
  /**
   * Whether to enable drag gesture
   * @default false
   */
  draggable?: boolean;
  
  /**
   * Whether to enable swipe gesture
   * @default false
   */
  swipeable?: boolean;
  
  /**
   * Whether to enable pinch gesture
   * @default false
   */
  pinchable?: boolean;
  
  /**
   * Callback when card is swiped left
   */
  onSwipeLeft?: () => void;
  
  /**
   * Callback when card is swiped right
   */
  onSwipeRight?: () => void;
  
  /**
   * Callback when card is swiped up
   */
  onSwipeUp?: () => void;
  
  /**
   * Callback when card is swiped down
   */
  onSwipeDown?: () => void;
  
  /**
   * Callback when card is dragged
   */
  onDrag?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  
  /**
   * Callback when card drag ends
   */
  onDragEnd?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  
  /**
   * Axis to constrain drag
   * @default "both"
   */
  dragAxis?: 'x' | 'y' | 'both';
  
  /**
   * Bounds for dragging
   */
  dragBounds?: { left?: number; right?: number; top?: number; bottom?: number };
  
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to show gesture indicators
   * @default true
   */
  showGestureIndicators?: boolean;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Style object
   */
  style?: React.CSSProperties;
}

/**
 * GestureCard component
 * 
 * A card component with gesture-based interactions like drag, swipe, and pinch.
 */
export const GestureCard: React.FC<GestureCardProps> = ({
  title,
  children,
  draggable = false,
  swipeable = false,
  pinchable = false,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onDrag,
  onDragEnd,
  dragAxis = 'both',
  dragBounds,
  cyberpunk = false,
  showGestureIndicators = true,
  className = '',
  style = {},
  ...props
}) => {
  const { token } = useTheme();
  const [isGestureActive, setIsGestureActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Configure swipe handlers
  const swipeHandlers = useSwipe(
    {
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown,
    },
    {
      threshold: 50,
      velocity: 0.3,
    }
  );
  
  // Configure drag handlers
  const { dragProps } = useDrag(
    {
      onDrag,
      onDragEnd,
      onDragStart: () => setIsGestureActive(true),
    },
    {
      axis: dragAxis,
      bounds: dragBounds,
      elastic: 0.5,
    }
  );
  
  // Configure pinch handlers
  const { scale, pinchHandlers } = usePinch(
    {
      onPinchIn: () => setIsGestureActive(true),
      onPinchOut: () => setIsGestureActive(true),
      onPinchEnd: () => setIsGestureActive(false),
    },
    {
      minScale: 0.8,
      maxScale: 1.2,
    }
  );
  
  // Combine all gesture handlers
  const getGestureProps = () => {
    const props: any = {};
    
    if (draggable) {
      Object.assign(props, dragProps);
    }
    
    if (swipeable) {
      Object.assign(props, swipeHandlers);
    }
    
    if (pinchable) {
      props.style = {
        ...(props.style || {}),
        scale,
      };
      Object.assign(props, pinchHandlers);
    }
    
    return props;
  };
  
  // Render gesture indicators
  const renderGestureIndicators = () => {
    if (!showGestureIndicators) return null;
    
    return (
      <Space size={4} style={{ position: 'absolute', top: 8, right: 8 }}>
        {draggable && (
          <Tooltip title="Draggable">
            <Badge status="processing" color={token.colorPrimary} />
          </Tooltip>
        )}
        {swipeable && (
          <Tooltip title="Swipeable">
            <Badge status="processing" color={token.colorSuccess} />
          </Tooltip>
        )}
        {pinchable && (
          <Tooltip title="Pinchable">
            <Badge status="processing" color={token.colorWarning} />
          </Tooltip>
        )}
      </Space>
    );
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`gesture-card-container ${isGestureActive ? 'active' : ''}`}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate={isGestureActive ? 'active' : 'rest'}
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 },
        active: { scale: 1.05 },
      }}
      transition={{ duration: 0.2 }}
      {...getGestureProps()}
    >
      <Card
        title={title}
        className={`gesture-card ${cyberpunk ? 'cyberpunk' : ''} ${className}`}
        style={{
          ...style,
          cursor: draggable ? 'grab' : 'default',
          position: 'relative',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          boxShadow: isGestureActive && cyberpunk ? `0 0 15px ${token.colorPrimary}80` : undefined,
          borderColor: isGestureActive && cyberpunk ? token.colorPrimary : undefined,
        }}
        {...props}
      >
        {renderGestureIndicators()}
        {children}
      </Card>
      
      <style jsx>{`
        .gesture-card-container {
          display: inline-block;
          user-select: none;
          touch-action: ${pinchable ? 'none' : 'manipulation'};
        }
        
        .gesture-card-container.active .gesture-card {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .gesture-card.cyberpunk {
          background-color: ${token.colorBgContainer};
          border-width: 2px;
          overflow: hidden;
        }
        
        .gesture-card.cyberpunk:hover {
          box-shadow: 0 0 10px ${token.colorPrimary}40;
        }
        
        .gesture-card.cyberpunk:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, ${token.colorPrimary}, transparent);
          opacity: ${isGestureActive ? 0.8 : 0};
          transition: opacity 0.3s ease;
        }
      `}</style>
    </motion.div>
  );
};

export default GestureCard;
