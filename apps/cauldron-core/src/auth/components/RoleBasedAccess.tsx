import React, { ReactNode } from 'react';
import { useAuth } from 'wasp/client/auth';
import { UserRole } from '../permissions/types';

interface RoleBasedAccessProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
  requireAll?: boolean;
}

/**
 * Component that conditionally renders its children based on user roles
 * @param children The content to render if the user has the required roles
 * @param allowedRoles Array of roles that are allowed to access the content
 * @param fallback Optional content to render if the user doesn't have the required roles
 * @param requireAll If true, the user must have all the specified roles; if false, any one role is sufficient
 */
const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({
  children,
  allowedRoles,
  fallback = null,
  requireAll = false,
}) => {
  const { data: user, isLoading } = useAuth();

  // If still loading, don't render anything
  if (isLoading) {
    return null;
  }

  // If no user is logged in, render the fallback
  if (!user) {
    return <>{fallback}</>;
  }

  // Admin users have access to everything
  if (user.isAdmin) {
    return <>{children}</>;
  }

  // Check if the user has the required roles
  const hasAccess = requireAll
    ? allowedRoles.every((role) => user.role === role)
    : allowedRoles.some((role) => user.role === role);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default RoleBasedAccess;
