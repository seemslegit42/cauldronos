import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, AuthUser } from '../types';

interface AuthStore extends AuthState {
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentOrganization: (organizationId: string | undefined) => void;
  setCurrentWorkspace: (workspaceId: string | undefined) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }),

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }),

      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null,
      })),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      setCurrentOrganization: (organizationId) => set((state) => ({
        user: state.user ? { ...state.user, currentOrganizationId: organizationId } : null,
      })),

      setCurrentWorkspace: (workspaceId) => set((state) => ({
        user: state.user ? { ...state.user, currentWorkspaceId: workspaceId } : null,
      })),
    }),
    {
      name: 'cauldron-auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
