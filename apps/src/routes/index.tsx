import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';

// Import pages
import Dashboard from '../pages/Dashboard';
import Modules from '../pages/Modules';
import Users from '../pages/Users';
import WorkspaceSettings from '../pages/WorkspaceSettings';
import AccountSettings from '../pages/AccountSettings';
import DevPlayground from '../pages/DevPlayground';
import Login from '../auth/LoginPage';
import Signup from '../auth/SignupPage';

// Import module components
import { useModules } from '../modules/ModuleRegistry';
import ModuleLoader from '../modules/ModuleLoader';

// Protected route component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) => {
  const { data: user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole && user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { modules, getModuleRoutes } = useModules();
  
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/modules" 
          element={
            <ProtectedRoute>
              <Modules />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/users" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Users />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/workspace/settings" 
          element={
            <ProtectedRoute>
              <WorkspaceSettings />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/account/settings" 
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dev-playground" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <DevPlayground />
            </ProtectedRoute>
          } 
        />
        
        {/* Dynamic module routes */}
        {modules.map(module => (
          <Route 
            key={module.id}
            path={`${module.path}/*`} 
            element={
              <ProtectedRoute>
                <ModuleLoader moduleSlug={module.slug} />
              </ProtectedRoute>
            } 
          />
        ))}
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;