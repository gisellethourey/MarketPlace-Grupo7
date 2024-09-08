import express from 'express';
import { createUserController, loginUserController, logoutUserController, deleteUserController, updateUserController, getUserProfileController } from '../controllers/userController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ruta para crear usuario
router.post('/users', createUserController);

// Ruta para iniciar sesión
router.post('/login', loginUserController);

// Ruta logout
router.post('/logout', logoutUserController);

// Ruta protegida
router.get('/profile', authenticateToken, getUserProfileController);

// Ruta para delete
router.delete('/user/:id', deleteUserController);

// Ruta para actualizar usuario
router.put('/user/:id', updateUserController);

export default router;
