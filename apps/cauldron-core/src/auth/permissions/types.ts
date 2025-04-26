import { UserRole } from '@prisma/client';

export interface Permission {
  id: string;
  name: string;
  description?: string;
  slug: string;
  category: PermissionCategory;
  parentId?: string;
  parent?: Permission;
  children?: Permission[];
  isActive?: boolean;
  metadata?: Record<string, any>;
}

export enum PermissionCategory {
  SYSTEM = 'system',
  WORKSPACE = 'workspace',
  MODULE = 'module',
  RESOURCE = 'resource',
  CUSTOM = 'custom'
}

export interface RolePermission {
  id: string;
  role: UserRole;
  permissionId: string;
  permission?: Permission;
  conditions?: PermissionCondition[];
  expiresAt?: Date;
}

export interface WorkspacePermission {
  id: string;
  workspaceId: string;
  permissionId: string;
  permission?: Permission;
  allowedRoles: UserRole[];
  conditions?: PermissionCondition[];
  expiresAt?: Date;
}

export interface PermissionGroup {
  id: string;
  name: string;
  description?: string;
  permissions: string[]; // Permission slugs
}

export interface PermissionCondition {
  id: string;
  type: PermissionConditionType;
  field: string;
  operator: PermissionConditionOperator;
  value: any;
}

export enum PermissionConditionType {
  TIME = 'time',
  IP = 'ip',
  RESOURCE = 'resource',
  USER = 'user',
  CUSTOM = 'custom'
}

export enum PermissionConditionOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  IN = 'in',
  NOT_IN = 'not_in'
}

// Default system permissions
export const SYSTEM_PERMISSIONS: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Access Admin Panel',
    description: 'Access the admin panel and system settings',
    slug: 'admin:access',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'Manage Users',
    description: 'Create, update, and delete users',
    slug: 'users:manage',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'View Users',
    description: 'View user information',
    slug: 'users:view',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'Manage Roles',
    description: 'Create, update, and delete roles',
    slug: 'roles:manage',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'Manage Permissions',
    description: 'Create, update, and delete permissions',
    slug: 'permissions:manage',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'Manage Permission Groups',
    description: 'Create, update, and delete permission groups',
    slug: 'permission-groups:manage',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'View Permission Groups',
    description: 'View permission groups',
    slug: 'permission-groups:view',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'Assign Permissions',
    description: 'Assign permissions to roles and users',
    slug: 'permissions:assign',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'Revoke Permissions',
    description: 'Revoke permissions from roles and users',
    slug: 'permissions:revoke',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'View System Logs',
    description: 'View system logs and audit trails',
    slug: 'system:logs:view',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'Manage System Settings',
    description: 'Manage system-wide settings',
    slug: 'system:settings:manage',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'View System Performance',
    description: 'View system performance metrics',
    slug: 'system:performance:view',
    category: PermissionCategory.SYSTEM
  },
  {
    name: 'Manage System Performance',
    description: 'Manage system performance settings',
    slug: 'system:performance:manage',
    category: PermissionCategory.SYSTEM
  }
];

// Default workspace permissions
export const WORKSPACE_PERMISSIONS: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Create Workspace',
    description: 'Create a new workspace',
    slug: 'workspace:create',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'Update Workspace',
    description: 'Update workspace settings',
    slug: 'workspace:update',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'Delete Workspace',
    description: 'Delete a workspace',
    slug: 'workspace:delete',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'Manage Workspace Members',
    description: 'Add, update, and remove workspace members',
    slug: 'workspace:members:manage',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'View Workspace Members',
    description: 'View workspace members',
    slug: 'workspace:members:view',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'Manage Workspace Modules',
    description: 'Install, configure, and uninstall modules',
    slug: 'workspace:modules:manage',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'View Workspace Modules',
    description: 'View installed modules',
    slug: 'workspace:modules:view',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'Manage Workspace Permissions',
    description: 'Manage workspace-specific permissions',
    slug: 'workspace:permissions:manage',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'View Workspace Permissions',
    description: 'View workspace-specific permissions',
    slug: 'workspace:permissions:view',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'Manage Workspace Roles',
    description: 'Create, update, and delete workspace-specific roles',
    slug: 'workspace:roles:manage',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'View Workspace Activity',
    description: 'View workspace activity logs',
    slug: 'workspace:activity:view',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'Manage Workspace Templates',
    description: 'Create, update, and delete workspace templates',
    slug: 'workspace:templates:manage',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'View Workspace Templates',
    description: 'View workspace templates',
    slug: 'workspace:templates:view',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'Manage Workspace Integrations',
    description: 'Configure and manage workspace integrations',
    slug: 'workspace:integrations:manage',
    category: PermissionCategory.WORKSPACE
  },
  {
    name: 'View Workspace Performance',
    description: 'View workspace performance metrics',
    slug: 'workspace:performance:view',
    category: PermissionCategory.WORKSPACE
  }
];

// Default module permissions
export const MODULE_PERMISSIONS: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Access Module',
    description: 'Access a module',
    slug: 'module:access',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Configure Module',
    description: 'Configure module settings',
    slug: 'module:configure',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Create Module Data',
    description: 'Create data within a module',
    slug: 'module:data:create',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Read Module Data',
    description: 'Read data within a module',
    slug: 'module:data:read',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Update Module Data',
    description: 'Update data within a module',
    slug: 'module:data:update',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Delete Module Data',
    description: 'Delete data within a module',
    slug: 'module:data:delete',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Install Module',
    description: 'Install a module from the marketplace',
    slug: 'module:install',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Uninstall Module',
    description: 'Uninstall a module',
    slug: 'module:uninstall',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Update Module',
    description: 'Update a module to a newer version',
    slug: 'module:update',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Publish Module',
    description: 'Publish a module to the marketplace',
    slug: 'module:publish',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Manage Module Permissions',
    description: 'Manage module-specific permissions',
    slug: 'module:permissions:manage',
    category: PermissionCategory.MODULE
  },
  {
    name: 'View Module Permissions',
    description: 'View module-specific permissions',
    slug: 'module:permissions:view',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Export Module Data',
    description: 'Export data from a module',
    slug: 'module:data:export',
    category: PermissionCategory.MODULE
  },
  {
    name: 'Import Module Data',
    description: 'Import data into a module',
    slug: 'module:data:import',
    category: PermissionCategory.MODULE
  },
  {
    name: 'View Module Performance',
    description: 'View module performance metrics',
    slug: 'module:performance:view',
    category: PermissionCategory.MODULE
  }
];

// Default role permissions mapping
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  ADMIN: [
    // All permissions
    ...SYSTEM_PERMISSIONS.map(p => p.slug),
    ...WORKSPACE_PERMISSIONS.map(p => p.slug),
    ...MODULE_PERMISSIONS.map(p => p.slug)
  ],
  MANAGER: [
    // Workspace permissions
    'workspace:update',
    'workspace:members:manage',
    'workspace:members:view',
    'workspace:modules:manage',
    'workspace:modules:view',
    'workspace:permissions:view',
    'workspace:activity:view',
    'workspace:templates:view',
    'workspace:performance:view',
    // Module permissions
    'module:access',
    'module:configure',
    'module:data:create',
    'module:data:read',
    'module:data:update',
    'module:data:delete',
    'module:install',
    'module:uninstall',
    'module:update',
    'module:permissions:view',
    'module:data:export',
    'module:data:import',
    'module:performance:view'
  ],
  USER: [
    // Basic permissions
    'workspace:members:view',
    'workspace:modules:view',
    'workspace:activity:view',
    'workspace:templates:view',
    'workspace:performance:view',
    'module:access',
    'module:data:create',
    'module:data:read',
    'module:data:update',
    'module:data:export',
    'module:performance:view'
  ],
  GUEST: [
    // Minimal permissions
    'workspace:modules:view',
    'workspace:activity:view',
    'module:access',
    'module:data:read',
    'module:performance:view'
  ]
};

// Default permission groups
export const DEFAULT_PERMISSION_GROUPS: PermissionGroup[] = [
  {
    id: '1',
    name: 'System Administration',
    description: 'Permissions for system administration',
    permissions: SYSTEM_PERMISSIONS.map(p => p.slug)
  },
  {
    id: '2',
    name: 'Workspace Management',
    description: 'Permissions for workspace management',
    permissions: WORKSPACE_PERMISSIONS.map(p => p.slug)
  },
  {
    id: '3',
    name: 'Module Management',
    description: 'Permissions for module management',
    permissions: MODULE_PERMISSIONS.filter(p => 
      p.slug.includes('module:configure') || 
      p.slug.includes('module:install') || 
      p.slug.includes('module:uninstall') || 
      p.slug.includes('module:update') || 
      p.slug.includes('module:publish') || 
      p.slug.includes('module:permissions')
    ).map(p => p.slug)
  },
  {
    id: '4',
    name: 'Data Management',
    description: 'Permissions for data management',
    permissions: MODULE_PERMISSIONS.filter(p => 
      p.slug.includes('module:data')
    ).map(p => p.slug)
  },
  {
    id: '5',
    name: 'Performance Monitoring',
    description: 'Permissions for performance monitoring',
    permissions: [
      'system:performance:view',
      'system:performance:manage',
      'workspace:performance:view',
      'module:performance:view'
    ]
  }
];
