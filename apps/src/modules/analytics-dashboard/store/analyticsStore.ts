import { createStore } from '../../../store/createStore';

interface AnalyticsState {
  activeTab: string;
  dateRange: [Date, Date];
  filters: {
    source: string[];
    userType: string[];
  };
}

interface AnalyticsActions {
  setActiveTab: (tab: string) => void;
  setDateRange: (range: [Date, Date]) => void;
  addSourceFilter: (source: string) => void;
  removeSourceFilter: (source: string) => void;
  addUserTypeFilter: (userType: string) => void;
  removeUserTypeFilter: (userType: string) => void;
  resetFilters: () => void;
}

// Get the date 30 days ago
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

// Initial state
const initialState: AnalyticsState = {
  activeTab: 'overview',
  dateRange: [thirtyDaysAgo, new Date()],
  filters: {
    source: [],
    userType: [],
  },
};

// Create the store with Zustand
export const useAnalyticsStore = createStore<AnalyticsState, AnalyticsActions>(
  initialState,
  (set) => ({
    setActiveTab: (tab) => set((state) => {
      state.activeTab = tab;
    }),
    setDateRange: (range) => set((state) => {
      state.dateRange = range;
    }),
    addSourceFilter: (source) => set((state) => {
      if (!state.filters.source.includes(source)) {
        state.filters.source.push(source);
      }
    }),
    removeSourceFilter: (source) => set((state) => {
      state.filters.source = state.filters.source.filter((s) => s !== source);
    }),
    addUserTypeFilter: (userType) => set((state) => {
      if (!state.filters.userType.includes(userType)) {
        state.filters.userType.push(userType);
      }
    }),
    removeUserTypeFilter: (userType) => set((state) => {
      state.filters.userType = state.filters.userType.filter((t) => t !== userType);
    }),
    resetFilters: () => set((state) => {
      state.filters = {
        source: [],
        userType: [],
      };
    }),
  }),
  {
    name: 'analytics-store',
    partialize: (state) => ({
      activeTab: state.activeTab,
    }),
  }
);