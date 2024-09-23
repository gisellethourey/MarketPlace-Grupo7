import express from 'express';
import { addToCartController, getCartController, removeFromCartController } from '../controllers/cartController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

router.post('/carrito', authenticateToken, addToCartController);
router.get('/carrito', authenticateToken, getCartController);
router.delete('/carrito', authenticateToken, removeFromCartController);

export default router;
