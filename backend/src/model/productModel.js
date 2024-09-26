import pool from '../config/db.js';

// Crear un nuevo producto
export const createNewProduct = async ({ category_id, name, description, image, price, user_id }) => {
  const query = `
    INSERT INTO products (category_id, name, description, image, price, user_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;
  const values = [category_id, name, description, image, price, user_id];
  try {
    const result = await pool.query(query, values);
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error creando producto:', error);
    return { success: false, message: 'Error creando producto' };
  }
};

// Obtener todos los productos
export const getAllProducts = async () => {
  const query = 'SELECT * FROM products;';
  try {
    const result = await pool.query(query);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return { success: false, message: 'Error obteniendo productos' };
  }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = $1;';
  try {
    const result = await pool.query(query, [id]);
    return result.rows.length ? { success: true, data: result.rows[0] } : null;
  } catch (error) {
    console.error('Error obteniendo el producto:', error);
    return null;
  }
};

// Obtener productos filtrados por categoría
export const getProductsByCategory = async (category) => {
  const query = `
    SELECT * FROM products
    JOIN category ON products.category_id = category.id
    WHERE category.category = $1;
  `;
  try {
    const result = await pool.query(query, [category]);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error obteniendo productos por categoría:', error);
    return { success: false, message: 'Error obteniendo productos por categoría' };
  }
};

// Obtener productos del usuario autenticado
export const getUserProducts = async (user_id) => {
  const query = 'SELECT * FROM products WHERE user_id = $1;';
  try {
    const result = await pool.query(query, [user_id]);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error obteniendo productos del usuario:', error);
    return { success: false, message: 'Error obteniendo productos del usuario' };
  }
};


// Actualizar un producto
export const updateExistingProduct = async (id, productData) => {
  const { category_id, name, description, image, price, user_id } = productData;
  const query = `
    UPDATE products
    SET category_id = $1, name = $2, description = $3, image = $4, price = $5, user_id = $6
    WHERE id = $7 RETURNING *;
  `;
  const values = [category_id, name, description, image, price, user_id, id];
  try {
    const result = await pool.query(query, values);
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error actualizando producto:', error);
    return { success: false, message: 'Error actualizando producto' };
  }
};

// Eliminar un producto
export const deleteExistingProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = $1 RETURNING id;';
  try {
    const result = await pool.query(query, [id]);
    return result.rows.length ? true : false;
  } catch (error) {
    console.error('Error eliminando producto:', error);
    return false;
  }
};

export const addFavorite = async (userId, productId) => {
  const query = 'INSERT INTO favoritos (user_id, product_id) VALUES (?, ?)';
  await db.execute(query, [userId, productId]);
};

export const removeFavorite = async (userId, productId) => {
  const query = 'DELETE FROM favoritos WHERE user_id = ? AND product_id = ?';
  await db.execute(query, [userId, productId]);
};

export const getFavorites = async (userId) => {
  const query = 'SELECT product_id FROM favoritos WHERE user_id = ?';
  const [rows] = await db.execute(query, [userId]);
  return rows.map(row => row.product_id);
};