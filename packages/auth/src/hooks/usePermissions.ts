import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import permissionUtils from '../utils/permissionUtils';

/**
 * Hook for permission-based access control
 * Provides methods to check if the current user has specific permissions
 */
const usePermissions = () => {
  const { user } = useAuthStore();

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false;
      return permissionUtils.hasPermission(user.permissions, permission);
    },
    [user]
  );

  const hasAllPermissions = useCallback(
    (permissions: string[]): boolean => {
      if (!user) return false;
      return permissionUtils.hasAllPermissions(user.permissions, permissions);
    },
    [user]
  );

  const hasAnyPermission = useCallback(
    (permissions: string[]): boolean => {
      if (!user) return false;
      return permissionUtils.hasAnyPermission(user.permissions, permissions);
    },
    [user]
  );

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    userPermissions: user?.permissions || [],
  };
};

export default usePermissions;