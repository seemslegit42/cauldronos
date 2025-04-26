import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Badge, Avatar, Space, Button, Divider, Typography, Switch } from 'antd';
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  RobotOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import SidebarToggle from './SidebarToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, logout } from 'wasp/client/auth';
import ThemeToggle from './ThemeToggle';
import WorkspaceSwitcher from '../workspace/WorkspaceSwitcher';
import LivePresence from '../workspace/LivePresence';
import ActivityFeed from '../workspace/ActivityFeed';
import DocsButton from '../docs/DocsButton';
import AIButton from '../ai/components/AIButton';
import { useAI } from '../ai/AIProvider';

const { Header } = Layout;
const { Text } = Typography;

interface TopNavProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ collapsed, setCollapsed, toggleCollapsed }) => {
  const { data: user } = useAuth();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { useSwarm, toggleUseSwarm } = useAI();

  // In a real app, these would come from the user object with proper types

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // User menu is now defined inline in the dropdown

  // Notifications are now handled by the ActivityFeed component

  return (
    <Header className="px-6 flex items-center justify-between shadow-sm z-10">
      <div className="flex items-center">
        <SidebarToggle 
          collapsed={collapsed} 
          toggleCollapsed={toggleCollapsed} 
          className="mr-4"
        />
        <WorkspaceSwitcher />
      </div>

      <div className="flex items-center space-x-4">
        <LivePresence className="mr-2" />
        <ThemeToggle className="mr-2" />
        <DocsButton className="mr-2" />
        <AIButton className="mr-2" />

        <Dropdown
          trigger={['click']}
          open={notificationsOpen}
          onOpenChange={setNotificationsOpen}
          dropdownRender={() => (
            <div className="bg-white rounded-md shadow-lg overflow-hidden" style={{ width: '320px', maxHeight: '500px', overflowY: 'auto' }}>
              <div className="px-4 py-2 font-medium border-b">
                Notifications
              </div>
              <ActivityFeed maxItems={5} showHeader={false} />
            </div>
          )}
        >
          <Badge count={2} size="small">
            <Button type="text" icon={<BellOutlined />} shape="circle" />
          </Badge>
        </Dropdown>

        <Dropdown
          trigger={['click']}
          dropdownRender={() => (
            <div className="bg-white rounded-md shadow-lg overflow-hidden" style={{ width: '240px' }}>
              <div className="px-4 py-3 border-b">
                <div className="font-medium">{user?.username || 'User'}</div>
                <Text type="secondary" className="text-xs">{user?.email}</Text>
                <div className="text-xs mt-1">
                  <Badge status="default" text="USER" />
                </div>
              </div>

              <div className="px-4 py-2 border-b">
                <div className="flex items-center justify-between">
                  <Space>
                    <RobotOutlined />
                    <span>AI Engine:</span>
                  </Space>
                  <Space>
                    <span className="text-xs">{useSwarm ? 'Swarm' : 'Standard'}</span>
                    <Switch
                      size="small"
                      checked={useSwarm}
                      onChange={toggleUseSwarm}
                      checkedChildren={<ThunderboltOutlined />}
                      unCheckedChildren={<RobotOutlined />}
                    />
                  </Space>
                </div>
              </div>

              <Menu
                items={[
                  {
                    key: 'account',
                    label: <Link to="/account">Account Settings</Link>,
                    icon: <SettingOutlined />
                  },
                  {
                    key: 'workspace-settings',
                    label: <Link to="/workspace-settings">Workspace Settings</Link>,
                    icon: <TeamOutlined />
                  },
                  {
                    key: 'help',
                    label: 'Help & Support',
                    icon: <QuestionCircleOutlined />
                  },
                  {
                    key: 'divider',
                    type: 'divider',
                  },
                  {
                    key: 'logout',
                    label: 'Logout',
                    icon: <LogoutOutlined />,
                    onClick: handleLogout
                  }
                ]}
              />
            </div>
          )}
        >
          <Space className="cursor-pointer">
            <Avatar
              icon={<UserOutlined />}
              size="default"
            />
            <span className="hidden md:inline">
              {user?.username || user?.email}
            </span>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
};

export default TopNav;
