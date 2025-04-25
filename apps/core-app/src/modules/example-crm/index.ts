import { CustomerServiceOutlined } from '@ant-design/icons';
import CrmModule from './CrmModule';
import CrmSettings from './settings/CrmSettings';
import CrmApi from './api/CrmApi';
import CrmPermissions from './permissions/CrmPermissions';
import { ModuleRegistration } from '../types';

// Register the CRM module
const crmModule: ModuleRegistration = {
  slug: 'crm',
  name: 'CRM',
  description: 'Customer Relationship Management',
  version: '1.0.0',
  category: 'crm',
  component: CrmModule,
  settingsComponent: CrmSettings,
  menuIcon: <CustomerServiceOutlined />,
  menuLabel: 'CRM',
  menuOrder: 10,
  requiredRoles: ['USER'],
  apiEndpoints: [
    {
      path: '/api/modules/crm/customers',
      method: 'GET',
      description: 'Get all customers',
      requiresAuth: true,
      requiredRoles: ['USER']
    },
    {
      path: '/api/modules/crm/customers',
      method: 'POST',
      description: 'Create a new customer',
      requiresAuth: true,
      requiredRoles: ['USER']
    },
    {
      path: '/api/modules/crm/contacts',
      method: 'GET',
      description: 'Get all contacts',
      requiresAuth: true,
      requiredRoles: ['USER']
    },
    {
      path: '/api/modules/crm/contacts',
      method: 'POST',
      description: 'Create a new contact',
      requiresAuth: true,
      requiredRoles: ['USER']
    }
  ],
  permissions: [
    {
      id: 'crm:read',
      name: 'Read CRM Data',
      description: 'View customers and contacts',
      defaultRoles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      id: 'crm:write',
      name: 'Write CRM Data',
      description: 'Create and update customers and contacts',
      defaultRoles: ['MANAGER', 'ADMIN']
    }
  ],
  routes: [
    {
      path: '/customers',
      component: CrmModule,
      requiredRoles: ['USER']
    },
    {
      path: '/contacts',
      component: CrmModule,
      requiredRoles: ['USER']
    }
  ]
};
export default crmModule;