import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';

/**
 * Hook for workspace-based access control
 * Provides methods to check if the current user has access to specific workspaces
 */
const useWorkspaceAccess = () => {
  const { user } = useAuthStore();

  const hasWorkspaceAccess = useCallback(
    (workspaceId: string): boolean => {
      if (!user) return false;
      return user.workspaces.includes(workspaceId);
    },
    [user]
  );

  const getUserWorkspaces = useCallback((): string[] => {
    if (!user) return [];
    return user.workspaces;
  }, [user]);

  return {
    hasWorkspaceAccess,
    getUserWorkspaces,
    userWorkspaces: user?.workspaces || [],
  };
};

export default useWorkspaceAccess;