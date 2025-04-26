# @cauldronos/auth

Authentication and authorization package for CauldronOS applications.

## Features

- Authentication components and hooks
- Role-based access control
- Permission-based access control
- Workspace access control
- Tenant isolation utilities

## Usage

```tsx
import { 
  RoleBasedAccess, 
  PermissionBasedAccess, 
  WorkspaceAccess,
  useAuth 
} from '@cauldronos/auth';

// Role-based access control
<RoleBasedAccess roles={['admin', 'editor']}>
  <AdminPanel />
</RoleBasedAccess>

// Permission-based access control
<PermissionBasedAccess permissions={['users:create', 'users:edit']}>
  <UserManagement />
</PermissionBasedAccess>

// Workspace access control
<WorkspaceAccess workspaceId="workspace-123">
  <WorkspaceContent />
</WorkspaceAccess>

// Auth hook
const { user, login, logout, isAuthenticated } = useAuth();
```