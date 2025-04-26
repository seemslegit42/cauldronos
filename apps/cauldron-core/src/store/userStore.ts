import { User } from 'wasp/entities';
import { createStore } from './createStore';

// Define the user state
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Define the user actions
interface UserActions {
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
}

// Create the user store
export const useUserStore = createStore<UserState, UserActions>(
  // Initial state
  {
    user: null,
    isLoading: true,
    error: null,
  },
  // Actions
  (set) => ({
    setUser: (user) => set((state) => {
      state.user = user;
      state.isLoading = false;
      state.error = null;
    }),
    setLoading: (isLoading) => set((state) => {
      state.isLoading = isLoading;
    }),
    setError: (error) => set((state) => {
      state.error = error;
      state.isLoading = false;
    }),
    clearUser: () => set((state) => {
      state.user = null;
      state.error = null;
    }),
  }),
  // Options
  {
    name: 'cauldronos-user-storage',
    partialize: (state) => ({ user: state.user }),
  }
);

// Create selector hooks for better performance
export const useUser = () => useUserStore((state) => state.user);
export const useUserLoading = () => useUserStore((state) => state.isLoading);
export const useUserError = () => useUserStore((state) => state.error);
