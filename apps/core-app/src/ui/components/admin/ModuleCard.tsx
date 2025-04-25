import React from 'react';
import { Card, Typography, Tag, Space, Button, Tooltip, Badge, Progress } from 'antd';
import { motion } from 'framer-motion';
import { moduleCardVariants } from './animations';
import useTheme from '../../styles/useTheme';

const { Title, Text } = Typography;

export interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'error' | 'updating';
  version: string;
  lastUpdated: string;
  usagePercentage?: number;
  tags?: string[];
  onClick?: () => void;
  onToggle?: () => void;
  onConfigure?: () => void;
  isToggleEnabled?: boolean;
  index?: number; // For staggered animations
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  title,
  description,
  icon,
  status,
  version,
  lastUpdated,
  usagePercentage = 0,
  tags = [],
  onClick,
  onToggle,
  onConfigure,
  isToggleEnabled = true,
  index = 0,
}) => {
  const { colors, isDarkMode } = useTheme();

  // Status colors and labels
  const statusConfig = {
    active: { color: colors.success, label: 'Active' },
    inactive: { color: colors.textSecondary, label: 'Inactive' },
    error: { color: colors.error, label: 'Error' },
    updating: { color: colors.warning, label: 'Updating' },
  };

  // Custom animation delay based on index
  const customVariants = {
    ...moduleCardVariants,
    animate: {
      ...moduleCardVariants.animate,
      transition: {
        ...moduleCardVariants.animate.transition,
        delay: index * 0.08, // Staggered delay based on index
      },
    },
  };

  return (
    <motion.div
      variants={customVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      layoutId={`module-card-${id}`}
      style={{ height: '100%' }}
    >
      <Card
        hoverable
        onClick={onClick}
        style={{
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          border: `1px solid ${colors.border}`,
          background: colors.backgroundElevated,
          cursor: onClick ? 'pointer' : 'default',
        }}
        bodyStyle={{ padding: '20px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: status === 'updating' ? 360 : 0 }}
              transition={{ duration: 2, repeat: status === 'updating' ? Infinity : 0, ease: 'linear' }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: statusConfig[status].color,
                fontSize: '20px',
                boxShadow: `0 0 10px ${statusConfig[status].color}40`,
                border: `1px solid ${statusConfig[status].color}30`,
                marginRight: '12px',
              }}
            >
              {icon}
            </motion.div>
            <div>
              <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
                {title}
              </Title>
              <Badge
                status={
                  status === 'active' ? 'success' :
                  status === 'error' ? 'error' :
                  status === 'updating' ? 'processing' :
                  'default'
                }
                text={statusConfig[status].label}
              />
            </div>
          </div>
          
          {onToggle && (
            <Tooltip title={isToggleEnabled ? 'Disable Module' : 'Enable Module'}>
              <Button
                type={isToggleEnabled ? 'primary' : 'default'}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                style={{
                  opacity: isToggleEnabled ? 1 : 0.7,
                  boxShadow: isToggleEnabled ? `0 0 10px ${colors.primary}40` : 'none',
                }}
              >
                {isToggleEnabled ? 'Enabled' : 'Disabled'}
              </Button>
            </Tooltip>
          )}
        </div>
        
        <Text
          type="secondary"
          style={{
            display: 'block',
            marginBottom: '16px',
            height: '40px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Text>
        
        {usagePercentage > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <Text type="secondary">Usage</Text>
              <Text>{usagePercentage}%</Text>
            </div>
            <Progress
              percent={usagePercentage}
              showInfo={false}
              size="small"
              strokeColor={{
                '0%': colors.primary,
                '100%': colors.secondary,
              }}
              trailColor={isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
            />
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <Space size={[0, 4]} wrap>
              {tags.map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 + i * 0.05 + 0.2 }}
                >
                  <Tag color={isDarkMode ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 136, 255, 0.1)'}>
                    {tag}
                  </Tag>
                </motion.div>
              ))}
            </Space>
          </div>
          
          <Space direction="vertical" size={2} align="end">
            <Text type="secondary" style={{ fontSize: '12px' }}>v{version}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>Updated: {lastUpdated}</Text>
          </Space>
        </div>
        
        {onConfigure && (
          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <Button
              type="link"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onConfigure();
              }}
            >
              Configure
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default ModuleCard;
