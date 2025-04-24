/**
 * InsightCard Component
 * 
 * An AI-powered card component that displays insights and analytics
 * with interactive visualizations and cyberpunk styling.
 */

import React, { useState, useEffect } from 'react';
import { Card, CardProps, Typography, Space, Tooltip, Spin, Button, Statistic, Progress, Badge } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChartOutlined, 
  BarChartOutlined, 
  PieChartOutlined, 
  AreaChartOutlined,
  TableOutlined,
  ReloadOutlined,
  InfoCircleOutlined,
  RobotOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useTheme } from '../../theme/useTheme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';
import { EnhancedCard, EnhancedCardProps } from './EnhancedCard';

const { Text, Title, Paragraph } = Typography;

export interface InsightData {
  /**
   * Title of the insight
   */
  title: string;
  
  /**
   * Description of the insight
   */
  description?: string;
  
  /**
   * Type of the insight
   */
  type: 'trend' | 'comparison' | 'anomaly' | 'forecast' | 'summary' | 'recommendation' | 'alert';
  
  /**
   * Severity of the insight (for alerts and anomalies)
   */
  severity?: 'low' | 'medium' | 'high' | 'critical';
  
  /**
   * Primary value of the insight
   */
  value?: number | string;
  
  /**
   * Previous value for comparison
   */
  previousValue?: number | string;
  
  /**
   * Percentage change
   */
  change?: number;
  
  /**
   * Direction of change
   */
  direction?: 'up' | 'down' | 'neutral';
  
  /**
   * Whether the change is positive (good) or negative (bad)
   */
  positive?: boolean;
  
  /**
   * Unit of measurement
   */
  unit?: string;
  
  /**
   * Time period of the insight
   */
  period?: string;
  
  /**
   * Data for visualization
   */
  data?: any[];
  
  /**
   * Visualization type
   */
  visualization?: 'line' | 'bar' | 'pie' | 'area' | 'table' | 'progress' | 'statistic' | 'none';
  
  /**
   * Tags for the insight
   */
  tags?: string[];
  
  /**
   * Confidence score (0-100)
   */
  confidence?: number;
  
  /**
   * Actions that can be taken based on the insight
   */
  actions?: {
    label: string;
    onClick: () => void;
    type?: 'primary' | 'default' | 'link' | 'text' | 'ghost' | 'dashed';
    icon?: React.ReactNode;
  }[];
  
  /**
   * Related insights
   */
  relatedInsights?: string[];
  
  /**
   * Timestamp of the insight
   */
  timestamp?: string | Date;
  
  /**
   * Source of the insight
   */
  source?: string;
  
  /**
   * Whether the insight is AI-generated
   */
  aiGenerated?: boolean;
  
  /**
   * Whether the insight is interactive
   */
  interactive?: boolean;
  
  /**
   * Whether the insight is dismissible
   */
  dismissible?: boolean;
  
  /**
   * Whether the insight is pinned
   */
  pinned?: boolean;
  
  /**
   * Whether the insight is new
   */
  isNew?: boolean;
  
  /**
   * Whether the insight is read
   */
  isRead?: boolean;
  
  /**
   * Custom metadata
   */
  metadata?: Record<string, any>;
}

export interface InsightCardProps extends Omit<EnhancedCardProps, 'children'> {
  /**
   * Insight data
   */
  insight: InsightData;
  
  /**
   * Whether to show the visualization
   * @default true
   */
  showVisualization?: boolean;
  
  /**
   * Whether to show the confidence score
   * @default true
   */
  showConfidence?: boolean;
  
  /**
   * Whether to show the timestamp
   * @default true
   */
  showTimestamp?: boolean;
  
  /**
   * Whether to show the source
   * @default true
   */
  showSource?: boolean;
  
  /**
   * Whether to show the AI badge
   * @default true
   */
  showAiBadge?: boolean;
  
  /**
   * Whether to show the actions
   * @default true
   */
  showActions?: boolean;
  
  /**
   * Whether to show the tags
   * @default true
   */
  showTags?: boolean;
  
  /**
   * Whether to show the related insights
   * @default false
   */
  showRelatedInsights?: boolean;
  
  /**
   * Whether to show the severity indicator
   * @default true
   */
  showSeverity?: boolean;
  
  /**
   * Whether to animate the value changes
   * @default true
   */
  animateValues?: boolean;
  
  /**
   * Whether to enable interactive features
   * @default true
   */
  interactive?: boolean;
  
  /**
   * Whether to show a compact view
   * @default false
   */
  compact?: boolean;
  
  /**
   * Whether to show a detailed view
   * @default false
   */
  detailed?: boolean;
  
  /**
   * Callback when the insight is dismissed
   */
  onDismiss?: (insight: InsightData) => void;
  
  /**
   * Callback when the insight is pinned
   */
  onPin?: (insight: InsightData, pinned: boolean) => void;
  
  /**
   * Callback when the insight is marked as read
   */
  onRead?: (insight: InsightData) => void;
  
  /**
   * Callback when the insight is refreshed
   */
  onRefresh?: (insight: InsightData) => void;
  
  /**
   * Callback when a related insight is clicked
   */
  onRelatedInsightClick?: (insightId: string) => void;
  
  /**
   * Callback when a tag is clicked
   */
  onTagClick?: (tag: string) => void;
  
  /**
   * Callback when the visualization type is changed
   */
  onVisualizationChange?: (type: InsightData['visualization']) => void;
  
  /**
   * Callback when the insight is expanded
   */
  onExpand?: (insight: InsightData) => void;
  
  /**
   * Whether the insight is loading
   * @default false
   */
  loading?: boolean;
  
  /**
   * Whether the insight has an error
   * @default false
   */
  error?: boolean;
  
  /**
   * Error message
   */
  errorMessage?: string;
}

/**
 * InsightCard component
 * 
 * An AI-powered card component that displays insights and analytics
 * with interactive visualizations and cyberpunk styling.
 */
export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  showVisualization = true,
  showConfidence = true,
  showTimestamp = true,
  showSource = true,
  showAiBadge = true,
  showActions = true,
  showTags = true,
  showRelatedInsights = false,
  showSeverity = true,
  animateValues = true,
  interactive = true,
  compact = false,
  detailed = false,
  onDismiss,
  onPin,
  onRead,
  onRefresh,
  onRelatedInsightClick,
  onTagClick,
  onVisualizationChange,
  onExpand,
  loading = false,
  error = false,
  errorMessage = 'Failed to load insight',
  cyberpunk = false,
  ...props
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  // State
  const [currentVisualization, setCurrentVisualization] = useState<InsightData['visualization']>(
    insight.visualization || 'none'
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(insight.pinned || false);
  const [isRead, setIsRead] = useState(insight.isRead || false);
  
  // Update state when insight changes
  useEffect(() => {
    setCurrentVisualization(insight.visualization || 'none');
    setIsPinned(insight.pinned || false);
    setIsRead(insight.isRead || false);
  }, [insight]);
  
  // Mark as read when viewed
  useEffect(() => {
    if (!isRead && insight.isNew) {
      setIsRead(true);
      onRead?.(insight);
    }
  }, []);
  
  // Handle visualization change
  const handleVisualizationChange = (type: InsightData['visualization']) => {
    setCurrentVisualization(type);
    onVisualizationChange?.(type);
  };
  
  // Handle pin
  const handlePin = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    onPin?.(insight, newPinnedState);
  };
  
  // Handle dismiss
  const handleDismiss = () => {
    onDismiss?.(insight);
  };
  
  // Handle refresh
  const handleRefresh = () => {
    onRefresh?.(insight);
  };
  
  // Handle expand
  const handleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpand?.(insight);
  };
  
  // Handle tag click
  const handleTagClick = (tag: string) => {
    onTagClick?.(tag);
  };
  
  // Handle related insight click
  const handleRelatedInsightClick = (insightId: string) => {
    onRelatedInsightClick?.(insightId);
  };
  
  // Get severity color
  const getSeverityColor = () => {
    switch (insight.severity) {
      case 'critical':
        return token.colorError;
      case 'high':
        return token.colorWarning;
      case 'medium':
        return token.colorInfo;
      case 'low':
      default:
        return token.colorSuccess;
    }
  };
  
  // Get change color
  const getChangeColor = () => {
    if (insight.positive) {
      return token.colorSuccess;
    }
    
    if (insight.direction === 'up') {
      return insight.positive ? token.colorSuccess : token.colorError;
    }
    
    if (insight.direction === 'down') {
      return insight.positive ? token.colorError : token.colorSuccess;
    }
    
    return token.colorTextSecondary;
  };
  
  // Get insight type icon
  const getInsightTypeIcon = () => {
    switch (insight.type) {
      case 'trend':
        return <LineChartOutlined />;
      case 'comparison':
        return <BarChartOutlined />;
      case 'anomaly':
        return <ExclamationCircleOutlined />;
      case 'forecast':
        return <AreaChartOutlined />;
      case 'summary':
        return <TableOutlined />;
      case 'recommendation':
        return <BulbOutlined />;
      case 'alert':
        return <AlertOutlined />;
      default:
        return <InfoCircleOutlined />;
    }
  };
  
  // Render insight header
  const renderInsightHeader = () => {
    return (
      <div className="insight-header">
        <Space align="center">
          {getInsightTypeIcon()}
          <Title level={5} className="insight-title">
            {insight.title}
          </Title>
          {showAiBadge && insight.aiGenerated && (
            <Tooltip title="AI-generated insight">
              <Badge
                count={<RobotOutlined style={{ color: token.colorPrimary }} />}
                className="ai-badge"
              />
            </Tooltip>
          )}
          {showSeverity && insight.severity && (
            <Badge
              color={getSeverityColor()}
              text={insight.severity}
              className="severity-badge"
            />
          )}
        </Space>
        
        {insight.isNew && (
          <Badge
            color={token.colorPrimary}
            text="New"
            className="new-badge"
          />
        )}
      </div>
    );
  };
  
  // Render insight description
  const renderInsightDescription = () => {
    if (!insight.description) return null;
    
    return (
      <Paragraph className="insight-description">
        {insight.description}
      </Paragraph>
    );
  };
  
  // Render insight value
  const renderInsightValue = () => {
    if (insight.value === undefined) return null;
    
    const formattedValue = typeof insight.value === 'number' 
      ? insight.value.toLocaleString() 
      : insight.value;
    
    const formattedPreviousValue = insight.previousValue !== undefined 
      ? (typeof insight.previousValue === 'number' 
        ? insight.previousValue.toLocaleString() 
        : insight.previousValue)
      : null;
    
    const changeElement = insight.change !== undefined && (
      <Text
        type={insight.positive ? 'success' : 'danger'}
        className="insight-change"
      >
        {insight.direction === 'up' ? <ArrowUpOutlined /> : insight.direction === 'down' ? <ArrowDownOutlined /> : null}
        {Math.abs(insight.change).toFixed(1)}%
      </Text>
    );
    
    return (
      <div className="insight-value-container">
        <Statistic
          value={formattedValue}
          suffix={insight.unit}
          className="insight-value"
          valueStyle={{ color: token.colorTextHeading }}
        />
        
        {formattedPreviousValue && (
          <div className="insight-previous-value">
            <Text type="secondary">
              Previous: {formattedPreviousValue}
              {insight.unit && insight.unit}
            </Text>
          </div>
        )}
        
        {changeElement}
      </div>
    );
  };
  
  // Render insight visualization
  const renderInsightVisualization = () => {
    if (!showVisualization || currentVisualization === 'none' || !insight.data) return null;
    
    // Placeholder for visualization
    return (
      <div className="insight-visualization">
        {currentVisualization === 'progress' && insight.value !== undefined && (
          <Progress
            percent={Number(insight.value)}
            status={insight.positive ? 'success' : 'exception'}
            strokeColor={getChangeColor()}
          />
        )}
        
        {currentVisualization !== 'progress' && (
          <div className="visualization-placeholder">
            {currentVisualization === 'line' && <LineChartOutlined />}
            {currentVisualization === 'bar' && <BarChartOutlined />}
            {currentVisualization === 'pie' && <PieChartOutlined />}
            {currentVisualization === 'area' && <AreaChartOutlined />}
            {currentVisualization === 'table' && <TableOutlined />}
            <Text type="secondary">Visualization: {currentVisualization}</Text>
          </div>
        )}
        
        {interactive && (
          <div className="visualization-controls">
            <Space>
              <Tooltip title="Line Chart">
                <Button
                  type={currentVisualization === 'line' ? 'primary' : 'text'}
                  icon={<LineChartOutlined />}
                  size="small"
                  onClick={() => handleVisualizationChange('line')}
                />
              </Tooltip>
              <Tooltip title="Bar Chart">
                <Button
                  type={currentVisualization === 'bar' ? 'primary' : 'text'}
                  icon={<BarChartOutlined />}
                  size="small"
                  onClick={() => handleVisualizationChange('bar')}
                />
              </Tooltip>
              <Tooltip title="Pie Chart">
                <Button
                  type={currentVisualization === 'pie' ? 'primary' : 'text'}
                  icon={<PieChartOutlined />}
                  size="small"
                  onClick={() => handleVisualizationChange('pie')}
                />
              </Tooltip>
              <Tooltip title="Area Chart">
                <Button
                  type={currentVisualization === 'area' ? 'primary' : 'text'}
                  icon={<AreaChartOutlined />}
                  size="small"
                  onClick={() => handleVisualizationChange('area')}
                />
              </Tooltip>
              <Tooltip title="Table">
                <Button
                  type={currentVisualization === 'table' ? 'primary' : 'text'}
                  icon={<TableOutlined />}
                  size="small"
                  onClick={() => handleVisualizationChange('table')}
                />
              </Tooltip>
            </Space>
          </div>
        )}
      </div>
    );
  };
  
  // Render insight metadata
  const renderInsightMetadata = () => {
    return (
      <div className="insight-metadata">
        <Space split={<Divider type="vertical" />} size={[8, 0]}>
          {showTimestamp && insight.timestamp && (
            <Text type="secondary" className="insight-timestamp">
              {typeof insight.timestamp === 'string' 
                ? insight.timestamp 
                : insight.timestamp.toLocaleString()}
            </Text>
          )}
          
          {showSource && insight.source && (
            <Text type="secondary" className="insight-source">
              Source: {insight.source}
            </Text>
          )}
          
          {showConfidence && insight.confidence !== undefined && (
            <Tooltip title="AI confidence score">
              <Text type="secondary" className="insight-confidence">
                Confidence: {insight.confidence}%
              </Text>
            </Tooltip>
          )}
          
          {insight.period && (
            <Text type="secondary" className="insight-period">
              Period: {insight.period}
            </Text>
          )}
        </Space>
      </div>
    );
  };
  
  // Render insight tags
  const renderInsightTags = () => {
    if (!showTags || !insight.tags || insight.tags.length === 0) return null;
    
    return (
      <div className="insight-tags">
        {insight.tags.map((tag) => (
          <Tag
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`insight-tag ${cyberpunk ? 'cyberpunk-tag' : ''}`}
            color={token.colorPrimaryBg}
          >
            {tag}
          </Tag>
        ))}
      </div>
    );
  };
  
  // Render insight actions
  const renderInsightActions = () => {
    if (!showActions || !insight.actions || insight.actions.length === 0) return null;
    
    return (
      <div className="insight-actions">
        <Space>
          {insight.actions.map((action, index) => (
            <Button
              key={index}
              type={action.type || 'default'}
              icon={action.icon}
              onClick={action.onClick}
              size="small"
              className={`insight-action ${cyberpunk ? 'cyberpunk-button' : ''}`}
            >
              {action.label}
            </Button>
          ))}
        </Space>
      </div>
    );
  };
  
  // Render related insights
  const renderRelatedInsights = () => {
    if (!showRelatedInsights || !insight.relatedInsights || insight.relatedInsights.length === 0) return null;
    
    return (
      <div className="related-insights">
        <Text strong>Related Insights:</Text>
        <ul className="related-insights-list">
          {insight.relatedInsights.map((insightId) => (
            <li key={insightId}>
              <Button
                type="link"
                onClick={() => handleRelatedInsightClick(insightId)}
                className="related-insight-link"
              >
                {insightId}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  // Get card actions
  const getCardActions = () => {
    const actions: React.ReactNode[] = [];
    
    if (interactive) {
      if (insight.dismissible) {
        actions.push(
          <Tooltip title="Dismiss">
            <CloseOutlined onClick={handleDismiss} />
          </Tooltip>
        );
      }
      
      if (onRefresh) {
        actions.push(
          <Tooltip title="Refresh">
            <ReloadOutlined onClick={handleRefresh} />
          </Tooltip>
        );
      }
      
      if (insight.interactive) {
        actions.push(
          <Tooltip title={isExpanded ? 'Collapse' : 'Expand'}>
            <ExpandAltOutlined onClick={handleExpand} />
          </Tooltip>
        );
      }
      
      if (onPin) {
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
    }
    
    return actions;
  };
  
  // Render the insight card
  return (
    <EnhancedCard
      title={renderInsightHeader()}
      loading={loading}
      error={error}
      errorMessage={errorMessage}
      cyberpunk={cyberpunk}
      className={`insight-card ${insight.type}-insight ${compact ? 'compact' : ''} ${detailed ? 'detailed' : ''}`}
      enableActions={getCardActions().length > 0}
      actions={getCardActions()}
      {...props}
    >
      <div className="insight-content">
        {renderInsightDescription()}
        {renderInsightValue()}
        {renderInsightVisualization()}
        {renderInsightMetadata()}
        {renderInsightTags()}
        {renderInsightActions()}
        {renderRelatedInsights()}
      </div>
    </EnhancedCard>
  );
};

export default InsightCard;
