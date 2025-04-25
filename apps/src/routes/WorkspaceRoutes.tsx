import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import WorkspaceManagement from '../pages/workspace/WorkspaceManagement';
import WorkspaceMembersPage from '../pages/workspace/WorkspaceMembersPage';
import WorkspaceSettings from '../pages/WorkspaceSettings';
import WorkspacePermissionsPage from '../pages/workspace/WorkspacePermissionsPage';
import WorkspaceThemeSettings from '../pages/WorkspaceThemeSettings';
import { useAuth } from 'wasp/client/auth';

export default function WorkspaceRoutes() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="manage" element={<WorkspaceManagement />} />
      <Route path="members" element={<WorkspaceMembersPage />} />
      <Route path="permissions" element={<WorkspacePermissionsPage />} />
      <Route path="theme" element={<WorkspaceThemeSettings />} />
      <Route path="settings" element={<WorkspaceSettings />} />
      <Route index element={<Navigate to="settings" replace />} />
    </Routes>
  );
}
