import { ReactNode } from 'react';
import { z } from 'zod';

/**
 * Plugin categories
 */
export type PluginCategory = 
  | 'ui' 
  | 'data' 
  | 'integration' 
  | 'utility' 
  | 'analytics' 
  | 'security' 
  | 'communication' 
  | 'ai' 
  | 'other';

/**
 * Plugin status
 */
export type PluginStatus = 'active' | 'inactive' | 'error' | 'loading';

/**
 * Base Plugin interface
 */
export interface Plugin {
  // Core metadata
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: PluginCategory;
  
  // Status
  status: PluginStatus;
  
  // Configuration
  configSchema: z.ZodObject<any>;
  defaultConfig: Record<string, any>;
  config?: Record<string, any>;
  
  // UI
  icon?: ReactNode;
  
  // Capabilities
  hasSettings: boolean;
  hasPermissions: boolean;
  
  // Dependencies
  dependencies?: PluginDependency[];
  
  // Rendering
  render: (props: PluginRenderProps) => ReactNode;
  renderSettings?: (props: PluginSettingsProps) => ReactNode;
}

/**
 * Plugin dependency
 */
export interface PluginDependency {
  pluginId: string;
  version: string;
  isRequired: boolean;
}

/**
 * Plugin registration data
 */
export interface PluginRegistration {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: PluginCategory;
  configSchema: z.ZodObject<any>;
  defaultConfig: Record<string, any>;
  icon?: ReactNode;
  hasSettings: boolean;
  hasPermissions: boolean;
  dependencies?: PluginDependency[];
  render: (props: PluginRenderProps) => ReactNode;
  renderSettings?: (props: PluginSettingsProps) => ReactNode;
}

/**
 * Props passed to plugin render function
 */
export interface PluginRenderProps {
  plugin: Plugin;
  config: Record<string, any>;
  context: PluginContext;
}

/**
 * Props passed to plugin settings render function
 */
export interface PluginSettingsProps {
  plugin: Plugin;
  config: Record<string, any>;
  context: PluginContext;
  onConfigChange: (newConfig: Record<string, any>) => void;
}

/**
 * Plugin context
 */
export interface PluginContext {
  workspace: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    email: string;
    role: string;
  };
  theme: 'light' | 'dark';
  // Add more context properties as needed
}

/**
 * Plugin manifest for remote plugins
 */
export interface PluginManifest {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: PluginCategory;
  entryPoint: string;
  configSchema: Record<string, any>;
  defaultConfig: Record<string, any>;
  hasSettings: boolean;
  hasPermissions: boolean;
  dependencies?: PluginDependency[];
  iconUrl?: string;
}

/**
 * Plugin store item
 */
export interface PluginStoreItem {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: PluginCategory;
  rating: number;
  downloads: number;
  price: number | 'free';
  tags: string[];
  iconUrl?: string;
  screenshotUrls?: string[];
  isInstalled: boolean;
}
