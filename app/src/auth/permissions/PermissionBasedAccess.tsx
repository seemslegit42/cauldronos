import React, { ReactNode, useEffect, useState } from 'react';
import { Result, Button, Spin } from 'antd';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../../workspace/operations';

interface PermissionBasedAccessProps {
  children: ReactNode;
  requiredPermissions: string[];
  requireAll?: boolean;
  workspaceId?: string;
  fallback?: ReactNode;
  loadingComponent?: ReactNode;
}

/**
 * Component that conditionally renders children based on user permissions
 */
const PermissionBasedAccess: React.FC<PermissionBasedAccessProps> = ({
  children,
  requiredPermissions,
  requireAll = false,
  workspaceId,
  fallback,
  loadingComponent
}) => {
  const { data: user, isLoading: isLoadingUser } = useAuth();
  const { currentWorkspace } = useWorkspaces();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Use the provided workspaceId or fall back to the current workspace
  const effectiveWorkspaceId = workspaceId || currentWorkspace?.id;

  useEffect(() => {
    const checkPermissions = async () => {
      if (!user) {
        setHasPermission(false);
        setIsLoading(false);
        return;
      }

      try {
        // In a real implementation, this would be an API call to check permissions
        // const response = await fetch('/api/permissions/check', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     permissions: requiredPermissions,
        //     requireAll,
        //     workspaceId: effectiveWorkspaceId
        //   })
        // });
        // const { hasPermission } = await response.json();

        // For now, we'll simulate permission checking based on user role
        let hasPermission = false;
        
        // Admins have all permissions
        if (user.isAdmin) {
          hasPermission = true;
        } else {
          // For demo purposes, we'll use a simple role-based check
          // In a real app, this would be a more sophisticated check based on the permission system
          const userRole = user.role;
          
          if (userRole === 'ADMIN') {
            hasPermission = true;
          } else if (userRole === 'MANAGER') {
            // Managers have most permissions except system-level ones
            hasPermission = requiredPermissions.every(p => 
              !p.startsWith('admin:') && !p.startsWith('permissions:manage')
            );
          } else if (userRole === 'USER') {
            // Users have basic permissions
            hasPermission = requiredPermissions.every(p => 
              p.startsWith('module:data:read') || 
              p.startsWith('workspace:modules:view')
            );
          } else if (userRole === 'GUEST') {
            // Guests have minimal permissions
            hasPermission = requiredPermissions.every(p => 
              p === 'module:data:read' || 
              p === 'workspace:modules:view'
            );
          }
        }

        setHasPermission(hasPermission);
      } catch (error) {
        console.error('Error checking permissions:', error);
        setHasPermission(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoadingUser) {
      checkPermissions();
    }
  }, [user, isLoadingUser, requiredPermissions, requireAll, effectiveWorkspaceId]);

  if (isLoadingUser || isLoading) {
    return loadingComponent ? <>{loadingComponent}</> : <Spin />;
  }

  if (hasPermission) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you don't have permission to access this resource."
      extra={
        <Button type="primary" href="/dashboard">
          Back to Dashboard
        </Button>
      }
    />
  );
};

export default PermissionBasedAccess;
