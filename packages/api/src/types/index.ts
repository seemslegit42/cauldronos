/**
 * Types for the API package
 */

/**
 * API Error
 */
export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

/**
 * API Response
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * API Request Options
 */
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  withCredentials?: boolean;
  signal?: AbortSignal;
}

/**
 * Pagination Params
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

/**
 * Pagination Response
 */
export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * User
 */
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Auth Response
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

/**
 * Login Request
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Register Request
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Refresh Token Request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * API Client
 */
export interface ApiClient {
  get: <T>(endpoint: string, options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
  post: <T>(endpoint: string, body: any, options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
  put: <T>(endpoint: string, body: any, options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
  patch: <T>(endpoint: string, body: any, options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
  delete: <T>(endpoint: string, options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
}/**
 * Types for the API package
 */

/**
 * API Error
 */
export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

/**
 * API Response
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * API Request Options
 */
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  withCredentials?: boolean;
  signal?: AbortSignal;
}

/**
 * Pagination Params
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

/**
 * Pagination Response
 */
export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * User
 */
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Auth Response
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

/**
 * Login Request
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Register Request
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Refresh Token Request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * API Client
 */
export interface ApiClient {
  get: <T>(endpoint: string, options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
  post: <T>(endpoint: string, body: any, options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
  put: <T>(endpoint: string, body: any, options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
  patch: <T>(endpoint: string, body: any, options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
  delete: <T>(endpoint: string, options?: ApiRequestOptions) => Promise<ApiResponse<T>>;
}