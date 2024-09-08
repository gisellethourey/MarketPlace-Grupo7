import express from 'express';
import {  productController } from '../controllers/productController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/product/:id', productController.getProductByIdController);
router.get('/products', productController.getProductsController);
router.get('/products/category/:category', productController.getProductsFilteredController);
router.post('/product',authenticateToken, productController.createProductController);
router.put('/product/:id',authenticateToken, productController.updateProductController);
router.delete('/product/:id',authenticateToken,productController.deleteProductController);

export default router;