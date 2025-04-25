import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useAuth } from 'wasp/client/auth';
import { Module, ModuleRegistration, ModuleApiEndpoint, ModuleRoute, UserRole } from './types';
import { useWorkspaces } from '../workspace/operations';
import {
  AppstoreOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ShopOutlined,
  CustomerServiceOutlined,
  MailOutlined,
  CalendarOutlined,
  DollarOutlined
} from '@ant-design/icons';

// Mock data for modules - in a real app, this would come from the API
const mockModules: Module[] = [
  {
    id: '1',
    name: 'CRM',
    slug: 'crm',
    description: 'Customer Relationship Management',
    version: '1.0.0',
    isCore: true,
    isPublic: true,
    category: 'crm',
    path: '/modules/crm',
    requiredRoles: ['USER'],
    menuIcon: <CustomerServiceOutlined />,
    menuLabel: 'CRM',
    menuOrder: 10,
    isEnabled: true,
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
    ]
  },
  {
    id: '2',
    name: 'Wiki',
    slug: 'wiki',
    description: 'Knowledge Base',
    version: '1.0.0',
    isCore: false,
    isPublic: true,
    category: 'communication',
    path: '/modules/wiki',
    requiredRoles: ['USER'],
    menuIcon: <FileTextOutlined />,
    menuLabel: 'Wiki',
    menuOrder: 20,
    isEnabled: true,
    apiEndpoints: [
      {
        path: '/api/modules/wiki/pages',
        method: 'GET',
        description: 'Get all wiki pages',
        requiresAuth: true,
        requiredRoles: ['USER']
      },
      {
        path: '/api/modules/wiki/pages',
        method: 'POST',
        description: 'Create a new wiki page',
        requiresAuth: true,
        requiredRoles: ['MANAGER', 'ADMIN']
      }
    ]
  },
  {
    id: '3',
    name: 'Analytics',
    slug: 'analytics',
    description: 'Data Analytics',
    version: '1.0.0',
    isCore: false,
    isPublic: true,
    category: 'analytics',
    path: '/modules/analytics',
    requiredRoles: ['MANAGER', 'ADMIN'],
    menuIcon: <BarChartOutlined />,
    menuLabel: 'Analytics',
    menuOrder: 30,
    isEnabled: true,
    apiEndpoints: [
      {
        path: '/api/modules/analytics/dashboard',
        method: 'GET',
        description: 'Get analytics dashboard data',
        requiresAuth: true,
        requiredRoles: ['MANAGER', 'ADMIN']
      }
    ]
  },
  {
    id: '4',
    name: 'Calendar',
    slug: 'calendar',
    description: 'Team Calendar',
    version: '1.0.0',
    isCore: false,
    isPublic: true,
    category: 'productivity',
    path: '/modules/calendar',
    requiredRoles: ['USER'],
    menuIcon: <CalendarOutlined />,
    menuLabel: 'Calendar',
    menuOrder: 40,
    isEnabled: true,
    apiEndpoints: [
      {
        path: '/api/modules/calendar/events',
        method: 'GET',
        description: 'Get calendar events',
        requiresAuth: true,
        requiredRoles: ['USER']
      }
    ]
  },
  {
    id: '5',
    name: 'Email',
    slug: 'email',
    description: 'Email Marketing',
    version: '1.0.0',
    isCore: false,
    isPublic: true,
    category: 'marketing',
    path: '/modules/email',
    requiredRoles: ['MANAGER', 'ADMIN'],
    menuIcon: <MailOutlined />,
    menuLabel: 'Email',
    menuOrder: 50,
    isEnabled: false,
    apiEndpoints: [
      {
        path: '/api/modules/email/campaigns',
        method: 'GET',
        description: 'Get email campaigns',
        requiresAuth: true,
        requiredRoles: ['MANAGER', 'ADMIN']
      }
    ]
  },
  {
    id: '6',
    name: 'Invoicing',
    slug: 'invoicing',
    description: 'Invoice Management',
    version: '1.0.0',
    isCore: false,
    isPublic: true,
    category: 'finance',
    path: '/modules/invoicing',
    requiredRoles: ['MANAGER', 'ADMIN'],
    menuIcon: <DollarOutlined />,
    menuLabel: 'Invoicing',
    menuOrder: 60,
    isEnabled: false,
    apiEndpoints: [
      {
        path: '/api/modules/invoicing/invoices',
        method: 'GET',
        description: 'Get invoices',
        requiresAuth: true,
        requiredRoles: ['MANAGER', 'ADMIN']
      }
    ]
  }
];

interface ModuleContextType {
  modules: Module[];
  availableModules: Module[];
  registerModule: (registration: ModuleRegistration) => void;
  getModuleBySlug: (slug: string) => Module | undefined;
  getModuleApiEndpoints: (moduleSlug: string) => ModuleApiEndpoint[];
  getModuleRoutes: (moduleSlug: string) => ModuleRoute[];
  installModule: (moduleId: string) => Promise<void>;
  uninstallModule: (moduleId: string) => Promise<void>;
  enableModule: (moduleId: string) => Promise<void>;
  disableModule: (moduleId: string) => Promise<void>;
  isLoading: boolean;
}

const ModuleContext = createContext<ModuleContextType>({
  modules: [],
  availableModules: [],
  registerModule: () => {},
  getModuleBySlug: () => undefined,
  getModuleApiEndpoints: () => [],
  getModuleRoutes: () => [],
  installModule: async () => {},
  uninstallModule: async () => {},
  enableModule: async () => {},
  disableModule: async () => {},
  isLoading: true
});

export const useModules = () => useContext(ModuleContext);

interface ModuleProviderProps {
  children: ReactNode;
}

export const ModuleProvider: React.FC<ModuleProviderProps> = ({ children }) => {
  const { data: user } = useAuth();
  const { currentWorkspace } = useWorkspaces();
  const [modules, setModules] = useState<Module[]>([]);
  const [availableModules, setAvailableModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredModules, setRegisteredModules] = useState<Record<string, ModuleRegistration>>({});
  const [moduleRoutes, setModuleRoutes] = useState<Record<string, ModuleRoute[]>>({});

  // In a real app, fetch modules from the API
  useEffect(() => {
    const fetchModules = async () => {
      try {
        // This would be an API call in a real app
        // const response = await fetch(`/api/workspaces/${currentWorkspace?.id}/modules`);
        // const data = await response.json();

        // Using mock data for now
        const data = mockModules;

        // Filter modules based on user role and enabled status
        const userRole = user?.role || 'USER';
        const installedModules = data.filter(module =>
          (module.requiredRoles.includes(userRole as UserRole) || userRole === 'ADMIN') &&
          module.isEnabled
        );

        // Available modules are those that are not enabled
        const availableModules = data.filter(module =>
          !module.isEnabled
        );

        setModules(installedModules);
        setAvailableModules(availableModules);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching modules:', error);
        setIsLoading(false);
      }
    };

    if (user && currentWorkspace) {
      fetchModules();
    }
  }, [user, currentWorkspace]);

  // Register a new module
  const registerModule = (registration: ModuleRegistration) => {
    setRegisteredModules(prev => ({
      ...prev,
      [registration.slug]: registration
    }));

    // Register module routes if any
    if (registration.routes && registration.routes.length > 0) {
      setModuleRoutes(prev => ({
        ...prev,
        [registration.slug]: registration.routes || []
      }));
    }
  };

  // Get a module by slug
  const getModuleBySlug = (slug: string) => {
    return modules.find(module => module.slug === slug);
  };

  // Get module API endpoints
  const getModuleApiEndpoints = (moduleSlug: string) => {
    const module = modules.find(m => m.slug === moduleSlug);
    return module?.apiEndpoints || [];
  };

  // Get module routes
  const getModuleRoutes = (moduleSlug: string) => {
    return moduleRoutes[moduleSlug] || [];
  };

  // Install a module
  const installModule = async (moduleId: string) => {
    try {
      // This would be an API call in a real app
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/modules/${moduleId}`, {
      //   method: 'POST'
      // });

      // For now, just update the state
      const moduleToInstall = availableModules.find(m => m.id === moduleId);
      if (moduleToInstall) {
        const updatedModule = { ...moduleToInstall, isEnabled: true };
        setModules(prev => [...prev, updatedModule]);
        setAvailableModules(prev => prev.filter(m => m.id !== moduleId));
      }
    } catch (error) {
      console.error('Error installing module:', error);
      throw error;
    }
  };

  // Uninstall a module
  const uninstallModule = async (moduleId: string) => {
    try {
      // This would be an API call in a real app
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/modules/${moduleId}`, {
      //   method: 'DELETE'
      // });

      // For now, just update the state
      const moduleToUninstall = modules.find(m => m.id === moduleId);
      if (moduleToUninstall) {
        const updatedModule = { ...moduleToUninstall, isEnabled: false };
        setAvailableModules(prev => [...prev, updatedModule]);
        setModules(prev => prev.filter(m => m.id !== moduleId));
      }
    } catch (error) {
      console.error('Error uninstalling module:', error);
      throw error;
    }
  };

  // Enable a module
  const enableModule = async (moduleId: string) => {
    try {
      // This would be an API call in a real app
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/modules/${moduleId}/enable`, {
      //   method: 'POST'
      // });

      // For now, just update the state
      setModules(prev =>
        prev.map(m => m.id === moduleId ? { ...m, isEnabled: true } : m)
      );
    } catch (error) {
      console.error('Error enabling module:', error);
      throw error;
    }
  };

  // Disable a module
  const disableModule = async (moduleId: string) => {
    try {
      // This would be an API call in a real app
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/modules/${moduleId}/disable`, {
      //   method: 'POST'
      // });

      // For now, just update the state
      setModules(prev =>
        prev.map(m => m.id === moduleId ? { ...m, isEnabled: false } : m)
      );
    } catch (error) {
      console.error('Error disabling module:', error);
      throw error;
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    modules,
    availableModules,
    registerModule,
    getModuleBySlug,
    getModuleApiEndpoints,
    getModuleRoutes,
    installModule,
    uninstallModule,
    enableModule,
    disableModule,
    isLoading
  }), [modules, availableModules, isLoading]);

  return (
    <ModuleContext.Provider value={contextValue}>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleProvider;
