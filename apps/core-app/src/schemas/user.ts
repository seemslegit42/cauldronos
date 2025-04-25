import { z } from 'zod';
import { emailSchema, passwordSchema, nameSchema, roleSchema, idSchema } from './common';

// User schema
export const userSchema = z.object({
  id: idSchema,
  email: emailSchema,
  username: z.string().min(3).max(50),
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  role: roleSchema,
  isAdmin: z.boolean().default(false),
  isEmailVerified: z.boolean().default(false),
  avatarUrl: z.string().url().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// User creation schema
export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: z.string().min(3).max(50),
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  role: roleSchema.default('USER'),
});

// User update schema
export const updateUserSchema = z.object({
  email: emailSchema.optional(),
  username: z.string().min(3).max(50).optional(),
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  role: roleSchema.optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

// User login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
});

// User registration schema
export const registrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Confirm password is required'),
  username: z.string().min(3).max(50),
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Password reset request schema
export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});

// Password reset schema
export const passwordResetSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Email verification schema
export const emailVerificationSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
