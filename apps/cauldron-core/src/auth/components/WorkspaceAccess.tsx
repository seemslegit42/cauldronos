import React, { ReactNode } from 'react';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../../workspace/operations';
import { UserRole } from '../permissions/types';

interface WorkspaceAccessProps {
  children: ReactNode;
  workspaceId?: string;
  allowedRoles?: UserRole[];
  requireOwnership?: boolean;
  fallback?: ReactNode;
  requireAll?: boolean;
}

/**
 * Component that conditionally renders its children based on workspace access
 * @param children The content to render if the user has access to the workspace
 * @param workspaceId The ID of the workspace to check access for (defaults to current workspace)
 * @param allowedRoles Array of roles that are allowed to access the content
 * @param requireOwnership If true, the user must be the owner of the workspace
 * @param fallback Optional content to render if the user doesn't have access
 * @param requireAll If true, the user must have all the specified roles; if false, any one role is sufficient
 */
const WorkspaceAccess: React.FC<WorkspaceAccessProps> = ({
  children,
  workspaceId,
  allowedRoles,
  requireOwnership = false,
  fallback = null,
  requireAll = false,
}) => {
  const { data: user, isLoading: isLoadingUser } = useAuth();
  const { currentWorkspace, workspaceMembers, isLoading: isLoadingWorkspace } = useWorkspaces();

  // If still loading, don't render anything
  if (isLoadingUser || isLoadingWorkspace) {
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

  // Get the workspace to check access for
  const workspace = workspaceId ? { id: workspaceId } : currentWorkspace;

  // If no workspace is selected, render the fallback
  if (!workspace) {
    return <>{fallback}</>;
  }

  // Check if the user is the owner of the workspace
  const isOwner = workspace.ownerId === user.id;

  // If ownership is required and the user is not the owner, render the fallback
  if (requireOwnership && !isOwner) {
    return <>{fallback}</>;
  }

  // If no roles are specified, just check if the user is a member of the workspace
  if (!allowedRoles || allowedRoles.length === 0) {
    const isMember = workspaceMembers.some((member) => member.userId === user.id);
    return isMember ? <>{children}</> : <>{fallback}</>;
  }

  // Find the user's membership in the workspace
  const membership = workspaceMembers.find((member) => member.userId === user.id);

  // If the user is not a member of the workspace, render the fallback
  if (!membership) {
    return <>{fallback}</>;
  }

  // Check if the user has the required roles
  const hasAccess = requireAll
    ? allowedRoles.every((role) => membership.role === role)
    : allowedRoles.some((role) => membership.role === role);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default WorkspaceAccess;
