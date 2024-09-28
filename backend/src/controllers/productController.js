import {
  createNewProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateExistingProduct,
  deleteExistingProduct,addFavorite, removeFavorite, getFavorites,
  getUserProducts
} from '../model/productModel.js';

export const addFavoriteController = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await addFavorite(userId, productId);
    res.status(200).json({ message: 'Producto agregado a favoritos' });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar a favoritos', error: error.message });
  }
};

export const removeFavoriteController = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await removeFavorite(userId, productId);
    res.status(200).json({ message: 'Producto eliminado de favoritos' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar de favoritos', error: error.message });
  }
};
export const getFavoritesController = async (req, res) => {
  const { userId } = req.query;
  try {
    const favorites = await getFavorites(userId);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos', error: error.message });
  }
};

// Crear un nuevo producto
export const createProductController = async (req, res) => {
  const { category_id, name, description, image, price} = req.body;
  const user_id = req.user.id; 

  try {
    const result = await createNewProduct({ category_id, name, description, image, price, user_id });
    return res.status(201).json({
      message: 'Producto creado exitosamente',
      product: result.data,
      links: {
        all_products: { href: '/api/products', method: 'GET' },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creando el producto',
      error: error.message,
      links: {
        all_products: { href: '/api/products', method: 'GET' },
      },
    });
  }
};

// Obtener todos los productos
export const getProductsController = async (req, res) => {
  try {
    const result = await getAllProducts();
    return res.status(200).json({
      products: result.data,
      links: {
        product_creation: { href: '/api/product', method: 'POST' },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error obteniendo productos',
      error: error.message,
    });
  }
};

// Obtener un producto por ID
export const getProductByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getProductById(id);
    if (result) {
      return res.status(200).json({
        product: result.data,
        links: {
          all_products: { href: '/api/products', method: 'GET' },
        },
      });
    } else {
      return res.status(404).json({
        message: 'Producto no encontrado',
        links: {
          all_products: { href: '/api/products', method: 'GET' },
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error obteniendo el producto',
      error: error.message,
    });
  }
};

// Obtener productos filtrados por categoría
export const getProductsFilteredController = async (req, res) => {
  const { category } = req.params;

  try {
    const result = await getProductsByCategory(category);
    if (result.success) {
      return res.status(200).json({
        products: result.data,
        links: {
          all_products: { href: '/api/products', method: 'GET' },
        },
      });
    } else {
      return res.status(404).json({
        message: 'No se encontraron productos para esta categoría',
        links: {
          all_products: { href: '/api/products', method: 'GET' },
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error obteniendo productos por categoría',
      error: error.message,
    });
  }
};

// Obtener las publicaciones del usuario 
export const getUserProductsController = async (req, res) => {
  const user_id = req.user.id; 

  try {
    const result = await getUserProducts(user_id);
    if (result.success) {
      return res.status(200).json({ products: result.data });
    } else {
      return res.status(404).json({ message: 'No se encontraron productos para este usuario' });
    }
  } catch (error) {
    console.error('Error al obtener los productos del usuario:', error);
    return res.status(500).json({
      message: 'Error obteniendo las publicaciones del usuario',
      error: error.message,
    });
  }
};

// Actualizar un producto
export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { category_id, name, description, image, price } = req.body;

  try {
    const result = await updateExistingProduct(id, { category_id, name, description, image, price });
    return res.status(200).json({
      message: 'Producto actualizado exitosamente',
      product: result.data,
      links: {
        all_products: { href: '/api/products', method: 'GET' },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error actualizando el producto',
      error: error.message,
      links: {
        all_products: { href: '/api/products', method: 'GET' },
      },
    });
  }
};

// Eliminar un producto
export const deleteProductController = async (req, res) => {
  const { id } = req.params;

  try {
    const success = await deleteExistingProduct(id);
    if (success) {
      return res.status(200).json({
        message: 'Producto eliminado correctamente',
        links: {
          all_products: { href: '/api/products', method: 'GET' },
        },
      });
    } else {
      return res.status(404).json({
        message: 'Producto no encontrado',
        links: {
          all_products: { href: '/api/products', method: 'GET' },
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error eliminando el producto',
      error: error.message,
    });
  }
};
