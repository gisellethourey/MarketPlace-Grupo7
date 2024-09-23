// models/cartModel.js
import pool from '../config/db.js';

// Agregar un producto al carrito
export const addProductToCart = async (userId, productId) => {
  const query = 'INSERT INTO cart (user_id, product_id) VALUES ($1, $2) RETURNING *';
  const values = [userId, productId];
  try {
    const result = await pool.query(query, values);
    return { success: true, cartItem: result.rows[0] };
  } catch (error) {
    console.error('Error agregando al carrito:', error);
    return { success: false, message: 'Error agregando al carrito' };
  }
};

// Obtener los productos del carrito de un usuario
export const getCartItemsByUser = async (userId) => {
  const query = 'SELECT * FROM cart WHERE user_id = $1';
  try {
    const result = await pool.query(query, [userId]);
    return { success: true, cart: result.rows };
  } catch (error) {
    console.error('Error obteniendo el carrito:', error);
    return { success: false, message: 'Error obteniendo el carrito' };
  }
};

// Eliminar un producto del carrito
export const removeProductFromCart = async (userId, productId) => {
  const query = 'DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *';
  try {
    const result = await pool.query(query, [userId, productId]);
    return { success: true, deletedItem: result.rows[0] };
  } catch (error) {
    console.error('Error eliminando del carrito:', error);
    return { success: false, message: 'Error eliminando del carrito' };
  }
};
