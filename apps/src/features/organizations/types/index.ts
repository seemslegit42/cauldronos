export type OrganizationRole = 'admin' | 'member' | 'guest';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  plan?: string;
  subscriptionStatus?: string;
  isPublic?: boolean;
  memberCount: number;
  workspaceCount: number;
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: OrganizationRole;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedAt: string;
  lastActive?: string;
  isOwner: boolean;
}

export interface OrganizationInvite {
  id: string;
  email: string;
  organizationId: string;
  role: OrganizationRole;
  token: string;
  expiresAt: string;
  createdAt: string;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}

export interface OrganizationConfig {
  defaultRole: OrganizationRole;
  allowPublicWorkspaces: boolean;
  allowExternalMembers: boolean;
  dataRetentionDays: number;
  securitySettings: OrganizationSecuritySettings;
  notificationSettings: OrganizationNotificationSettings;
}

export interface OrganizationSecuritySettings {
  twoFactorAuthRequired: boolean;
  passwordPolicy: 'low' | 'medium' | 'high';
  sessionTimeout: number; // in minutes
  ipRestrictions: boolean;
  allowedIpAddresses?: string[];
}

export interface OrganizationNotificationSettings {
  userJoined: boolean;
  userLeft: boolean;
  workspaceCreated: boolean;
  billingUpdates: boolean;
  securityAlerts: boolean;
  weeklyDigest: boolean;
}

export interface OrganizationStats {
  totalMembers: number;
  activeMembers: number;
  totalWorkspaces: number;
  activeWorkspaces: number;
  storageUsed: number;
  storageLimit: number;
}

export interface OrganizationActivity {
  id: string;
  organizationId: string;
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

export interface CreateOrganizationData {
  name: string;
  slug?: string;
  description?: string;
  logoUrl?: string;
}

export interface UpdateOrganizationData {
  name?: string;
  slug?: string;
  description?: string;
  logoUrl?: string;
  config?: Partial<OrganizationConfig>;
}
