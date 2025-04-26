import { Request, Response, NextFunction } from 'express';
import { hasPermission, hasAnyPermission, hasAllPermissions } from './utils';

/**
 * Middleware to check if a user has a specific permission
 * @param permissionSlug The permission slug to check
 * @param options Options for the middleware
 * @returns Express middleware function
 */
export function requirePermission(
  permissionSlug: string,
  options: { workspaceIdParam?: string } = {}
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get workspace ID from request parameters if specified
    const workspaceId = options.workspaceIdParam ? req.params[options.workspaceIdParam] : undefined;

    const hasAccess = await hasPermission(userId, permissionSlug, workspaceId);
    
    if (!hasAccess) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
}

/**
 * Middleware to check if a user has any of the specified permissions
 * @param permissionSlugs Array of permission slugs to check
 * @param options Options for the middleware
 * @returns Express middleware function
 */
export function requireAnyPermission(
  permissionSlugs: string[],
  options: { workspaceIdParam?: string } = {}
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get workspace ID from request parameters if specified
    const workspaceId = options.workspaceIdParam ? req.params[options.workspaceIdParam] : undefined;

    const hasAccess = await hasAnyPermission(userId, permissionSlugs, workspaceId);
    
    if (!hasAccess) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
}

/**
 * Middleware to check if a user has all of the specified permissions
 * @param permissionSlugs Array of permission slugs to check
 * @param options Options for the middleware
 * @returns Express middleware function
 */
export function requireAllPermissions(
  permissionSlugs: string[],
  options: { workspaceIdParam?: string } = {}
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get workspace ID from request parameters if specified
    const workspaceId = options.workspaceIdParam ? req.params[options.workspaceIdParam] : undefined;

    const hasAccess = await hasAllPermissions(userId, permissionSlugs, workspaceId);
    
    if (!hasAccess) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
}
