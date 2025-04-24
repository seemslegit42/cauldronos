import { z } from 'zod';

// Common validation schemas

// ID schema
export const idSchema = z.string().uuid();

// Email schema
export const emailSchema = z.string().email();

// Password schema
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Username schema
export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens');

// Name schema
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be at most 50 characters');

// URL schema
export const urlSchema = z.string().url();

// Date schema
export const dateSchema = z.coerce.date();

// Phone schema
export const phoneSchema = z
  .string()
  .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format');

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().default(10),
});

// Sorting schema
export const sortingSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// Search schema
export const searchSchema = z.object({
  search: z.string().optional(),
});

// Role schema
export const roleSchema = z.enum(['ADMIN', 'MANAGER', 'USER', 'GUEST']);

// Status schema
export const statusSchema = z.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'DELETED']);

// Color schema
export const colorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format. Use hex format (e.g., #FF0000)');

// Tag schema
export const tagSchema = z
  .string()
  .min(1, 'Tag cannot be empty')
  .max(20, 'Tag must be at most 20 characters');

// Tags schema
export const tagsSchema = z.array(tagSchema).max(10, 'Maximum 10 tags allowed');
