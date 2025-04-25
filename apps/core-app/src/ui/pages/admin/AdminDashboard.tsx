import React, { useState, useEffect } from 'react';
import { Layout, Typography, Breadcrumb, Spin, Alert, Card, Row, Col, Divider } from 'antd';
import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  AppstoreOutlined,
  BugOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  RocketOutlined,
  CloudServerOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useTheme from '../../styles/useTheme';
import { useSidebarStore } from '../../store/sidebarStore';

// Import admin components
import {
  SidebarNav,
  TopNavBar,
  MetricsOverview,
  SystemLogTable,
  UserStatsPanel,
  LogEntry,
  UserStats
} from '../../components/admin';

const { Content } = Layout;
const { Title, Text } = Typography;

// Mock data for demonstration
const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    level: 'info',
    message: 'User logged in successfully',
    source: 'Authentication',
    userId: 'user123',
    userName: 'John Doe',
    ip: '192.168.1.1',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    level: 'warning',
    message: 'Failed login attempt',
    source: 'Authentication',
    ip: '192.168.1.2',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    level: 'error',
    message: 'Database connection failed',
    source: 'Database',
    details: 'Connection timeout after 30s',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    level: 'success',
    message: 'New module installed successfully',
    source: 'Module Manager',
    userId: 'admin456',
    userName: 'Admin User',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    level: 'info',
    message: 'System backup completed',
    source: 'Backup Service',
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    level: 'warning',
    message: 'High CPU usage detected',
    source: 'Monitoring',
    details: 'CPU usage at 85% for 5 minutes',
  },
  {
    id: '7',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    level: 'info',
    message: 'Scheduled maintenance started',
    source: 'System',
  },
  {
    id: '8',
    timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    level: 'error',
    message: 'API rate limit exceeded',
    source: 'API Gateway',
    userId: 'user789',
    userName: 'Jane Smith',
    ip: '192.168.1.3',
  },
];

// Generate mock user activity data for the last 30 days
const generateMockUserActivity = () => {
  const activity = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Generate some random data
    const activeUsers = Math.floor(Math.random() * 50) + 100; // Between 100-150
    const newUsers = Math.floor(Math.random() * 20) + 5; // Between 5-25

    activity.push({
      date: date.toISOString().split('T')[0],
      activeUsers,
      newUsers,
    });
  }

  return activity;
};

// Mock user stats
const mockUserStats: UserStats = {
  totalUsers: 1250,
  activeUsers: 875,
  newUsers: 125,
  userGrowth: 12.5,
  usersByRole: [
    { role: 'Admin', count: 15, color: '#00F0FF' },
    { role: 'Manager', count: 85, color: '#0088FF' },
    { role: 'User', count: 950, color: '#BD00FF' },
    { role: 'Guest', count: 200, color: '#FF0099' },
  ],
  userActivity: generateMockUserActivity(),
  onlineUsers: 42,
  retentionRate: 78,
  averageSessionTime: '24m',
};

// Mock notifications
const mockNotifications = [
  {
    id: '1',
    title: 'System Update',
    message: 'New system update available (v2.1.0)',
    time: '5 min ago',
    read: false,
    type: 'info' as const,
  },
  {
    id: '2',
    title: 'Security Alert',
    message: 'Multiple failed login attempts detected',
    time: '1 hour ago',
    read: false,
    type: 'warning' as const,
  },
  {
    id: '3',
    title: 'Database Error',
    message: 'Database connection issue resolved',
    time: '3 hours ago',
    read: true,
    type: 'error' as const,
  },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { collapsed } = useSidebarStore();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [notifications, setNotifications] = useState(mockNotifications);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Sidebar state is now managed by Zustand store

  // Handle log refresh
  const handleRefreshLogs = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLogs(mockLogs);
      setLoading(false);
    }, 1000);
  };

  // Handle view log details
  const handleViewLogDetails = (log: LogEntry) => {
    console.log('View log details:', log);
    // In a real app, you would show a modal or navigate to a details page
  };

  // Handle delete log
  const handleDeleteLog = (logId: string) => {
    console.log('Delete log:', logId);
    // In a real app, you would call an API to delete the log
    setLogs(logs.filter(log => log.id !== logId));
  };

  // Handle view all users
  const handleViewAllUsers = () => {
    navigate('/admin/users');
  };

  // Handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  // Define page animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      style={{ minHeight: '100vh' }}
    >
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <SidebarNav
        loading={loading}
      />

      {/* Main Content */}
      <motion.div
        initial={false}
        animate={{
          marginLeft: collapsed ? 80 : 250,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
          },
        }}
        style={{ flex: 1 }}
      >
      <Layout>
        {/* Top Navigation Bar */}
        <TopNavBar
          onLogout={handleLogout}
          userName="Admin User"
          userRole="Administrator"
          notifications={notifications}
          loading={loading}
        />

        {/* Main Content Area */}
        <Content
          style={{
            margin: '64px 16px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 64px - 32px)',
            transition: 'all 0.3s',
          }}
        >
          {/* Breadcrumb */}
          <Breadcrumb
            style={{ marginBottom: 16 }}
            items={[
              {
                title: (
                  <>
                    <HomeOutlined /> Home
                  </>
                ),
                href: '/',
              },
              {
                title: (
                  <>
                    <DashboardOutlined /> Admin
                  </>
                ),
                href: '/admin',
              },
              {
                title: 'Dashboard',
              },
            ]}
          />

          {/* Page Title */}
          <div style={{ marginBottom: 24 }}>
            <Title level={2} style={{ margin: 0 }}>Admin Dashboard</Title>
            <Text type="secondary">
              System overview and management
            </Text>
          </div>

          {/* Metrics Overview */}
          <MetricsOverview
            loading={loading}
            metrics={{
              totalUsers: {
                title: 'Total Users',
                value: userStats.totalUsers,
                icon: <UserOutlined />,
                color: colors.cyan,
                tooltip: 'Total number of registered users',
                loading,
                trend: {
                  value: userStats.userGrowth,
                  isUpward: userStats.userGrowth > 0,
                  isGood: userStats.userGrowth > 0,
                  text: 'vs last month',
                },
              },
              activeModules: {
                title: 'Active Modules',
                value: 12,
                icon: <AppstoreOutlined />,
                color: colors.purple,
                tooltip: 'Number of currently active modules',
                loading,
                trend: {
                  value: 8.5,
                  isUpward: true,
                  isGood: true,
                  text: 'vs last month',
                },
              },
              errorRate: {
                title: 'Error Rate',
                value: '0.8%',
                icon: <BugOutlined />,
                color: colors.error,
                tooltip: 'Percentage of requests resulting in errors',
                loading,
                trend: {
                  value: 0.2,
                  isUpward: false,
                  isGood: true,
                  text: 'vs last week',
                },
              },
              uptime: {
                title: 'Uptime',
                value: '99.9%',
                icon: <ClockCircleOutlined />,
                color: colors.success,
                tooltip: 'System uptime in the last 30 days',
                loading,
                suffix: <Text type="secondary" style={{ fontSize: 12 }}>30d</Text>,
              },
            }}
            extraMetrics={[
              {
                title: 'Server Load',
                value: '42%',
                icon: <CloudServerOutlined />,
                color: colors.warning,
                tooltip: 'Current server CPU load',
                loading,
              },
              {
                title: 'Memory Usage',
                value: '3.2 GB',
                icon: <CloudServerOutlined />,
                color: colors.info,
                tooltip: 'Current memory usage',
                loading,
                suffix: <Text type="secondary" style={{ fontSize: 12 }}>/ 8 GB</Text>,
              },
              {
                title: 'Disk Space',
                value: '128 GB',
                icon: <CloudServerOutlined />,
                color: colors.success,
                tooltip: 'Available disk space',
                loading,
                suffix: <Text type="secondary" style={{ fontSize: 12 }}>/ 500 GB</Text>,
              },
              {
                title: 'API Requests',
                value: '1.2M',
                icon: <RocketOutlined />,
                color: colors.blue,
                tooltip: 'Total API requests in the last 24 hours',
                loading,
                suffix: <Text type="secondary" style={{ fontSize: 12 }}>24h</Text>,
              },
            ]}
          />

          {/* Main Content Sections */}
          <Row gutter={[16, 16]}>
            {/* User Stats Panel */}
            <Col xs={24} lg={12}>
              <UserStatsPanel
                stats={userStats}
                loading={loading}
                onViewAllUsers={handleViewAllUsers}
              />
            </Col>

            {/* System Logs */}
            <Col xs={24} lg={12}>
              <SystemLogTable
                logs={logs}
                loading={loading}
                onRefresh={handleRefreshLogs}
                onViewDetails={handleViewLogDetails}
                onDelete={handleDeleteLog}
                pagination={{ pageSize: 5 }}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
      </motion.div>
    </Layout>
    </motion.div>
  );
};

export default AdminDashboard;
