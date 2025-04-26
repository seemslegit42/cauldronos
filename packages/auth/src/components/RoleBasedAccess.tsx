import React from 'react';
import useRoles from '../hooks/useRoles';
import { RoleBasedAccessProps } from '../types';

/**
 * Component for role-based access control
 * Renders children only if the current user has at least one of the specified roles
 */
const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({
  roles,
  children,
  fallback = null,
}) => {
  const { hasRole } = useRoles();
  const hasAccess = roles.some(role => hasRole(role));

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleBasedAccess;