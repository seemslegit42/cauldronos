import { create } from 'zustand';
import { AuthStore, User } from '../types';

/**
 * Authentication store using Zustand
 * Manages authentication state and provides methods for authentication
 */
export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with an actual API call
      // Simulating an API call for now
      const user: User = {
        id: '1',
        email,
        name: 'Test User',
        roles: ['user'],
        permissions: ['users:read'],
        workspaces: ['workspace-1'],
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // This would be replaced with an actual API call
      // Simulating an API call for now
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },

  signup: async (email: string, password: string, userData = {}) => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with an actual API call
      // Simulating an API call for now
      const user: User = {
        id: '1',
        email,
        name: userData.name as string || 'New User',
        roles: ['user'],
        permissions: ['users:read'],
        workspaces: [],
        ...userData,
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with an actual API call
      // Simulating an API call for now
      set({ isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },

  updateUser: async (userData: Partial<User>) => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with an actual API call
      // Simulating an API call for now
      const currentUser = get().user;
      if (!currentUser) {
        throw new Error('No user is authenticated');
      }
      
      const updatedUser: User = {
        ...currentUser,
        ...userData,
      };
      
      set({ user: updatedUser, isLoading: false });
      return updatedUser;
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
}));