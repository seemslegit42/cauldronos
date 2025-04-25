import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, List, Avatar, Tag, Typography, Button, Divider } from 'antd';
import { 
  UserOutlined, 
  AppstoreOutlined, 
  TeamOutlined, 
  ClockCircleOutlined,
  RightOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useWorkspaces } from '../workspace/operations';
import { useModules } from '../modules/ModuleRegistry';
import { useAuth } from 'wasp/client/auth';

const { Title, Text } = Typography;

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

// Mock data for recent activity
const recentActivities = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      avatar: null
    },
    action: 'created a new document',
    target: 'Project Proposal',
    module: 'Wiki',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      avatar: null
    },
    action: 'added a new customer',
    target: 'Acme Inc.',
    module: 'CRM',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
  },
  {
    id: '3',
    user: {
      name: 'Robert Johnson',
      avatar: null
    },
    action: 'commented on',
    target: 'Q2 Sales Report',
    module: 'Analytics',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
  },
  {
    id: '4',
    user: {
      name: 'Emily Davis',
      avatar: null
    },
    action: 'scheduled a meeting',
    target: 'Product Demo',
    module: 'Calendar',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
  },
  {
    id: '5',
    user: {
      name: 'Michael Wilson',
      avatar: null
    },
    action: 'updated the status of',
    target: 'Bug Fix #1234',
    module: 'Tasks',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
  }
];

// Format relative time
const formatRelativeTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day ago`;
  
  return date.toLocaleDateString();
};

// Get module color
const getModuleColor = (moduleName: string) => {
  const colors: Record<string, string> = {
    'CRM': 'blue',
    'Wiki': 'purple',
    'Analytics': 'green',
    'Calendar': 'orange',
    'Tasks': 'cyan',
    'Email': 'magenta',
    'Invoicing': 'gold'
  };
  
  return colors[moduleName] || 'default';
};

const Dashboard: React.FC = () => {
  const { data: user } = useAuth();
  const { currentWorkspace } = useWorkspaces();
  const { modules } = useModules();
  const [userCount, setUserCount] = useState(0);
  const [moduleCount, setModuleCount] = useState(0);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    setUserCount(currentWorkspace?.memberCount || 5);
    setModuleCount(modules.length);
  }, [currentWorkspace, modules]);
  
  return (
    <MainLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Title level={2} className="mb-6">
          {currentWorkspace?.name || 'Dashboard'}
        </Title>
        
        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} md={8}>
            <motion.div variants={itemVariants}>
              <Card hoverable className="h-full">
                <Statistic
                  title="Workspace Members"
                  value={userCount}
                  prefix={<UserOutlined />}
                />
                <div className="mt-4">
                  <Link to="/users">
                    <Button type="link" size="small" className="p-0">
                      View all members <RightOutlined />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <motion.div variants={itemVariants}>
              <Card hoverable className="h-full">
                <Statistic
                  title="Active Modules"
                  value={moduleCount}
                  prefix={<AppstoreOutlined />}
                />
                <div className="mt-4">
                  <Link to="/modules">
                    <Button type="link" size="small" className="p-0">
                      Manage modules <RightOutlined />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <motion.div variants={itemVariants}>
              <Card hoverable className="h-full">
                <Statistic
                  title="Your Role"
                  value={user?.role || 'User'}
                  prefix={<TeamOutlined />}
                />
                <div className="mt-4">
                  <Link to="/account/settings">
                    <Button type="link" size="small" className="p-0">
                      View account <RightOutlined />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
        
        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <Card title="Recent Activity" className="mb-8">
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.user.avatar} icon={!item.user.avatar && <UserOutlined />} />
                    }
                    title={
                      <div className="flex items-center">
                        <Text strong>{item.user.name}</Text>
                        <Text type="secondary" className="mx-1">{item.action}</Text>
                        <Text strong>{item.target}</Text>
                        <Tag color={getModuleColor(item.module)} className="ml-2">
                          {item.module}
                        </Tag>
                      </div>
                    }
                    description={
                      <div className="flex items-center">
                        <ClockCircleOutlined className="mr-1 text-xs" />
                        <Text type="secondary" className="text-xs">
                          {formatRelativeTime(item.timestamp)}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <Divider className="my-4" />
            <div className="text-right">
              <Button type="primary">View All Activity</Button>
            </div>
          </Card>
        </motion.div>
        
        {/* Quick Access Modules */}
        <motion.div variants={itemVariants}>
          <Card title="Your Modules">
            <Row gutter={[16, 16]}>
              {modules.slice(0, 6).map(module => (
                <Col xs={24} sm={12} md={8} key={module.id}>
                  <Link to={module.path}>
                    <Card hoverable className="h-full">
                      <div className="flex items-center">
                        <div className="mr-3 text-xl">
                          {module.menuIcon || <AppstoreOutlined />}
                        </div>
                        <div>
                          <div className="font-medium">{module.name}</div>
                          <Text type="secondary" className="text-sm">
                            {module.description}
                          </Text>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
            {modules.length > 6 && (
              <div className="text-center mt-4">
                <Link to="/modules">
                  <Button>View All Modules</Button>
                </Link>
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Dashboard;