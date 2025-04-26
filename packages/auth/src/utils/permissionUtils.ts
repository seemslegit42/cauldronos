/**
 * Utility functions for permission-based access control
 */

/**
 * Check if a user has a specific permission
 * Supports wildcard permissions (e.g., 'users:*' grants access to 'users:read', 'users:write', etc.)
 */
const hasPermission = (userPermissions: string[], permission: string): boolean => {
  // Direct match
  if (userPermissions.includes(permission)) {
    return true;
  }

  // Check for wildcard permissions
  const [resource, action] = permission.split(':');
  const wildcardPermission = `${resource}:*`;
  if (userPermissions.includes(wildcardPermission)) {
    return true;
  }

  // Super admin permission
  if (userPermissions.includes('*:*')) {
    return true;
  }

  return false;
};

/**
 * Check if a user has all of the specified permissions
 */
const hasAllPermissions = (userPermissions: string[], permissions: string[]): boolean => {
  return permissions.every(permission => hasPermission(userPermissions, permission));
};

/**
 * Check if a user has any of the specified permissions
 */
const hasAnyPermission = (userPermissions: string[], permissions: string[]): boolean => {
  return permissions.some(permission => hasPermission(userPermissions, permission));
};

/**
 * Get all permissions for a specific resource
 */
const getResourcePermissions = (userPermissions: string[], resource: string): string[] => {
  return userPermissions.filter(permission => {
    const [permResource] = permission.split(':');
    return permResource === resource || permResource === '*';
  });
};

/**
 * Check if a user can perform a specific action on a resource
 */
const canPerformAction = (userPermissions: string[], resource: string, action: string): boolean => {
  return hasPermission(userPermissions, `${resource}:${action}`);
};

export default {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  getResourcePermissions,
  canPerformAction,
};