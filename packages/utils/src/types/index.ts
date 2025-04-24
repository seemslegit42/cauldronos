/**
 * Types for the utils package
 */

/**
 * Logger Options
 */
export interface LoggerOptions {
  level?: 'debug' | 'info' | 'warn' | 'error';
  prefix?: string;
  enabled?: boolean;
  timestamp?: boolean;
}

/**
 * Logger
 */
export interface Logger {
  debug: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  setLevel: (level: 'debug' | 'info' | 'warn' | 'error') => void;
  setPrefix: (prefix: string) => void;
  setEnabled: (enabled: boolean) => void;
  setTimestamp: (timestamp: boolean) => void;
}

/**
 * Format Options
 */
export interface FormatOptions {
  locale?: string;
  currency?: string;
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

/**
 * Date Format Options
 */
export interface DateFormatOptions {
  locale?: string;
  format?: string;
  timezone?: string;
}

/**
 * Validation Result
 */
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

/**
 * Validation Options
 */
export interface ValidationOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  email?: boolean;
  url?: boolean;
  custom?: (value: any) => ValidationResult;
}

/**
 * Storage Options
 */
export interface StorageOptions {
  prefix?: string;
  serializer?: (value: any) => string;
  deserializer?: (value: string) => any;
}

/**
 * Storage
 */
export interface Storage {
  get: <T>(key: string, defaultValue?: T) => T | null;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
  clear: () => void;
  has: (key: string) => boolean;
  getAll: () => Record<string, any>;
}

/**
 * API Error
 */
export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

/**
 * Class Name Arguments
 */
export type ClassNameArgument = string | undefined | null | false | Record<string, boolean>;

/**
 * Style Utils Options
 */
export interface StyleUtilsOptions {
  prefix?: string;
  separator?: string;
}

/**
 * Style Utils
 */
export interface StyleUtils {
  createClassName: (...args: ClassNameArgument[]) => string;
  createStyles: <T extends Record<string, string>>(styles: T) => T;
  createVariants: <T extends Record<string, Record<string, string>>>(variants: T) => T;
}/**
 * Types for the utils package
 */

/**
 * Logger Options
 */
export interface LoggerOptions {
  level?: 'debug' | 'info' | 'warn' | 'error';
  prefix?: string;
  enabled?: boolean;
  timestamp?: boolean;
}

/**
 * Logger
 */
export interface Logger {
  debug: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  setLevel: (level: 'debug' | 'info' | 'warn' | 'error') => void;
  setPrefix: (prefix: string) => void;
  setEnabled: (enabled: boolean) => void;
  setTimestamp: (timestamp: boolean) => void;
}

/**
 * Format Options
 */
export interface FormatOptions {
  locale?: string;
  currency?: string;
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

/**
 * Date Format Options
 */
export interface DateFormatOptions {
  locale?: string;
  format?: string;
  timezone?: string;
}

/**
 * Validation Result
 */
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

/**
 * Validation Options
 */
export interface ValidationOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  email?: boolean;
  url?: boolean;
  custom?: (value: any) => ValidationResult;
}

/**
 * Storage Options
 */
export interface StorageOptions {
  prefix?: string;
  serializer?: (value: any) => string;
  deserializer?: (value: string) => any;
}

/**
 * Storage
 */
export interface Storage {
  get: <T>(key: string, defaultValue?: T) => T | null;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
  clear: () => void;
  has: (key: string) => boolean;
  getAll: () => Record<string, any>;
}

/**
 * API Error
 */
export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

/**
 * Class Name Arguments
 */
export type ClassNameArgument = string | undefined | null | false | Record<string, boolean>;

/**
 * Style Utils Options
 */
export interface StyleUtilsOptions {
  prefix?: string;
  separator?: string;
}

/**
 * Style Utils
 */
export interface StyleUtils {
  createClassName: (...args: ClassNameArgument[]) => string;
  createStyles: <T extends Record<string, string>>(styles: T) => T;
  createVariants: <T extends Record<string, Record<string, string>>>(variants: T) => T;
}