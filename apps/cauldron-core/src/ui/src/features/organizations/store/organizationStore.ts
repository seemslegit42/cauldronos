import { create } from 'zustand';
import { Organization } from '../types';

interface OrganizationState {
  organizations: Organization[];
  currentOrganization: Organization | null;
  isLoading: boolean;
  error: string | null;
}

interface OrganizationStore extends OrganizationState {
  setOrganizations: (organizations: Organization[]) => void;
  setCurrentOrganization: (organization: Organization | null) => void;
  addOrganization: (organization: Organization) => void;
  updateOrganization: (organizationId: string, data: Partial<Organization>) => void;
  removeOrganization: (organizationId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useOrganizationStore = create<OrganizationStore>((set) => ({
  organizations: [],
  currentOrganization: null,
  isLoading: false,
  error: null,

  setOrganizations: (organizations) => set({ organizations }),

  setCurrentOrganization: (organization) => set({ currentOrganization: organization }),

  addOrganization: (organization) => set((state) => ({
    organizations: [...state.organizations, organization],
  })),

  updateOrganization: (organizationId, data) => set((state) => ({
    organizations: state.organizations.map((org) =>
      org.id === organizationId ? { ...org, ...data } : org
    ),
    currentOrganization:
      state.currentOrganization?.id === organizationId
        ? { ...state.currentOrganization, ...data }
        : state.currentOrganization,
  })),

  removeOrganization: (organizationId) => set((state) => ({
    organizations: state.organizations.filter((org) => org.id !== organizationId),
    currentOrganization:
      state.currentOrganization?.id === organizationId
        ? null
        : state.currentOrganization,
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}));
