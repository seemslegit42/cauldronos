/**
 * EnhancedCard Component
 *
 * An enhanced card component with advanced features like animations,
 * hover effects, and cyberpunk styling.
 */

import React, { useState } from 'react';
import { Card as AntCard, CardProps as AntCardProps, Tooltip, Badge, Space, Typography, Button } from 'antd';
import { motion, MotionProps, useMotionValue, useTransform } from 'framer-motion';
import {
  ExpandAltOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
  CloseOutlined,
  PushpinOutlined,
  PushpinFilled,
  InfoCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useTheme } from '../../theme/useTheme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';

export interface EnhancedCardProps extends AntCardProps {
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;

  /**
   * Card variant
   * @default 'default'
   */
  variant?: 'default' | 'cyber' | 'terminal' | 'glass' | 'minimal' | 'outlined';

  /**
   * Hover effect
   * @default 'none'
   */
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale' | 'tilt' | 'border' | 'shadow';

  /**
   * Glow color for cyberpunk styling
   * @default 'cyan'
   */
  glowColor?: 'cyan' | 'purple' | 'green' | 'orange' | 'red' | 'blue' | 'pink';

  /**
   * Whether to apply a glitch effect on hover
   * @default false
   */
  glitchOnHover?: boolean;

  /**
   * Whether to animate the card
   * @default true
   */
  animated?: boolean;

  /**
   * Animation variant
   * @default 'fade'
   */
  animationVariant?: 'fade' | 'scale' | 'slide' | 'flip' | 'rotate';

  /**
   * Whether to enable card actions
   * @default false
   */
  enableActions?: boolean;

  /**
   * Whether to enable card expansion
   * @default false
   */
  expandable?: boolean;

  /**
   * Whether to enable card fullscreen
   * @default false
   */
  fullscreenable?: boolean;

  /**
   * Whether to enable card refresh
   * @default false
   */
  refreshable?: boolean;

  /**
   * Whether to enable card settings
   * @default false
   */
  settingsEnabled?: boolean;

  /**
   * Whether to enable card close
   * @default false
   */
  closable?: boolean;

  /**
   * Whether to enable card pinning
   * @default false
   */
  pinnable?: boolean;

  /**
   * Whether the card is pinned
   * @default false
   */
  pinned?: boolean;

  /**
   * Whether to enable card dragging
   * @default false
   */
  draggable?: boolean;

  /**
   * Whether to enable card resizing
   * @default false
   */
  resizable?: boolean;

  /**
   * Whether to enable card stacking
   * @default false
   */
  stackable?: boolean;

  /**
   * Whether to enable card flipping
   * @default false
   */
  flippable?: boolean;

  /**
   * Whether the card is flipped
   * @default false
   */
  flipped?: boolean;

  /**
   * Content for the back of the card when flippable is true
   */
  backContent?: React.ReactNode;

  /**
   * Whether to show a loading indicator
   * @default false
   */
  loading?: boolean;

  /**
   * Whether to show an error state
   * @default false
   */
  error?: boolean;

  /**
   * Error message to display when error is true
   */
  errorMessage?: React.ReactNode;

  /**
   * Whether to show a success state
   * @default false
   */
  success?: boolean;

  /**
   * Success message to display when success is true
   */
  successMessage?: React.ReactNode;

  /**
   * Whether to show a warning state
   * @default false
   */
  warning?: boolean;

  /**
   * Warning message to display when warning is true
   */
  warningMessage?: React.ReactNode;

  /**
   * Whether to show an info state
   * @default false
   */
  info?: boolean;

  /**
   * Info message to display when info is true
   */
  infoMessage?: React.ReactNode;

  /**
   * Badge count to display
   */
  badgeCount?: number;

  /**
   * Badge text to display
   */
  badgeText?: string;

  /**
   * Badge status
   */
  badgeStatus?: 'success' | 'processing' | 'default' | 'error' | 'warning';

  /**
   * Motion props for the card
   */
  motionProps?: MotionProps;

  /**
   * Callback when the card is expanded
   */
  onExpand?: () => void;

  /**
   * Callback when the card is fullscreened
   */
  onFullscreen?: () => void;

  /**
   * Callback when the card is refreshed
   */
  onRefresh?: () => void;

  /**
   * Callback when the card settings are opened
   */
  onSettings?: () => void;

  /**
   * Callback when the card is closed
   */
  onClose?: () => void;

  /**
   * Callback when the card is pinned or unpinned
   */
  onPin?: (pinned: boolean) => void;

  /**
   * Callback when the card is flipped
   */
  onFlip?: (flipped: boolean) => void;
}

/**
 * EnhancedCard component
 *
 * An enhanced card component with advanced features like animations,
 * hover effects, and cyberpunk styling.
 */
export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  cyberpunk = false,
  variant = 'default',
  hoverEffect = 'none',
  glowColor = 'cyan',
  glitchOnHover = false,
  animated = true,
  animationVariant = 'fade',
  enableActions = false,
  expandable = false,
  fullscreenable = false,
  refreshable = false,
  settingsEnabled = false,
  closable = false,
  pinnable = false,
  pinned = false,
  draggable = false,
  resizable = false,
  stackable = false,
  flippable = false,
  flipped = false,
  backContent,
  loading = false,
  error = false,
  errorMessage,
  success = false,
  successMessage,
  warning = false,
  warningMessage,
  info = false,
  infoMessage,
  badgeCount,
  badgeText,
  badgeStatus,
  motionProps = {},
  onExpand,
  onFullscreen,
  onRefresh,
  onSettings,
  onClose,
  onPin,
  onFlip,
  className = '',
  children,
  ...props
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();

  // State
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPinned, setIsPinned] = useState(pinned);
  const [isFlipped, setIsFlipped] = useState(flipped);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Handle expand
  const handleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpand?.();
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);
    onFullscreen?.();
  };

  // Handle refresh
  const handleRefresh = () => {
    onRefresh?.();
  };

  // Handle settings
  const handleSettings = () => {
    onSettings?.();
  };

  // Handle close
  const handleClose = () => {
    onClose?.();
  };

  // Handle pin
  const handlePin = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    onPin?.(newPinnedState);
  };

  // Handle flip
  const handleFlip = () => {
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    onFlip?.(newFlippedState);
  };

  // Handle mouse move for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect === 'tilt') {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = (mouseX / width - 0.5) * 2;
      const yPct = (mouseY / height - 0.5) * 2;
      x.set(xPct * 50);
      y.set(yPct * 50);
    }
  };

  // Handle mouse leave for tilt effect
  const handleMouseLeave = () => {
    if (hoverEffect === 'tilt') {
      x.set(0);
      y.set(0);
    }
  };

  // Get variant class
  const getVariantClass = () => {
    switch (variant) {
      case 'cyber':
        return 'cyber-card';
      case 'terminal':
        return 'terminal-card';
      case 'glass':
        return 'glass-card';
      case 'minimal':
        return 'minimal-card';
      case 'outlined':
        return 'outlined-card';
      default:
        return '';
    }
  };

  // Get hover effect
  const getHoverEffect = () => {
    if (reducedMotionEnabled) return {};

    switch (hoverEffect) {
      case 'lift':
        return {
          whileHover: { y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
          transition: { duration: 0.3 },
        };
      case 'glow':
        return {
          whileHover: {
            boxShadow: `0 0 15px ${getGlowColor()}`
          },
          transition: { duration: 0.3 },
        };
      case 'scale':
        return {
          whileHover: { scale: 1.03 },
          transition: { duration: 0.3 },
        };
      case 'tilt':
        return {
          style: { rotateX, rotateY, transformStyle: 'preserve-3d' },
        };
      case 'border':
        return {
          whileHover: {
            borderColor: getGlowColor(0.8),
            borderWidth: '2px',
          },
          transition: { duration: 0.3 },
        };
      case 'shadow':
        return {
          whileHover: {
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
          },
          transition: { duration: 0.3 },
        };
      default:
        return {};
    }
  };

  // Get glow color
  const getGlowColor = (opacity = 0.5) => {
    switch (glowColor) {
      case 'purple':
        return `rgba(128, 0, 255, ${opacity})`;
      case 'green':
        return `rgba(0, 255, 128, ${opacity})`;
      case 'orange':
        return `rgba(255, 128, 0, ${opacity})`;
      case 'red':
        return `rgba(255, 0, 0, ${opacity})`;
      case 'blue':
        return `rgba(0, 128, 255, ${opacity})`;
      case 'pink':
        return `rgba(255, 0, 255, ${opacity})`;
      case 'cyan':
      default:
        return `rgba(0, 240, 255, ${opacity})`;
    }
  };

  // Get animation variant
  const getAnimationVariant = () => {
    if (reducedMotionEnabled || !animated) return {};

    switch (animationVariant) {
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 },
          transition: { duration: 0.3 },
        };
      case 'slide':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 },
          transition: { duration: 0.3 },
        };
      case 'flip':
        return {
          initial: { opacity: 0, rotateY: 90 },
          animate: { opacity: 1, rotateY: 0 },
          exit: { opacity: 0, rotateY: 90 },
          transition: { duration: 0.5 },
        };
      case 'rotate':
        return {
          initial: { opacity: 0, rotate: -5 },
          animate: { opacity: 1, rotate: 0 },
          exit: { opacity: 0, rotate: 5 },
          transition: { duration: 0.3 },
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.3 },
        };
    }
  };

  // Get class names
  const getClassNames = () => {
    return [
      'enhanced-card',
      cyberpunk ? 'cyberpunk-card' : '',
      getVariantClass(),
      isExpanded ? 'expanded' : '',
      isFullscreen ? 'fullscreen' : '',
      isPinned ? 'pinned' : '',
      isFlipped ? 'flipped' : '',
      draggable ? 'draggable' : '',
      resizable ? 'resizable' : '',
      stackable ? 'stackable' : '',
      error ? 'error-card' : '',
      success ? 'success-card' : '',
      warning ? 'warning-card' : '',
      info ? 'info-card' : '',
      className,
    ].filter(Boolean).join(' ');
  };

  // Render card actions
  const renderCardActions = () => {
    if (!enableActions) return [];

    const actions: React.ReactNode[] = [];

    if (expandable) {
      actions.push(
        <Tooltip title={isExpanded ? 'Collapse' : 'Expand'}>
          <ExpandAltOutlined onClick={handleExpand} />
        </Tooltip>
      );
    }

    if (fullscreenable) {
      actions.push(
        <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
          <FullscreenOutlined onClick={handleFullscreen} />
        </Tooltip>
      );
    }

    if (refreshable) {
      actions.push(
        <Tooltip title="Refresh">
          <ReloadOutlined onClick={handleRefresh} />
        </Tooltip>
      );
    }

    if (settingsEnabled) {
      actions.push(
        <Tooltip title="Settings">
          <SettingOutlined onClick={handleSettings} />
        </Tooltip>
      );
    }

    if (pinnable) {
      actions.push(
        <Tooltip title={isPinned ? 'Unpin' : 'Pin'}>
          {isPinned ? (
            <PushpinFilled onClick={handlePin} />
          ) : (
            <PushpinOutlined onClick={handlePin} />
          )}
        </Tooltip>
      );
    }

    if (flippable) {
      actions.push(
        <Tooltip title="Flip Card">
          <ExpandAltOutlined rotate={90} onClick={handleFlip} />
        </Tooltip>
      );
    }

    if (closable) {
      actions.push(
        <Tooltip title="Close">
          <CloseOutlined onClick={handleClose} />
        </Tooltip>
      );
    }

    return actions;
  };

  const { Text, Title } = Typography;

  // Render card content
  const renderCardContent = () => {
    // Show error state
    if (error) {
      return (
        <div className="card-error-state">
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Text type="danger" style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <ExclamationCircleOutlined style={{ marginRight: '8px' }} />
              {errorMessage || 'An error occurred'}
            </Text>
            {onRefresh && (
              <Button type="primary" danger onClick={handleRefresh} icon={<ReloadOutlined />}>
                Retry
              </Button>
            )}
          </Space>
        </div>
      );
    }

    // Show success state
    if (success) {
      return (
        <div className="card-success-state">
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Text type="success" style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <CheckCircleOutlined style={{ marginRight: '8px' }} />
              {successMessage || 'Operation successful'}
            </Text>
          </Space>
        </div>
      );
    }

    // Show warning state
    if (warning) {
      return (
        <div className="card-warning-state">
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Text type="warning" style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <WarningOutlined style={{ marginRight: '8px' }} />
              {warningMessage || 'Warning'}
            </Text>
            {onRefresh && (
              <Button type="primary" style={{ background: token.colorWarning, borderColor: token.colorWarning }} onClick={handleRefresh}>
                Acknowledge
              </Button>
            )}
          </Space>
        </div>
      );
    }

    // Show info state
    if (info) {
      return (
        <div className="card-info-state">
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Text type="secondary" style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <InfoCircleOutlined style={{ marginRight: '8px' }} />
              {infoMessage || 'Information'}
            </Text>
          </Space>
        </div>
      );
    }

    // Show flipped content if card is flipped
    if (flippable && isFlipped && backContent) {
      return (
        <div className="card-back-content">
          {backContent}
        </div>
      );
    }

    // Show normal content
    return children;
  };

  // Render card with badge
  const renderCardWithBadge = (card: React.ReactNode) => {
    if (badgeCount !== undefined || badgeText || badgeStatus) {
      return (
        <Badge
          count={badgeCount}
          text={badgeText}
          status={badgeStatus}
          offset={[-5, 5]}
        >
          {card}
        </Badge>
      );
    }

    return card;
  };

  // Render the card
  const renderCard = () => {
    const card = (
      <AntCard
        className={getClassNames()}
        actions={enableActions ? renderCardActions() : undefined}
        loading={loading}
        {...props}
      >
        {renderCardContent()}
      </AntCard>
    );

    return renderCardWithBadge(card);
  };

  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotionEnabled || !animated) {
    return (
      <div
        className="enhanced-card-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {renderCard()}
      </div>
    );
  }

  // Render animated card
  return (
    <motion.div
      className="enhanced-card-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...getAnimationVariant()}
      {...getHoverEffect()}
      {...motionProps}
    >
      {renderCard()}
    </motion.div>
  );
};

export default EnhancedCard;
