import express from 'express';
import { 
    createUserController, 
    loginUserController, 
    updateUserController, 
    deleteUserController,
    getUserProfileController // Importar el nuevo controlador
} from '../controllers/userController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

router.post('/register', createUserController);
router.post('/login', loginUserController);
router.get('/usuarios/profile', authenticateToken, getUserProfileController); // Nueva ruta para obtener el perfil del usuario
router.put('/profile', authenticateToken, updateUserController);
router.delete('/profile', authenticateToken, deleteUserController);

export default router;