import { UserRole } from '../../auth/types';

export interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  role: UserRole;
  isAdmin: boolean;
  isEmailVerified: boolean;
  lastActive?: string;
  createdAt: string;
  updatedAt: string;
  subscriptionStatus?: string;
  subscriptionPlan?: string;
  twoFactorEnabled: boolean;
  theme?: 'light' | 'dark' | 'system';
  language?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  jobTitle?: string;
  phoneNumber?: string;
  timezone?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
  skills?: string[];
  interests?: string[];
}

export interface UserPreferences {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  desktopNotifications: boolean;
  notificationTypes: {
    security: boolean;
    updates: boolean;
    marketing: boolean;
    newFeatures: boolean;
  };
  sidebar: {
    collapsed: boolean;
    favorites: string[];
  };
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  resourceName: string;
  timestamp: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserStats {
  totalOrganizations: number;
  totalWorkspaces: number;
  lastLogin: string;
  loginCount: number;
  activeMinutes: number;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  role?: UserRole;
  isAdmin?: boolean;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  username?: string;
  avatarUrl?: string;
  role?: UserRole;
  isAdmin?: boolean;
}

export interface UpdateUserProfileData {
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  jobTitle?: string;
  phoneNumber?: string;
  timezone?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
  skills?: string[];
  interests?: string[];
}
