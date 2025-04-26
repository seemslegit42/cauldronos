import { Request, Response } from 'express';
import { prisma } from '../index';
import { z } from 'zod';

// Module schema for validation
const moduleSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  version: z.string(),
  isCore: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  category: z.enum([
    'productivity',
    'communication',
    'analytics',
    'crm',
    'finance',
    'hr',
    'marketing',
    'sales',
    'support',
    'other'
  ]),
  path: z.string(),
  menuLabel: z.string().optional(),
  menuOrder: z.number().default(0),
  requiredRoles: z.array(z.enum(['ADMIN', 'MANAGER', 'USER'])).default(['USER'])
});

// Get all modules
const getAllModules = async (req: Request, res: Response) => {
  try {
    const modules = await prisma.module.findMany({
      where: {
        isPublic: true
      }
    });

    res.json(modules);
  } catch (error) {
    console.error('Error getting modules:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get module by ID
const getModuleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const module = await prisma.module.findUnique({
      where: { id }
    });

    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    res.json(module);
  } catch (error) {
    console.error('Error getting module:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get module by slug
const getModuleBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const module = await prisma.module.findUnique({
      where: { slug }
    });

    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    res.json(module);
  } catch (error) {
    console.error('Error getting module by slug:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new module
const createModule = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = moduleSchema.parse(req.body);

    // Check if module with slug already exists
    const existingModule = await prisma.module.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existingModule) {
      return res.status(400).json({ message: 'Module with this slug already exists' });
    }

    // Create module
    const module = await prisma.module.create({
      data: validatedData
    });

    res.status(201).json(module);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    console.error('Error creating module:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a module
const updateModule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate request body
    const validatedData = moduleSchema.partial().parse(req.body);

    // Check if module exists
    const existingModule = await prisma.module.findUnique({
      where: { id }
    });

    if (!existingModule) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Update module
    const module = await prisma.module.update({
      where: { id },
      data: validatedData
    });

    res.json(module);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    console.error('Error updating module:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a module
const deleteModule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if module exists
    const existingModule = await prisma.module.findUnique({
      where: { id }
    });

    if (!existingModule) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Check if module is a core module
    if (existingModule.isCore) {
      return res.status(400).json({ message: 'Cannot delete a core module' });
    }

    // Delete module
    await prisma.module.delete({
      where: { id }
    });

    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    console.error('Error deleting module:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get modules for a workspace
const getWorkspaceModules = async (req: Request, res: Response) => {
  try {
    const { workspaceId } = req.params;

    // Check if workspace exists
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId }
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Check if user has access to workspace
    const userWorkspace = await prisma.userWorkspace.findFirst({
      where: {
        userId: req.user?.id,
        workspaceId
      }
    });

    if (!userWorkspace && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get workspace modules
    const workspaceModules = await prisma.workspaceModule.findMany({
      where: { workspaceId },
      include: {
        module: true
      }
    });

    res.json(workspaceModules);
  } catch (error) {
    console.error('Error getting workspace modules:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Install a module in a workspace
const installModule = async (req: Request, res: Response) => {
  try {
    const { workspaceId, moduleId } = req.params;

    // Check if workspace exists
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId }
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Check if module exists
    const module = await prisma.module.findUnique({
      where: { id: moduleId }
    });

    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Check if user has access to workspace
    const userWorkspace = await prisma.userWorkspace.findFirst({
      where: {
        userId: req.user?.id,
        workspaceId,
        role: { in: ['ADMIN', 'MANAGER'] }
      }
    });

    if (!userWorkspace && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if module is already installed
    const existingWorkspaceModule = await prisma.workspaceModule.findFirst({
      where: {
        workspaceId,
        moduleId
      }
    });

    if (existingWorkspaceModule) {
      return res.status(400).json({ message: 'Module already installed in this workspace' });
    }

    // Install module
    const workspaceModule = await prisma.workspaceModule.create({
      data: {
        workspaceId,
        moduleId,
        isEnabled: true,
        settings: module.defaultConfig || {},
        allowedRoles: module.requiredRoles
      }
    });

    res.status(201).json(workspaceModule);
  } catch (error) {
    console.error('Error installing module:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Uninstall a module from a workspace
const uninstallModule = async (req: Request, res: Response) => {
  try {
    const { workspaceId, moduleId } = req.params;

    // Check if workspace exists
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId }
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Check if user has access to workspace
    const userWorkspace = await prisma.userWorkspace.findFirst({
      where: {
        userId: req.user?.id,
        workspaceId,
        role: { in: ['ADMIN', 'MANAGER'] }
      }
    });

    if (!userWorkspace && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if module is installed
    const workspaceModule = await prisma.workspaceModule.findFirst({
      where: {
        workspaceId,
        moduleId
      },
      include: {
        module: true
      }
    });

    if (!workspaceModule) {
      return res.status(404).json({ message: 'Module not installed in this workspace' });
    }

    // Check if module is a core module
    if (workspaceModule.module.isCore) {
      return res.status(400).json({ message: 'Cannot uninstall a core module' });
    }

    // Uninstall module
    await prisma.workspaceModule.delete({
      where: {
        id: workspaceModule.id
      }
    });

    res.json({ message: 'Module uninstalled successfully' });
  } catch (error) {
    console.error('Error uninstalling module:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Enable a module in a workspace
const enableModule = async (req: Request, res: Response) => {
  try {
    const { workspaceId, moduleId } = req.params;

    // Check if workspace exists
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId }
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Check if user has access to workspace
    const userWorkspace = await prisma.userWorkspace.findFirst({
      where: {
        userId: req.user?.id,
        workspaceId,
        role: { in: ['ADMIN', 'MANAGER'] }
      }
    });

    if (!userWorkspace && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if module is installed
    const workspaceModule = await prisma.workspaceModule.findFirst({
      where: {
        workspaceId,
        moduleId
      }
    });

    if (!workspaceModule) {
      return res.status(404).json({ message: 'Module not installed in this workspace' });
    }

    // Enable module
    const updatedWorkspaceModule = await prisma.workspaceModule.update({
      where: {
        id: workspaceModule.id
      },
      data: {
        isEnabled: true
      }
    });

    res.json(updatedWorkspaceModule);
  } catch (error) {
    console.error('Error enabling module:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Disable a module in a workspace
const disableModule = async (req: Request, res: Response) => {
  try {
    const { workspaceId, moduleId } = req.params;

    // Check if workspace exists
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId }
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Check if user has access to workspace
    const userWorkspace = await prisma.userWorkspace.findFirst({
      where: {
        userId: req.user?.id,
        workspaceId,
        role: { in: ['ADMIN', 'MANAGER'] }
      }
    });

    if (!userWorkspace && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if module is installed
    const workspaceModule = await prisma.workspaceModule.findFirst({
      where: {
        workspaceId,
        moduleId
      },
      include: {
        module: true
      }
    });

    if (!workspaceModule) {
      return res.status(404).json({ message: 'Module not installed in this workspace' });
    }

    // Check if module is a core module
    if (workspaceModule.module.isCore) {
      return res.status(400).json({ message: 'Cannot disable a core module' });
    }

    // Disable module
    const updatedWorkspaceModule = await prisma.workspaceModule.update({
      where: {
        id: workspaceModule.id
      },
      data: {
        isEnabled: false
      }
    });

    res.json(updatedWorkspaceModule);
  } catch (error) {
    console.error('Error disabling module:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const modulesController = {
  getAllModules,
  getModuleById,
  getModuleBySlug,
  createModule,
  updateModule,
  deleteModule,
  getWorkspaceModules,
  installModule,
  uninstallModule,
  enableModule,
  disableModule
};