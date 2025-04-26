import express from 'express';
import { usersController } from '../controllers/users';
import { adminMiddleware } from '../middleware/admin';

const router = express.Router();

/**
 * @route GET /api/users
 * @desc Get all users (admin only)
 * @access Private (Admin)
 */
router.get('/', adminMiddleware, usersController.getAllUsers);

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Private
 */
router.get('/:id', usersController.getUserById);

/**
 * @route PUT /api/users/:id
 * @desc Update user
 * @access Private
 */
router.put('/:id', usersController.updateUser);

/**
 * @route DELETE /api/users/:id
 * @desc Delete user (admin only)
 * @access Private (Admin)
 */
router.delete('/:id', adminMiddleware, usersController.deleteUser);

/**
 * @route GET /api/users/me
 * @desc Get current user profile
 * @access Private
 */
router.get('/me', usersController.getCurrentUser);

/**
 * @route PUT /api/users/me
 * @desc Update current user profile
 * @access Private
 */
router.put('/me', usersController.updateCurrentUser);

export { router as usersRouter };