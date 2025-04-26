import { z } from 'zod';
import { idSchema, nameSchema, roleSchema } from './common';

// Workspace schema
export const workspaceSchema = z.object({
  id: idSchema,
  name: nameSchema,
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().max(500).optional(),
  logoUrl: z.string().url().optional().nullable(),
  ownerId: idSchema,
  plan: z.string().optional(),
  lastActive: z.string(),
  memberCount: z.number().int().nonnegative(),
  moduleCount: z.number().int().nonnegative(),
  isPublic: z.boolean().default(false),
  subscriptionStatus: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Workspace creation schema
export const createWorkspaceSchema = z.object({
  name: nameSchema,
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().default(false),
  defaultRole: roleSchema.default('USER'),
});

// Workspace update schema
export const updateWorkspaceSchema = z.object({
  name: nameSchema.optional(),
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens').optional(),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().optional(),
  logoUrl: z.string().url().optional().nullable(),
  defaultRole: roleSchema.optional(),
});

// Workspace member schema
export const workspaceMemberSchema = z.object({
  id: idSchema,
  userId: idSchema,
  workspaceId: idSchema,
  role: roleSchema,
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional().nullable(),
  joinedAt: z.string(),
  lastActive: z.string().optional(),
  isOwner: z.boolean(),
});

// Workspace invite schema
export const workspaceInviteSchema = z.object({
  email: z.string().email(),
  role: roleSchema,
  message: z.string().max(500).optional(),
});

// Workspace invite response schema
export const workspaceInviteResponseSchema = z.object({
  id: idSchema,
  email: z.string().email(),
  role: roleSchema,
  workspaceId: idSchema,
  invitedBy: z.string(),
  invitedAt: z.string(),
  expiresAt: z.string(),
  status: z.enum(['pending', 'accepted', 'expired', 'revoked']),
});

// Workspace member update schema
export const updateWorkspaceMemberSchema = z.object({
  role: roleSchema,
});

// Workspace config schema
export const workspaceConfigSchema = z.object({
  defaultRole: roleSchema,
  allowPublicModules: z.boolean(),
  allowExternalMembers: z.boolean(),
  dataRetentionDays: z.number().int().positive(),
  securitySettings: z.object({
    twoFactorAuthRequired: z.boolean(),
    passwordPolicy: z.enum(['low', 'medium', 'high']),
    sessionTimeout: z.number().int().positive(),
    ipRestrictions: z.boolean(),
    allowedIpAddresses: z.array(z.string()).optional(),
  }),
  notificationSettings: z.object({
    userJoined: z.boolean(),
    userLeft: z.boolean(),
    moduleInstalled: z.boolean(),
    billingUpdates: z.boolean(),
    securityAlerts: z.boolean(),
    weeklyDigest: z.boolean(),
  }),
});
