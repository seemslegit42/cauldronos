import { ReactNode } from 'react';
import { UserRole } from '../auth/permissions/types';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string | null;
  ownerId: string;
  plan?: string;
  lastActive: string;
  memberCount: number;
  moduleCount: number;
  isPublic?: boolean;
  subscriptionStatus?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: UserRole;
  name: string;
  email: string;
  avatarUrl?: string | null;
  joinedAt: string;
  lastActive?: string;
  isOwner: boolean;
}

export interface WorkspaceConfig {
  defaultRole: UserRole;
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

export interface CreateWorkspaceData {
  name: string;
  slug: string;
  description?: string;
  isPublic?: boolean;
  defaultRole?: UserRole;
}

export interface UpdateWorkspaceData {
  name?: string;
  slug?: string;
  description?: string;
  isPublic?: boolean;
  logoUrl?: string | null;
  defaultRole?: UserRole;
}

export interface WorkspaceInvite {
  id: string;
  email: string;
  role: UserRole;
  workspaceId: string;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
}

export interface WorkspaceStats {
  storage: {
    used: number;
    total: number;
    unit: string;
  };
  users: {
    used: number;
    total: number;
  };
  modules: {
    used: number;
    total: number | string;
  };
}

export interface WorkspaceActivity {
  id: string;
  workspaceId: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  resourceName?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
