import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Tooltip, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  BarChartOutlined,
  CodeOutlined,
  SecurityScanOutlined,
  ApiOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  BugOutlined,
  ClockCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import useTheme from '../../styles/useTheme';
import { useSidebarStore } from '../../store/sidebarStore';

const { Sider } = Layout;
const { Title } = Typography;

export interface SidebarNavProps {
  loading?: boolean;
}

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
};

const SidebarNav: React.FC<SidebarNavProps> = ({
  loading = false
}) => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { colors, isDarkMode } = useTheme();

  // Get sidebar state from Zustand store
  const { collapsed, toggleCollapsed, setCollapsed } = useSidebarStore();

  // Update selected keys based on current location
  useEffect(() => {
    const pathKey = location.pathname.split('/')[2] || 'dashboard';
    setSelectedKeys([pathKey]);

    // Set open keys for the parent menu item
    if (!collapsed) {
      if (pathKey.includes('users') || pathKey.includes('roles') || pathKey.includes('permissions')) {
        setOpenKeys((prev) => [...prev.filter(key => key !== 'user-management'), 'user-management']);
      } else if (pathKey.includes('modules') || pathKey.includes('plugins')) {
        setOpenKeys((prev) => [...prev.filter(key => key !== 'module-management'), 'module-management']);
      } else if (pathKey.includes('logs') || pathKey.includes('errors') || pathKey.includes('monitoring')) {
        setOpenKeys((prev) => [...prev.filter(key => key !== 'system-monitoring'), 'system-monitoring']);
      }
    }
  }, [location.pathname, collapsed]);

  // Handle menu item click
  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  // Admin menu items
  const adminMenuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: 'user-management',
      icon: <TeamOutlined />,
      label: 'User Management',
      children: [
        {
          key: 'users',
          icon: <UserOutlined />,
          label: <Link to="/admin/users">Users</Link>,
        },
        {
          key: 'roles',
          icon: <SecurityScanOutlined />,
          label: <Link to="/admin/roles">Roles</Link>,
        },
        {
          key: 'permissions',
          icon: <SecurityScanOutlined />,
          label: <Link to="/admin/permissions">Permissions</Link>,
        },
      ]
    },
    {
      key: 'module-management',
      icon: <AppstoreOutlined />,
      label: 'Module Management',
      children: [
        {
          key: 'modules',
          icon: <AppstoreOutlined />,
          label: <Link to="/admin/modules">Modules</Link>,
        },
        {
          key: 'plugins',
          icon: <ApiOutlined />,
          label: <Link to="/admin/plugins">Plugins</Link>,
        },
      ]
    },
    {
      key: 'system-monitoring',
      icon: <BarChartOutlined />,
      label: 'System Monitoring',
      children: [
        {
          key: 'logs',
          icon: <CodeOutlined />,
          label: <Link to="/admin/logs">System Logs</Link>,
        },
        {
          key: 'errors',
          icon: <BugOutlined />,
          label: <Link to="/admin/errors">Error Logs</Link>,
        },
        {
          key: 'monitoring',
          icon: <CloudServerOutlined />,
          label: <Link to="/admin/monitoring">Monitoring</Link>,
        },
      ]
    },
    {
      key: 'database',
      icon: <DatabaseOutlined />,
      label: <Link to="/admin/database">Database</Link>,
    },
    {
      key: 'uptime',
      icon: <ClockCircleOutlined />,
      label: <Link to="/admin/uptime">Uptime</Link>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link to="/admin/settings">Settings</Link>,
    },
  ];

  // Sidebar toggle button
  const CollapseButton = () => (
    <motion.div
      className="sidebar-collapse-button"
      onClick={toggleCollapsed}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: collapsed ? 0 : 0,
        rotate: collapsed ? 0 : 180,
      }}
      transition={{
        duration: 0.3,
        type: 'spring',
        stiffness: 500,
        damping: 30
      }}
      style={{
        position: 'absolute',
        bottom: '20px',
        left: collapsed ? '24px' : '24px',
        cursor: 'pointer',
        zIndex: 100,
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: colors.backgroundHighlight,
        color: colors.primary,
        boxShadow: `0 0 10px ${colors.primary}40`,
      }}
    >
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </motion.div>
  );

  // Loading state
  if (loading) {
    return (
      <motion.div
        initial={{ width: collapsed ? 80 : 250 }}
        animate={{ width: collapsed ? 80 : 250 }}
        style={{
          background: colors.backgroundElevated,
          borderRight: `1px solid ${colors.border}`,
          overflow: 'hidden',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spin size="large" />
        </div>
      </motion.div>
    );
  }

  // Define animation variants
  const sidebarVariants = {
    expanded: {
      width: 250,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        when: 'beforeChildren',
      },
    },
    collapsed: {
      width: 80,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        when: 'afterChildren',
      },
    },
  };

  const childVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: 0.1,
      },
    },
    collapsed: {
      opacity: 0,
      x: -10,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <motion.div
      initial={collapsed ? 'collapsed' : 'expanded'}
      animate={collapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      style={{
        background: colors.backgroundElevated,
        borderRight: `1px solid ${colors.border}`,
        overflow: 'hidden',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <motion.div
        className="logo-container"
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 24px',
          borderBottom: `1px solid ${colors.border}`,
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          {collapsed ? (
            <motion.div
              key="logo-icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Tooltip title="Admin Dashboard" placement="right">
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    background: colors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: `0 0 10px ${colors.primary}40`,
                  }}
                >
                  A
                </div>
              </Tooltip>
            </motion.div>
          ) : (
            <motion.div
              key="logo-text"
              variants={childVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
            >
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: colors.text,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.5px',
                }}
              >
                Admin Dashboard
              </Title>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        style={{
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        variants={{
          expanded: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
          },
          collapsed: {
            opacity: 1,
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
          }
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={onOpenChange}
          items={adminMenuItems}
          style={{
            background: 'transparent',
            border: 'none',
          }}
          theme={isDarkMode ? 'dark' : 'light'}
        />
      </motion.div>

      <CollapseButton />
    </motion.div>
  );
};

export default SidebarNav;
