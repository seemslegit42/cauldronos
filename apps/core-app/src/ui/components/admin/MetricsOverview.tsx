import React from 'react';
import { Row, Col, Card, Statistic, Typography, Tooltip, Skeleton } from 'antd';
import {
  UserOutlined,
  AppstoreOutlined,
  BugOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  RocketOutlined,
  CloudServerOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import useTheme from '../../styles/useTheme';

const { Title, Text } = Typography;

export interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  tooltip?: string;
  loading?: boolean;
  index?: number; // For staggered animations
  trend?: {
    value: number;
    isUpward: boolean;
    isGood: boolean;
    text: string;
  };
}

export interface MetricsOverviewProps {
  metrics?: {
    totalUsers?: MetricCardProps;
    activeModules?: MetricCardProps;
    errorRate?: MetricCardProps;
    uptime?: MetricCardProps;
    [key: string]: MetricCardProps | undefined;
  };
  loading?: boolean;
  title?: string;
  subtitle?: string;
  extraMetrics?: MetricCardProps[];
}

// Individual Metric Card Component
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
  prefix,
  suffix,
  tooltip,
  loading = false,
  index = 0,
  trend,
}) => {
  const { colors, isDarkMode } = useTheme();

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1, // Staggered delay based on index
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: isDarkMode
        ? '0 8px 16px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 240, 255, 0.2)'
        : '0 8px 16px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 136, 255, 0.2)',
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      variants={cardVariants}
      style={{ height: '100%' }}
      layout
    >
      <Card
        style={{
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          border: `1px solid ${colors.border}`,
          background: colors.backgroundElevated,
        }}
        bodyStyle={{ padding: '20px' }}
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 2 }} />
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ fontSize: '16px', marginRight: '8px' }}>{title}</Text>
                {tooltip && (
                  <Tooltip title={tooltip}>
                    <InfoCircleOutlined style={{ color: colors.textSecondary, cursor: 'help' }} />
                  </Tooltip>
                )}
              </div>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: color,
                  fontSize: '20px',
                  boxShadow: `0 0 10px ${color}40`,
                  border: `1px solid ${color}30`,
                }}
              >
                {icon}
              </div>
            </div>

            <Statistic
              value={value}
              valueStyle={{
                color: colors.text,
                fontSize: '28px',
                fontWeight: 'bold',
                fontFamily: "'JetBrains Mono', monospace",
              }}
              prefix={prefix}
              suffix={suffix}
            />

            {trend && (
              <div style={{ marginTop: '8px' }}>
                <Text
                  style={{
                    color: trend.isGood ? colors.success : colors.error,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                  }}
                >
                  {trend.isUpward ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  <span style={{ marginLeft: '4px' }}>{trend.value}%</span>
                  <span style={{ marginLeft: '8px', color: colors.textSecondary }}>{trend.text}</span>
                </Text>
              </div>
            )}
          </>
        )}
      </Card>
    </motion.div>
  );
};

// Main Metrics Overview Component
const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  metrics = {},
  loading = false,
  title = 'System Metrics',
  subtitle = 'Overview of key system metrics and performance indicators',
  extraMetrics = [],
}) => {
  const { colors } = useTheme();

  // Default metrics if not provided
  const defaultMetrics = {
    totalUsers: {
      title: 'Total Users',
      value: 0,
      icon: <UserOutlined />,
      color: colors.cyan || '#00F0FF',
      tooltip: 'Total number of registered users in the system',
      loading,
    },
    activeModules: {
      title: 'Active Modules',
      value: 0,
      icon: <AppstoreOutlined />,
      color: colors.purple || '#BD00FF',
      tooltip: 'Number of currently active modules',
      loading,
    },
    errorRate: {
      title: 'Error Rate',
      value: '0%',
      icon: <BugOutlined />,
      color: colors.error || '#FF0033',
      tooltip: 'Percentage of requests resulting in errors',
      loading,
    },
    uptime: {
      title: 'Uptime',
      value: '0 days',
      icon: <ClockCircleOutlined />,
      color: colors.success || '#00FF66',
      tooltip: 'System uptime since last restart',
      loading,
    },
  };

  // Merge default metrics with provided metrics
  const mergedMetrics = {
    totalUsers: { ...defaultMetrics.totalUsers, ...metrics.totalUsers },
    activeModules: { ...defaultMetrics.activeModules, ...metrics.activeModules },
    errorRate: { ...defaultMetrics.errorRate, ...metrics.errorRate },
    uptime: { ...defaultMetrics.uptime, ...metrics.uptime },
  };

  // Define container animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
  };

  return (
    <motion.div
      style={{ marginBottom: '24px' }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
    >
      {(title || subtitle) && (
        <motion.div
          style={{ marginBottom: '16px' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title && (
            <Title level={4} style={{ margin: 0, marginBottom: '8px' }}>
              {title}
            </Title>
          )}
          {subtitle && <Text type="secondary">{subtitle}</Text>}
        </motion.div>
      )}

      <Row gutter={[16, 16]}>
        <AnimatePresence>
          <Col xs={24} sm={12} md={6}>
            <MetricCard {...mergedMetrics.totalUsers} index={0} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <MetricCard {...mergedMetrics.activeModules} index={1} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <MetricCard {...mergedMetrics.errorRate} index={2} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <MetricCard {...mergedMetrics.uptime} index={3} />
          </Col>

          {/* Render any extra metrics */}
          {extraMetrics.map((metric, index) => (
            <Col xs={24} sm={12} md={6} key={`extra-metric-${index}`}>
              <MetricCard {...metric} index={index + 4} />
            </Col>
          ))}
        </AnimatePresence>
      </Row>
    </motion.div>
  );
};

export default MetricsOverview;
