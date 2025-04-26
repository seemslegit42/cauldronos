import { createStore } from '../../../store/createStore';

interface UsersTeamsState {
  activeTab: string;
  selectedUserId: string | null;
  selectedTeamId: string | null;
  filters: {
    userRole: string[];
    userStatus: string[];
    teamSize: string[];
  };
}

interface UsersTeamsActions {
  setActiveTab: (tab: string) => void;
  setSelectedUserId: (userId: string | null) => void;
  setSelectedTeamId: (teamId: string | null) => void;
  addUserRoleFilter: (role: string) => void;
  removeUserRoleFilter: (role: string) => void;
  addUserStatusFilter: (status: string) => void;
  removeUserStatusFilter: (status: string) => void;
  addTeamSizeFilter: (size: string) => void;
  removeTeamSizeFilter: (size: string) => void;
  resetFilters: () => void;
}

// Initial state
const initialState: UsersTeamsState = {
  activeTab: 'users',
  selectedUserId: null,
  selectedTeamId: null,
  filters: {
    userRole: [],
    userStatus: [],
    teamSize: [],
  },
};

// Create the store with Zustand
export const useUsersTeamsStore = createStore<UsersTeamsState, UsersTeamsActions>(
  initialState,
  (set) => ({
    setActiveTab: (tab) => set((state) => {
      state.activeTab = tab;
    }),
    setSelectedUserId: (userId) => set((state) => {
      state.selectedUserId = userId;
    }),
    setSelectedTeamId: (teamId) => set((state) => {
      state.selectedTeamId = teamId;
    }),
    addUserRoleFilter: (role) => set((state) => {
      if (!state.filters.userRole.includes(role)) {
        state.filters.userRole.push(role);
      }
    }),
    removeUserRoleFilter: (role) => set((state) => {
      state.filters.userRole = state.filters.userRole.filter((r) => r !== role);
    }),
    addUserStatusFilter: (status) => set((state) => {
      if (!state.filters.userStatus.includes(status)) {
        state.filters.userStatus.push(status);
      }
    }),
    removeUserStatusFilter: (status) => set((state) => {
      state.filters.userStatus = state.filters.userStatus.filter((s) => s !== status);
    }),
    addTeamSizeFilter: (size) => set((state) => {
      if (!state.filters.teamSize.includes(size)) {
        state.filters.teamSize.push(size);
      }
    }),
    removeTeamSizeFilter: (size) => set((state) => {
      state.filters.teamSize = state.filters.teamSize.filter((s) => s !== size);
    }),
    resetFilters: () => set((state) => {
      state.filters = {
        userRole: [],
        userStatus: [],
        teamSize: [],
      };
    }),
  }),
  {
    name: 'users-teams-store',
    partialize: (state) => ({
      activeTab: state.activeTab,
    }),
  }
);