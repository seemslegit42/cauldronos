/**
 * Access Control for UMI
 *
 * This file defines the access control rules for the application.
 * @see https://umijs.org/docs/max/access
 */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};

  return {
    // Check if user can access the admin dashboard
    canAccessDashboard: currentUser && currentUser.role !== 'guest',

    // User management access
    canManageUsers: currentUser && ['admin', 'superadmin'].includes(currentUser.role),

    // Settings access
    canManageSettings: currentUser && ['admin', 'superadmin'].includes(currentUser.role),

    // AI features access
    canAccessAI: currentUser && (
      ['admin', 'superadmin', 'developer'].includes(currentUser.role) ||
      currentUser.permissions?.includes('ai_access')
    ),

    // Module management access
    canManageModules: currentUser && (
      ['admin', 'superadmin', 'developer'].includes(currentUser.role) ||
      currentUser.permissions?.includes('module_management')
    ),

    // Admin access
    isAdmin: currentUser && ['admin', 'superadmin'].includes(currentUser.role),

    // Super admin access
    isSuperAdmin: currentUser && currentUser.role === 'superadmin',

    // Developer access
    isDeveloper: currentUser && currentUser.role === 'developer',

    // Check if user is authenticated
    isAuthenticated: !!currentUser,
  };
}
