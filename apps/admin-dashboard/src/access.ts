/**
 * @see https://umijs.org/docs/max/access
 */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  
  return {
    // Admin access
    canAdmin: currentUser && currentUser.role === 'admin',
    
    // User management access
    canManageUsers: currentUser && ['admin', 'manager'].includes(currentUser.role),
    
    // Settings access
    canManageSettings: currentUser && ['admin', 'manager'].includes(currentUser.role),
    
    // AI features access
    canAccessAI: currentUser && currentUser.permissions?.includes('ai_access'),
    
    // Module management access
    canManageModules: currentUser && currentUser.role === 'admin',
  };
}
