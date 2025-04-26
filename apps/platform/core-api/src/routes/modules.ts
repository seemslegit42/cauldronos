import express from 'express';
import { modulesController } from '../controllers/modules';
import { adminMiddleware } from '../middleware/admin';

const router = express.Router();

/**
 * @route GET /api/modules
 * @desc Get all available modules
 * @access Private
 */
router.get('/', modulesController.getAllModules);

/**
 * @route GET /api/modules/:id
 * @desc Get module by ID
 * @access Private
 */
router.get('/:id', modulesController.getModuleById);

/**
 * @route GET /api/modules/slug/:slug
 * @desc Get module by slug
 * @access Private
 */
router.get('/slug/:slug', modulesController.getModuleBySlug);

/**
 * @route POST /api/modules
 * @desc Create a new module (admin only)
 * @access Private (Admin)
 */
router.post('/', adminMiddleware, modulesController.createModule);

/**
 * @route PUT /api/modules/:id
 * @desc Update a module (admin only)
 * @access Private (Admin)
 */
router.put('/:id', adminMiddleware, modulesController.updateModule);

/**
 * @route DELETE /api/modules/:id
 * @desc Delete a module (admin only)
 * @access Private (Admin)
 */
router.delete('/:id', adminMiddleware, modulesController.deleteModule);

/**
 * @route GET /api/modules/workspace/:workspaceId
 * @desc Get modules for a workspace
 * @access Private
 */
router.get('/workspace/:workspaceId', modulesController.getWorkspaceModules);

/**
 * @route POST /api/modules/workspace/:workspaceId/:moduleId
 * @desc Install a module in a workspace
 * @access Private
 */
router.post('/workspace/:workspaceId/:moduleId', modulesController.installModule);

/**
 * @route DELETE /api/modules/workspace/:workspaceId/:moduleId
 * @desc Uninstall a module from a workspace
 * @access Private
 */
router.delete('/workspace/:workspaceId/:moduleId', modulesController.uninstallModule);

/**
 * @route PUT /api/modules/workspace/:workspaceId/:moduleId/enable
 * @desc Enable a module in a workspace
 * @access Private
 */
router.put('/workspace/:workspaceId/:moduleId/enable', modulesController.enableModule);

/**
 * @route PUT /api/modules/workspace/:workspaceId/:moduleId/disable
 * @desc Disable a module in a workspace
 * @access Private
 */
router.put('/workspace/:workspaceId/:moduleId/disable', modulesController.disableModule);

export { router as modulesRouter };