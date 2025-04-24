import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../../workspace/operations';
import { useQuery } from '@tanstack/react-query';
import { checkPermissions } from '../permissions/operations';

interface PermissionBasedAccessProps {
  children: ReactNode;
  permissions: string[];
  workspaceId?: string;
  moduleId?: string;
  context?: Record<string, any>;
  permissionGroup?: string;
  requireAll?: boolean;
  fallback?: ReactNode;
}

/**
 * Component that conditionally renders its children based on user permissions
 * @param children The content to render if the user has the required permissions
 * @param permissions Array of permission slugs that are required to access the content
 * @param workspaceId Optional workspace ID for workspace-specific permissions
 * @param moduleId Optional module ID for module-specific permissions
 * @param context Optional context for conditional permissions
 * @param permissionGroup Optional permission group to check instead of individual permissions
 * @param requireAll If true, the user must have all the specified permissions; if false, any one permission is sufficient
 * @param fallback Optional content to render if the user doesn't have the required permissions
 */
const PermissionBasedAccess: React.FC<PermissionBasedAccessProps> = ({
  children,
  permissions,
  workspaceId,
  moduleId,
  context,
  permissionGroup,
  requireAll = false,
  fallback = null,
}) => {
  const { data: user, isLoading: isLoadingUser } = useAuth();
  const { currentWorkspace, isLoading: isLoadingWorkspace } = useWorkspaces();
  const [hasPermission, setHasPermission] = useState(false);

  // Get the workspace ID to use
  const effectiveWorkspaceId = workspaceId || currentWorkspace?.id;

  // Query to check permissions
  const { data: permissionCheck, isLoading: isCheckingPermissions } = useQuery({
    queryKey: ['permissions', permissions, effectiveWorkspaceId, moduleId, permissionGroup],
    queryFn: () => checkPermissions({
      permissions,
      requireAll,
      workspaceId: effectiveWorkspaceId,
      moduleId,
      context,
      permissionGroup,
    }),
    enabled: !!user && (!!effectiveWorkspaceId || !workspaceId),
  });

  // Update permission state when data changes
  useEffect(() => {
    if (permissionCheck) {
      setHasPermission(permissionCheck);
    }
  }, [permissionCheck]);

  // If still loading, don't render anything
  if (isLoadingUser || isLoadingWorkspace || isCheckingPermissions) {
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

  // If a workspace ID is required but not available, render the fallback
  if (workspaceId && !effectiveWorkspaceId) {
    return <>{fallback}</>;
  }

  return hasPermission ? <>{children}</> : <>{fallback}</>;
};

export default PermissionBasedAccess;
