import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';
import { Card, Typography, Row, Col, Statistic, Button, Table, List, Avatar, Tag, Progress } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  UserOutlined, 
  ShoppingCartOutlined,
  DollarOutlined,
  FileOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const meta: Meta<typeof DashboardLayout> = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    cyberpunk: { control: 'boolean' },
    animated: { control: 'boolean' },
    glow: { control: 'boolean' },
    showHeader: { control: 'boolean' },
    showSidebar: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    showBreadcrumb: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    showUserMenu: { control: 'boolean' },
    showNotifications: { control: 'boolean' },
    collapsible: { control: 'boolean' },
    defaultCollapsed: { control: 'boolean' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

// Sample dashboard content
const DashboardContent = () => (
  <div>
    <Title level={2}>Dashboard Overview</Title>
    <Paragraph>Welcome to your dashboard. Here's an overview of your system's performance.</Paragraph>
    
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col span={6}>
        <Card>
          <Statistic
            title="Users"
            value={1128}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#3f8600' }}
            suffix={<ArrowUpOutlined />}
          />
          <Text type="secondary">+12% from last month</Text>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Orders"
            value={93}
            prefix={<ShoppingCartOutlined />}
            valueStyle={{ color: '#3f8600' }}
            suffix={<ArrowUpOutlined />}
          />
          <Text type="secondary">+5% from last month</Text>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Revenue"
            value={15680}
            prefix={<DollarOutlined />}
            valueStyle={{ color: '#3f8600' }}
            suffix={<ArrowUpOutlined />}
          />
          <Text type="secondary">+8% from last month</Text>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Files"
            value={128}
            prefix={<FileOutlined />}
            valueStyle={{ color: '#cf1322' }}
            suffix={<ArrowDownOutlined />}
          />
          <Text type="secondary">-2% from last month</Text>
        </Card>
      </Col>
    </Row>
    
    <Row gutter={16}>
      <Col span={16}>
        <Card title="Recent Orders" extra={<Button type="link">View All</Button>}>
          <Table
            dataSource={[
              {
                key: '1',
                id: 'ORD-001',
                customer: 'John Doe',
                date: '2023-04-23',
                amount: '$120.00',
                status: 'Completed',
              },
              {
                key: '2',
                id: 'ORD-002',
                customer: 'Jane Smith',
                date: '2023-04-22',
                amount: '$85.50',
                status: 'Processing',
              },
              {
                key: '3',
                id: 'ORD-003',
                customer: 'Bob Johnson',
                date: '2023-04-21',
                amount: '$220.00',
                status: 'Completed',
              },
              {
                key: '4',
                id: 'ORD-004',
                customer: 'Alice Brown',
                date: '2023-04-20',
                amount: '$65.25',
                status: 'Pending',
              },
            ]}
            columns={[
              {
                title: 'Order ID',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: 'Customer',
                dataIndex: 'customer',
                key: 'customer',
              },
              {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
              },
              {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
              },
              {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status) => {
                  let color = 'green';
                  if (status === 'Processing') color = 'blue';
                  if (status === 'Pending') color = 'orange';
                  return <Tag color={color}>{status}</Tag>;
                },
              },
              {
                title: 'Action',
                key: 'action',
                render: () => <Button type="link" size="small">View</Button>,
              },
            ]}
            pagination={false}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Recent Activities" extra={<Button type="link">View All</Button>}>
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                title: 'John Doe',
                description: 'Created a new account',
                avatar: <Avatar icon={<UserOutlined />} />,
                time: '2 hours ago',
              },
              {
                title: 'Jane Smith',
                description: 'Placed a new order',
                avatar: <Avatar icon={<ShoppingCartOutlined />} />,
                time: '3 hours ago',
              },
              {
                title: 'Bob Johnson',
                description: 'Updated profile information',
                avatar: <Avatar icon={<UserOutlined />} />,
                time: '5 hours ago',
              },
              {
                title: 'Alice Brown',
                description: 'Submitted a support ticket',
                avatar: <Avatar icon={<MessageOutlined />} />,
                time: '1 day ago',
              },
              {
                title: 'System',
                description: 'Backup completed successfully',
                avatar: <Avatar icon={<FileOutlined />} />,
                time: '1 day ago',
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.avatar}
                  title={item.title}
                  description={item.description}
                />
                <Text type="secondary">{item.time}</Text>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  </div>
);

export const Default: Story = {
  args: {
    cyberpunk: false,
    animated: true,
    glow: false,
    showHeader: true,
    showSidebar: true,
    showFooter: true,
    showBreadcrumb: true,
    showSearch: true,
    showUserMenu: true,
    showNotifications: true,
    collapsible: true,
    defaultCollapsed: false,
    title: 'Dashboard',
    user: { name: 'John Doe', role: 'Administrator' },
    children: <DashboardContent />,
  },
};

export const CyberpunkDashboard: Story = {
  args: {
    ...Default.args,
    cyberpunk: true,
    glow: true,
  },
};

export const MinimalDashboard: Story = {
  args: {
    ...Default.args,
    showFooter: false,
    showBreadcrumb: false,
    showSearch: false,
    showNotifications: false,
    defaultCollapsed: true,
  },
};

export const NoSidebar: Story = {
  args: {
    ...Default.args,
    showSidebar: false,
  },
};

export const NoHeader: Story = {
  args: {
    ...Default.args,
    showHeader: false,
  },
};

export const AnalyticsDashboard: Story = {
  render: () => (
    <DashboardLayout
      cyberpunk
      animated
      title="Analytics Dashboard"
      user={{ name: 'Data Analyst', role: 'Analyst' }}
      breadcrumbItems={[{ title: 'Home' }, { title: 'Analytics' }]}
    >
      <div>
        <Title level={2}>Analytics Overview</Title>
        <Paragraph>Here's an overview of your website's performance metrics.</Paragraph>
        
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Page Views"
                value={24563}
                prefix={<EyeOutlined />}
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
              <Text type="secondary">+18% from last month</Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Unique Visitors"
                value={8492}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
              <Text type="secondary">+12% from last month</Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Engagement Rate"
                value={42.8}
                prefix={<LikeOutlined />}
                valueStyle={{ color: '#3f8600' }}
                suffix="%"
              />
              <Text type="secondary">+5% from last month</Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Bounce Rate"
                value={28.4}
                prefix={<ArrowDownOutlined />}
                valueStyle={{ color: '#cf1322' }}
                suffix="%"
              />
              <Text type="secondary">-2% from last month</Text>
            </Card>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Top Pages" extra={<Button type="link">View All</Button>}>
              <Table
                dataSource={[
                  {
                    key: '1',
                    page: '/home',
                    views: 5842,
                    uniqueVisitors: 3254,
                    bounceRate: '25.4%',
                  },
                  {
                    key: '2',
                    page: '/products',
                    views: 4271,
                    uniqueVisitors: 2845,
                    bounceRate: '32.1%',
                  },
                  {
                    key: '3',
                    page: '/blog',
                    views: 3125,
                    uniqueVisitors: 2103,
                    bounceRate: '28.7%',
                  },
                  {
                    key: '4',
                    page: '/contact',
                    views: 1842,
                    uniqueVisitors: 1532,
                    bounceRate: '35.2%',
                  },
                ]}
                columns={[
                  {
                    title: 'Page',
                    dataIndex: 'page',
                    key: 'page',
                  },
                  {
                    title: 'Views',
                    dataIndex: 'views',
                    key: 'views',
                    sorter: (a, b) => a.views - b.views,
                  },
                  {
                    title: 'Unique Visitors',
                    dataIndex: 'uniqueVisitors',
                    key: 'uniqueVisitors',
                    sorter: (a, b) => a.uniqueVisitors - b.uniqueVisitors,
                  },
                  {
                    title: 'Bounce Rate',
                    dataIndex: 'bounceRate',
                    key: 'bounceRate',
                  },
                ]}
                pagination={false}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Traffic Sources" extra={<Button type="link">View Details</Button>}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text>Organic Search</Text>
                  <Text>45%</Text>
                </div>
                <Progress percent={45} status="active" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text>Direct</Text>
                  <Text>25%</Text>
                </div>
                <Progress percent={25} status="active" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text>Social Media</Text>
                  <Text>18%</Text>
                </div>
                <Progress percent={18} status="active" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text>Referral</Text>
                  <Text>12%</Text>
                </div>
                <Progress percent={12} status="active" />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  ),
};

export const MobileDashboard: Story = {
  render: () => (
    <DashboardLayout
      defaultCollapsed={true}
      showFooter={false}
      showBreadcrumb={false}
      title="Mobile Dashboard"
      user={{ name: 'Mobile User' }}
    >
      <div>
        <Title level={3}>Mobile Overview</Title>
        
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Users"
                value={1128}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Orders"
                value={93}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Revenue"
                value={15680}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Files"
                value={128}
                prefix={<FileOutlined />}
              />
            </Card>
          </Col>
        </Row>
        
        <Card title="Recent Activities" style={{ marginTop: 16 }}>
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                title: 'John Doe',
                description: 'Created a new account',
                avatar: <Avatar icon={<UserOutlined />} />,
                time: '2 hours ago',
              },
              {
                title: 'Jane Smith',
                description: 'Placed a new order',
                avatar: <Avatar icon={<ShoppingCartOutlined />} />,
                time: '3 hours ago',
              },
              {
                title: 'Bob Johnson',
                description: 'Updated profile information',
                avatar: <Avatar icon={<UserOutlined />} />,
                time: '5 hours ago',
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.avatar}
                  title={item.title}
                  description={item.description}
                />
                <Text type="secondary">{item.time}</Text>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </DashboardLayout>
  ),
};
