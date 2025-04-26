/**
 * Utility functions for multi-tenant isolation
 */

import { User, TenantConfig } from '../types';

/**
 * Get the tenant ID for the current user
 */
const getCurrentTenantId = (user: User | null): string | null => {
  if (!user || !user.tenantId) {
    return null;
  }
  return user.tenantId;
};

/**
 * Check if a resource belongs to the user's tenant
 */
const isResourceInTenant = (
  user: User | null,
  resourceTenantId: string | null | undefined
): boolean => {
  if (!user || !user.tenantId) {
    return true; // Single-tenant mode or super admin
  }

  if (!resourceTenantId) {
    return false; // Resource has no tenant, but user is in a tenant
  }

  return user.tenantId === resourceTenantId;
};

/**
 * Filter a list of resources to only include those in the user's tenant
 */
const filterResourcesByTenant = <T extends { tenantId?: string | null }>(
  user: User | null,
  resources: T[]
): T[] => {
  if (!user || !user.tenantId) {
    return resources; // Single-tenant mode or super admin
  }

  return resources.filter(resource => resource.tenantId === user.tenantId);
};

/**
 * Add tenant ID to a new resource
 */
const addTenantToResource = <T extends { tenantId?: string | null }>(
  user: User | null,
  resource: T
): T => {
  if (!user || !user.tenantId) {
    return resource; // Single-tenant mode or super admin
  }

  return {
    ...resource,
    tenantId: user.tenantId,
  };
};

/**
 * Get tenant configuration
 */
const getTenantConfig = async (tenantId: string): Promise<TenantConfig | null> => {
  // This would be replaced with an actual API call
  // Simulating an API call for now
  return {
    id: tenantId,
    name: 'Test Tenant',
    domain: 'test-tenant.example.com',
    settings: {},
  };
};

export default {
  getCurrentTenantId,
  isResourceInTenant,
  filterResourcesByTenant,
  addTenantToResource,
  getTenantConfig,
};