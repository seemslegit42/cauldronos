import React from 'react';
import { useAuth, useUserPermissions } from '../hooks/useAuth';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface PermissionGuardProps {
  /**
   * The permissions required to access the component
   */
  permissions: string[];
  
  /**
   * Whether all permissions are required (AND) or just one (OR)
   * @default false (OR)
   */
  requireAll?: boolean;
  
  /**
   * The component to render if the user has the required permissions
   */
  children: React.ReactNode;
  
  /**
   * Custom component to render if the user doesn't have the required permissions
   */
  fallback?: React.ReactNode;
}

/**
 * A component that only renders its children if the user has the required permissions
 */
export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permissions,
  requireAll = false,
  children,
  fallback,
}) => {
  const { isSignedIn } = useAuth();
  const { permissions: userPermissions, isLoading } = useUserPermissions();
  const navigate = useNavigate();
  
  // If not signed in, don't render anything
  if (!isSignedIn) {
    return null;
  }
  
  // If still loading permissions, don't render anything yet
  if (isLoading || !userPermissions) {
    return null;
  }
  
  // Check if user has the required permissions
  const hasPermission = requireAll
    ? permissions.every((permission) => checkPermission(permission, userPermissions))
    : permissions.some((permission) => checkPermission(permission, userPermissions));
  
  // If user has permission, render children
  if (hasPermission) {
    return <>{children}</>;
  }
  
  // If fallback is provided, render it
  if (fallback) {
    return <>{fallback}</>;
  }
  
  // Otherwise, render a default unauthorized message
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you don't have permission to access this page."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  );
};

/**
 * Check if the user has a specific permission
 */
const checkPermission = (permission: string, userPermissions: any): boolean => {
  // For now, we'll use a simple check based on the permissions object
  // In a real app, this would be more sophisticated
  
  switch (permission) {
    case 'admin':
      return userPermissions.canManageUsers && userPermissions.canManageOrganizations;
    case 'manage:users':
      return userPermissions.canManageUsers;
    case 'manage:organizations':
      return userPermissions.canManageOrganizations;
    case 'manage:workspaces':
      return userPermissions.canManageWorkspaces;
    case 'manage:billing':
      return userPermissions.canManageBilling;
    case 'view:analytics':
      return userPermissions.canViewAnalytics;
    case 'create:workspaces':
      return userPermissions.canCreateWorkspaces;
    default:
      return false;
  }
};
