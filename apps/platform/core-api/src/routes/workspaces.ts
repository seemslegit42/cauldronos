import express from 'express';
import { workspacesController } from '../controllers/workspaces';
import { adminMiddleware } from '../middleware/admin';

const router = express.Router();

/**
 * @route GET /api/workspaces
 * @desc Get all workspaces for current user
 * @access Private
 */
router.get('/', workspacesController.getUserWorkspaces);

/**
 * @route GET /api/workspaces/all
 * @desc Get all workspaces (admin only)
 * @access Private (Admin)
 */
router.get('/all', adminMiddleware, workspacesController.getAllWorkspaces);

/**
 * @route GET /api/workspaces/:id
 * @desc Get workspace by ID
 * @access Private
 */
router.get('/:id', workspacesController.getWorkspaceById);

/**
 * @route POST /api/workspaces
 * @desc Create a new workspace
 * @access Private
 */
router.post('/', workspacesController.createWorkspace);

/**
 * @route PUT /api/workspaces/:id
 * @desc Update a workspace
 * @access Private
 */
router.put('/:id', workspacesController.updateWorkspace);

/**
 * @route DELETE /api/workspaces/:id
 * @desc Delete a workspace
 * @access Private
 */
router.delete('/:id', workspacesController.deleteWorkspace);

/**
 * @route GET /api/workspaces/:id/users
 * @desc Get all users in a workspace
 * @access Private
 */
router.get('/:id/users', workspacesController.getWorkspaceUsers);

/**
 * @route POST /api/workspaces/:id/users
 * @desc Add a user to a workspace
 * @access Private
 */
router.post('/:id/users', workspacesController.addUserToWorkspace);

/**
 * @route DELETE /api/workspaces/:id/users/:userId
 * @desc Remove a user from a workspace
 * @access Private
 */
router.delete('/:id/users/:userId', workspacesController.removeUserFromWorkspace);

/**
 * @route PUT /api/workspaces/:id/users/:userId/role
 * @desc Update a user's role in a workspace
 * @access Private
 */
router.put('/:id/users/:userId/role', workspacesController.updateUserRole);

export { router as workspacesRouter };