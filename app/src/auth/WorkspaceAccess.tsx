import React, { ReactNode } from 'react';
import { Result, Button } from 'antd';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../workspace/operations';

interface WorkspaceAccessProps {
  children: ReactNode;
  workspaceId?: string;
  fallback?: ReactNode;
}

const WorkspaceAccess: React.FC<WorkspaceAccessProps> = ({ 
  children, 
  workspaceId, 
  fallback 
}) => {
  const { data: user, isLoading: isLoadingUser } = useAuth();
  const { currentWorkspace, workspaces, isLoading: isLoadingWorkspaces } = useWorkspaces();

  if (isLoadingUser || isLoadingWorkspaces) {
    return null;
  }

  // If no specific workspace is required, or if the user is an admin, allow access
  if (!workspaceId || user?.isAdmin) {
    return <>{children}</>;
  }

  // Check if the user has access to the specified workspace
  const targetWorkspace = workspaceId 
    ? workspaces.find(w => w.id === workspaceId)
    : currentWorkspace;

  if (!targetWorkspace) {
    // If fallback is provided, show it
    if (fallback) {
      return <>{fallback}</>;
    }

    // Default workspace not found message
    return (
      <Result
        status="404"
        title="Workspace Not Found"
        subTitle="Sorry, the workspace you're trying to access doesn't exist or you don't have permission to access it."
        extra={
          <Button type="primary" href="/">
            Back to Home
          </Button>
        }
      />
    );
  }

  // User has access to the workspace
  return <>{children}</>;
};

export default WorkspaceAccess;
