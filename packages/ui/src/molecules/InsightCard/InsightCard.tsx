import React, { useState, useEffect } from 'react';
import { Card, Typography, Space, Tag, Tooltip, Button, Divider, Skeleton } from 'antd';
import { InfoCircleOutlined, LineChartOutlined, BulbOutlined, ReloadOutlined, PushpinOutlined, ShareAltOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme';
import { transitions } from '../../animations/transitions';

const { Title, Text, Paragraph } = Typography;

export interface InsightData {
  /**
   * Title of the insight
   */
  title: string;
  
  /**
   * Description or content of the insight
   */
  description: string;
  
  /**
   * Source of the data (e.g., "Sales Data", "User Behavior")
   */
  source?: string;
  
  /**
   * Confidence level (0-1)
   */
  confidence?: number;
  
  /**
   * Timestamp when the insight was generated
   */
  timestamp?: string | Date;
  
  /**
   * Tags associated with the insight
   */
  tags?: string[];
  
  /**
   * Type of insight (e.g., "trend", "anomaly", "prediction")
   */
  type?: 'trend' | 'anomaly' | 'prediction' | 'correlation' | 'summary';
  
  /**
   * Metrics or data points associated with the insight
   */
  metrics?: Array<{
    name: string;
    value: number | string;
    change?: number;
    changeType?: 'increase' | 'decrease' | 'neutral';
  }>;
  
  /**
   * Recommended actions based on the insight
   */
  recommendations?: string[];
  
  /**
   * Raw data associated with the insight (for charts or detailed view)
   */
  rawData?: any;
}

export interface InsightCardProps {
  /**
   * Insight data to display
   */
  insight: InsightData;
  
  /**
   * Whether the card is loading
   * @default false
   */
  loading?: boolean;
  
  /**
   * Whether to show the source of the insight
   * @default true
   */
  showSource?: boolean;
  
  /**
   * Whether to show the confidence level
   * @default true
   */
  showConfidence?: boolean;
  
  /**
   * Whether to show the timestamp
   * @default true
   */
  showTimestamp?: boolean;
  
  /**
   * Whether to show tags
   * @default true
   */
  showTags?: boolean;
  
  /**
   * Whether to show metrics
   * @default true
   */
  showMetrics?: boolean;
  
  /**
   * Whether to show recommendations
   * @default true
   */
  showRecommendations?: boolean;
  
  /**
   * Whether to show actions (pin, share, etc.)
   * @default true
   */
  showActions?: boolean;
  
  /**
   * Whether to allow refreshing the insight
   * @default true
   */
  refreshable?: boolean;
  
  /**
   * Callback when refresh is clicked
   */
  onRefresh?: () => void;
  
  /**
   * Callback when pin is clicked
   */
  onPin?: () => void;
  
  /**
   * Callback when share is clicked
   */
  onShare?: () => void;
  
  /**
   * Whether the insight is pinned
   * @default false
   */
  isPinned?: boolean;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Style object
   */
  style?: React.CSSProperties;
  
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to show the expanded view by default
   * @default false
   */
  defaultExpanded?: boolean;
  
  /**
   * Custom chart component to render
   */
  chartComponent?: React.ReactNode;
}

/**
 * InsightCard component
 * 
 * A card component for displaying AI-generated insights with metrics,
 * recommendations, and interactive features.
 */
export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  loading = false,
  showSource = true,
  showConfidence = true,
  showTimestamp = true,
  showTags = true,
  showMetrics = true,
  showRecommendations = true,
  showActions = true,
  refreshable = true,
  onRefresh,
  onPin,
  onShare,
  isPinned = false,
  className = '',
  style = {},
  cyberpunk = false,
  defaultExpanded = false,
  chartComponent,
}) => {
  const { token } = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animate in after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Format timestamp
  const formatTimestamp = (timestamp?: string | Date) => {
    if (!timestamp) return '';
    
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return date.toLocaleString();
  };
  
  // Get color based on confidence
  const getConfidenceColor = (confidence?: number) => {
    if (confidence === undefined) return token.colorPrimary;
    if (confidence >= 0.8) return token.colorSuccess;
    if (confidence >= 0.5) return token.colorWarning;
    return token.colorError;
  };
  
  // Get label based on confidence
  const getConfidenceLabel = (confidence?: number) => {
    if (confidence === undefined) return 'Unknown';
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.5) return 'Medium';
    return 'Low';
  };
  
  // Get icon based on insight type
  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'trend':
        return <LineChartOutlined />;
      case 'anomaly':
        return <InfoCircleOutlined />;
      case 'prediction':
        return <BulbOutlined />;
      case 'correlation':
        return <LineChartOutlined />;
      case 'summary':
        return <BulbOutlined />;
      default:
        return <BulbOutlined />;
    }
  };
  
  // Get color based on insight type
  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'trend':
        return token.colorInfo;
      case 'anomaly':
        return token.colorError;
      case 'prediction':
        return token.colorSuccess;
      case 'correlation':
        return token.colorWarning;
      case 'summary':
        return token.colorPrimary;
      default:
        return token.colorPrimary;
    }
  };
  
  // Get color based on change type
  const getChangeColor = (changeType?: string) => {
    switch (changeType) {
      case 'increase':
        return token.colorSuccess;
      case 'decrease':
        return token.colorError;
      default:
        return token.colorTextSecondary;
    }
  };
  
  // Format change value
  const formatChange = (change?: number, changeType?: string) => {
    if (change === undefined) return '';
    
    const prefix = changeType === 'increase' ? '+' : changeType === 'decrease' ? '-' : '';
    return `${prefix}${Math.abs(change).toFixed(1)}%`;
  };
  
  // Render metrics
  const renderMetrics = () => {
    if (!showMetrics || !insight.metrics || insight.metrics.length === 0) return null;
    
    return (
      <div className="insight-metrics">
        <Divider style={{ margin: '12px 0' }} />
        <div className="metrics-grid">
          {insight.metrics.map((metric, index) => (
            <div key={index} className="metric-item">
              <Text type="secondary">{metric.name}</Text>
              <div className="metric-value">
                <Text strong>{metric.value}</Text>
                {metric.change !== undefined && (
                  <Text
                    style={{
                      color: getChangeColor(metric.changeType),
                      marginLeft: 8,
                    }}
                  >
                    {formatChange(metric.change, metric.changeType)}
                  </Text>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render recommendations
  const renderRecommendations = () => {
    if (!showRecommendations || !insight.recommendations || insight.recommendations.length === 0) return null;
    
    return (
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={transitions.fadeIn}
            className="insight-recommendations"
          >
            <Divider style={{ margin: '12px 0' }} />
            <Title level={5}>Recommendations</Title>
            <ul className="recommendations-list">
              {insight.recommendations.map((recommendation, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Text>{recommendation}</Text>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  
  // Render chart
  const renderChart = () => {
    if (!chartComponent) return null;
    
    return (
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={transitions.fadeIn}
            className="insight-chart"
          >
            <Divider style={{ margin: '12px 0' }} />
            {chartComponent}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  
  // Render card content
  const renderContent = () => {
    if (loading) {
      return (
        <div>
          <Skeleton active paragraph={{ rows: 2 }} />
          <Skeleton.Button active style={{ width: 100, marginRight: 8 }} />
          <Skeleton.Button active style={{ width: 80 }} />
          <Skeleton.Input active style={{ width: '100%', marginTop: 16 }} />
        </div>
      );
    }
    
    return (
      <div>
        <div className="insight-header">
          <Space direction="vertical" size={0} style={{ width: '100%' }}>
            <div className="insight-title-row">
              <Title level={4} style={{ margin: 0 }}>
                {insight.title}
              </Title>
              
              {showActions && (
                <Space>
                  {refreshable && (
                    <Tooltip title="Refresh Insight">
                      <Button
                        type="text"
                        icon={<ReloadOutlined />}
                        onClick={onRefresh}
                      />
                    </Tooltip>
                  )}
                  
                  {onPin && (
                    <Tooltip title={isPinned ? "Unpin Insight" : "Pin Insight"}>
                      <Button
                        type="text"
                        icon={<PushpinOutlined />}
                        onClick={onPin}
                        className={isPinned ? 'pinned' : ''}
                      />
                    </Tooltip>
                  )}
                  
                  {onShare && (
                    <Tooltip title="Share Insight">
                      <Button
                        type="text"
                        icon={<ShareAltOutlined />}
                        onClick={onShare}
                      />
                    </Tooltip>
                  )}
                </Space>
              )}
            </div>
            
            <div className="insight-meta">
              <Space wrap>
                {insight.type && (
                  <Tag color={getTypeColor(insight.type)} icon={getTypeIcon(insight.type)}>
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </Tag>
                )}
                
                {showConfidence && insight.confidence !== undefined && (
                  <Tooltip title={`${Math.round(insight.confidence * 100)}% confidence`}>
                    <Tag color={getConfidenceColor(insight.confidence)}>
                      {getConfidenceLabel(insight.confidence)} confidence
                    </Tag>
                  </Tooltip>
                )}
                
                {showSource && insight.source && (
                  <Tag>Source: {insight.source}</Tag>
                )}
                
                {showTimestamp && insight.timestamp && (
                  <Text type="secondary" style={{ fontSize: '0.85em' }}>
                    {formatTimestamp(insight.timestamp)}
                  </Text>
                )}
              </Space>
            </div>
          </Space>
        </div>
        
        <Paragraph
          style={{ margin: '12px 0' }}
          ellipsis={expanded ? false : { rows: 3, expandable: false }}
        >
          {insight.description}
        </Paragraph>
        
        {showTags && insight.tags && insight.tags.length > 0 && (
          <div className="insight-tags">
            <Space wrap>
              {insight.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Space>
          </div>
        )}
        
        {renderMetrics()}
        {renderRecommendations()}
        {renderChart()}
        
        {(insight.recommendations?.length > 0 || chartComponent) && (
          <div className="insight-expand">
            <Button
              type="link"
              onClick={() => setExpanded(!expanded)}
              style={{ padding: 0 }}
            >
              {expanded ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  // Apply animation wrapper
  const cardContent = (
    <Card
      className={`insight-card ${cyberpunk ? 'cyberpunk' : ''} ${className}`}
      style={{
        ...style,
        borderColor: insight.type ? getTypeColor(insight.type) : undefined,
      }}
      bodyStyle={{ padding: 16 }}
    >
      {renderContent()}
    </Card>
  );
  
  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={transitions.fadeIn}
    >
      {cardContent}
      
      <style jsx>{`
        .insight-card {
          width: 100%;
          overflow: hidden;
        }
        
        .insight-card.cyberpunk {
          background-color: ${token.colorBgContainer};
          border-width: 2px;
          box-shadow: 0 0 10px ${insight.type ? getTypeColor(insight.type) + '40' : token.colorPrimary + '40'};
        }
        
        .insight-card.cyberpunk:hover {
          box-shadow: 0 0 15px ${insight.type ? getTypeColor(insight.type) + '60' : token.colorPrimary + '60'};
        }
        
        .insight-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .insight-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        .insight-meta {
          margin-top: 8px;
        }
        
        .insight-tags {
          margin-top: 12px;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 16px;
          margin-top: 8px;
        }
        
        .metric-item {
          display: flex;
          flex-direction: column;
        }
        
        .metric-value {
          display: flex;
          align-items: center;
          margin-top: 4px;
        }
        
        .recommendations-list {
          padding-left: 20px;
          margin: 8px 0;
        }
        
        .insight-expand {
          margin-top: 12px;
          text-align: center;
        }
        
        .pinned {
          color: ${token.colorWarning};
        }
      `}</style>
    </motion.div>
  );
};

export default InsightCard;
