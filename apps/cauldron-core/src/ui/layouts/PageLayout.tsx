import React from 'react';
import { Layout } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

export interface PageLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: number | string;
  sidebarCollapsible?: boolean;
  sidebarCollapsed?: boolean;
  onSidebarCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

/**
 * Standard page layout with header, sidebar, content, and footer
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  header,
  sidebar,
  footer,
  sidebarWidth = 256,
  sidebarCollapsible = true,
  sidebarCollapsed = false,
  onSidebarCollapsedChange,
  className = '',
  style = {},
  contentClassName = '',
  contentStyle = {},
}) => {
  // Handle sidebar collapse
  const handleSidebarCollapse = (collapsed: boolean) => {
    if (onSidebarCollapsedChange) {
      onSidebarCollapsedChange(collapsed);
    }
  };
  
  return (
    <Layout className={`page-layout ${className}`} style={style}>
      {header && <Header className="page-layout-header">{header}</Header>}
      
      <Layout>
        {sidebar && (
          <Sider
            width={sidebarWidth}
            collapsible={sidebarCollapsible}
            collapsed={sidebarCollapsed}
            onCollapse={handleSidebarCollapse}
            className="page-layout-sidebar"
          >
            {sidebar}
          </Sider>
        )}
        
        <Content className={`page-layout-content ${contentClassName}`} style={contentStyle}>
          {children}
        </Content>
      </Layout>
      
      {footer && <Footer className="page-layout-footer">{footer}</Footer>}
    </Layout>
  );
};

export default PageLayout;
