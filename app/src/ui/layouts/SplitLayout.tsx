import React from 'react';
import { Layout } from 'antd';
import Row from './Row';
import Column from './Column';

export interface SplitLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  sidebarWidth?: number;
  sidebarPosition?: 'left' | 'right';
  gutter?: number;
  className?: string;
  style?: React.CSSProperties;
  sidebarClassName?: string;
  sidebarStyle?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

/**
 * Two-column layout for side-by-side content
 */
export const SplitLayout: React.FC<SplitLayoutProps> = ({
  children,
  sidebar,
  sidebarWidth = 8,
  sidebarPosition = 'left',
  gutter = 16,
  className = '',
  style = {},
  sidebarClassName = '',
  sidebarStyle = {},
  contentClassName = '',
  contentStyle = {},
}) => {
  // Calculate content width
  const contentWidth = 24 - sidebarWidth;
  
  // Determine order based on sidebar position
  const sidebarOrder = sidebarPosition === 'left' ? 1 : 2;
  const contentOrder = sidebarPosition === 'left' ? 2 : 1;
  
  return (
    <Layout className={`split-layout ${className}`} style={style}>
      <Row gutter={gutter}>
        <Column
          span={sidebarWidth}
          order={sidebarOrder}
          className={`split-layout-sidebar ${sidebarClassName}`}
          style={sidebarStyle}
        >
          {sidebar}
        </Column>
        
        <Column
          span={contentWidth}
          order={contentOrder}
          className={`split-layout-content ${contentClassName}`}
          style={contentStyle}
        >
          {children}
        </Column>
      </Row>
    </Layout>
  );
};

export default SplitLayout;
