import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';

/**
 * Hook for role-based access control
 * Provides methods to check if the current user has specific roles
 */
const useRoles = () => {
  const { user } = useAuthStore();

  const hasRole = useCallback(
    (role: string): boolean => {
      if (!user) return false;
      return user.roles.includes(role);
    },
    [user]
  );

  const hasAnyRole = useCallback(
    (roles: string[]): boolean => {
      if (!user) return false;
      return roles.some(role => user.roles.includes(role));
    },
    [user]
  );

  const hasAllRoles = useCallback(
    (roles: string[]): boolean => {
      if (!user) return false;
      return roles.every(role => user.roles.includes(role));
    },
    [user]
  );

  return {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    userRoles: user?.roles || [],
  };
};

export default useRoles;