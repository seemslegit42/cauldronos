import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin, Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  FundProjectionScreenOutlined, 
  ShoppingCartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import type { ModuleComponentProps } from '@cauldronos/types';

// Lazy-loaded components
const Dashboard = React.lazy(() => import('./Dashboard'));
const Contacts = React.lazy(() => import('./Contacts'));
const ContactDetail = React.lazy(() => import('./ContactDetail'));
const Leads = React.lazy(() => import('./Leads'));
const Deals = React.lazy(() => import('./Deals'));
const Settings = React.lazy(() => import('./Settings'));

const { Content, Sider } = Layout;

const CrmModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const { initialized, initialize } = useCrmStore();

  useEffect(() => {
    if (!initialized) {
      initialize(module, workspace);
    }
  }, [module, workspace, initialized, initialize]);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" tip="Loading CRM module..." />
      </div>
    );
  }

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/modules/crm'
    },
    {
      key: 'contacts',
      icon: <TeamOutlined />,
      label: 'Contacts',
      path: '/modules/crm/contacts'
    },
    {
      key: 'leads',
      icon: <FundProjectionScreenOutlined />,
      label: 'Leads',
      path: '/modules/crm/leads'
    },
    {
      key: 'deals',
      icon: <ShoppingCartOutlined />,
      label: 'Deals',
      path: '/modules/crm/deals'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      path: '/modules/crm/settings'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Layout className="h-full">
        <Sider
          width={200}
          theme="dark"
          className="bg-[#2E1A47] border-r border-gray-800"
          collapsible
        >
          <Menu
            mode="inline"
            theme="dark"
            className="h-full bg-transparent"
            defaultSelectedKeys={['dashboard']}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              onClick: () => window.location.href = item.path
            }))}
          />
        </Sider>
        <Layout className="bg-gray-900 text-white">
          <Content className="p-6">
            <React.Suspense fallback={<Spin size="large" className="flex justify-center mt-10" />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/contacts/:id" element={<ContactDetail />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </React.Suspense>
          </Content>
        </Layout>
      </Layout>
    </motion.div>
  );
};

export default CrmModule;import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin, Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  FundProjectionScreenOutlined, 
  ShoppingCartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import type { ModuleComponentProps } from '@cauldronos/types';

// Lazy-loaded components
const Dashboard = React.lazy(() => import('./Dashboard'));
const Contacts = React.lazy(() => import('./Contacts'));
const ContactDetail = React.lazy(() => import('./ContactDetail'));
const Leads = React.lazy(() => import('./Leads'));
const Deals = React.lazy(() => import('./Deals'));
const Settings = React.lazy(() => import('./Settings'));

const { Content, Sider } = Layout;

const CrmModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const { initialized, initialize } = useCrmStore();

  useEffect(() => {
    if (!initialized) {
      initialize(module, workspace);
    }
  }, [module, workspace, initialized, initialize]);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" tip="Loading CRM module..." />
      </div>
    );
  }

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/modules/crm'
    },
    {
      key: 'contacts',
      icon: <TeamOutlined />,
      label: 'Contacts',
      path: '/modules/crm/contacts'
    },
    {
      key: 'leads',
      icon: <FundProjectionScreenOutlined />,
      label: 'Leads',
      path: '/modules/crm/leads'
    },
    {
      key: 'deals',
      icon: <ShoppingCartOutlined />,
      label: 'Deals',
      path: '/modules/crm/deals'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      path: '/modules/crm/settings'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Layout className="h-full">
        <Sider
          width={200}
          theme="dark"
          className="bg-[#2E1A47] border-r border-gray-800"
          collapsible
        >
          <Menu
            mode="inline"
            theme="dark"
            className="h-full bg-transparent"
            defaultSelectedKeys={['dashboard']}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              onClick: () => window.location.href = item.path
            }))}
          />
        </Sider>
        <Layout className="bg-gray-900 text-white">
          <Content className="p-6">
            <React.Suspense fallback={<Spin size="large" className="flex justify-center mt-10" />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/contacts/:id" element={<ContactDetail />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </React.Suspense>
          </Content>
        </Layout>
      </Layout>
    </motion.div>
  );
};

export default CrmModule;import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin, Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  FundProjectionScreenOutlined, 
  ShoppingCartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import type { ModuleComponentProps } from '@cauldronos/types';

// Lazy-loaded components
const Dashboard = React.lazy(() => import('./Dashboard'));
const Contacts = React.lazy(() => import('./Contacts'));
const ContactDetail = React.lazy(() => import('./ContactDetail'));
const Leads = React.lazy(() => import('./Leads'));
const Deals = React.lazy(() => import('./Deals'));
const Settings = React.lazy(() => import('./Settings'));

const { Content, Sider } = Layout;

const CrmModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const { initialized, initialize } = useCrmStore();

  useEffect(() => {
    if (!initialized) {
      initialize(module, workspace);
    }
  }, [module, workspace, initialized, initialize]);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" tip="Loading CRM module..." />
      </div>
    );
  }

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/modules/crm'
    },
    {
      key: 'contacts',
      icon: <TeamOutlined />,
      label: 'Contacts',
      path: '/modules/crm/contacts'
    },
    {
      key: 'leads',
      icon: <FundProjectionScreenOutlined />,
      label: 'Leads',
      path: '/modules/crm/leads'
    },
    {
      key: 'deals',
      icon: <ShoppingCartOutlined />,
      label: 'Deals',
      path: '/modules/crm/deals'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      path: '/modules/crm/settings'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Layout className="h-full">
        <Sider
          width={200}
          theme="dark"
          className="bg-[#2E1A47] border-r border-gray-800"
          collapsible
        >
          <Menu
            mode="inline"
            theme="dark"
            className="h-full bg-transparent"
            defaultSelectedKeys={['dashboard']}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              onClick: () => window.location.href = item.path
            }))}
          />
        </Sider>
        <Layout className="bg-gray-900 text-white">
          <Content className="p-6">
            <React.Suspense fallback={<Spin size="large" className="flex justify-center mt-10" />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/contacts/:id" element={<ContactDetail />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </React.Suspense>
          </Content>
        </Layout>
      </Layout>
    </motion.div>
  );
};

export default CrmModule;import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin, Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  FundProjectionScreenOutlined, 
  ShoppingCartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import type { ModuleComponentProps } from '@cauldronos/types';

// Lazy-loaded components
const Dashboard = React.lazy(() => import('./Dashboard'));
const Contacts = React.lazy(() => import('./Contacts'));
const ContactDetail = React.lazy(() => import('./ContactDetail'));
const Leads = React.lazy(() => import('./Leads'));
const Deals = React.lazy(() => import('./Deals'));
const Settings = React.lazy(() => import('./Settings'));

const { Content, Sider } = Layout;

const CrmModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const { initialized, initialize } = useCrmStore();

  useEffect(() => {
    if (!initialized) {
      initialize(module, workspace);
    }
  }, [module, workspace, initialized, initialize]);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" tip="Loading CRM module..." />
      </div>
    );
  }

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/modules/crm'
    },
    {
      key: 'contacts',
      icon: <TeamOutlined />,
      label: 'Contacts',
      path: '/modules/crm/contacts'
    },
    {
      key: 'leads',
      icon: <FundProjectionScreenOutlined />,
      label: 'Leads',
      path: '/modules/crm/leads'
    },
    {
      key: 'deals',
      icon: <ShoppingCartOutlined />,
      label: 'Deals',
      path: '/modules/crm/deals'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      path: '/modules/crm/settings'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Layout className="h-full">
        <Sider
          width={200}
          theme="dark"
          className="bg-[#2E1A47] border-r border-gray-800"
          collapsible
        >
          <Menu
            mode="inline"
            theme="dark"
            className="h-full bg-transparent"
            defaultSelectedKeys={['dashboard']}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              onClick: () => window.location.href = item.path
            }))}
          />
        </Sider>
        <Layout className="bg-gray-900 text-white">
          <Content className="p-6">
            <React.Suspense fallback={<Spin size="large" className="flex justify-center mt-10" />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/contacts/:id" element={<ContactDetail />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </React.Suspense>
          </Content>
        </Layout>
      </Layout>
    </motion.div>
  );
};

export default CrmModule;