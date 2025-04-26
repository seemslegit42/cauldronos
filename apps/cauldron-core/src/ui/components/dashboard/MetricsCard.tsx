import React from 'react';
import { Card, Statistic, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { StatisticProps } from 'antd/es/statistic/Statistic';

export interface MetricsCardProps {
  title: React.ReactNode;
  value: number | string;
  precision?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: string;
  loading?: boolean;
  trend?: {
    value: number;
    type: 'up' | 'down';
    label?: string;
  };
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * Card component for displaying metrics with optional trend indicator
 */
export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  precision,
  prefix,
  suffix,
  description,
  tooltip,
  loading = false,
  trend,
  color,
  className = '',
  style = {},
  valueStyle = {},
  onClick,
}) => {
  // Determine value color based on trend
  const getValueColor = () => {
    if (color) return color;
    if (trend) {
      return trend.type === 'up' ? '#52c41a' : '#f5222d';
    }
    return undefined;
  };
  
  // Create title with optional tooltip
  const titleWithTooltip = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>{title}</span>
      {tooltip && (
        <Tooltip title={tooltip}>
          <InfoCircleOutlined style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.45)' }} />
        </Tooltip>
      )}
    </div>
  );
  
  // Create trend indicator
  const trendIndicator = trend && (
    <div className="metrics-card-trend" style={{ marginTop: 8 }}>
      <span style={{ color: trend.type === 'up' ? '#52c41a' : '#f5222d' }}>
        {trend.type === 'up' ? '↑' : '↓'} {trend.value}%
      </span>
      {trend.label && <span style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.45)' }}>{trend.label}</span>}
    </div>
  );
  
  // Statistic props
  const statisticProps: StatisticProps = {
    value,
    precision,
    prefix,
    suffix,
    valueStyle: {
      color: getValueColor(),
      ...valueStyle,
    },
    loading,
  };
  
  return (
    <Card
      title={titleWithTooltip}
      className={`metrics-card ${className}`}
      style={style}
      loading={loading}
      hoverable={!!onClick}
      onClick={onClick}
    >
      <Statistic {...statisticProps} />
      {trendIndicator}
      {description && (
        <div className="metrics-card-description" style={{ marginTop: 8, color: 'rgba(0, 0, 0, 0.45)' }}>
          {description}
        </div>
      )}
    </Card>
  );
};

export default MetricsCard;
