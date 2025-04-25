import { create } from 'zustand';
import { Workspace } from '../types';

interface WorkspaceState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  isLoading: boolean;
  error: string | null;
}

interface WorkspaceStore extends WorkspaceState {
  setWorkspaces: (workspaces: Workspace[]) => void;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (workspaceId: string, data: Partial<Workspace>) => void;
  removeWorkspace: (workspaceId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  filterWorkspacesByOrganization: (organizationId: string) => Workspace[];
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  workspaces: [],
  currentWorkspace: null,
  isLoading: false,
  error: null,

  setWorkspaces: (workspaces) => set({ workspaces }),

  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),

  addWorkspace: (workspace) => set((state) => ({
    workspaces: [...state.workspaces, workspace],
  })),

  updateWorkspace: (workspaceId, data) => set((state) => ({
    workspaces: state.workspaces.map((ws) =>
      ws.id === workspaceId ? { ...ws, ...data } : ws
    ),
    currentWorkspace:
      state.currentWorkspace?.id === workspaceId
        ? { ...state.currentWorkspace, ...data }
        : state.currentWorkspace,
  })),

  removeWorkspace: (workspaceId) => set((state) => ({
    workspaces: state.workspaces.filter((ws) => ws.id !== workspaceId),
    currentWorkspace:
      state.currentWorkspace?.id === workspaceId
        ? null
        : state.currentWorkspace,
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  filterWorkspacesByOrganization: (organizationId) => {
    return get().workspaces.filter((ws) => ws.organizationId === organizationId);
  },
}));
