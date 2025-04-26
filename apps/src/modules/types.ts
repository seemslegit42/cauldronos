import { ReactNode } from 'react';

export type ModuleCategory = 'productivity' | 'communication' | 'analytics' | 'crm' | 'finance' | 'hr' | 'marketing' | 'sales' | 'support' | 'other';

export type UserRole = 'ADMIN' | 'MANAGER' | 'USER';

// Base module interface
export interface Module {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  version: string;
  isCore: boolean;
  isPublic: boolean;
  category: ModuleCategory;
  path: string;
  config?: Record<string, any>;
  defaultConfig?: Record<string, any>;
  requiredRoles: UserRole[];
  menuIcon?: ReactNode;
  menuLabel?: string;
  menuOrder: number;
  isEnabled: boolean;

  // Module API endpoints
  apiEndpoints?: ModuleApiEndpoint[];

  // Module permissions
  permissions?: ModulePermission[];

  // Module dependencies
  dependencies?: ModuleDependency[];

  // Module settings schema
  settingsSchema?: ModuleSettingsSchema;
}

// Module API endpoint definition
export interface ModuleApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  requiresAuth: boolean;
  requiredRoles?: UserRole[];
}

// Module permission definition
export interface ModulePermission {
  id: string;
  name: string;
  description: string;
  defaultRoles: UserRole[];
}

// Module dependency definition
export interface ModuleDependency {
  moduleSlug: string;
  version: string;
  isRequired: boolean;
}

// Module settings schema definition
export interface ModuleSettingsSchema {
  properties: Record<string, ModuleSettingProperty>;
}

// Module setting property definition
export interface ModuleSettingProperty {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  label: string;
  description?: string;
  default?: any;
  required?: boolean;
  options?: any[];
}

// Workspace-specific module instance
export interface WorkspaceModule extends Module {
  workspaceId: string;
  lastAccessed?: Date;
  accessCount: number;
  allowedRoles: UserRole[];
  settings?: Record<string, any>;
}

// Props passed to module components
export interface ModuleComponentProps {
  module: Module;
  workspace: {
    id: string;
    name: string;
    slug: string;
  };
}

// Module registration interface
export interface ModuleRegistration {
  slug: string;
  name: string;
  description?: string;
  version: string;
  category: ModuleCategory;
  component: React.ComponentType<ModuleComponentProps>;
  settingsComponent?: React.ComponentType<ModuleComponentProps>;
  config?: Record<string, any>;
  menuIcon?: ReactNode;
  menuLabel?: string;
  menuOrder?: number;
  requiredRoles?: UserRole[];
  apiEndpoints?: ModuleApiEndpoint[];
  permissions?: ModulePermission[];
  dependencies?: ModuleDependency[];
  settingsSchema?: ModuleSettingsSchema;

  // Module sub-routes
  routes?: ModuleRoute[];
}

// Module route definition
export interface ModuleRoute {
  path: string;
  component: React.ComponentType<ModuleComponentProps>;
  requiredRoles?: UserRole[];
  exact?: boolean;
}
