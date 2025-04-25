import { Permission, RolePermission, WorkspacePermission, User, Workspace } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import { 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions, 
  hasPermissionGroup,
  getUserPermissions,
  getUserPermissionGroups
} from './utils';
import { 
  PermissionCategory, 
  UserRole, 
  PermissionCondition, 
  PermissionConditionType, 
  PermissionConditionOperator,
  PermissionGroup
} from './types';

// Query to check if a user has specific permissions
export const checkPermissions = async (
  args: {
    permissions: string[];
    requireAll?: boolean;
    workspaceId?: string;
    moduleId?: string;
    context?: Record<string, any>;
    permissionGroup?: string;
  },
  context: { user: User | null }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  const { 
    permissions, 
    requireAll = false, 
    workspaceId, 
    moduleId, 
    context: permissionContext,
    permissionGroup 
  } = args;

  // If a permission group is specified, check that instead of individual permissions
  if (permissionGroup) {
    const result = await hasPermissionGroup(
      context.user.id, 
      permissionGroup, 
      requireAll, 
      workspaceId, 
      moduleId, 
      permissionContext
    );
    return { hasPermission: result };
  }

  // Otherwise check individual permissions
  if (requireAll) {
    const result = await hasAllPermissions(
      context.user.id, 
      permissions, 
      workspaceId, 
      moduleId, 
      permissionContext
    );
    return { hasPermission: result };
  } else {
    const result = await hasAnyPermission(
      context.user.id, 
      permissions, 
      workspaceId, 
      moduleId, 
      permissionContext
    );
    return { hasPermission: result };
  }
};

// Action to create a new permission
export const createPermission = async (
  args: {
    name: string;
    slug: string;
    description?: string;
    category: PermissionCategory;
  },
  context: { user: User | null, entities: { Permission: any } }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Check if user has permission to manage permissions
  const canManagePermissions = await hasPermission(context.user.id, 'permissions:manage');
  if (!canManagePermissions) {
    throw new HttpError(403, 'Forbidden');
  }

  // Check if permission with this slug already exists
  const existingPermission = await context.entities.Permission.findUnique({
    where: { slug: args.slug }
  });

  if (existingPermission) {
    throw new HttpError(400, 'Permission with this slug already exists');
  }

  // Create the permission
  return context.entities.Permission.create({
    data: {
      name: args.name,
      slug: args.slug,
      description: args.description,
      category: args.category
    }
  });
};

// Action to update a permission
export const updatePermission = async (
  args: {
    id: string;
    name?: string;
    description?: string;
    category?: PermissionCategory;
  },
  context: { user: User | null, entities: { Permission: any } }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Check if user has permission to manage permissions
  const canManagePermissions = await hasPermission(context.user.id, 'permissions:manage');
  if (!canManagePermissions) {
    throw new HttpError(403, 'Forbidden');
  }

  // Check if permission exists
  const existingPermission = await context.entities.Permission.findUnique({
    where: { id: args.id }
  });

  if (!existingPermission) {
    throw new HttpError(404, 'Permission not found');
  }

  // Update the permission
  return context.entities.Permission.update({
    where: { id: args.id },
    data: {
      name: args.name,
      description: args.description,
      category: args.category
    }
  });
};

// Action to delete a permission
export const deletePermission = async (
  args: { id: string },
  context: { user: User | null, entities: { Permission: any } }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Check if user has permission to manage permissions
  const canManagePermissions = await hasPermission(context.user.id, 'permissions:manage');
  if (!canManagePermissions) {
    throw new HttpError(403, 'Forbidden');
  }

  // Check if permission exists
  const existingPermission = await context.entities.Permission.findUnique({
    where: { id: args.id }
  });

  if (!existingPermission) {
    throw new HttpError(404, 'Permission not found');
  }

  // Delete the permission
  return context.entities.Permission.delete({
    where: { id: args.id }
  });
};

// Action to update a role permission
export const updateRolePermission = async (
  args: {
    role: UserRole;
    permissionId: string;
    enabled: boolean;
  },
  context: { user: User | null, entities: { RolePermission: any, Permission: any } }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Check if user has permission to manage permissions
  const canManagePermissions = await hasPermission(context.user.id, 'permissions:manage');
  if (!canManagePermissions) {
    throw new HttpError(403, 'Forbidden');
  }

  // Check if permission exists
  const existingPermission = await context.entities.Permission.findUnique({
    where: { id: args.permissionId }
  });

  if (!existingPermission) {
    throw new HttpError(404, 'Permission not found');
  }

  // Check if role permission exists
  const existingRolePermission = await context.entities.RolePermission.findUnique({
    where: {
      role_permissionId: {
        role: args.role,
        permissionId: args.permissionId
      }
    }
  });

  if (args.enabled) {
    // If enabled and doesn't exist, create it
    if (!existingRolePermission) {
      return context.entities.RolePermission.create({
        data: {
          role: args.role,
          permissionId: args.permissionId
        }
      });
    }
    // If already exists, return it
    return existingRolePermission;
  } else {
    // If disabled and exists, delete it
    if (existingRolePermission) {
      return context.entities.RolePermission.delete({
        where: {
          role_permissionId: {
            role: args.role,
            permissionId: args.permissionId
          }
        }
      });
    }
    // If doesn't exist, return null
    return null;
  }
};

// Action to update a workspace permission
export const updateWorkspacePermission = async (
  args: {
    workspaceId: string;
    permissionId: string;
    allowedRoles: UserRole[];
    conditions?: PermissionCondition[];
    expiresAt?: Date;
  },
  context: { user: User | null, entities: { WorkspacePermission: any, Permission: any, Workspace: any, PermissionCondition: any } }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Check if user has permission to manage workspace permissions
  const canManageWorkspacePermissions = await hasPermission(
    context.user.id,
    'workspace:permissions:manage',
    args.workspaceId
  );
  if (!canManageWorkspacePermissions) {
    throw new HttpError(403, 'Forbidden');
  }

  // Check if workspace exists
  const existingWorkspace = await context.entities.Workspace.findUnique({
    where: { id: args.workspaceId }
  });

  if (!existingWorkspace) {
    throw new HttpError(404, 'Workspace not found');
  }

  // Check if permission exists
  const existingPermission = await context.entities.Permission.findUnique({
    where: { id: args.permissionId }
  });

  if (!existingPermission) {
    throw new HttpError(404, 'Permission not found');
  }

  // Check if workspace permission exists
  const existingWorkspacePermission = await context.entities.WorkspacePermission.findUnique({
    where: {
      workspaceId_permissionId: {
        workspaceId: args.workspaceId,
        permissionId: args.permissionId
      }
    },
    include: {
      conditions: true
    }
  });

  if (existingWorkspacePermission) {
    // Update existing workspace permission
    const updatedPermission = await context.entities.WorkspacePermission.update({
      where: {
        workspaceId_permissionId: {
          workspaceId: args.workspaceId,
          permissionId: args.permissionId
        }
      },
      data: {
        allowedRoles: args.allowedRoles,
        expiresAt: args.expiresAt
      },
      include: {
        conditions: true
      }
    });

    // Update conditions if provided
    if (args.conditions) {
      // Delete existing conditions
      if (existingWorkspacePermission.conditions && existingWorkspacePermission.conditions.length > 0) {
        await context.entities.PermissionCondition.deleteMany({
          where: {
            id: {
              in: existingWorkspacePermission.conditions.map(c => c.id)
            }
          }
        });
      }

      // Create new conditions
      for (const condition of args.conditions) {
        await context.entities.PermissionCondition.create({
          data: {
            type: condition.type,
            field: condition.field,
            operator: condition.operator,
            value: condition.value,
            workspacePermissionId: updatedPermission.id
          }
        });
      }
    }

    return updatedPermission;
  } else {
    // Create new workspace permission
    const newPermission = await context.entities.WorkspacePermission.create({
      data: {
        workspaceId: args.workspaceId,
        permissionId: args.permissionId,
        allowedRoles: args.allowedRoles,
        expiresAt: args.expiresAt
      }
    });

    // Create conditions if provided
    if (args.conditions) {
      for (const condition of args.conditions) {
        await context.entities.PermissionCondition.create({
          data: {
            type: condition.type,
            field: condition.field,
            operator: condition.operator,
            value: condition.value,
            workspacePermissionId: newPermission.id
          }
        });
      }
    }

    return newPermission;
  }
};

// Action to create a permission group
export const createPermissionGroup = async (
  args: {
    name: string;
    description?: string;
    permissions: string[];
  },
  context: { user: User | null, entities: { PermissionGroup: any, Permission: any } }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Check if user has permission to manage permission groups
  const canManagePermissionGroups = await hasPermission(context.user.id, 'permission-groups:manage');
  if (!canManagePermissionGroups) {
    throw new HttpError(403, 'Forbidden');
  }

  // Check if permission group with this name already exists
  const existingGroup = await context.entities.PermissionGroup.findUnique({
    where: { name: args.name }
  });

  if (existingGroup) {
    throw new HttpError(400, 'Permission group with this name already exists');
  }

  // Verify all permissions exist
  for (const permissionSlug of args.permissions) {
    const permission = await context.entities.Permission.findUnique({
      where: { slug: permissionSlug }
    });

    if (!permission) {
      throw new HttpError(404, `Permission with slug '${permissionSlug}' not found`);
    }
  }

  // Create the permission group
  return context.entities.PermissionGroup.create({
    data: {
      name: args.name,
      description: args.description,
      permissions: args.permissions
    }
  });
};

// Action to update a permission group
export const updatePermissionGroup = async (
  args: {
    id: string;
    name?: string;
    description?: string;
    permissions?: string[];
  },
  context: { user: User | null, entities: { PermissionGroup: any, Permission: any } }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Check if user has permission to manage permission groups
  const canManagePermissionGroups = await hasPermission(context.user.id, 'permission-groups:manage');
  if (!canManagePermissionGroups) {
    throw new HttpError(403, 'Forbidden');
  }

  // Check if permission group exists
  const existingGroup = await context.entities.PermissionGroup.findUnique({
    where: { id: args.id }
  });

  if (!existingGroup) {
    throw new HttpError(404, 'Permission group not found');
  }

  // If name is being updated, check if it's unique
  if (args.name && args.name !== existingGroup.name) {
    const groupWithSameName = await context.entities.PermissionGroup.findUnique({
      where: { name: args.name }
    });

    if (groupWithSameName) {
      throw new HttpError(400, 'Permission group with this name already exists');
    }
  }

  // If permissions are being updated, verify they all exist
  if (args.permissions) {
    for (const permissionSlug of args.permissions) {
      const permission = await context.entities.Permission.findUnique({
        where: { slug: permissionSlug }
      });

      if (!permission) {
        throw new HttpError(404, `Permission with slug '${permissionSlug}' not found`);
      }
    }
  }

  // Update the permission group
  return context.entities.PermissionGroup.update({
    where: { id: args.id },
    data: {
      name: args.name,
      description: args.description,
      permissions: args.permissions
    }
  });
};

// Action to delete a permission group
export const deletePermissionGroup = async (
  args: { id: string },
  context: { user: User | null, entities: { PermissionGroup: any } }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Check if user has permission to manage permission groups
  const canManagePermissionGroups = await hasPermission(context.user.id, 'permission-groups:manage');
  if (!canManagePermissionGroups) {
    throw new HttpError(403, 'Forbidden');
  }

  // Check if permission group exists
  const existingGroup = await context.entities.PermissionGroup.findUnique({
    where: { id: args.id }
  });

  if (!existingGroup) {
    throw new HttpError(404, 'Permission group not found');
  }

  // Delete the permission group
  return context.entities.PermissionGroup.delete({
    where: { id: args.id }
  });
};

// Action to assign a permission to a user
export const assignUserPermission = async (
  args: {
    userId: string;
    permissionId: string;
    conditions?: PermissionCondition[];
    expiresAt?: Date;
  },
  context: { user: User | null, entities: { UserPermission: any, Permission: any, User: any, PermissionCondition: any } }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Check if user has permission to assign permissions
  const canAssignPermissions = await hasPermission(context.user.id, 'permissions:assign');
  if (!canAssignPermissions) {
    throw new HttpError(403, 'Forbidden');
  }

  // Check if user exists
  const targetUser = await context.entities.User.findUnique({
    where: { id: args.userId }
  });

  if (!targetUser) {
    throw new HttpError(404, 'User not found');
  }

  // Check if permission exists
  const permission = await context.entities.Permission.findUnique({
    where: { id: args.permissionId }
  });

  if (!permission) {
    throw new HttpError(404, 'Permission not found');
  }

  // Check if user already has this permission
  const existingUserPermission = await context.entities.UserPermission.findUnique({
    where: {
      userId_permissionId: {
        userId: args.userId,
        permissionId: args.permissionId
      }
    },
    include: {
      conditions: true
    }
  });

  if (existingUserPermission) {
    // Update existing user permission
    const updatedPermission = await context.entities.UserPermission.update({
      where: {
        userId_permissionId: {
          userId: args.userId,
          permissionId: args.permissionId
        }
      },
      data: {
        expiresAt: args.expiresAt
      },
      include: {
        conditions: true
      }
    });

    // Update conditions if provided
    if (args.conditions) {
      // Delete existing conditions
      if (existingUserPermission.conditions && existingUserPermission.conditions.length > 0) {
        await context.entities.PermissionCondition.deleteMany({
          where: {
            id: {
              in: existingUserPermission.conditions.map(c => c.id)
            }
          }
        });
      }

      // Create new conditions
      for (const condition of args.conditions) {
        await context.entities.PermissionCondition.create({
          data: {
            type: condition.type,
            field: condition.field,
            operator: condition.operator,
            value: condition.value,
            userPermissionId: updatedPermission.id
          }
        });
      }
    }

    return updatedPermission;
  } else {
    // Create new user permission
    const newPermission = await context.entities.UserPermission.create({
      data: {
        userId: args.userId,
        permissionId: args.permissionId,
        expiresAt: args.expiresAt
      }
    });

    // Create conditions if provided
    if (args.conditions) {
      for (const condition of args.conditions) {
        await context.entities.PermissionCondition.create({
          data: {
            type: condition.type,
            field: condition.field,
            operator: condition.operator,
            value: condition.value,
            userPermissionId: newPermission.id
          }
        });
      }
    }

    return newPermission;
  }
};

// Action to revoke a permission from a user
export const revokeUserPermission = async (
  args: {
    userId: string;
    permissionId: string;
  },
  context: { user: User | null, entities: { UserPermission: any, Permission: any, User: any } }
) => {
  if (!context.user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Check if user has permission to revoke permissions
  const canRevokePermissions = await hasPermission(context.user.id, 'permissions:revoke');
  if (!canRevokePermissions) {
    throw new HttpError(403, 'Forbidden');
  }

  // Check if user exists
  const targetUser = await context.entities.User.findUnique({
    where: { id: args.userId }
  });

  if (!targetUser) {
    throw new HttpError(404, 'User not found');
  }

  // Check if permission exists
  const permission = await context.entities.Permission.findUnique({
    where: { id: args.permissionId }
  });

  if (!permission) {
    throw new HttpError(404, 'Permission not found');
  }

  // Check if user has this permission
  const existingUserPermission = await context.entities.UserPermission.findUnique({
    where: {
      userId_permissionId: {
        userId: args.userId,
        permissionId: args.permissionId
      }
    }
  });

  if (!existingUserPermission) {
    throw new HttpError(404, 'User does not have this permission');
  }

  // Delete the user permission
  return context.entities.UserPermission.delete({
    where: {
      userId_permissionId: {
        userId: args.userId,
        permissionId: args.permissionId
      }
    }
  });
};
