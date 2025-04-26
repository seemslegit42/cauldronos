import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { User } from '../types';

/**
 * Hook for authentication functionality
 * Provides access to the current user and authentication methods
 */
const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    signup,
    resetPassword,
    updateUser,
  } = useAuthStore();

  const getToken = useCallback(async (): Promise<string | null> => {
    // Implementation would depend on how tokens are stored
    // This is a placeholder
    return localStorage.getItem('auth_token');
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    signup,
    resetPassword,
    updateUser,
    getToken,
  };
};

export default useAuth;