import React from 'react';
import { Card, Typography, Row, Col, Progress, Divider, Tooltip, Skeleton, Space, Button } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  RiseOutlined, 
  ClockCircleOutlined,
  InfoCircleOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import useTheme from '../../styles/useTheme';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const { Title, Text } = Typography;

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userGrowth: number;
  usersByRole: {
    role: string;
    count: number;
    color: string;
  }[];
  userActivity: {
    date: string;
    activeUsers: number;
    newUsers: number;
  }[];
  onlineUsers: number;
  retentionRate: number;
  averageSessionTime: string;
}

export interface UserStatsPanelProps {
  stats?: UserStats;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  onViewAllUsers?: () => void;
}

const UserStatsPanel: React.FC<UserStatsPanelProps> = ({
  stats,
  loading = false,
  title = 'User Statistics',
  subtitle = 'Overview of user metrics and activity',
  onViewAllUsers,
}) => {
  const { colors, isDarkMode } = useTheme();
  
  // Default stats if not provided
  const defaultStats: UserStats = {
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    userGrowth: 0,
    usersByRole: [],
    userActivity: [],
    onlineUsers: 0,
    retentionRate: 0,
    averageSessionTime: '0m',
  };

  // Merge default stats with provided stats
  const mergedStats = { ...defaultStats, ...stats };
  
  // Calculate active users percentage
  const activeUsersPercentage = mergedStats.totalUsers > 0 
    ? Math.round((mergedStats.activeUsers / mergedStats.totalUsers) * 100) 
    : 0;

  // Chart options for user activity
  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 250,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      fontFamily: "'JetBrains Mono', monospace",
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: [colors.primary, colors.secondary],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: colors.border,
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      type: 'datetime',
      categories: mergedStats.userActivity.map(item => item.date),
      labels: {
        style: {
          colors: colors.textSecondary,
          fontSize: '10px',
          fontFamily: "'JetBrains Mono', monospace",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: colors.textSecondary,
          fontSize: '10px',
          fontFamily: "'JetBrains Mono', monospace",
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
      theme: isDarkMode ? 'dark' : 'light',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: colors.text,
      },
    },
  };

  // Chart series for user activity
  const chartSeries = [
    {
      name: 'Active Users',
      data: mergedStats.userActivity.map(item => item.activeUsers),
    },
    {
      name: 'New Users',
      data: mergedStats.userActivity.map(item => item.newUsers),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        title={
          <div>
            <Title level={4} style={{ margin: 0 }}>{title}</Title>
            {subtitle && <Text type="secondary">{subtitle}</Text>}
          </div>
        }
        extra={
          onViewAllUsers && (
            <Button 
              type="primary" 
              icon={<TeamOutlined />}
              onClick={onViewAllUsers}
            >
              View All Users
            </Button>
          )
        }
        style={{ 
          borderRadius: '8px',
          overflow: 'hidden',
          border: `1px solid ${colors.border}`,
        }}
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card 
                  bordered={false}
                  style={{ 
                    background: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                    borderRadius: '8px',
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div>
                        <Text type="secondary">Total Users</Text>
                        <Title level={3} style={{ margin: '8px 0' }}>
                          <UserOutlined style={{ marginRight: '8px', color: colors.primary }} />
                          {mergedStats.totalUsers.toLocaleString()}
                        </Title>
                        <Text type="secondary">
                          <RiseOutlined style={{ color: mergedStats.userGrowth >= 0 ? colors.success : colors.error }} /> 
                          {mergedStats.userGrowth >= 0 ? '+' : ''}{mergedStats.userGrowth}% growth
                        </Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <Text type="secondary">Active Users</Text>
                        <Title level={3} style={{ margin: '8px 0' }}>
                          <TeamOutlined style={{ marginRight: '8px', color: colors.success }} />
                          {mergedStats.activeUsers.toLocaleString()}
                        </Title>
                        <Progress 
                          percent={activeUsersPercentage} 
                          size="small" 
                          status="active"
                          strokeColor={colors.success}
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <Text type="secondary">New Users (30d)</Text>
                        <Title level={3} style={{ margin: '8px 0' }}>
                          <UserAddOutlined style={{ marginRight: '8px', color: colors.secondary }} />
                          {mergedStats.newUsers.toLocaleString()}
                        </Title>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <Text type="secondary">
                          Retention Rate
                          <Tooltip title="Percentage of users who return within 30 days">
                            <InfoCircleOutlined style={{ marginLeft: '4px' }} />
                          </Tooltip>
                        </Text>
                        <Title level={3} style={{ margin: '8px 0' }}>
                          {mergedStats.retentionRate}%
                        </Title>
                        <Progress 
                          percent={mergedStats.retentionRate} 
                          size="small"
                          strokeColor={
                            mergedStats.retentionRate > 75 ? colors.success :
                            mergedStats.retentionRate > 50 ? colors.primary :
                            mergedStats.retentionRate > 25 ? colors.warning :
                            colors.error
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card 
                  bordered={false}
                  style={{ 
                    background: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                    borderRadius: '8px',
                    height: '100%',
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong>Users by Role</Text>
                  </div>
                  
                  {mergedStats.usersByRole.length > 0 ? (
                    <div>
                      {mergedStats.usersByRole.map((role, index) => (
                        <div key={role.role} style={{ marginBottom: index < mergedStats.usersByRole.length - 1 ? '12px' : 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <Text>{role.role}</Text>
                            <Text>{role.count} ({Math.round((role.count / mergedStats.totalUsers) * 100)}%)</Text>
                          </div>
                          <Progress 
                            percent={Math.round((role.count / mergedStats.totalUsers) * 100)} 
                            showInfo={false}
                            size="small"
                            strokeColor={role.color}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                      <Text type="secondary">No role data available</Text>
                    </div>
                  )}
                </Card>
              </Col>
            </Row>
            
            <Divider style={{ margin: '24px 0' }} />
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Text strong>User Activity (Last 30 Days)</Text>
                <Space>
                  <Tooltip title="Currently Online">
                    <Badge 
                      count={mergedStats.onlineUsers} 
                      showZero 
                      style={{ backgroundColor: colors.success }}
                    >
                      <Button 
                        type="text" 
                        icon={<UserOutlined />} 
                        size="small"
                      >
                        Online
                      </Button>
                    </Badge>
                  </Tooltip>
                  <Tooltip title="Average Session Time">
                    <Button 
                      type="text" 
                      icon={<ClockCircleOutlined />} 
                      size="small"
                    >
                      {mergedStats.averageSessionTime}
                    </Button>
                  </Tooltip>
                </Space>
              </div>
              
              <div style={{ height: 250 }}>
                {mergedStats.userActivity.length > 0 ? (
                  <ReactApexChart
                    options={chartOptions}
                    series={chartSeries}
                    type="area"
                    height={250}
                  />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Text type="secondary">No activity data available</Text>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
};

export default UserStatsPanel;
