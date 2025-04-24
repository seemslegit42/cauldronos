import { OrganizationRole } from '../../organizations/types';

export type WorkspaceRole = OrganizationRole | 'editor' | 'viewer';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  organizationId: string;
  isPublic?: boolean;
  lastActive: string;
  memberCount: number;
  moduleCount: number;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedAt: string;
  lastActive?: string;
  isOwner: boolean;
}

export interface WorkspaceInvite {
  id: string;
  email: string;
  workspaceId: string;
  role: WorkspaceRole;
  token: string;
  expiresAt: string;
  createdAt: string;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}

export interface WorkspaceConfig {
  defaultRole: WorkspaceRole;
  allowPublicModules: boolean;
  allowExternalMembers: boolean;
  dataRetentionDays: number;
  securitySettings: WorkspaceSecuritySettings;
  notificationSettings: WorkspaceNotificationSettings;
}

export interface WorkspaceSecuritySettings {
  twoFactorAuthRequired: boolean;
  passwordPolicy: 'low' | 'medium' | 'high';
  sessionTimeout: number; // in minutes
  ipRestrictions: boolean;
  allowedIpAddresses?: string[];
}

export interface WorkspaceNotificationSettings {
  userJoined: boolean;
  userLeft: boolean;
  moduleInstalled: boolean;
  billingUpdates: boolean;
  securityAlerts: boolean;
  weeklyDigest: boolean;
}

export interface WorkspaceStats {
  totalMembers: number;
  activeMembers: number;
  totalModules: number;
  activeModules: number;
  storageUsed: number;
  storageLimit: number;
}

export interface WorkspaceActivity {
  id: string;
  workspaceId: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  resourceName: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface CreateWorkspaceData {
  name: string;
  slug?: string;
  description?: string;
  logoUrl?: string;
  organizationId: string;
}

export interface UpdateWorkspaceData {
  name?: string;
  slug?: string;
  description?: string;
  logoUrl?: string;
  config?: Partial<WorkspaceConfig>;
}
