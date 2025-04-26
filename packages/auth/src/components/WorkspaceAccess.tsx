import React from 'react';
import useWorkspaceAccess from '../hooks/useWorkspaceAccess';
import { WorkspaceAccessProps } from '../types';

/**
 * Component for workspace-based access control
 * Renders children only if the current user has access to the specified workspace
 */
const WorkspaceAccess: React.FC<WorkspaceAccessProps> = ({
  workspaceId,
  children,
  fallback = null,
}) => {
  const { hasWorkspaceAccess } = useWorkspaceAccess();
  const hasAccess = hasWorkspaceAccess(workspaceId);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default WorkspaceAccess;