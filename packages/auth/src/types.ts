/**
 * Auth package types
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  roles: string[];
  permissions: string[];
  workspaces: string[];
  tenantId?: string;
  metadata?: Record<string, any>;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData?: Partial<User>) => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<User>;
}

export interface AuthStore extends AuthState, AuthActions {}

export interface RoleBasedAccessProps {
  roles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface PermissionBasedAccessProps {
  permissions: string[];
  requireAll?: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface WorkspaceAccessProps {
  workspaceId: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: WorkspaceMember[];
  tenantId?: string;
  metadata?: Record<string, any>;
}

export interface WorkspaceMember {
  userId: string;
  role: string;
  permissions?: string[];
}

export interface TenantConfig {
  id: string;
  name: string;
  domain?: string;
  settings?: Record<string, any>;
}

export interface AuthConfig {
  providers: {
    email: boolean;
    google: boolean;
    github: boolean;
    microsoft: boolean;
  };
  mfa: {
    enabled: boolean;
    methods: ('sms' | 'email' | 'authenticator')[];
  };
  session: {
    expiryTime: number;
    refreshTokens: boolean;
  };
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
}