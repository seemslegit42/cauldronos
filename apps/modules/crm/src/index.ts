import { lazy } from 'react';
import { CustomerServiceOutlined } from '@ant-design/icons';
import type { ModuleRegistration } from '@cauldronos/types';
import manifest from '../manifest.json';

// Lazy-loaded components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contacts = lazy(() => import('./pages/Contacts'));
const ContactDetail = lazy(() => import('./pages/ContactDetail'));
const Leads = lazy(() => import('./pages/Leads'));
const Deals = lazy(() => import('./pages/Deals'));
const Settings = lazy(() => import('./pages/Settings'));

// Main module component
const CrmModule = lazy(() => import('./pages/CrmModule'));

// Module registration
const moduleRegistration: ModuleRegistration = {
  slug: manifest.slug,
  name: manifest.name,
  description: manifest.description,
  version: manifest.version,
  category: manifest.category as any,
  component: CrmModule,
  settingsComponent: Settings,
  config: manifest.defaultConfig,
  menuIcon: <CustomerServiceOutlined />,
  menuLabel: manifest.menuLabel,
  menuOrder: manifest.menuOrder,
  requiredRoles: manifest.requiredRoles as any[],
  apiEndpoints: manifest.apiEndpoints,
  permissions: manifest.permissions,
  dependencies: manifest.dependencies,
  routes: [
    {
      path: '/',
      component: Dashboard,
      exact: true
    },
    {
      path: '/contacts',
      component: Contacts,
      exact: true
    },
    {
      path: '/contacts/:id',
      component: ContactDetail,
      exact: true
    },
    {
      path: '/leads',
      component: Leads,
      exact: true
    },
    {
      path: '/deals',
      component: Deals,
      exact: true
    },
    {
      path: '/settings',
      component: Settings,
      exact: true,
      requiredRoles: ['MANAGER', 'ADMIN']
    }
  ]
};

export default moduleRegistration;import { lazy } from 'react';
import { CustomerServiceOutlined } from '@ant-design/icons';
import type { ModuleRegistration } from '@cauldronos/types';
import manifest from '../manifest.json';

// Lazy-loaded components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contacts = lazy(() => import('./pages/Contacts'));
const ContactDetail = lazy(() => import('./pages/ContactDetail'));
const Leads = lazy(() => import('./pages/Leads'));
const Deals = lazy(() => import('./pages/Deals'));
const Settings = lazy(() => import('./pages/Settings'));

// Main module component
const CrmModule = lazy(() => import('./pages/CrmModule'));

// Module registration
const moduleRegistration: ModuleRegistration = {
  slug: manifest.slug,
  name: manifest.name,
  description: manifest.description,
  version: manifest.version,
  category: manifest.category as any,
  component: CrmModule,
  settingsComponent: Settings,
  config: manifest.defaultConfig,
  menuIcon: <CustomerServiceOutlined />,
  menuLabel: manifest.menuLabel,
  menuOrder: manifest.menuOrder,
  requiredRoles: manifest.requiredRoles as any[],
  apiEndpoints: manifest.apiEndpoints,
  permissions: manifest.permissions,
  dependencies: manifest.dependencies,
  routes: [
    {
      path: '/',
      component: Dashboard,
      exact: true
    },
    {
      path: '/contacts',
      component: Contacts,
      exact: true
    },
    {
      path: '/contacts/:id',
      component: ContactDetail,
      exact: true
    },
    {
      path: '/leads',
      component: Leads,
      exact: true
    },
    {
      path: '/deals',
      component: Deals,
      exact: true
    },
    {
      path: '/settings',
      component: Settings,
      exact: true,
      requiredRoles: ['MANAGER', 'ADMIN']
    }
  ]
};

export default moduleRegistration;import { lazy } from 'react';
import { CustomerServiceOutlined } from '@ant-design/icons';
import type { ModuleRegistration } from '@cauldronos/types';
import manifest from '../manifest.json';

// Lazy-loaded components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contacts = lazy(() => import('./pages/Contacts'));
const ContactDetail = lazy(() => import('./pages/ContactDetail'));
const Leads = lazy(() => import('./pages/Leads'));
const Deals = lazy(() => import('./pages/Deals'));
const Settings = lazy(() => import('./pages/Settings'));

// Main module component
const CrmModule = lazy(() => import('./pages/CrmModule'));

// Module registration
const moduleRegistration: ModuleRegistration = {
  slug: manifest.slug,
  name: manifest.name,
  description: manifest.description,
  version: manifest.version,
  category: manifest.category as any,
  component: CrmModule,
  settingsComponent: Settings,
  config: manifest.defaultConfig,
  menuIcon: <CustomerServiceOutlined />,
  menuLabel: manifest.menuLabel,
  menuOrder: manifest.menuOrder,
  requiredRoles: manifest.requiredRoles as any[],
  apiEndpoints: manifest.apiEndpoints,
  permissions: manifest.permissions,
  dependencies: manifest.dependencies,
  routes: [
    {
      path: '/',
      component: Dashboard,
      exact: true
    },
    {
      path: '/contacts',
      component: Contacts,
      exact: true
    },
    {
      path: '/contacts/:id',
      component: ContactDetail,
      exact: true
    },
    {
      path: '/leads',
      component: Leads,
      exact: true
    },
    {
      path: '/deals',
      component: Deals,
      exact: true
    },
    {
      path: '/settings',
      component: Settings,
      exact: true,
      requiredRoles: ['MANAGER', 'ADMIN']
    }
  ]
};

export default moduleRegistration;