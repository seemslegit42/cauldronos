import React from 'react';
import usePermissions from '../hooks/usePermissions';
import { PermissionBasedAccessProps } from '../types';

/**
 * Component for permission-based access control
 * Renders children only if the current user has the specified permissions
 */
const PermissionBasedAccess: React.FC<PermissionBasedAccessProps> = ({
  permissions,
  requireAll = false,
  children,
  fallback = null,
}) => {
  const { hasPermission, hasAllPermissions } = usePermissions();
  
  const hasAccess = requireAll
    ? hasAllPermissions(permissions)
    : permissions.some(permission => hasPermission(permission));

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PermissionBasedAccess;