import React from 'react';
import { Layout } from 'antd';
import { AIAssistant } from '../features/ai-assistant';
import '../features/ai-assistant/styles/aiAssistant.css';

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="main-layout">
      <Header className="header">
        <div className="logo">CauldronOS</div>
        <div className="header-menu">
          {/* Header menu items would go here */}
        </div>
      </Header>
      
      <Content className="content">
        {children}
      </Content>
      
      <Footer className="footer">
        CauldronOS ©{new Date().getFullYear()} - All Rights Reserved
      </Footer>
      
      {/* AI Assistant */}
      <AIAssistant />
    </Layout>
  );
};

export default MainLayout;
