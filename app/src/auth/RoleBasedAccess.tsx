import React, { ReactNode } from 'react';
import { Result, Button } from 'antd';
import { useAuth } from 'wasp/client/auth';
import { UserRole } from '../modules/types';

interface RoleBasedAccessProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({ 
  children, 
  allowedRoles, 
  fallback 
}) => {
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  // If user is admin, always allow access
  if (user?.isAdmin) {
    return <>{children}</>;
  }

  // Check if user role is in allowed roles
  const userRole = user?.role as UserRole;
  const hasAccess = allowedRoles.includes(userRole);

  if (hasAccess) {
    return <>{children}</>;
  }

  // If access is denied and a fallback is provided, show it
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default access denied message
  return (
    <Result
      status="403"
      title="Access Denied"
      subTitle="Sorry, you don't have permission to access this page."
      extra={
        <Button type="primary" href="/">
          Back to Home
        </Button>
      }
    />
  );
};

export default RoleBasedAccess;
