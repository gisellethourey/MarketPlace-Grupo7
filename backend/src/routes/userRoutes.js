import express from 'express';
import { 
    createUserController, 
    loginUserController, 
    updateUserController, 
    deleteUserController,
    getUserProfileController 
} from '../controllers/userController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

router.post('/register', createUserController);
router.post('/login', loginUserController);
router.get('/usuarios/profile', authenticateToken, getUserProfileController); 
router.put('/profile', authenticateToken, updateUserController);
router.delete('/profile', authenticateToken, deleteUserController);

export default router;