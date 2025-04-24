import { useOrganization } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Workspace, WorkspaceMember, WorkspaceStats, WorkspaceActivity, CreateWorkspaceData, UpdateWorkspaceData } from '../types';
import { api } from '../../../core/api';

export const useWorkspaces = (organizationId?: string) => {
  const { organization } = useOrganization();
  const queryClient = useQueryClient();
  const effectiveOrgId = organizationId || organization?.id;

  // Fetch workspaces for the current organization
  const { data: workspaces = [], isLoading } = useQuery({
    queryKey: ['workspaces', effectiveOrgId],
    queryFn: async () => {
      if (!effectiveOrgId) return [];
      
      // In a real app, this would fetch from your API
      // return api.get(`/api/organizations/${effectiveOrgId}/workspaces`);
      
      // For now, return mock data
      return [
        {
          id: '1',
          name: 'Default Workspace',
          slug: 'default',
          description: 'Default workspace for this organization',
          logoUrl: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ownerId: 'user_123',
          organizationId: effectiveOrgId,
          isPublic: true,
          lastActive: new Date().toISOString(),
          memberCount: 1,
          moduleCount: 3,
        },
        {
          id: '2',
          name: 'Development',
          slug: 'dev',
          description: 'Development workspace',
          logoUrl: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ownerId: 'user_123',
          organizationId: effectiveOrgId,
          isPublic: false,
          lastActive: new Date().toISOString(),
          memberCount: 5,
          moduleCount: 8,
        },
      ] as Workspace[];
    },
    enabled: !!effectiveOrgId,
  });

  // Create a new workspace
  const createWorkspace = useMutation({
    mutationFn: async (data: CreateWorkspaceData) => {
      if (!effectiveOrgId) throw new Error('No organization selected');
      
      // In a real app, this would create a workspace via your API
      // return api.post(`/api/organizations/${effectiveOrgId}/workspaces`, data);
      
      // For now, return mock data
      return {
        id: Math.random().toString(36).substring(2, 11),
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
        description: data.description,
        logoUrl: data.logoUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ownerId: 'user_123',
        organizationId: effectiveOrgId,
        isPublic: false,
        lastActive: new Date().toISOString(),
        memberCount: 1,
        moduleCount: 0,
      } as Workspace;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces', effectiveOrgId] });
    },
  });

  // Update a workspace
  const updateWorkspace = useMutation({
    mutationFn: async ({ workspaceId, data }: { workspaceId: string; data: UpdateWorkspaceData }) => {
      if (!effectiveOrgId) throw new Error('No organization selected');
      
      // In a real app, this would update a workspace via your API
      // return api.patch(`/api/organizations/${effectiveOrgId}/workspaces/${workspaceId}`, data);
      
      // For now, return mock data
      const workspace = workspaces.find(w => w.id === workspaceId);
      if (!workspace) throw new Error('Workspace not found');
      
      return {
        ...workspace,
        ...data,
        updatedAt: new Date().toISOString(),
      } as Workspace;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces', effectiveOrgId] });
      queryClient.invalidateQueries({ queryKey: ['workspace', variables.workspaceId] });
    },
  });

  // Delete a workspace
  const deleteWorkspace = useMutation({
    mutationFn: async (workspaceId: string) => {
      if (!effectiveOrgId) throw new Error('No organization selected');
      
      // In a real app, this would delete a workspace via your API
      // return api.delete(`/api/organizations/${effectiveOrgId}/workspaces/${workspaceId}`);
      
      // For now, just return success
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces', effectiveOrgId] });
    },
  });

  return {
    workspaces,
    isLoading,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
  };
};

export const useWorkspace = (workspaceId?: string) => {
  const { organization } = useOrganization();
  const queryClient = useQueryClient();

  // Fetch a specific workspace
  const { data: workspace, isLoading: isLoadingWorkspace } = useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: async () => {
      if (!workspaceId || !organization?.id) return null;
      
      // In a real app, this would fetch from your API
      // return api.get(`/api/organizations/${organization.id}/workspaces/${workspaceId}`);
      
      // For now, return mock data
      return {
        id: workspaceId,
        name: workspaceId === '1' ? 'Default Workspace' : 'Development',
        slug: workspaceId === '1' ? 'default' : 'dev',
        description: workspaceId === '1' ? 'Default workspace for this organization' : 'Development workspace',
        logoUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ownerId: 'user_123',
        organizationId: organization.id,
        isPublic: workspaceId === '1',
        lastActive: new Date().toISOString(),
        memberCount: workspaceId === '1' ? 1 : 5,
        moduleCount: workspaceId === '1' ? 3 : 8,
      } as Workspace;
    },
    enabled: !!workspaceId && !!organization?.id,
  });

  // Fetch workspace members
  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['workspaceMembers', workspaceId],
    queryFn: async () => {
      if (!workspaceId || !organization?.id) return [];
      
      // In a real app, this would fetch from your API
      // return api.get(`/api/organizations/${organization.id}/workspaces/${workspaceId}/members`);
      
      // For now, return mock data based on organization members
      const orgMembers = await organization.getMemberships();
      
      return orgMembers.map((member): WorkspaceMember => ({
        id: `wm_${member.id}`,
        userId: member.publicUserData.userId,
        workspaceId,
        role: (member.role as any) || 'member',
        name: `${member.publicUserData.firstName} ${member.publicUserData.lastName}`,
        email: member.publicUserData.identifier,
        avatarUrl: member.publicUserData.imageUrl,
        joinedAt: member.createdAt,
        isOwner: member.role === 'admin',
      }));
    },
    enabled: !!workspaceId && !!organization?.id,
  });

  // Fetch workspace stats
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['workspaceStats', workspaceId],
    queryFn: async (): Promise<WorkspaceStats> => {
      // In a real app, this would fetch from your API
      // return api.get(`/api/organizations/${organization.id}/workspaces/${workspaceId}/stats`);
      
      // For now, return mock data
      return {
        totalMembers: members?.length || 0,
        activeMembers: members?.length || 0,
        totalModules: workspace?.moduleCount || 0,
        activeModules: workspace?.moduleCount || 0,
        storageUsed: 1024 * 1024 * 50, // 50MB
        storageLimit: 1024 * 1024 * 1024, // 1GB
      };
    },
    enabled: !!workspaceId && !!workspace && !!members,
  });

  // Fetch workspace activity
  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['workspaceActivity', workspaceId],
    queryFn: async (): Promise<WorkspaceActivity[]> => {
      // In a real app, this would fetch from your API
      // return api.get(`/api/organizations/${organization.id}/workspaces/${workspaceId}/activity`);
      
      // For now, return empty array
      return [];
    },
    enabled: !!workspaceId && !!organization?.id,
  });

  return {
    workspace,
    members,
    stats,
    activity,
    isLoading: isLoadingWorkspace || isLoadingMembers || isLoadingStats || isLoadingActivity,
  };
};
