import express from 'express';
import { createProductController,
    getProductsController,
    getProductByIdController,
    getProductsFilteredController,
    updateProductController ,
    deleteProductController,
    addFavoriteController,
    removeFavoriteController,
    getFavoritesController,
    getUserProductsController
} from '../controllers/productController.js'; 
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

router.get('/product/:id', getProductByIdController);
router.get('/products', getProductsController);
router.get('/products/category/:category', getProductsFilteredController);
router.get('/my-products', authenticateToken, getUserProductsController);
router.post('/product', authenticateToken, createProductController);
router.put('/product/:id', authenticateToken, updateProductController);
router.delete('/product/:id', authenticateToken, deleteProductController);

// Endpoint para agregar un favorito
router.post('/favorites', addFavoriteController);

// Endpoint para eliminar un favorito
router.delete('/favorites', removeFavoriteController);
router.get('/favorites', getFavoritesController);
export default router;
