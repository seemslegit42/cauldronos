import { 
  Workspace, 
  WorkspaceMember, 
  CreateWorkspaceData, 
  UpdateWorkspaceData, 
  WorkspaceInvite,
  WorkspaceStats,
  WorkspaceActivity
} from './types';

// Base API URL for workspace operations
const BASE_URL = '/api/workspaces';

/**
 * Fetch all workspaces for the current user
 * @returns Promise with array of workspaces
 */
export const fetchWorkspaces = async (): Promise<Workspace[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(BASE_URL);
    // if (!response.ok) throw new Error('Failed to fetch workspaces');
    // return await response.json();
    
    // Using mock data for now
    return mockWorkspaces;
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    throw error;
  }
};

/**
 * Fetch a single workspace by ID
 * @param id Workspace ID
 * @returns Promise with workspace data
 */
export const fetchWorkspaceById = async (id: string): Promise<Workspace> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${BASE_URL}/${id}`);
    // if (!response.ok) throw new Error('Failed to fetch workspace');
    // return await response.json();
    
    // Using mock data for now
    const workspace = mockWorkspaces.find(w => w.id === id);
    if (!workspace) {
      throw new Error(`Workspace with ID ${id} not found`);
    }
    return workspace;
  } catch (error) {
    console.error(`Error fetching workspace ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new workspace
 * @param data Workspace data
 * @returns Promise with created workspace
 */
export const createWorkspace = async (data: CreateWorkspaceData): Promise<Workspace> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(BASE_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('Failed to create workspace');
    // return await response.json();
    
    // Using mock data for now
    const newWorkspace: Workspace = {
      id: Math.random().toString(36).substring(2, 11),
      name: data.name,
      slug: data.slug,
      description: data.description,
      logoUrl: null,
      ownerId: '1', // This would be the current user's ID
      plan: 'free',
      lastActive: new Date().toISOString(),
      memberCount: 1,
      moduleCount: 0,
      isPublic: data.isPublic || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return newWorkspace;
  } catch (error) {
    console.error('Error creating workspace:', error);
    throw error;
  }
};

/**
 * Update an existing workspace
 * @param id Workspace ID
 * @param data Updated workspace data
 * @returns Promise with updated workspace
 */
export const updateWorkspace = async (id: string, data: UpdateWorkspaceData): Promise<Workspace> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${BASE_URL}/${id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('Failed to update workspace');
    // return await response.json();
    
    // Using mock data for now
    const workspace = mockWorkspaces.find(w => w.id === id);
    if (!workspace) {
      throw new Error(`Workspace with ID ${id} not found`);
    }
    
    const updatedWorkspace: Workspace = {
      ...workspace,
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return updatedWorkspace;
  } catch (error) {
    console.error(`Error updating workspace ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a workspace
 * @param id Workspace ID
 * @returns Promise with success status
 */
export const deleteWorkspace = async (id: string): Promise<{ success: boolean }> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${BASE_URL}/${id}`, {
    //   method: 'DELETE'
    // });
    // if (!response.ok) throw new Error('Failed to delete workspace');
    // return await response.json();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  } catch (error) {
    console.error(`Error deleting workspace ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch members of a workspace
 * @param workspaceId Workspace ID
 * @returns Promise with array of workspace members
 */
export const fetchWorkspaceMembers = async (workspaceId: string): Promise<WorkspaceMember[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${BASE_URL}/${workspaceId}/members`);
    // if (!response.ok) throw new Error('Failed to fetch workspace members');
    // return await response.json();
    
    // Using mock data for now
    const members = mockWorkspaceMembers.filter(m => m.workspaceId === workspaceId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return members;
  } catch (error) {
    console.error(`Error fetching members for workspace ${workspaceId}:`, error);
    throw error;
  }
};

/**
 * Invite a user to a workspace
 * @param workspaceId Workspace ID
 * @param email Email of the user to invite
 * @param role Role to assign to the user
 * @returns Promise with created invite
 */
export const inviteWorkspaceMember = async (
  workspaceId: string, 
  email: string, 
  role: string
): Promise<WorkspaceInvite> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${BASE_URL}/${workspaceId}/invites`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, role })
    // });
    // if (!response.ok) throw new Error('Failed to invite member');
    // return await response.json();
    
    // Using mock data for now
    const newInvite: WorkspaceInvite = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      role: role as any,
      workspaceId,
      invitedBy: '1', // This would be the current user's ID
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      status: 'pending'
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return newInvite;
  } catch (error) {
    console.error(`Error inviting member to workspace ${workspaceId}:`, error);
    throw error;
  }
};

/**
 * Remove a member from a workspace
 * @param workspaceId Workspace ID
 * @param memberId Member ID
 * @returns Promise with success status
 */
export const removeWorkspaceMember = async (
  workspaceId: string, 
  memberId: string
): Promise<{ success: boolean }> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${BASE_URL}/${workspaceId}/members/${memberId}`, {
    //   method: 'DELETE'
    // });
    // if (!response.ok) throw new Error('Failed to remove member');
    // return await response.json();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  } catch (error) {
    console.error(`Error removing member ${memberId} from workspace ${workspaceId}:`, error);
    throw error;
  }
};

/**
 * Update a member's role in a workspace
 * @param workspaceId Workspace ID
 * @param memberId Member ID
 * @param role New role
 * @returns Promise with updated member
 */
export const updateWorkspaceMemberRole = async (
  workspaceId: string, 
  memberId: string, 
  role: string
): Promise<WorkspaceMember> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${BASE_URL}/${workspaceId}/members/${memberId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ role })
    // });
    // if (!response.ok) throw new Error('Failed to update member role');
    // return await response.json();
    
    // Using mock data for now
    const member = mockWorkspaceMembers.find(m => m.workspaceId === workspaceId && m.id === memberId);
    if (!member) {
      throw new Error(`Member ${memberId} not found in workspace ${workspaceId}`);
    }
    
    const updatedMember: WorkspaceMember = {
      ...member,
      role: role as any
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return updatedMember;
  } catch (error) {
    console.error(`Error updating role for member ${memberId} in workspace ${workspaceId}:`, error);
    throw error;
  }
};

/**
 * Fetch workspace statistics
 * @param workspaceId Workspace ID
 * @returns Promise with workspace statistics
 */
export const fetchWorkspaceStats = async (workspaceId: string): Promise<WorkspaceStats> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${BASE_URL}/${workspaceId}/stats`);
    // if (!response.ok) throw new Error('Failed to fetch workspace stats');
    // return await response.json();
    
    // Using mock data for now
    const stats: WorkspaceStats = {
      storage: {
        used: 2.4,
        total: 5,
        unit: 'GB'
      },
      users: {
        used: mockWorkspaceMembers.filter(m => m.workspaceId === workspaceId).length,
        total: 10
      },
      modules: {
        used: 3,
        total: 'Unlimited'
      }
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return stats;
  } catch (error) {
    console.error(`Error fetching stats for workspace ${workspaceId}:`, error);
    throw error;
  }
};

/**
 * Fetch workspace activity
 * @param workspaceId Workspace ID
 * @param limit Number of activities to fetch
 * @returns Promise with array of workspace activities
 */
export const fetchWorkspaceActivity = async (
  workspaceId: string, 
  limit: number = 10
): Promise<WorkspaceActivity[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch(`${BASE_URL}/${workspaceId}/activity?limit=${limit}`);
    // if (!response.ok) throw new Error('Failed to fetch workspace activity');
    // return await response.json();
    
    // Using mock data for now
    const activities = mockWorkspaceActivity
      .filter(a => a.workspaceId === workspaceId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return activities;
  } catch (error) {
    console.error(`Error fetching activity for workspace ${workspaceId}:`, error);
    throw error;
  }
};

// Mock data for workspaces
export const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'Default Workspace',
    slug: 'default',
    description: 'This is the default workspace',
    logoUrl: null,
    ownerId: '1',
    plan: 'free',
    lastActive: new Date().toISOString(),
    memberCount: 5,
    moduleCount: 3,
    isPublic: false,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Marketing Team',
    slug: 'marketing',
    description: 'Workspace for the marketing team',
    logoUrl: null,
    ownerId: '1',
    plan: 'pro',
    lastActive: new Date().toISOString(),
    memberCount: 8,
    moduleCount: 5,
    isPublic: true,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    name: 'Development',
    slug: 'dev',
    description: 'Workspace for developers',
    logoUrl: null,
    ownerId: '1',
    plan: 'pro',
    lastActive: new Date().toISOString(),
    memberCount: 12,
    moduleCount: 7,
    isPublic: false,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock data for workspace members
export const mockWorkspaceMembers: WorkspaceMember[] = [
  {
    id: '1',
    userId: '1',
    workspaceId: '1',
    role: 'ADMIN',
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: null,
    joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date().toISOString(),
    isOwner: true
  },
  {
    id: '2',
    userId: '2',
    workspaceId: '1',
    role: 'MANAGER',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatarUrl: null,
    joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isOwner: false
  },
  {
    id: '3',
    userId: '3',
    workspaceId: '1',
    role: 'USER',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatarUrl: null,
    joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isOwner: false
  },
  {
    id: '4',
    userId: '1',
    workspaceId: '2',
    role: 'ADMIN',
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: null,
    joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date().toISOString(),
    isOwner: true
  },
  {
    id: '5',
    userId: '4',
    workspaceId: '2',
    role: 'MANAGER',
    name: 'Alice Williams',
    email: 'alice@example.com',
    avatarUrl: null,
    joinedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isOwner: false
  },
  {
    id: '6',
    userId: '1',
    workspaceId: '3',
    role: 'ADMIN',
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: null,
    joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date().toISOString(),
    isOwner: true
  }
];

// Mock data for workspace activity
export const mockWorkspaceActivity: WorkspaceActivity[] = [
  {
    id: '1',
    workspaceId: '1',
    userId: '1',
    userName: 'John Doe',
    action: 'created',
    resourceType: 'workspace',
    resourceId: '1',
    resourceName: 'Default Workspace',
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    workspaceId: '1',
    userId: '1',
    userName: 'John Doe',
    action: 'invited',
    resourceType: 'user',
    resourceId: '2',
    resourceName: 'Jane Smith',
    timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    workspaceId: '1',
    userId: '1',
    userName: 'John Doe',
    action: 'invited',
    resourceType: 'user',
    resourceId: '3',
    resourceName: 'Bob Johnson',
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    workspaceId: '1',
    userId: '1',
    userName: 'John Doe',
    action: 'installed',
    resourceType: 'module',
    resourceId: 'crm',
    resourceName: 'CRM',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    workspaceId: '1',
    userId: '2',
    userName: 'Jane Smith',
    action: 'updated',
    resourceType: 'workspace',
    resourceId: '1',
    resourceName: 'Default Workspace',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    workspaceId: '2',
    userId: '1',
    userName: 'John Doe',
    action: 'created',
    resourceType: 'workspace',
    resourceId: '2',
    resourceName: 'Marketing Team',
    timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    workspaceId: '3',
    userId: '1',
    userName: 'John Doe',
    action: 'created',
    resourceType: 'workspace',
    resourceId: '3',
    resourceName: 'Development',
    timestamp: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  }
];
