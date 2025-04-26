import { useUser, useClerk, useOrganization } from '@clerk/clerk-react';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { organization, isLoaded: isOrgLoaded } = useOrganization();

  const logout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const isAdmin = user?.publicMetadata?.role === 'admin';

  return {
    user,
    isSignedIn,
    isLoaded,
    isAdmin,
    organization,
    isOrgLoaded,
    logout,
  };
};

export const useUserProfile = () => {
  const { user, isLoaded } = useUser();

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: async () => {
      // In a real app, this would fetch additional user profile data from your API
      // For now, we'll just return the Clerk user data with some additional fields
      return {
        id: user?.id,
        email: user?.primaryEmailAddress?.emailAddress,
        firstName: user?.firstName,
        lastName: user?.lastName,
        fullName: user?.fullName,
        imageUrl: user?.imageUrl,
        createdAt: user?.createdAt,
        lastSignInAt: user?.lastSignInAt,
        // Additional fields that would come from your database
        bio: '',
        location: '',
        website: '',
        company: '',
        jobTitle: '',
        timezone: '',
        preferences: {
          theme: 'system',
          language: 'en',
          emailNotifications: true,
        },
      };
    },
    enabled: isLoaded && !!user?.id,
  });

  return {
    userProfile,
    isLoading: isLoading || !isLoaded,
  };
};

export const useUserPermissions = () => {
  const { user, isLoaded } = useUser();
  const { organization } = useOrganization();

  const { data: permissions, isLoading } = useQuery({
    queryKey: ['userPermissions', user?.id, organization?.id],
    queryFn: async () => {
      // In a real app, this would fetch user permissions from your API
      // For now, we'll return some mock permissions based on the user's role
      const role = user?.publicMetadata?.role || 'user';
      
      if (role === 'admin') {
        return {
          canManageUsers: true,
          canManageOrganizations: true,
          canManageWorkspaces: true,
          canManageBilling: true,
          canViewAnalytics: true,
          canCreateWorkspaces: true,
        };
      } else if (role === 'manager') {
        return {
          canManageUsers: true,
          canManageOrganizations: false,
          canManageWorkspaces: true,
          canManageBilling: false,
          canViewAnalytics: true,
          canCreateWorkspaces: true,
        };
      } else {
        return {
          canManageUsers: false,
          canManageOrganizations: false,
          canManageWorkspaces: false,
          canManageBilling: false,
          canViewAnalytics: true,
          canCreateWorkspaces: false,
        };
      }
    },
    enabled: isLoaded && !!user?.id,
  });

  return {
    permissions,
    isLoading: isLoading || !isLoaded,
  };
};
