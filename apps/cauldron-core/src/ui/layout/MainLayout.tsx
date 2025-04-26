import React, { useEffect } from 'react';
import { Layout, Spin } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import useSidebarCollapse from './useSidebarCollapse';

const { Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const { data: user, isLoading } = useAuth();
  const { collapsed, setCollapsed, toggleCollapsed } = useSidebarCollapse({
    defaultCollapsed: false,
    localStorageKey: 'cauldron-sidebar-collapsed'
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [user, isLoading, location.pathname, navigate]);

  // If loading, show a spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  // If not authenticated, don't render the layout
  if (!user) {
    return null;
  }

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Layout
        className="content-transition"
        style={{
          transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
          marginLeft: collapsed ? '80px' : '250px',
          width: 'calc(100% - ' + (collapsed ? '80px' : '250px') + ')'
        }}
      >
        <TopNav collapsed={collapsed} setCollapsed={setCollapsed} toggleCollapsed={toggleCollapsed} />
        <Content
          className="p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)]"
          style={{
            transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
            opacity: 1,
            transform: collapsed ? 'scale(1)' : 'scale(1)',
            transformOrigin: 'left top'
          }}
        >
          <Outlet />
        </Content>
        <Footer className="text-center text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400">
          CauldronOS ©{new Date().getFullYear()} - Modular OS for Micro-SaaS Tools
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
