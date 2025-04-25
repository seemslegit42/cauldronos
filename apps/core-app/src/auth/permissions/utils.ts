import { UserRole } from '@prisma/client';
import { DEFAULT_ROLE_PERMISSIONS, DEFAULT_PERMISSION_GROUPS, PermissionCondition, PermissionConditionType, PermissionConditionOperator } from './types';
import { prisma } from 'wasp/server';

/**
 * Check if a user has a specific permission
 * @param userId The user ID
 * @param permissionSlug The permission slug to check
 * @param workspaceId Optional workspace ID for workspace-specific permissions
 * @param moduleId Optional module ID for module-specific permissions
 * @param context Optional context for conditional permissions
 * @returns Promise<boolean> True if the user has the permission
 */
export async function hasPermission(
  userId: string,
  permissionSlug: string,
  workspaceId?: string,
  moduleId?: string,
  context?: Record<string, any>
): Promise<boolean> {
  // Get the user with their role
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, isAdmin: true }
  });

  if (!user) {
    return false;
  }

  // Admins have all permissions
  if (user.isAdmin) {
    return true;
  }

  // Check if the user's role has this permission by default
  const rolePermissions = DEFAULT_ROLE_PERMISSIONS[user.role];
  if (rolePermissions.includes(permissionSlug)) {
    return true;
  }

  // Check for direct user permissions (user-specific permissions)
  const userPermission = await prisma.userPermission.findFirst({
    where: {
      userId,
      permission: {
        slug: permissionSlug
      }
    },
    include: {
      permission: true,
      conditions: true
    }
  });

  if (userPermission) {
    // Check if the permission has conditions
    if (userPermission.conditions && userPermission.conditions.length > 0) {
      return evaluatePermissionConditions(userPermission.conditions, context);
    }
    
    // Check if the permission has an expiration date
    if (userPermission.expiresAt && new Date() > userPermission.expiresAt) {
      return false;
    }
    
    return true;
  }

  // If a workspace ID is provided, check workspace-specific permissions
  if (workspaceId) {
    // Check if the user is a member of the workspace
    const workspaceMember = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId
        }
      },
      select: { role: true }
    });

    if (!workspaceMember) {
      return false;
    }

    // Check if the workspace has a custom permission configuration
    const workspacePermission = await prisma.workspacePermission.findFirst({
      where: {
        workspaceId,
        permission: {
          slug: permissionSlug
        }
      },
      include: {
        permission: true,
        conditions: true
      }
    });

    if (workspacePermission) {
      // Check if the permission has conditions
      if (workspacePermission.conditions && workspacePermission.conditions.length > 0) {
        if (!evaluatePermissionConditions(workspacePermission.conditions, context)) {
          return false;
        }
      }
      
      // Check if the permission has an expiration date
      if (workspacePermission.expiresAt && new Date() > workspacePermission.expiresAt) {
        return false;
      }
      
      // Check if the user's role is in the allowed roles for this permission
      return workspacePermission.allowedRoles.includes(workspaceMember.role);
    }

    // If no workspace-specific permission is found, check if the workspace member role
    // has this permission by default
    const memberRolePermissions = DEFAULT_ROLE_PERMISSIONS[workspaceMember.role];
    return memberRolePermissions.includes(permissionSlug);
  }

  // If a module ID is provided, check module-specific permissions
  if (moduleId) {
    // Check if the module has a custom permission configuration
    const modulePermission = await prisma.modulePermission.findFirst({
      where: {
        moduleId,
        permission: {
          slug: permissionSlug
        }
      },
      include: {
        permission: true,
        conditions: true
      }
    });

    if (modulePermission) {
      // Check if the permission has conditions
      if (modulePermission.conditions && modulePermission.conditions.length > 0) {
        if (!evaluatePermissionConditions(modulePermission.conditions, context)) {
          return false;
        }
      }
      
      // Check if the user's role is in the allowed roles for this permission
      return modulePermission.allowedRoles.includes(user.role);
    }
  }

  return false;
}

/**
 * Evaluate permission conditions
 * @param conditions Array of permission conditions
 * @param context Context for condition evaluation
 * @returns boolean True if all conditions are met
 */
function evaluatePermissionConditions(
  conditions: PermissionCondition[],
  context?: Record<string, any>
): boolean {
  if (!context) {
    return false;
  }

  // All conditions must be met
  for (const condition of conditions) {
    const { type, field, operator, value } = condition;
    
    // Skip conditions that don't apply to the current context
    if (!context[field] && type !== PermissionConditionType.TIME) {
      continue;
    }
    
    // Evaluate based on condition type
    switch (type) {
      case PermissionConditionType.TIME:
        const now = new Date();
        const contextValue = context[field] ? new Date(context[field]) : now;
        
        if (operator === PermissionConditionOperator.GREATER_THAN) {
          if (!(contextValue > new Date(value))) {
            return false;
          }
        } else if (operator === PermissionConditionOperator.LESS_THAN) {
          if (!(contextValue < new Date(value))) {
            return false;
          }
        }
        break;
        
      case PermissionConditionType.IP:
        if (operator === PermissionConditionOperator.EQUALS) {
          if (context[field] !== value) {
            return false;
          }
        } else if (operator === PermissionConditionOperator.NOT_EQUALS) {
          if (context[field] === value) {
            return false;
          }
        } else if (operator === PermissionConditionOperator.IN) {
          if (!Array.isArray(value) || !value.includes(context[field])) {
            return false;
          }
        } else if (operator === PermissionConditionOperator.NOT_IN) {
          if (!Array.isArray(value) || value.includes(context[field])) {
            return false;
          }
        }
        break;
        
      case PermissionConditionType.RESOURCE:
      case PermissionConditionType.USER:
      case PermissionConditionType.CUSTOM:
        if (operator === PermissionConditionOperator.EQUALS) {
          if (context[field] !== value) {
            return false;
          }
        } else if (operator === PermissionConditionOperator.NOT_EQUALS) {
          if (context[field] === value) {
            return false;
          }
        } else if (operator === PermissionConditionOperator.CONTAINS) {
          if (!context[field].includes(value)) {
            return false;
          }
        } else if (operator === PermissionConditionOperator.NOT_CONTAINS) {
          if (context[field].includes(value)) {
            return false;
          }
        } else if (operator === PermissionConditionOperator.IN) {
          if (!Array.isArray(value) || !value.includes(context[field])) {
            return false;
          }
        } else if (operator === PermissionConditionOperator.NOT_IN) {
          if (!Array.isArray(value) || value.includes(context[field])) {
            return false;
          }
        }
        break;
    }
  }
  
  // All conditions passed
  return true;
}

/**
 * Check if a user has any of the specified permissions
 * @param userId The user ID
 * @param permissionSlugs Array of permission slugs to check
 * @param workspaceId Optional workspace ID for workspace-specific permissions
 * @param moduleId Optional module ID for module-specific permissions
 * @param context Optional context for conditional permissions
 * @returns Promise<boolean> True if the user has any of the permissions
 */
export async function hasAnyPermission(
  userId: string,
  permissionSlugs: string[],
  workspaceId?: string,
  moduleId?: string,
  context?: Record<string, any>
): Promise<boolean> {
  for (const slug of permissionSlugs) {
    if (await hasPermission(userId, slug, workspaceId, moduleId, context)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if a user has all of the specified permissions
 * @param userId The user ID
 * @param permissionSlugs Array of permission slugs to check
 * @param workspaceId Optional workspace ID for workspace-specific permissions
 * @param moduleId Optional module ID for module-specific permissions
 * @param context Optional context for conditional permissions
 * @returns Promise<boolean> True if the user has all of the permissions
 */
export async function hasAllPermissions(
  userId: string,
  permissionSlugs: string[],
  workspaceId?: string,
  moduleId?: string,
  context?: Record<string, any>
): Promise<boolean> {
  for (const slug of permissionSlugs) {
    if (!(await hasPermission(userId, slug, workspaceId, moduleId, context))) {
      return false;
    }
  }
  return true;
}

/**
 * Check if a user has permissions from a permission group
 * @param userId The user ID
 * @param groupName The permission group name
 * @param requireAll Whether all permissions in the group are required
 * @param workspaceId Optional workspace ID for workspace-specific permissions
 * @param moduleId Optional module ID for module-specific permissions
 * @param context Optional context for conditional permissions
 * @returns Promise<boolean> True if the user has the required permissions from the group
 */
export async function hasPermissionGroup(
  userId: string,
  groupName: string,
  requireAll: boolean = false,
  workspaceId?: string,
  moduleId?: string,
  context?: Record<string, any>
): Promise<boolean> {
  // Find the permission group
  const group = DEFAULT_PERMISSION_GROUPS.find(g => g.name === groupName);
  
  if (!group) {
    return false;
  }
  
  // Check if the user has the permissions in the group
  if (requireAll) {
    return hasAllPermissions(userId, group.permissions, workspaceId, moduleId, context);
  } else {
    return hasAnyPermission(userId, group.permissions, workspaceId, moduleId, context);
  }
}

/**
 * Get all permissions for a user
 * @param userId The user ID
 * @param workspaceId Optional workspace ID for workspace-specific permissions
 * @param moduleId Optional module ID for module-specific permissions
 * @returns Promise<string[]> Array of permission slugs the user has
 */
export async function getUserPermissions(
  userId: string,
  workspaceId?: string,
  moduleId?: string
): Promise<string[]> {
  // Get the user with their role
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, isAdmin: true }
  });

  if (!user) {
    return [];
  }

  // Admins have all permissions
  if (user.isAdmin) {
    // Get all permissions
    const allPermissions = await prisma.permission.findMany({
      select: { slug: true }
    });
    return allPermissions.map(p => p.slug);
  }

  // Start with the default permissions for the user's role
  let permissions = [...DEFAULT_ROLE_PERMISSIONS[user.role]];

  // Get user-specific permissions
  const userPermissions = await prisma.userPermission.findMany({
    where: {
      userId,
      // Only include active permissions that haven't expired
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } }
      ]
    },
    include: {
      permission: true
    }
  });

  // Add user-specific permissions
  permissions = [
    ...permissions,
    ...userPermissions.map(up => up.permission.slug)
  ];

  // If a workspace ID is provided, check workspace-specific permissions
  if (workspaceId) {
    // Check if the user is a member of the workspace
    const workspaceMember = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId
        }
      },
      select: { role: true }
    });

    if (workspaceMember) {
      // Add the default permissions for the workspace member role
      permissions = [...permissions, ...DEFAULT_ROLE_PERMISSIONS[workspaceMember.role]];

      // Get workspace-specific permissions
      const workspacePermissions = await prisma.workspacePermission.findMany({
        where: {
          workspaceId,
          allowedRoles: {
            has: workspaceMember.role
          },
          // Only include active permissions that haven't expired
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } }
          ]
        },
        include: {
          permission: true
        }
      });

      // Add workspace-specific permissions
      permissions = [
        ...permissions,
        ...workspacePermissions.map(wp => wp.permission.slug)
      ];
    }
  }

  // If a module ID is provided, check module-specific permissions
  if (moduleId) {
    // Get module-specific permissions
    const modulePermissions = await prisma.modulePermission.findMany({
      where: {
        moduleId,
        allowedRoles: {
          has: user.role
        }
      },
      include: {
        permission: true
      }
    });

    // Add module-specific permissions
    permissions = [
      ...permissions,
      ...modulePermissions.map(mp => mp.permission.slug)
    ];
  }

  // Remove duplicates
  return [...new Set(permissions)];
}

/**
 * Get all permission groups for a user
 * @param userId The user ID
 * @returns Promise<string[]> Array of permission group names the user has
 */
export async function getUserPermissionGroups(
  userId: string
): Promise<string[]> {
  // Get all user permissions
  const userPermissions = await getUserPermissions(userId);
  
  // Find groups where the user has all permissions in the group
  const groups = DEFAULT_PERMISSION_GROUPS.filter(group => {
    // Check if the user has all permissions in the group
    return group.permissions.every(permission => userPermissions.includes(permission));
  });
  
  return groups.map(g => g.name);
}
