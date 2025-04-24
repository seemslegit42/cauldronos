import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Badge, Space, theme } from 'antd';
import { Outlet, useLocation, useNavigate, useIntl } from 'umi';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  RobotOutlined,
  AppstoreOutlined,
  BellOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { AIButton } from '@cauldronos/agents';
import { PageTransition, FadeIn, SlideIn } from '@cauldronos/ui';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();
  const {
    token: { colorBgContainer, colorPrimary, borderRadiusLG },
  } = theme.useToken();

  // Menu items
  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: intl.formatMessage({ id: 'menu.dashboard' }),
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: intl.formatMessage({ id: 'menu.users' }),
    },
    {
      key: '/modules',
      icon: <AppstoreOutlined />,
      label: intl.formatMessage({ id: 'menu.modules' }),
    },
    {
      key: '/ai',
      icon: <RobotOutlined />,
      label: intl.formatMessage({ id: 'menu.ai' }),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: intl.formatMessage({ id: 'menu.settings' }),
    },
  ];

  // User dropdown menu
  const userMenu = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'Profile',
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'Settings',
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
      },
    ],
    onClick: ({ key }: { key: string }) => {
      if (key === 'profile') {
        navigate('/profile');
      } else if (key === 'settings') {
        navigate('/settings');
      } else if (key === 'logout') {
        // Handle logout
        console.log('Logout');
      }
    },
  };

  // Notifications dropdown menu
  const notificationsMenu = {
    items: [
      {
        key: 'notification1',
        label: 'New user registered',
        icon: <UserOutlined />,
      },
      {
        key: 'notification2',
        label: 'System update available',
        icon: <AppstoreOutlined />,
      },
      {
        key: 'notification3',
        label: 'New message received',
        icon: <BellOutlined />,
      },
    ],
  };

  // Logo animation variants
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
        }}
      >
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={collapsed ? 'collapsed' : 'expanded'}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8 }}
              variants={logoVariants}
            >
              {collapsed ? (
                <div className="text-2xl font-bold" style={{ color: colorPrimary }}>C</div>
              ) : (
                <div className="text-xl font-bold" style={{ color: colorPrimary }}>CauldronOS</div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 99,
            width: '100%',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <Space className="mr-4">
            <LanguageSwitcher />
            <Dropdown menu={notificationsMenu} placement="bottomRight" arrow>
              <Badge count={3} size="small">
                <Button type="text" icon={<BellOutlined />} />
              </Badge>
            </Dropdown>
            <Dropdown menu={userMenu} placement="bottomRight" arrow>
              <Button type="text" className="flex items-center">
                <Avatar icon={<UserOutlined />} className="mr-2" />
                <span className={collapsed ? 'hidden' : ''}>Admin User</span>
              </Button>
            </Dropdown>
            <AIButton className="ml-2" />
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
            overflow: 'auto',
          }}
        >
          <PageTransition>
            <Outlet />
          </PageTransition>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;