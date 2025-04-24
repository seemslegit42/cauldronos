import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Badge, Input, Breadcrumb } from 'antd';
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
  FileOutlined,
  TeamOutlined,
  BarChartOutlined,
  CloudOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';

const { Header, Sider, Content, Footer } = Layout;

export interface DashboardLayoutProps {
  /**
   * Content to render inside the layout
   */
  children: React.ReactNode;
  
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to animate content on mount
   * @default true
   */
  animated?: boolean;
  
  /**
   * Whether to apply a glow effect
   * @default false
   */
  glow?: boolean;
  
  /**
   * Whether to show the header
   * @default true
   */
  showHeader?: boolean;
  
  /**
   * Whether to show the sidebar
   * @default true
   */
  showSidebar?: boolean;
  
  /**
   * Whether to show the footer
   * @default true
   */
  showFooter?: boolean;
  
  /**
   * Whether to show the breadcrumb
   * @default true
   */
  showBreadcrumb?: boolean;
  
  /**
   * Whether to show the search bar
   * @default true
   */
  showSearch?: boolean;
  
  /**
   * Whether to show the user menu
   * @default true
   */
  showUserMenu?: boolean;
  
  /**
   * Whether to show the notifications
   * @default true
   */
  showNotifications?: boolean;
  
  /**
   * Whether the sidebar is collapsible
   * @default true
   */
  collapsible?: boolean;
  
  /**
   * Default collapsed state of the sidebar
   * @default false
   */
  defaultCollapsed?: boolean;
  
  /**
   * Logo component or element
   */
  logo?: React.ReactNode;
  
  /**
   * Title of the dashboard
   * @default 'Dashboard'
   */
  title?: string;
  
  /**
   * User information
   */
  user?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  
  /**
   * Breadcrumb items
   */
  breadcrumbItems?: { title: string; href?: string }[];
  
  /**
   * Menu items for the sidebar
   */
  menuItems?: {
    key: string;
    icon?: React.ReactNode;
    title: string;
    children?: { key: string; title: string }[];
  }[];
  
  /**
   * Callback when a menu item is clicked
   */
  onMenuClick?: (key: string) => void;
  
  /**
   * Callback when the user logs out
   */
  onLogout?: () => void;
  
  /**
   * Callback when the user searches
   */
  onSearch?: (value: string) => void;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Additional style
   */
  style?: React.CSSProperties;
}

/**
 * Dashboard layout component with sidebar, header, and content area
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  cyberpunk = false,
  animated = true,
  glow = false,
  showHeader = true,
  showSidebar = true,
  showFooter = true,
  showBreadcrumb = true,
  showSearch = true,
  showUserMenu = true,
  showNotifications = true,
  collapsible = true,
  defaultCollapsed = false,
  logo,
  title = 'Dashboard',
  user = { name: 'User' },
  breadcrumbItems = [{ title: 'Home' }, { title: 'Dashboard' }],
  menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      title: 'Dashboard',
    },
    {
      key: 'apps',
      icon: <AppstoreOutlined />,
      title: 'Applications',
      children: [
        { key: 'app1', title: 'Application 1' },
        { key: 'app2', title: 'Application 2' },
      ],
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      title: 'User Management',
    },
    {
      key: 'files',
      icon: <FileOutlined />,
      title: 'Files',
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      title: 'Analytics',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      title: 'Settings',
    },
  ],
  onMenuClick,
  onLogout,
  onSearch,
  className = '',
  style = {},
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [selectedKey, setSelectedKey] = useState('dashboard');
  
  // Toggle sidebar collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  // Handle menu click
  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    if (onMenuClick) {
      onMenuClick(key);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };
  
  // Handle search
  const handleSearch = (value: string) => {
    if (onSearch) {
      onSearch(value);
    }
  };
  
  // Get class names based on props
  const getClassNames = () => {
    return [
      className,
      'dashboard-layout',
      cyberpunk ? 'cyberpunk-layout' : '',
      glow ? 'glow-effect' : '',
    ].filter(Boolean).join(' ');
  };
  
  // Render sidebar menu
  const renderMenu = () => {
    return (
      <Menu
        theme={cyberpunk ? 'dark' : 'light'}
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={['apps']}
        style={{ borderRight: 0 }}
      >
        {menuItems.map((item) => {
          if (item.children) {
            return (
              <Menu.SubMenu
                key={item.key}
                icon={item.icon}
                title={item.title}
              >
                {item.children.map((child) => (
                  <Menu.Item
                    key={child.key}
                    onClick={() => handleMenuClick(child.key)}
                  >
                    {child.title}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          }
          
          return (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleMenuClick(item.key)}
            >
              {item.title}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };
  
  // Render user menu
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  
  // Render notifications menu
  const notificationsMenu = (
    <Menu>
      <Menu.Item key="notification1">
        <div>
          <div style={{ fontWeight: 'bold' }}>System Update</div>
          <div>The system will be updated in 2 hours.</div>
        </div>
      </Menu.Item>
      <Menu.Item key="notification2">
        <div>
          <div style={{ fontWeight: 'bold' }}>New Message</div>
          <div>You have a new message from Admin.</div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="viewAll">View All Notifications</Menu.Item>
    </Menu>
  );
  
  // Skip animation if reduced motion is enabled or animated is false
  const shouldAnimate = animated && !reducedMotionEnabled;
  
  // Get animation variants
  const getContentAnimation = () => {
    if (!shouldAnimate) {
      return {};
    }
    
    return {
      initial: 'hidden',
      animate: 'visible',
      variants: transitions.fadeIn,
    };
  };
  
  return (
    <Layout className={getClassNames()} style={{ minHeight: '100vh', ...style }}>
      {showSidebar && (
        <Sider
          trigger={null}
          collapsible={collapsible}
          collapsed={collapsed}
          width={256}
          className={`dashboard-sider ${cyberpunk ? 'cyberpunk-sider' : ''}`}
        >
          <div className="logo" style={{ padding: '16px', textAlign: 'center' }}>
            {logo || (
              <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                {collapsed ? title.charAt(0) : title}
              </div>
            )}
          </div>
          {renderMenu()}
        </Sider>
      )}
      
      <Layout>
        {showHeader && (
          <Header
            className={`dashboard-header ${cyberpunk ? 'cyberpunk-header' : ''}`}
            style={{
              padding: '0 16px',
              background: cyberpunk ? '#1f1f3d' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {collapsible && (
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={toggleCollapsed}
                  style={{ marginRight: 16 }}
                />
              )}
              
              {showSearch && (
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined />}
                  style={{ width: 200 }}
                  onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
                />
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {showNotifications && (
                <Dropdown overlay={notificationsMenu} trigger={['click']}>
                  <Badge count={2} style={{ marginRight: 24 }}>
                    <Button type="text" icon={<BellOutlined />} />
                  </Badge>
                </Dropdown>
              )}
              
              <Button
                type="text"
                icon={<QuestionCircleOutlined />}
                style={{ marginRight: 16 }}
              />
              
              {showUserMenu && (
                <Dropdown overlay={userMenu} trigger={['click']}>
                  <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={user.avatar}
                      icon={!user.avatar && <UserOutlined />}
                      style={{ marginRight: 8 }}
                    />
                    <span>{user.name}</span>
                  </div>
                </Dropdown>
              )}
            </div>
          </Header>
        )}
        
        <Content
          className={`dashboard-content ${cyberpunk ? 'cyberpunk-content' : ''}`}
          style={{ margin: '16px' }}
        >
          {showBreadcrumb && (
            <Breadcrumb style={{ marginBottom: 16 }}>
              {breadcrumbItems.map((item, index) => (
                <Breadcrumb.Item key={index} href={item.href}>
                  {item.title}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}
          
          <div
            className="content-container"
            style={{
              padding: 24,
              background: cyberpunk ? '#1a1a2e' : '#fff',
              borderRadius: 4,
            }}
          >
            {shouldAnimate ? (
              <motion.div {...getContentAnimation()}>
                {children}
              </motion.div>
            ) : (
              children
            )}
          </div>
        </Content>
        
        {showFooter && (
          <Footer
            className={`dashboard-footer ${cyberpunk ? 'cyberpunk-footer' : ''}`}
            style={{ textAlign: 'center' }}
          >
            CauldronOS Dashboard ©{new Date().getFullYear()} Created by Augment Code
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
