/**
 * CauldronOS Auth Package
 * Authentication and authorization utilities for CauldronOS applications
 */

// Export components
export { default as RoleBasedAccess } from './components/RoleBasedAccess';
export { default as PermissionBasedAccess } from './components/PermissionBasedAccess';
export { default as WorkspaceAccess } from './components/WorkspaceAccess';

// Export hooks
export { default as useAuth } from './hooks/useAuth';
export { default as usePermissions } from './hooks/usePermissions';
export { default as useRoles } from './hooks/useRoles';
export { default as useWorkspaceAccess } from './hooks/useWorkspaceAccess';

// Export utilities
export { default as tenantIsolation } from './utils/tenantIsolation';
export { default as permissionUtils } from './utils/permissionUtils';

// Export types
export * from './types';

// Export package info
export const CauldronAuth = {
  version: '0.1.0',
  name: 'CauldronOS Auth'
};