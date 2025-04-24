import React from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Space, Button } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined, 
  BellOutlined, 
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import PageLayout from './PageLayout';

const { Header, Content } = Layout;

export interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: { title: string; path?: string }[];
  menuItems?: React.ReactNode;
  actions?: React.ReactNode;
  user?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  onLogout?: () => void;
  sidebarCollapsed?: boolean;
  onSidebarCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Specialized layout for dashboard pages
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  breadcrumbs = [],
  menuItems,
  actions,
  user,
  onLogout,
  sidebarCollapsed = false,
  onSidebarCollapsedChange,
  className = '',
  style = {},
}) => {
  // Create header component
  const headerComponent = (
    <Header className="dashboard-header" style={{ padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="dashboard-header-left" style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onSidebarCollapsedChange?.(!sidebarCollapsed)}
          style={{ marginRight: 16 }}
        />
        
        <div className="dashboard-header-title">
          {title && <h1 style={{ margin: 0 }}>{title}</h1>}
          {subtitle && <div className="dashboard-header-subtitle">{subtitle}</div>}
        </div>
      </div>
      
      <div className="dashboard-header-right" style={{ display: 'flex', alignItems: 'center' }}>
        {actions}
        
        {user && (
          <Dropdown
            menu={{
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
                  onClick: onLogout,
                },
              ],
            }}
          >
            <Space style={{ cursor: 'pointer' }}>
              <Avatar src={user.avatar} icon={!user.avatar && <UserOutlined />} />
              <span>{user.name}</span>
            </Space>
          </Dropdown>
        )}
      </div>
    </Header>
  );
  
  // Create sidebar component
  const sidebarComponent = menuItems ? (
    <div className="dashboard-sidebar">
      <div className="dashboard-logo" style={{ padding: '16px', textAlign: 'center' }}>
        {/* Logo can go here */}
        {!sidebarCollapsed && <h2 style={{ margin: 0 }}>CauldronOS</h2>}
      </div>
      
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {menuItems}
      </Menu>
    </div>
  ) : null;
  
  // Create content wrapper with breadcrumbs
  const contentComponent = (
    <Content style={{ padding: '16px 24px' }}>
      {breadcrumbs.length > 0 && (
        <Breadcrumb style={{ marginBottom: 16 }}>
          {breadcrumbs.map((item, index) => (
            <Breadcrumb.Item key={index}>
              {item.path ? <a href={item.path}>{item.title}</a> : item.title}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}
      
      {children}
    </Content>
  );
  
  return (
    <PageLayout
      header={headerComponent}
      sidebar={sidebarComponent}
      sidebarCollapsed={sidebarCollapsed}
      onSidebarCollapsedChange={onSidebarCollapsedChange}
      className={`dashboard-layout ${className}`}
      style={style}
      contentClassName="dashboard-content"
    >
      {contentComponent}
    </PageLayout>
  );
};

export default DashboardLayout;
