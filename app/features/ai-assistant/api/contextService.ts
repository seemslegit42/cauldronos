import { ModuleContext } from '../types';

// Map of routes to module metadata
export const moduleMap: Record<string, ModuleContext> = {
  '/dashboard': {
    name: 'Dashboard',
    description: 'Main dashboard showing key metrics and overview of the application',
    features: 'Analytics, Quick actions, Recent activity'
  },
  '/settings': {
    name: 'Settings',
    description: 'User and application settings management',
    features: 'Profile settings, Notification preferences, Security settings'
  },
  '/profile': {
    name: 'User Profile',
    description: 'User profile management and personal information',
    features: 'Edit profile, Change avatar, View activity'
  },
  '/organizations': {
    name: 'Organizations',
    description: 'Manage organizations and teams',
    features: 'Create/edit organizations, Manage members, Set permissions'
  },
  '/projects': {
    name: 'Projects',
    description: 'Project management and tracking',
    features: 'Create/edit projects, Assign team members, Track progress'
  }
};

// This function would normally use Langchain to get context
// For now, we'll use a simpler approach
export const getModuleContext = async (
  moduleName: string,
  moduleDescription: string,
  moduleFeatures: string
): Promise<string> => {
  try {
    // In a real implementation, this would use Langchain
    // For now, we'll just return a formatted string
    return `
Module: ${moduleName}
Description: ${moduleDescription}
Features: ${moduleFeatures}

This module allows you to ${moduleDescription.toLowerCase()}. You can use it to ${moduleFeatures.toLowerCase().split(', ').join(', to ')}.
    `.trim();
  } catch (error) {
    console.error('Error fetching module context:', error);
    return '';
  }
};
