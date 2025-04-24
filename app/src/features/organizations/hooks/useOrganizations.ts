import { useOrganization, useOrganizationList, useUser } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Organization, OrganizationMember, OrganizationStats, OrganizationActivity } from '../types';

export const useOrganizations = () => {
  const { organizationList, isLoaded, setActive } = useOrganizationList();
  const { user } = useUser();

  // Map Clerk organizations to our Organization type
  const organizations: Organization[] = organizationList?.map((org) => ({
    id: org.organization.id,
    name: org.organization.name,
    slug: org.organization.slug || '',
    logoUrl: org.organization.imageUrl,
    createdAt: org.organization.createdAt,
    updatedAt: new Date().toISOString(), // Clerk doesn't provide updatedAt
    memberCount: 0, // We'll need to fetch this separately
    workspaceCount: 0, // We'll need to fetch this separately
  })) || [];

  const switchOrganization = async (organizationId: string) => {
    const orgToSwitch = organizationList?.find(
      (org) => org.organization.id === organizationId
    );
    
    if (orgToSwitch) {
      await setActive({ organization: orgToSwitch.organization });
      return true;
    }
    
    return false;
  };

  return {
    organizations,
    isLoaded,
    switchOrganization,
  };
};

export const useCurrentOrganization = () => {
  const { organization, isLoaded } = useOrganization();
  const queryClient = useQueryClient();

  // Map Clerk organization to our Organization type
  const currentOrganization: Organization | null = organization
    ? {
        id: organization.id,
        name: organization.name,
        slug: organization.slug || '',
        logoUrl: organization.imageUrl,
        createdAt: organization.createdAt,
        updatedAt: new Date().toISOString(), // Clerk doesn't provide updatedAt
        memberCount: 0, // We'll need to fetch this separately
        workspaceCount: 0, // We'll need to fetch this separately
      }
    : null;

  // Fetch organization members
  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['organizationMembers', organization?.id],
    queryFn: async () => {
      if (!organization) return [];
      
      const memberList = await organization.getMemberships();
      
      // Map Clerk memberships to our OrganizationMember type
      return memberList.map((membership): OrganizationMember => ({
        id: membership.id,
        userId: membership.publicUserData.userId,
        organizationId: organization.id,
        role: (membership.role as any) || 'member',
        name: `${membership.publicUserData.firstName} ${membership.publicUserData.lastName}`,
        email: membership.publicUserData.identifier,
        avatarUrl: membership.publicUserData.imageUrl,
        joinedAt: membership.createdAt,
        isOwner: membership.role === 'admin',
      }));
    },
    enabled: !!organization,
  });

  // Fetch organization stats
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['organizationStats', organization?.id],
    queryFn: async (): Promise<OrganizationStats> => {
      // In a real app, this would fetch stats from your API
      return {
        totalMembers: members?.length || 0,
        activeMembers: members?.length || 0,
        totalWorkspaces: 0,
        activeWorkspaces: 0,
        storageUsed: 0,
        storageLimit: 5 * 1024 * 1024 * 1024, // 5GB
      };
    },
    enabled: !!organization && !!members,
  });

  // Fetch organization activity
  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['organizationActivity', organization?.id],
    queryFn: async (): Promise<OrganizationActivity[]> => {
      // In a real app, this would fetch activity from your API
      return [];
    },
    enabled: !!organization,
  });

  // Update organization
  const updateOrganization = useMutation({
    mutationFn: async (data: { name?: string; slug?: string; logoUrl?: string }) => {
      if (!organization) throw new Error('No organization selected');
      
      await organization.update({
        name: data.name,
        slug: data.slug,
      });
      
      // Note: Clerk doesn't support updating the logo directly through the update method
      // You would need to use their file upload API for that
      
      return organization;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizationList'] });
      queryClient.invalidateQueries({ queryKey: ['organization', organization?.id] });
    },
  });

  return {
    organization: currentOrganization,
    members,
    stats,
    activity,
    isLoaded,
    isLoading: isLoadingMembers || isLoadingStats || isLoadingActivity,
    updateOrganization,
  };
};
