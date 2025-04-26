import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Badge, Input, theme } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  UserOutlined, 
  BellOutlined, 
  SettingOutlined,
  SearchOutlined,
  LogoutOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ToolOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WorkspaceSwitcher from '../workspace/WorkspaceSwitcher';
import { useAuth } from 'wasp/client/auth';
import { useModules } from '../modules/ModuleRegistry';
import { useTheme } from '../ui/theme/useTheme';
import { cyberpunkColors } from '../ui/design-system/tokens';

const { Header, Sider, Content, Footer } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { data: user, logout } = useAuth();
  const { modules } = useModules();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { token } = theme.useToken();
  const { isDarkMode, toggleTheme } = useTheme();

  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  // Get selected keys for menu based on current path
  const getSelectedKeys = () => {
    const path = location.pathname;
    
    if (path === '/') return ['dashboard'];
    if (path === '/modules') return ['modules'];
    if (path === '/users') return ['users'];
    if (path === '/workspace/settings') return ['workspace-settings'];
    if (path === '/account/settings') return ['account-settings'];
    if (path === '/dev-playground') return ['dev-playground'];
    
    // Check if path is a module path
    const moduleSlug = path.match(/^\/modules\/([^/]+)/)?.[1];
    if (moduleSlug) {
      return [`module-${moduleSlug}`];
    }
    
    return [];
  };

  // User menu items
  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <Link to="/account/settings">
          <div className="flex items-center">
            <UserOutlined className="mr-2" />
            Profile
          </div>
        </Link>
      ),
    },
    {
      key: 'settings',
      label: (
        <Link to="/account/settings">
          <div className="flex items-center">
            <SettingOutlined className="mr-2" />
            Settings
          </div>
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <div className="flex items-center" onClick={handleLogout}>
          <LogoutOutlined className="mr-2" />
          Logout
        </div>
      ),
    },
  ];

  // Notification menu items
  const notificationItems = [
    {
      key: 'notification1',
      label: (
        <div>
          <div className="font-medium">System Update</div>
          <div className="text-sm text-gray-500">The system will be updated in 2 hours.</div>
        </div>
      ),
    },
    {
      key: 'notification2',
      label: (
        <div>
          <div className="font-medium">New Message</div>
          <div className="text-sm text-gray-500">You have a new message from Admin.</div>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'viewAll',
      label: 'View All Notifications',
    },
  ];

  // Generate menu items including modules
  const getMenuItems = () => {
    const coreItems = [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: <Link to="/">Dashboard</Link>,
      },
      {
        key: 'modules',
        icon: <AppstoreOutlined />,
        label: <Link to="/modules">Modules</Link>,
      },
    ];

    // Only show users menu item for admins
    if (user?.role === 'ADMIN') {
      coreItems.push({
        key: 'users',
        icon: <TeamOutlined />,
        label: <Link to="/users">Users</Link>,
      });
    }

    // Add workspace settings
    coreItems.push({
      key: 'workspace-settings',
      icon: <SettingOutlined />,
      label: <Link to="/workspace/settings">Workspace Settings</Link>,
    });

    // Add account settings
    coreItems.push({
      key: 'account-settings',
      icon: <UserOutlined />,
      label: <Link to="/account/settings">Account Settings</Link>,
    });

    // Add dev playground (for developers only)
    if (user?.role === 'ADMIN' || user?.role === 'DEVELOPER') {
      coreItems.push({
        key: 'dev-playground',
        icon: <ToolOutlined />,
        label: <Link to="/dev-playground">Dev Playground</Link>,
      });
    }

    // Add module menu items
    const moduleItems = modules.map(module => ({
      key: `module-${module.slug}`,
      icon: module.menuIcon || <AppstoreOutlined />,
      label: <Link to={module.path}>{module.menuLabel || module.name}</Link>,
    }));

    // Combine core items with module items
    return [...coreItems, { type: 'divider' }, ...moduleItems];
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={256}
        className="sidebar"
        style={{
          background: isDarkMode ? cyberpunkColors.background.darker : '#fff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          height: '100vh',
          position: 'fixed',
          left: 0,
          overflow: 'auto',
        }}
      >
        <div className="logo p-4 flex items-center justify-center">
          {collapsed ? (
            <div className="text-2xl font-bold text-center">C</div>
          ) : (
            <div className="text-xl font-bold text-center">CauldronOS</div>
          )}
        </div>
        <Menu
          theme={isDarkMode ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={getSelectedKeys()}
          style={{ 
            background: isDarkMode ? cyberpunkColors.background.darker : '#fff',
            borderRight: 0 
          }}
          items={getMenuItems()}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 256, transition: 'margin-left 0.2s' }}>
        <Header
          style={{
            padding: '0 16px',
            background: isDarkMode ? cyberpunkColors.background.dark : '#fff',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 999,
            position: 'sticky',
            top: 0,
          }}
        >
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              style={{ marginRight: 16 }}
            />
            <WorkspaceSwitcher />
          </div>
          <div className="flex items-center">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ width: 200, marginRight: 16 }}
            />
            <Dropdown
              menu={{ items: notificationItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Badge count={2} className="mr-4">
                <Button type="text" icon={<BellOutlined />} />
              </Badge>
            </Dropdown>
            <Button
              type="text"
              icon={<QuestionCircleOutlined />}
              style={{ marginRight: 16 }}
            />
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <div className="flex items-center cursor-pointer">
                <Avatar
                  src={user?.avatarUrl}
                  icon={!user?.avatarUrl && <UserOutlined />}
                  style={{ marginRight: 8 }}
                />
                <span className="mr-2 hidden md:inline">{user?.username || user?.email}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: isDarkMode ? cyberpunkColors.background.card : '#fff',
            borderRadius: 4,
            minHeight: 280,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </Content>
        <Footer style={{ 
          textAlign: 'center',
          background: 'transparent',
          color: isDarkMode ? cyberpunkColors.text.secondary : 'rgba(0, 0, 0, 0.45)'
        }}>
          CauldronOS ©{new Date().getFullYear()} Created by Bitbrew
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;