import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { Typography, Space, Card, Button, List, Avatar, Tag, Divider } from 'antd';
import { 
  UserOutlined, 
  SettingOutlined, 
  InfoCircleOutlined, 
  BellOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    cyberpunk: { control: 'boolean' },
    animationType: {
      control: { type: 'select' },
      options: ['fade', 'slide', 'scale', 'none'],
    },
    glow: { control: 'boolean' },
    glitchOnChange: { control: 'boolean' },
    type: {
      control: { type: 'select' },
      options: ['line', 'card', 'editable-card'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
    },
    tabPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    centered: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Sample content for tabs
const DashboardContent = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Title level={4}>Dashboard Overview</Title>
    <Paragraph>
      Welcome to your dashboard. Here you can see an overview of your system's performance,
      recent activities, and important metrics.
    </Paragraph>
    <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
      <Card title="Users" style={{ flex: 1 }}>
        <Title level={3}>1,234</Title>
        <Text type="secondary">+12% from last month</Text>
      </Card>
      <Card title="Revenue" style={{ flex: 1 }}>
        <Title level={3}>$45,678</Title>
        <Text type="secondary">+8% from last month</Text>
      </Card>
      <Card title="Active Sessions" style={{ flex: 1 }}>
        <Title level={3}>567</Title>
        <Text type="secondary">Current active users</Text>
      </Card>
    </div>
  </Space>
);

const ProfileContent = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar size={64} icon={<UserOutlined />} />
      <div>
        <Title level={4} style={{ margin: 0 }}>John Doe</Title>
        <Text type="secondary">Administrator</Text>
      </div>
    </div>
    <Divider />
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ flex: 1 }}>
        <Title level={5}>Personal Information</Title>
        <Paragraph>
          <strong>Email:</strong> john.doe@example.com<br />
          <strong>Phone:</strong> (123) 456-7890<br />
          <strong>Location:</strong> New York, NY<br />
          <strong>Joined:</strong> January 15, 2022
        </Paragraph>
      </div>
      <div style={{ flex: 1 }}>
        <Title level={5}>Account Settings</Title>
        <Space direction="vertical">
          <Button icon={<SettingOutlined />}>Edit Profile</Button>
          <Button icon={<BellOutlined />}>Notification Settings</Button>
          <Button icon={<InfoCircleOutlined />}>Privacy Settings</Button>
        </Space>
      </div>
    </div>
  </Space>
);

const SettingsContent = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Title level={4}>System Settings</Title>
    <Paragraph>
      Configure your system settings and preferences.
    </Paragraph>
    <List
      itemLayout="horizontal"
      dataSource={[
        {
          title: 'General Settings',
          description: 'Configure general system settings',
          icon: <SettingOutlined />,
        },
        {
          title: 'User Management',
          description: 'Manage users and permissions',
          icon: <TeamOutlined />,
        },
        {
          title: 'Appearance',
          description: 'Customize the look and feel',
          icon: <AppstoreOutlined />,
        },
        {
          title: 'Notifications',
          description: 'Configure notification settings',
          icon: <BellOutlined />,
        },
        {
          title: 'Reports',
          description: 'Configure report settings',
          icon: <FileTextOutlined />,
        },
      ]}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={item.icon} />}
            title={item.title}
            description={item.description}
          />
          <Button>Configure</Button>
        </List.Item>
      )}
    />
  </Space>
);

const AnalyticsContent = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Title level={4}>Analytics</Title>
    <Paragraph>
      View detailed analytics and reports for your system.
    </Paragraph>
    <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
      <Card title="User Growth" style={{ flex: 1 }}>
        <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BarChartOutlined style={{ fontSize: 48, color: '#1677ff' }} />
        </div>
        <Divider />
        <Space>
          <Tag color="blue">This Month</Tag>
          <Tag color="green">+15%</Tag>
        </Space>
      </Card>
      <Card title="Revenue Trend" style={{ flex: 1 }}>
        <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BarChartOutlined style={{ fontSize: 48, color: '#52c41a' }} />
        </div>
        <Divider />
        <Space>
          <Tag color="blue">This Month</Tag>
          <Tag color="green">+8%</Tag>
        </Space>
      </Card>
    </div>
  </Space>
);

export const Default: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'fade',
    glow: false,
    glitchOnChange: false,
    type: 'line',
    size: 'middle',
    tabPosition: 'top',
    centered: false,
  },
};

export const CardType: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" type="card" style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'fade',
    glow: false,
    glitchOnChange: false,
    type: 'card',
    size: 'middle',
    tabPosition: 'top',
    centered: false,
  },
};

export const EditableCardType: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" type="editable-card" style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1" closable={false}>
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'fade',
    glow: false,
    glitchOnChange: false,
    type: 'editable-card',
    size: 'middle',
    tabPosition: 'top',
    centered: false,
  },
};

export const CyberpunkTabs: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" cyberpunk style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: true,
    animationType: 'fade',
    glow: false,
    glitchOnChange: false,
    type: 'line',
    size: 'middle',
    tabPosition: 'top',
    centered: false,
  },
};

export const GlowEffect: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" glow style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'fade',
    glow: true,
    glitchOnChange: false,
    type: 'line',
    size: 'middle',
    tabPosition: 'top',
    centered: false,
  },
};

export const GlitchOnChange: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" glitchOnChange style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'fade',
    glow: false,
    glitchOnChange: true,
    type: 'line',
    size: 'middle',
    tabPosition: 'top',
    centered: false,
  },
};

export const SlideAnimation: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" animationType="slide" style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'slide',
    glow: false,
    glitchOnChange: false,
    type: 'line',
    size: 'middle',
    tabPosition: 'top',
    centered: false,
  },
};

export const ScaleAnimation: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" animationType="scale" style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'scale',
    glow: false,
    glitchOnChange: false,
    type: 'line',
    size: 'middle',
    tabPosition: 'top',
    centered: false,
  },
};

export const VerticalTabs: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 400, width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'fade',
    glow: false,
    glitchOnChange: false,
    type: 'line',
    size: 'middle',
    tabPosition: 'left',
    centered: false,
  },
};

export const CenteredTabs: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" centered style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'fade',
    glow: false,
    glitchOnChange: false,
    type: 'line',
    size: 'middle',
    tabPosition: 'top',
    centered: true,
  },
};

export const SmallSize: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" size="small" style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'fade',
    glow: false,
    glitchOnChange: false,
    type: 'line',
    size: 'small',
    tabPosition: 'top',
    centered: false,
  },
};

export const LargeSize: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" size="large" style={{ width: 600 }}>
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: false,
    animationType: 'fade',
    glow: false,
    glitchOnChange: false,
    type: 'line',
    size: 'large',
    tabPosition: 'top',
    centered: false,
  },
};

export const FullFeatured: Story = {
  render: () => (
    <Tabs 
      defaultActiveKey="1" 
      cyberpunk 
      glow 
      animationType="scale" 
      glitchOnChange 
      type="card" 
      centered
      style={{ width: 600 }}
    >
      <TabPane tab="Dashboard" key="1">
        <DashboardContent />
      </TabPane>
      <TabPane tab="Profile" key="2">
        <ProfileContent />
      </TabPane>
      <TabPane tab="Settings" key="3">
        <SettingsContent />
      </TabPane>
      <TabPane tab="Analytics" key="4">
        <AnalyticsContent />
      </TabPane>
    </Tabs>
  ),
  args: {
    cyberpunk: true,
    animationType: 'scale',
    glow: true,
    glitchOnChange: true,
    type: 'card',
    size: 'middle',
    tabPosition: 'top',
    centered: true,
  },
};
