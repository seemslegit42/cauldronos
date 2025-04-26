import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Badge, Avatar, Space, Button, Typography, Input, Tooltip, Divider } from 'antd';
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  DownOutlined,
  GlobalOutlined,
  GithubOutlined,
  ApiOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useTheme from '../../styles/useTheme';
import { ThemeToggle } from '../../styles/ThemeToggle';
import { useSidebarStore } from '../../store/sidebarStore';

const { Header } = Layout;
const { Text } = Typography;

export interface TopNavBarProps {
  onLogout?: () => void;
  userName?: string;
  userAvatar?: string;
  userRole?: string;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'info' | 'warning' | 'error' | 'success';
  }>;
  loading?: boolean;
}

const TopNavBar: React.FC<TopNavBarProps> = ({
  onLogout,
  userName = 'Admin User',
  userAvatar,
  userRole = 'Administrator',
  notifications = [],
  loading = false,
}) => {
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const { colors, isDarkMode } = useTheme();
  const { collapsed } = useSidebarStore();

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      navigate('/login');
    }
  };

  // User dropdown menu
  const userMenu = (
    <Menu
      items={[
        {
          key: '1',
          icon: <UserOutlined />,
          label: 'Profile',
          onClick: () => navigate('/admin/profile'),
        },
        {
          key: '2',
          icon: <SettingOutlined />,
          label: 'Settings',
          onClick: () => navigate('/admin/settings'),
        },
        {
          type: 'divider',
        },
        {
          key: '3',
          icon: <LogoutOutlined />,
          label: 'Logout',
          onClick: handleLogout,
        },
      ]}
    />
  );

  // Notifications dropdown
  const notificationMenu = (
    <Menu
      style={{
        width: 320,
        maxHeight: 400,
        overflowY: 'auto',
      }}
      items={[
        {
          key: 'header',
          label: (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>Notifications</Text>
              <Button type="link" size="small">
                Mark all as read
              </Button>
            </div>
          ),
          disabled: true,
        },
        {
          type: 'divider',
          style: { margin: '0' },
        },
        ...(notifications.length > 0
          ? notifications.map((notification, index) => ({
              key: notification.id,
              label: (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>{notification.title}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{notification.time}</Text>
                  </div>
                  <Text style={{ fontSize: '13px' }}>{notification.message}</Text>
                </div>
              ),
              style: {
                backgroundColor: notification.read ? 'transparent' : (isDarkMode ? 'rgba(0, 240, 255, 0.05)' : 'rgba(0, 136, 255, 0.05)'),
              },
            }))
          : [{
              key: 'empty',
              label: (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <Text type="secondary">No notifications</Text>
                </div>
              ),
              disabled: true,
            }]
        ),
        {
          type: 'divider',
          style: { margin: '0' },
        },
        {
          key: 'footer',
          label: (
            <div style={{ textAlign: 'center' }}>
              <Button type="link" onClick={() => navigate('/admin/notifications')}>
                View all notifications
              </Button>
            </div>
          ),
        },
      ]}
    />
  );

  // Help menu
  const helpMenu = (
    <Menu
      items={[
        {
          key: '1',
          icon: <QuestionCircleOutlined />,
          label: 'Documentation',
          onClick: () => window.open('/docs', '_blank'),
        },
        {
          key: '2',
          icon: <ApiOutlined />,
          label: 'API Reference',
          onClick: () => window.open('/api-docs', '_blank'),
        },
        {
          key: '3',
          icon: <GithubOutlined />,
          label: 'GitHub Repository',
          onClick: () => window.open('https://github.com/your-repo', '_blank'),
        },
      ]}
    />
  );

  // Define animation variants for the header
  const headerVariants = {
    collapsed: {
      width: 'calc(100% - 80px)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    expanded: {
      width: 'calc(100% - 250px)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <motion.header
      initial={collapsed ? 'collapsed' : 'expanded'}
      animate={collapsed ? 'collapsed' : 'expanded'}
      variants={headerVariants}
      style={{
        position: 'fixed',
        zIndex: 99,
        padding: '0 24px',
        height: '64px',
        background: colors.backgroundElevated,
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        right: 0,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {searchVisible ? (
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            style={{ width: 250 }}
            onBlur={() => setSearchVisible(false)}
            autoFocus
          />
        ) : (
          <Button
            type="text"
            icon={<SearchOutlined />}
            onClick={() => setSearchVisible(true)}
            style={{ marginRight: 16 }}
          >
            Search
          </Button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Space size={16}>
          <Dropdown overlay={helpMenu} trigger={['click']}>
            <Button type="text" icon={<QuestionCircleOutlined />} />
          </Dropdown>

          <Dropdown overlay={notificationMenu} trigger={['click']} placement="bottomRight">
            <Badge count={notifications.filter(n => !n.read).length} size="small">
              <Button type="text" icon={<BellOutlined />} />
            </Badge>
          </Dropdown>

          <ThemeToggle showModeSelect={false} size="small" />

          <Divider type="vertical" style={{ height: 24, margin: '0 8px' }} />

          <Dropdown overlay={userMenu} trigger={['click']}>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar
                src={userAvatar}
                icon={!userAvatar && <UserOutlined />}
                style={{
                  backgroundColor: !userAvatar ? colors.primary : undefined,
                  boxShadow: !userAvatar ? `0 0 10px ${colors.primary}` : undefined,
                }}
              />
              {!collapsed && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text strong style={{ lineHeight: 1.2 }}>{userName}</Text>
                    <Text type="secondary" style={{ fontSize: '12px', lineHeight: 1.2 }}>{userRole}</Text>
                  </div>
                  <DownOutlined style={{ fontSize: 12 }} />
                </>
              )}
            </Space>
          </Dropdown>
        </Space>
      </motion.div>
    </motion.header>
  );
};

export default TopNavBar;
