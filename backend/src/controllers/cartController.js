import { addProductToCart, getCartItemsByUser, removeProductFromCart } from '../model/cartModel.js';


export const addToCartController = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const result = await addProductToCart(userId, productId);
    if (result.success) {
      res.status(200).json({ message: 'Producto agregado al carrito', cartItem: result.cartItem });
    } else {
      res.status(500).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar al carrito', error: error.message });
  }
};

// Controlador para obtener el carrito de un usuario
export const getCartController = async (req, res) => {
  const { userId } = req.query;
  try {
    const result = await getCartItemsByUser(userId);
    if (result.success) {
      res.status(200).json({ cart: result.cart });
    } else {
      res.status(500).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo el carrito', error: error.message });
  }
};

// Controlador para eliminar un producto del carrito
export const removeFromCartController = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const result = await removeProductFromCart(userId, productId);
    if (result.success) {
      res.status(200).json({ message: 'Producto eliminado del carrito', deletedItem: result.deletedItem });
    } else {
      res.status(500).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando del carrito', error: error.message });
  }
};
