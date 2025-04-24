import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../workspace/operations';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { z } from 'zod';
import { 
  Plugin, 
  PluginRegistration, 
  PluginContext, 
  PluginStoreItem,
  PluginStatus
} from './types';
import { useTheme } from '../theme/ThemeProvider';

// Mock data for plugins - in a real app, this would come from the API
const mockPlugins: Plugin[] = [
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Comprehensive analytics dashboard with charts and metrics',
    version: '1.0.0',
    author: 'CauldronOS Team',
    category: 'analytics',
    status: 'active',
    configSchema: z.object({
      refreshInterval: z.number().min(30).default(300),
      showRealTimeData: z.boolean().default(true),
      metrics: z.array(z.string()).default(['pageViews', 'visitors', 'bounceRate']),
    }),
    defaultConfig: {
      refreshInterval: 300,
      showRealTimeData: true,
      metrics: ['pageViews', 'visitors', 'bounceRate'],
    },
    hasSettings: true,
    hasPermissions: true,
    render: ({ plugin, config, context }) => (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">{plugin.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{plugin.description}</p>
        <div className="text-sm">
          <p>Refresh Interval: {config.refreshInterval} seconds</p>
          <p>Real-time Data: {config.showRealTimeData ? 'Enabled' : 'Disabled'}</p>
          <p>Metrics: {config.metrics.join(', ')}</p>
        </div>
      </div>
    ),
    renderSettings: ({ plugin, config, onConfigChange }) => (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Analytics Dashboard Settings</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Refresh Interval (seconds)</label>
          <input
            type="number"
            min="30"
            value={config.refreshInterval}
            onChange={(e) => onConfigChange({ ...config, refreshInterval: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.showRealTimeData}
              onChange={(e) => onConfigChange({ ...config, showRealTimeData: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm font-medium">Show Real-time Data</span>
          </label>
        </div>
      </div>
    ),
  },
  {
    id: 'notification-center',
    name: 'Notification Center',
    description: 'Centralized notification system for all application events',
    version: '1.1.2',
    author: 'CauldronOS Team',
    category: 'communication',
    status: 'active',
    configSchema: z.object({
      enableDesktopNotifications: z.boolean().default(true),
      enableEmailNotifications: z.boolean().default(false),
      notificationTypes: z.array(z.string()).default(['system', 'user', 'security']),
    }),
    defaultConfig: {
      enableDesktopNotifications: true,
      enableEmailNotifications: false,
      notificationTypes: ['system', 'user', 'security'],
    },
    hasSettings: true,
    hasPermissions: true,
    render: ({ plugin, config }) => (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">{plugin.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{plugin.description}</p>
        <div className="text-sm">
          <p>Desktop Notifications: {config.enableDesktopNotifications ? 'Enabled' : 'Disabled'}</p>
          <p>Email Notifications: {config.enableEmailNotifications ? 'Enabled' : 'Disabled'}</p>
          <p>Types: {config.notificationTypes.join(', ')}</p>
        </div>
      </div>
    ),
    renderSettings: ({ plugin, config, onConfigChange }) => (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Notification Center Settings</h3>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.enableDesktopNotifications}
              onChange={(e) => onConfigChange({ ...config, enableDesktopNotifications: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm font-medium">Enable Desktop Notifications</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.enableEmailNotifications}
              onChange={(e) => onConfigChange({ ...config, enableEmailNotifications: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm font-medium">Enable Email Notifications</span>
          </label>
        </div>
      </div>
    ),
  },
];

// Mock data for plugin store
const mockPluginStore: PluginStoreItem[] = [
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Comprehensive analytics dashboard with charts and metrics',
    version: '1.0.0',
    author: 'CauldronOS Team',
    category: 'analytics',
    rating: 4.5,
    downloads: 1250,
    price: 'free',
    tags: ['analytics', 'dashboard', 'charts'],
    isInstalled: true,
  },
  {
    id: 'notification-center',
    name: 'Notification Center',
    description: 'Centralized notification system for all application events',
    version: '1.1.2',
    author: 'CauldronOS Team',
    category: 'communication',
    rating: 4.8,
    downloads: 2300,
    price: 'free',
    tags: ['notifications', 'alerts', 'communication'],
    isInstalled: true,
  },
  {
    id: 'data-exporter',
    name: 'Data Exporter',
    description: 'Export data in various formats (CSV, Excel, JSON, PDF)',
    version: '2.0.1',
    author: 'DataTools Inc',
    category: 'utility',
    rating: 4.2,
    downloads: 980,
    price: 'free',
    tags: ['export', 'data', 'csv', 'excel', 'pdf'],
    isInstalled: false,
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    description: 'AI-powered assistant for task automation and insights',
    version: '1.3.0',
    author: 'AI Solutions',
    category: 'ai',
    rating: 4.7,
    downloads: 3500,
    price: 9.99,
    tags: ['ai', 'assistant', 'automation'],
    isInstalled: false,
  },
  {
    id: 'security-scanner',
    name: 'Security Scanner',
    description: 'Scan your workspace for security vulnerabilities',
    version: '1.0.5',
    author: 'SecureWorks',
    category: 'security',
    rating: 4.6,
    downloads: 1800,
    price: 19.99,
    tags: ['security', 'scanner', 'vulnerabilities'],
    isInstalled: false,
  },
];

// Define the Plugin Registry context type
interface PluginRegistryContextType {
  plugins: Plugin[];
  availablePlugins: PluginStoreItem[];
  registerPlugin: (registration: PluginRegistration) => void;
  getPluginById: (id: string) => Plugin | undefined;
  installPlugin: (pluginId: string) => Promise<void>;
  uninstallPlugin: (pluginId: string) => Promise<void>;
  enablePlugin: (pluginId: string) => Promise<void>;
  disablePlugin: (pluginId: string) => Promise<void>;
  updatePluginConfig: (pluginId: string, config: Record<string, any>) => Promise<void>;
  isLoading: boolean;
}

// Create the Plugin Registry context
const PluginRegistryContext = createContext<PluginRegistryContextType>({
  plugins: [],
  availablePlugins: [],
  registerPlugin: () => {},
  getPluginById: () => undefined,
  installPlugin: async () => {},
  uninstallPlugin: async () => {},
  enablePlugin: async () => {},
  disablePlugin: async () => {},
  updatePluginConfig: async () => {},
  isLoading: true,
});

// Hook to use the Plugin Registry
export const usePlugins = () => useContext(PluginRegistryContext);

// Plugin Registry Provider props
interface PluginRegistryProviderProps {
  children: ReactNode;
}

// Plugin Registry Provider component
export const PluginRegistryProvider: React.FC<PluginRegistryProviderProps> = ({ children }) => {
  const { data: user } = useAuth();
  const { currentWorkspace } = useWorkspaces();
  const { isDarkMode } = useTheme();
  const queryClient = useQueryClient();
  
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [availablePlugins, setAvailablePlugins] = useState<PluginStoreItem[]>([]);
  const [registeredPlugins, setRegisteredPlugins] = useState<Record<string, PluginRegistration>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch plugins from the API
  useEffect(() => {
    const fetchPlugins = async () => {
      try {
        // This would be an API call in a real app
        // const response = await fetch(`/api/workspaces/${currentWorkspace?.id}/plugins`);
        // const data = await response.json();

        // Using mock data for now
        const data = mockPlugins;
        const storeData = mockPluginStore;

        setPlugins(data);
        setAvailablePlugins(storeData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching plugins:', error);
        message.error('Failed to load plugins');
        setIsLoading(false);
      }
    };

    if (user && currentWorkspace) {
      fetchPlugins();
    }
  }, [user, currentWorkspace]);

  // Register a new plugin
  const registerPlugin = (registration: PluginRegistration) => {
    setRegisteredPlugins((prev) => ({
      ...prev,
      [registration.id]: registration,
    }));

    // Create a plugin instance from the registration
    const plugin: Plugin = {
      ...registration,
      status: 'active',
      config: registration.defaultConfig,
    };

    // Add the plugin to the list if it's not already there
    setPlugins((prev) => {
      if (prev.some((p) => p.id === plugin.id)) {
        return prev.map((p) => (p.id === plugin.id ? plugin : p));
      }
      return [...prev, plugin];
    });
  };

  // Get a plugin by ID
  const getPluginById = (id: string) => {
    return plugins.find((plugin) => plugin.id === id);
  };

  // Install a plugin
  const installPlugin = async (pluginId: string) => {
    try {
      setIsLoading(true);
      
      // This would be an API call in a real app
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/plugins/${pluginId}`, {
      //   method: 'POST',
      // });

      // For now, just update the state
      const pluginToInstall = availablePlugins.find((p) => p.id === pluginId);
      
      if (!pluginToInstall) {
        throw new Error('Plugin not found');
      }

      // Create a new plugin instance
      const newPlugin: Plugin = {
        id: pluginToInstall.id,
        name: pluginToInstall.name,
        description: pluginToInstall.description,
        version: pluginToInstall.version,
        author: pluginToInstall.author,
        category: pluginToInstall.category,
        status: 'active',
        configSchema: z.object({}), // This would come from the plugin manifest
        defaultConfig: {},
        config: {},
        hasSettings: false,
        hasPermissions: false,
        render: () => <div>Plugin content would be loaded dynamically</div>,
      };

      setPlugins((prev) => [...prev, newPlugin]);
      
      // Update the available plugins
      setAvailablePlugins((prev) =>
        prev.map((p) => (p.id === pluginId ? { ...p, isInstalled: true } : p))
      );

      message.success(`Plugin "${pluginToInstall.name}" installed successfully`);
    } catch (error) {
      console.error('Error installing plugin:', error);
      message.error('Failed to install plugin');
    } finally {
      setIsLoading(false);
    }
  };

  // Uninstall a plugin
  const uninstallPlugin = async (pluginId: string) => {
    try {
      setIsLoading(true);
      
      // This would be an API call in a real app
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/plugins/${pluginId}`, {
      //   method: 'DELETE',
      // });

      // For now, just update the state
      const pluginToUninstall = plugins.find((p) => p.id === pluginId);
      
      if (!pluginToUninstall) {
        throw new Error('Plugin not found');
      }

      // Remove the plugin from the list
      setPlugins((prev) => prev.filter((p) => p.id !== pluginId));
      
      // Update the available plugins
      setAvailablePlugins((prev) =>
        prev.map((p) => (p.id === pluginId ? { ...p, isInstalled: false } : p))
      );

      message.success(`Plugin "${pluginToUninstall.name}" uninstalled successfully`);
    } catch (error) {
      console.error('Error uninstalling plugin:', error);
      message.error('Failed to uninstall plugin');
    } finally {
      setIsLoading(false);
    }
  };

  // Enable a plugin
  const enablePlugin = async (pluginId: string) => {
    try {
      // This would be an API call in a real app
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/plugins/${pluginId}/enable`, {
      //   method: 'POST',
      // });

      // For now, just update the state
      setPlugins((prev) =>
        prev.map((p) => (p.id === pluginId ? { ...p, status: 'active' as PluginStatus } : p))
      );

      message.success('Plugin enabled successfully');
    } catch (error) {
      console.error('Error enabling plugin:', error);
      message.error('Failed to enable plugin');
    }
  };

  // Disable a plugin
  const disablePlugin = async (pluginId: string) => {
    try {
      // This would be an API call in a real app
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/plugins/${pluginId}/disable`, {
      //   method: 'POST',
      // });

      // For now, just update the state
      setPlugins((prev) =>
        prev.map((p) => (p.id === pluginId ? { ...p, status: 'inactive' as PluginStatus } : p))
      );

      message.success('Plugin disabled successfully');
    } catch (error) {
      console.error('Error disabling plugin:', error);
      message.error('Failed to disable plugin');
    }
  };

  // Update plugin configuration
  const updatePluginConfig = async (pluginId: string, config: Record<string, any>) => {
    try {
      // This would be an API call in a real app
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/plugins/${pluginId}/config`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ config }),
      // });

      // For now, just update the state
      setPlugins((prev) =>
        prev.map((p) => (p.id === pluginId ? { ...p, config } : p))
      );

      message.success('Plugin configuration updated successfully');
    } catch (error) {
      console.error('Error updating plugin configuration:', error);
      message.error('Failed to update plugin configuration');
    }
  };

  // Create the plugin context
  const pluginContext: PluginContext = useMemo(
    () => ({
      workspace: {
        id: currentWorkspace?.id || '',
        name: currentWorkspace?.name || '',
      },
      user: {
        id: user?.id || '',
        email: user?.email || '',
        role: user?.role || 'USER',
      },
      theme: isDarkMode ? 'dark' : 'light',
    }),
    [currentWorkspace, user, isDarkMode]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      plugins,
      availablePlugins,
      registerPlugin,
      getPluginById,
      installPlugin,
      uninstallPlugin,
      enablePlugin,
      disablePlugin,
      updatePluginConfig,
      isLoading,
    }),
    [plugins, availablePlugins, isLoading]
  );

  return (
    <PluginRegistryContext.Provider value={contextValue}>
      {children}
    </PluginRegistryContext.Provider>
  );
};

export default PluginRegistryProvider;
