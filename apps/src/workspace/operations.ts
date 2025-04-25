import { useState, useEffect, useCallback } from 'react';
import { useAuth } from 'wasp/client/auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Workspace, CreateWorkspaceData, UpdateWorkspaceData, WorkspaceMember, WorkspaceStats, WorkspaceActivity } from './types';
import * as workspaceApi from './api';
import { message } from 'antd';

/**
 * Hook for accessing and managing workspaces
 */
export const useWorkspaces = () => {
  const { data: user } = useAuth();
  const queryClient = useQueryClient();
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(
    localStorage.getItem('currentWorkspaceId')
  );

  // Fetch all workspaces
  const { 
    data: workspaces = [], 
    isLoading: isLoadingWorkspaces,
    error: workspacesError 
  } = useQuery({
    queryKey: ['workspaces'],
    queryFn: workspaceApi.fetchWorkspaces,
    enabled: !!user
  });

  // Fetch current workspace
  const { 
    data: currentWorkspace, 
    isLoading: isLoadingCurrentWorkspace 
  } = useQuery({
    queryKey: ['workspace', currentWorkspaceId],
    queryFn: () => currentWorkspaceId ? workspaceApi.fetchWorkspaceById(currentWorkspaceId) : null,
    enabled: !!currentWorkspaceId && !!user
  });

  // Create workspace mutation
  const createWorkspaceMutation = useMutation({
    mutationFn: workspaceApi.createWorkspace,
    onSuccess: (newWorkspace) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      switchWorkspace(newWorkspace.id);
      message.success(`Workspace "${newWorkspace.name}" created successfully`);
    },
    onError: (error) => {
      console.error('Error creating workspace:', error);
      message.error('Failed to create workspace');
    }
  });

  // Update workspace mutation
  const updateWorkspaceMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkspaceData }) => 
      workspaceApi.updateWorkspace(id, data),
    onSuccess: (updatedWorkspace) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', updatedWorkspace.id] });
      message.success(`Workspace "${updatedWorkspace.name}" updated successfully`);
    },
    onError: (error) => {
      console.error('Error updating workspace:', error);
      message.error('Failed to update workspace');
    }
  });

  // Delete workspace mutation
  const deleteWorkspaceMutation = useMutation({
    mutationFn: workspaceApi.deleteWorkspace,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      
      // If the deleted workspace was the current one, switch to another
      if (currentWorkspaceId === deletedId) {
        const remainingWorkspaces = workspaces.filter(w => w.id !== deletedId);
        if (remainingWorkspaces.length > 0) {
          switchWorkspace(remainingWorkspaces[0].id);
        } else {
          localStorage.removeItem('currentWorkspaceId');
          setCurrentWorkspaceId(null);
        }
      }
      
      message.success('Workspace deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting workspace:', error);
      message.error('Failed to delete workspace');
    }
  });

  // Initialize current workspace from localStorage or first available
  useEffect(() => {
    if (!isLoadingWorkspaces && workspaces.length > 0 && !currentWorkspaceId) {
      // If no workspace is selected but we have workspaces, select the first one
      switchWorkspace(workspaces[0].id);
    } else if (!isLoadingWorkspaces && workspaces.length > 0 && currentWorkspaceId) {
      // If we have a selected workspace ID but it doesn't exist anymore, select the first one
      const workspaceExists = workspaces.some(w => w.id === currentWorkspaceId);
      if (!workspaceExists) {
        switchWorkspace(workspaces[0].id);
      }
    }
  }, [isLoadingWorkspaces, workspaces, currentWorkspaceId]);

  // Switch workspace
  const switchWorkspace = useCallback((workspaceId: string) => {
    setCurrentWorkspaceId(workspaceId);
    localStorage.setItem('currentWorkspaceId', workspaceId);
  }, []);

  // Create workspace
  const createWorkspace = async (data: CreateWorkspaceData): Promise<Workspace> => {
    return createWorkspaceMutation.mutateAsync(data);
  };

  // Update workspace
  const updateWorkspace = async (id: string, data: UpdateWorkspaceData): Promise<Workspace> => {
    return updateWorkspaceMutation.mutateAsync({ id, data });
  };

  // Delete workspace
  const deleteWorkspace = async (id: string): Promise<{ success: boolean }> => {
    return deleteWorkspaceMutation.mutateAsync(id);
  };

  return {
    workspaces,
    currentWorkspace,
    isLoading: isLoadingWorkspaces || isLoadingCurrentWorkspace,
    error: workspacesError,
    switchWorkspace,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    isCreating: createWorkspaceMutation.isPending,
    isUpdating: updateWorkspaceMutation.isPending,
    isDeleting: deleteWorkspaceMutation.isPending
  };
};

/**
 * Hook for accessing and managing workspace members
 */
export const useWorkspaceMembers = (workspaceId?: string) => {
  const queryClient = useQueryClient();
  
  // Fetch workspace members
  const { 
    data: members = [], 
    isLoading,
    error 
  } = useQuery({
    queryKey: ['workspace-members', workspaceId],
    queryFn: () => workspaceId ? workspaceApi.fetchWorkspaceMembers(workspaceId) : [],
    enabled: !!workspaceId
  });

  // Invite member mutation
  const inviteMemberMutation = useMutation({
    mutationFn: ({ email, role }: { email: string; role: string }) => 
      workspaceId ? workspaceApi.inviteWorkspaceMember(workspaceId, email, role) : Promise.reject('No workspace selected'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', workspaceId] });
      message.success('Member invited successfully');
    },
    onError: (error) => {
      console.error('Error inviting member:', error);
      message.error('Failed to invite member');
    }
  });

  // Remove member mutation
  const removeMemberMutation = useMutation({
    mutationFn: (memberId: string) => 
      workspaceId ? workspaceApi.removeWorkspaceMember(workspaceId, memberId) : Promise.reject('No workspace selected'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', workspaceId] });
      message.success('Member removed successfully');
    },
    onError: (error) => {
      console.error('Error removing member:', error);
      message.error('Failed to remove member');
    }
  });

  // Update member role mutation
  const updateMemberRoleMutation = useMutation({
    mutationFn: ({ memberId, role }: { memberId: string; role: string }) => 
      workspaceId ? workspaceApi.updateWorkspaceMemberRole(workspaceId, memberId, role) : Promise.reject('No workspace selected'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', workspaceId] });
      message.success('Member role updated successfully');
    },
    onError: (error) => {
      console.error('Error updating member role:', error);
      message.error('Failed to update member role');
    }
  });

  // Invite a new member
  const inviteMember = async (email: string, role: string) => {
    return inviteMemberMutation.mutateAsync({ email, role });
  };

  // Remove a member
  const removeMember = async (memberId: string) => {
    return removeMemberMutation.mutateAsync(memberId);
  };

  // Update a member's role
  const updateMemberRole = async (memberId: string, role: string) => {
    return updateMemberRoleMutation.mutateAsync({ memberId, role });
  };

  return {
    members,
    isLoading,
    error,
    inviteMember,
    removeMember,
    updateMemberRole,
    isInviting: inviteMemberMutation.isPending,
    isRemoving: removeMemberMutation.isPending,
    isUpdatingRole: updateMemberRoleMutation.isPending
  };
};

/**
 * Hook for accessing workspace statistics
 */
export const useWorkspaceStats = (workspaceId?: string) => {
  // Fetch workspace stats
  const { 
    data: stats, 
    isLoading,
    error 
  } = useQuery({
    queryKey: ['workspace-stats', workspaceId],
    queryFn: () => workspaceId ? workspaceApi.fetchWorkspaceStats(workspaceId) : null,
    enabled: !!workspaceId
  });

  return {
    stats,
    isLoading,
    error
  };
};

/**
 * Hook for accessing workspace activity
 */
export const useWorkspaceActivity = (workspaceId?: string, limit: number = 10) => {
  // Fetch workspace activity
  const { 
    data: activities = [], 
    isLoading,
    error 
  } = useQuery({
    queryKey: ['workspace-activity', workspaceId, limit],
    queryFn: () => workspaceId ? workspaceApi.fetchWorkspaceActivity(workspaceId, limit) : [],
    enabled: !!workspaceId
  });

  return {
    activities,
    isLoading,
    error
  };
};
