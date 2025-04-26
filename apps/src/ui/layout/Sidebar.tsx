import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  ExperimentOutlined,
  HomeOutlined,
  RobotOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
  MailOutlined,
  CalendarOutlined,
  DollarOutlined,
  BgColorsOutlined,
  CodeOutlined,
  LockOutlined
} from '@ant-design/icons';
import { useAuth } from 'wasp/client/auth';
import type { MenuProps } from 'antd';
import { useModules } from '../modules/ModuleRegistry';
import CSSMotion from 'rc-motion';
import './Sidebar.css';

const { Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapsed }) => {
  const location = useLocation();
  const { data: user } = useAuth();
  const { modules } = useModules();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>(['modules-group']);

  // Update selected keys when location changes
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts.length > 1) {
      if (pathParts[1] === 'modules' && pathParts.length > 2) {
        setSelectedKeys([`module-${pathParts[2]}`]);
        setOpenKeys(prev => [...prev, 'modules-group']);
      } else {
        setSelectedKeys([pathParts[1] || 'dashboard']);
      }
    }
  }, [location]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    if (collapsed) return;
    setOpenKeys(keys as string[]);
  };

  // Core menu items
  const coreMenuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    }
  ];

  // Module categories
  const moduleCategories = {
    productivity: 'Productivity',
    communication: 'Communication',
    analytics: 'Analytics',
    crm: 'CRM',
    finance: 'Finance',
    marketing: 'Marketing',
    other: 'Other'
  };

  // Group modules by category
  const groupedModules: Record<string, any[]> = {};
  modules
    .filter(module => module.isEnabled)
    .forEach(module => {
      const category = module.category;
      if (!groupedModules[category]) {
        groupedModules[category] = [];
      }
      groupedModules[category].push(module);
    });

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'productivity':
        return <CalendarOutlined />;
      case 'communication':
        return <MailOutlined />;
      case 'analytics':
        return <BarChartOutlined />;
      case 'crm':
        return <CustomerServiceOutlined />;
      case 'finance':
        return <DollarOutlined />;
      case 'marketing':
        return <MailOutlined />;
      default:
        return <AppstoreOutlined />;
    }
  };

  // Create module menu items with nested structure
  const moduleMenuItems: MenuItem[] = [
    {
      key: 'modules-group',
      icon: <AppstoreOutlined />,
      label: 'Modules',
      children: [
        {
          key: 'modules',
          icon: <AppstoreOutlined />,
          label: <Link to="/modules">All Modules</Link>,
        },
        ...Object.entries(groupedModules).map(([category, categoryModules]) => ({
          key: `category-${category}`,
          icon: getCategoryIcon(category),
          label: moduleCategories[category as keyof typeof moduleCategories] || category,
          children: categoryModules.map(module => ({
            key: `module-${module.slug}`,
            icon: module.menuIcon ? <span className="anticon">{module.menuIcon}</span> : <AppstoreOutlined />,
            label: <Link to={`/modules/${module.slug}`}>{module.menuLabel || module.name}</Link>,
          }))
        }))
      ]
    }
  ];

  // Add placeholder modules for the required modules
  const placeholderModules: MenuItem[] = [
    {
      key: 'module-ai-assistant',
      icon: <RobotOutlined />,
      label: <Link to="/modules/ai-assistant">AI Assistant</Link>,
    },
    {
      key: 'module-crm',
      icon: <CustomerServiceOutlined />,
      label: <Link to="/modules/crm">CRM</Link>,
    },
    {
      key: 'module-knowledge-base',
      icon: <FileTextOutlined />,
      label: <Link to="/modules/knowledge-base">Knowledge Base</Link>,
    }
  ];

  // Admin menu items
  const adminMenuItems: MenuItem[] = user?.isAdmin ? [
    {
      key: 'admin-group',
      icon: <TeamOutlined />,
      label: 'Admin',
      children: [
        {
          key: 'admin',
          icon: <DashboardOutlined />,
          label: <Link to="/admin">Admin Dashboard</Link>,
        },
        {
          key: 'users',
          icon: <UserOutlined />,
          label: <Link to="/users">Users</Link>,
        },
        {
          key: 'admin-permissions',
          icon: <LockOutlined />,
          label: <Link to="/admin/permissions">Permissions</Link>,
        },
        {
          key: 'admin-analytics',
          icon: <BarChartOutlined />,
          label: <Link to="/admin/analytics">Analytics</Link>,
        }
      ]
    }
  ] : [];

  // Settings menu items
  const settingsMenuItems: MenuItem[] = [
    {
      key: 'settings-group',
      icon: <SettingOutlined />,
      label: 'Settings',
      children: [
        {
          key: 'workspace-settings',
          icon: <SettingOutlined />,
          label: <Link to="/workspace-settings">Workspace Settings</Link>,
        },
        {
          key: 'workspace-theme',
          icon: <BgColorsOutlined />,
          label: <Link to="/workspace-settings/theme">Theme Settings</Link>,
        },
        {
          key: 'workspace-permissions',
          icon: <LockOutlined />,
          label: <Link to="/workspace-settings/permissions">Permissions</Link>,
        },
        {
          key: 'account',
          icon: <UserOutlined />,
          label: <Link to="/account">Account Settings</Link>,
        }
      ]
    }
  ];

  // Developer menu items
  const devMenuItems: MenuItem[] = user?.isAdmin ? [
    {
      key: 'dev-playground',
      icon: <ExperimentOutlined />,
      label: <Link to="/dev-playground">Dev Playground</Link>,
    },
    {
      key: 'module-scaffolder',
      icon: <CodeOutlined />,
      label: <Link to="/module-scaffolder">Module Scaffolder</Link>,
    },
    {
      key: 'components-demo',
      icon: <ExperimentOutlined />,
      label: <Link to="/components-demo">Components Demo</Link>,
    },
    {
      key: 'code-highlighter-demo',
      icon: <CodeOutlined />,
      label: <Link to="/code-highlighter-demo">Code Highlighter</Link>,
    }
  ] : [];

  // Detect if we're on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Add event listener for window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mobile overlay click
  const handleOverlayClick = () => {
    if (isMobile && !collapsed) {
      toggleCollapsed();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isMobile && !collapsed ? 'visible' : ''}`}
        onClick={handleOverlayClick}
      />

      <CSSMotion
        visible={true}
        motionName="sidebar-motion"
        motionAppear
        removeOnLeave={false}
      >
        {({ className: motionClassName, style: motionStyle }) => (
          <div
            className={`sidebar-container shadow-sm bg-white dark:bg-gray-800 h-screen overflow-hidden z-10 fixed left-0 top-0 ${motionClassName}`}
            style={{
              ...motionStyle,
              width: collapsed ? '80px' : '250px',
              transition: 'width 300ms cubic-bezier(0.645, 0.045, 0.355, 1)'
            }}
          >
          <Sider
            width="100%"
            collapsible
            collapsed={collapsed}
            className="h-full"
            theme="light"
            trigger={null}
          >
            <div className="logo-container p-4 flex items-center justify-center">
              <Link to="/" className="flex items-center">
                <div
                  className="logo-icon flex items-center justify-center"
                  style={{
                    marginRight: collapsed ? 0 : '0.5rem',
                    transition: 'margin-right 300ms cubic-bezier(0.645, 0.045, 0.355, 1), transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1)',
                    transform: collapsed ? 'scale(1.2)' : 'scale(1)'
                  }}
                >
                  <HomeOutlined className="text-xl text-blue-500" />
                </div>
                {!collapsed && (
                  <CSSMotion
                    visible={!collapsed}
                    motionName="sidebar-text-motion"
                    motionAppear
                    removeOnLeave={false}
                  >
                    {({ className: textClassName, style: textStyle }) => (
                      <div className={textClassName} style={textStyle}>
                        <Title level={4} className="m-0 dark:text-white">CauldronOS</Title>
                      </div>
                    )}
                  </CSSMotion>
                )}
              </Link>
            </div>

            <div
              className="sidebar-scrollbar"
              style={{
                height: 'calc(100vh - 80px)',
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
            >
              <Menu
                mode="inline"
                selectedKeys={selectedKeys}
                openKeys={collapsed ? [] : openKeys}
                onOpenChange={onOpenChange}
                className={collapsed ? "ant-menu-collapsed" : ""}
                items={[
                  ...coreMenuItems,
                  ...moduleMenuItems,
                  ...placeholderModules,
                  ...adminMenuItems,
                  ...settingsMenuItems,
                  ...devMenuItems
                ]}
              />
            </div>
          </Sider>
        </div>
      )}
    </CSSMotion>
    </>
  );
};

export default Sidebar;
