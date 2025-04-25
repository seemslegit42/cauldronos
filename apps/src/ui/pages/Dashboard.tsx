import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  List,
  Avatar,
  Tag,
  Button,
  Divider,
  Space,
  Tabs,
  Progress,
  Empty,
  Badge
} from 'antd';
import {
  UserOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  RiseOutlined,
  PlusOutlined,
  UserAddOutlined,
  SettingOutlined,
  BellOutlined,
  BarChartOutlined,
  CalendarOutlined,
  FileTextOutlined,
  RobotOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../workspace/operations';
import { useModules } from '../modules/ModuleRegistry';
import RoleBasedAccess from '../auth/RoleBasedAccess';
import WorkspaceAccess from '../auth/WorkspaceAccess';
import { Link } from 'react-router-dom';
import ActivityFeed from '../workspace/ActivityFeed';
import LivePresence from '../workspace/LivePresence';
import AIActionButton, { AIAction } from '../ai/components/AIActionButton';
import { useAI } from '../ai/AIProvider';
import { AIOutputType } from '../ai/components/AIOutputBlock';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for active users
const activeUsers = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Admin',
    activity: 85,
    avatar: null
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Manager',
    activity: 72,
    avatar: null
  },
  {
    id: '3',
    name: 'Bob Johnson',
    role: 'User',
    activity: 65,
    avatar: null
  }
];

// Mock data for module usage
const moduleUsage = [
  {
    id: '1',
    name: 'AI Assistant',
    usage: 78,
    icon: <RobotOutlined />
  },
  {
    id: '2',
    name: 'CRM',
    usage: 65,
    icon: <CustomerServiceOutlined />
  },
  {
    id: '3',
    name: 'Knowledge Base',
    usage: 42,
    icon: <FileTextOutlined />
  }
];

// Widget components
const WidgetPlaceholder = ({ title, icon, description }: { title: string, icon: React.ReactNode, description: string }) => (
  <Card className="h-full">
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <Space direction="vertical" align="center">
          <div className="text-4xl text-gray-300">{icon}</div>
          <Title level={5}>{title}</Title>
          <Text type="secondary">{description}</Text>
          <Button type="primary" ghost>Coming Soon</Button>
        </Space>
      }
    />
  </Card>
);

const Dashboard: React.FC = () => {
  const { data: user } = useAuth();
  const { currentWorkspace } = useWorkspaces();
  const { modules } = useModules();
  const { useSwarm, toggleUseSwarm } = useAI();
  const [activeTab, setActiveTab] = useState('overview');

  // Define AI actions for the dashboard
  const dashboardAIActions: AIAction[] = [
    {
      id: 'analyze-workspace',
      label: 'Analyze Workspace',
      description: 'Get AI insights about your workspace activity and usage patterns',
      icon: <BarChartOutlined />,
      prompt: 'Analyze my workspace data and provide insights about activity and usage patterns.',
      outputType: 'markdown'
    },
    {
      id: 'suggest-modules',
      label: 'Suggest Modules',
      description: 'Get AI recommendations for modules based on your usage',
      icon: <AppstoreOutlined />,
      prompt: 'Based on my current modules and usage patterns, what additional modules would you recommend?',
      outputType: 'markdown'
    },
    {
      id: 'optimize-workspace',
      label: 'Optimize Workspace',
      description: 'Get AI recommendations for optimizing your workspace',
      icon: <SettingOutlined />,
      prompt: 'How can I optimize my workspace for better productivity and collaboration?',
      outputType: 'markdown'
    }
  ];

  // Get workspace initials for avatar
  const getWorkspaceInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get color based on workspace name
  const getWorkspaceColor = (name: string) => {
    const colors = [
      '#1677ff', // blue
      '#52c41a', // green
      '#722ed1', // purple
      '#eb2f96', // pink
      '#fa8c16', // orange
      '#13c2c2', // cyan
      '#f5222d', // red
    ];

    const hash = name?.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0) || 0;

    return colors[hash % colors.length];
  };

  return (
    <WorkspaceAccess>
      <div>
        {/* Workspace Header */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar
                size={64}
                style={{
                  backgroundColor: getWorkspaceColor(currentWorkspace?.name || 'Default'),
                  marginRight: '16px'
                }}
              >
                {getWorkspaceInitials(currentWorkspace?.name || 'Default')}
              </Avatar>
              <div>
                <Title level={2} className="mb-0">{currentWorkspace?.name || 'Default Workspace'}</Title>
                <Text type="secondary">
                  Welcome back, {user?.username || 'User'}! Here's what's happening in your workspace.
                </Text>
              </div>
            </div>
            <Space>
              <LivePresence />
              <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER']}>
                <Button type="primary" icon={<UserAddOutlined />} href="/users">
                  Invite User
                </Button>
              </RoleBasedAccess>
              <Button type="primary" icon={<PlusOutlined />} href="/modules">
                Add Module
              </Button>
              <Divider type="vertical" />
              <Space>
                {dashboardAIActions.map(action => (
                  <AIActionButton
                    key={action.id}
                    action={action}
                    type="default"
                    size="middle"
                  />
                ))}
              </Space>
            </Space>
          </div>
        </Card>

        {/* Key Metrics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className="h-full shadow-sm transition-all hover:shadow-md">
              <Statistic
                title="Users"
                value={currentWorkspace?.memberCount || 0}
                prefix={<UserOutlined className="text-blue-500" />}
                valueStyle={{ color: '#1677ff' }}
              />
              <div className="mt-2">
                <Text type="secondary" className="text-xs">
                  {currentWorkspace?.memberCount ? `${Math.round(activeUsers.length / (currentWorkspace?.memberCount || 1) * 100)}% active in last 7 days` : 'No users yet'}
                </Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className="h-full shadow-sm transition-all hover:shadow-md">
              <Statistic
                title="Active Modules"
                value={modules.filter(m => m.isEnabled).length}
                prefix={<AppstoreOutlined className="text-green-500" />}
                valueStyle={{ color: '#52c41a' }}
              />
              <div className="mt-2">
                <Text type="secondary" className="text-xs">
                  {modules.length > 0 ? `${Math.round(modules.filter(m => m.isEnabled).length / modules.length * 100)}% of available modules` : 'No modules installed'}
                </Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className="h-full shadow-sm transition-all hover:shadow-md">
              <Statistic
                title="Workspace Plan"
                value={currentWorkspace?.plan?.toUpperCase() || 'FREE'}
                prefix={<RiseOutlined className="text-purple-500" />}
                valueStyle={{ color: '#722ed1' }}
              />
              <div className="mt-2">
                <Text type="secondary" className="text-xs">
                  {currentWorkspace?.plan === 'pro' ? 'All features unlocked' : 'Upgrade for more features'}
                </Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className="h-full shadow-sm transition-all hover:shadow-md">
              <Statistic
                title="Recent Activity"
                value={5}
                prefix={<BellOutlined className="text-orange-500" />}
                valueStyle={{ color: '#fa8c16' }}
              />
              <div className="mt-2">
                <Text type="secondary" className="text-xs">
                  3 activities in the last 24 hours
                </Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Tabs for different dashboard views */}
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-6">
          <TabPane tab="Overview" key="overview" />
          <TabPane tab="Activity" key="activity" />
          <TabPane tab="Modules" key="modules" />
          <TabPane tab="Users" key="users" />
        </Tabs>

        {activeTab === 'overview' && (
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card
                title="Recent Activity"
                className="mb-6 shadow-sm"
                extra={<Button type="link">View All</Button>}
              >
                <ActivityFeed maxItems={5} showFilters={false} />
              </Card>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="Module Usage" className="shadow-sm h-full">
                    <List
                      dataSource={moduleUsage}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                icon={item.icon}
                                style={{ backgroundColor: getWorkspaceColor(item.name) }}
                              />
                            }
                            title={item.name}
                            description={
                              <Progress
                                percent={item.usage}
                                size="small"
                                status="active"
                                strokeColor={getWorkspaceColor(item.name)}
                              />
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <WidgetPlaceholder
                    title="Analytics Dashboard"
                    icon={<BarChartOutlined />}
                    description="Detailed analytics about your workspace usage and activity will be available soon."
                  />
                </Col>
              </Row>
            </Col>

            <Col xs={24} lg={8}>
              <Card
                title="Your Modules"
                className="mb-6 shadow-sm"
                extra={<Button type="link" href="/modules">View All</Button>}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={modules.slice(0, 3)}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            icon={<AppstoreOutlined />}
                            style={{ backgroundColor: item.isCore ? '#1677ff' : '#52c41a' }}
                          />
                        }
                        title={<Link to={`/modules/${item.slug}`}>{item.name}</Link>}
                        description={
                          <div className="text-xs text-gray-500">
                            {item.description?.substring(0, 50)}
                            {item.description && item.description.length > 50 ? '...' : ''}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
                {modules.length === 0 && (
                  <Empty
                    description="No modules installed yet"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  >
                    <Button type="primary" href="/modules">
                      Browse Modules
                    </Button>
                  </Empty>
                )}
              </Card>

              <Card title="Active Users" className="mb-6 shadow-sm">
                <List
                  dataSource={activeUsers}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} src={item.avatar} />}
                        title={
                          <div className="flex items-center">
                            {item.name}
                            <Tag color="blue" className="ml-2">{item.role}</Tag>
                          </div>
                        }
                        description={
                          <Progress
                            percent={item.activity}
                            size="small"
                            status="active"
                            strokeColor={item.activity > 70 ? '#52c41a' : item.activity > 50 ? '#faad14' : '#ff4d4f'}
                          />
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>

              <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER']}>
                <Card
                  title="Admin Quick Links"
                  className="shadow-sm"
                >
                  <List>
                    <List.Item>
                      <Button type="link" href="/users" icon={<UserOutlined />}>
                        Manage Users
                      </Button>
                    </List.Item>
                    <List.Item>
                      <Button type="link" href="/workspace-settings" icon={<SettingOutlined />}>
                        Workspace Settings
                      </Button>
                    </List.Item>
                    <List.Item>
                      <Button type="link" href="/modules" icon={<AppstoreOutlined />}>
                        Manage Modules
                      </Button>
                    </List.Item>
                  </List>
                </Card>
              </RoleBasedAccess>
            </Col>
          </Row>
        )}

        {activeTab === 'activity' && (
          <Card className="shadow-sm">
            <ActivityFeed showFilters={true} maxItems={20} />
          </Card>
        )}

        {activeTab === 'modules' && (
          <Card className="shadow-sm">
            <WidgetPlaceholder
              title="Module Analytics"
              icon={<AppstoreOutlined />}
              description="Detailed analytics about your module usage will be available soon."
            />
          </Card>
        )}

        {activeTab === 'users' && (
          <Card className="shadow-sm">
            <WidgetPlaceholder
              title="User Activity"
              icon={<UserOutlined />}
              description="Detailed user activity tracking will be available soon."
            />
          </Card>
        )}
      </div>
    </WorkspaceAccess>
  );
};

export default Dashboard;
