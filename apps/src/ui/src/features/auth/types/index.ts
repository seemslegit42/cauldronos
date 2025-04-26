export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
  GUEST = 'GUEST'
}

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  role: UserRole;
  isAdmin: boolean;
  isEmailVerified: boolean;
  currentOrganizationId?: string;
  currentWorkspaceId?: string;
  subscriptionStatus?: string;
  subscriptionPlan?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  password: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface TwoFactorAuthSetup {
  qrCodeUrl: string;
  secret: string;
}

export interface TwoFactorAuthVerify {
  code: string;
  secret: string;
}

export interface TwoFactorAuthLogin {
  email: string;
  code: string;
}

export interface Permission {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
}

export interface PermissionGroup {
  id: string;
  name: string;
  slug: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}
