import { User } from 'wasp/entities';
import { HttpError } from 'wasp/server';

/**
 * Ensures that a user has access to a specific tenant (workspace)
 * @param user The current user
 * @param tenantId The ID of the tenant (workspace)
 * @param options Additional options
 * @returns void if the user has access, throws an error otherwise
 */
export function ensureTenantAccess(
  user: User | null,
  tenantId: string,
  options: {
    requireOwnership?: boolean;
    allowedRoles?: string[];
    requireAll?: boolean;
  } = {}
): void {
  if (!user) {
    throw new HttpError(401, 'Unauthorized');
  }

  // Admin users have access to all tenants
  if (user.isAdmin) {
    return;
  }

  // Check if the user is a member of the tenant
  const membership = user.memberships?.find((m) => m.workspaceId === tenantId);

  if (!membership) {
    throw new HttpError(403, 'You do not have access to this workspace');
  }

  // Check if ownership is required
  if (options.requireOwnership && !membership.isOwner) {
    throw new HttpError(403, 'Only the workspace owner can perform this action');
  }

  // Check if specific roles are required
  if (options.allowedRoles && options.allowedRoles.length > 0) {
    const hasRequiredRoles = options.requireAll
      ? options.allowedRoles.every((role) => membership.role === role)
      : options.allowedRoles.some((role) => membership.role === role);

    if (!hasRequiredRoles) {
      throw new HttpError(403, 'You do not have the required role to perform this action');
    }
  }
}

/**
 * Middleware to ensure tenant isolation in API operations
 * @param handler The API handler function
 * @param options Options for tenant isolation
 * @returns A wrapped handler function with tenant isolation
 */
export function withTenantIsolation<T, U>(
  handler: (args: T, context: { user: User | null }) => Promise<U>,
  options: {
    tenantIdPath: string;
    requireOwnership?: boolean;
    allowedRoles?: string[];
    requireAll?: boolean;
  }
) {
  return async (args: T, context: { user: User | null }): Promise<U> => {
    const { user } = context;
    
    // Get the tenant ID from the args using the specified path
    const tenantId = getNestedProperty(args, options.tenantIdPath);
    
    if (!tenantId) {
      throw new HttpError(400, 'Tenant ID is required');
    }
    
    // Ensure the user has access to the tenant
    ensureTenantAccess(user, tenantId, {
      requireOwnership: options.requireOwnership,
      allowedRoles: options.allowedRoles,
      requireAll: options.requireAll,
    });
    
    // Call the original handler
    return handler(args, context);
  };
}

/**
 * Gets a nested property from an object using a dot-notation path
 * @param obj The object to get the property from
 * @param path The path to the property (e.g., 'workspace.id')
 * @returns The value of the property, or undefined if not found
 */
function getNestedProperty(obj: any, path: string): any {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : undefined;
  }, obj);
}
