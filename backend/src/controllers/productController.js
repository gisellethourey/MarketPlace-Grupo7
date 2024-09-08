import { productModel } from "../model/productModel.js";

const createProductController = async (req, res) => {
  const { category, name, description, image, price } = req.body;
  const user_id = req.user.id; 

  if (!category || !name || !description || !image || !price) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const product = await productModel.createProduct(
      category,
      name,
      description,
      image,
      price,
      user_id
    );
    if (product.success === false) {
      return res.status(500).json({ message: product.message });
    }
    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

const getProductLimitController = async (req, res) => {
  const { limit } = req.params;
  const { order_by } = req.query;
  try {
    const result = await productModel.getProductLimit({ limit, order_by });
    res.status(200).json({ result: result });
  } catch (error) {
    console.log("falló la consulta :/", error.message);
  }
};

const prepararHATEOAS = (products) => {
  const results = products
    .map((m) => {
      return {
        name: m.name,
        price: m.price,
        href: `/products/product/${m.id}`,
      };
    })
    .slice(0, 9);
  const total = products.length;
  const HATEOAS = {
    total,
    results,
  };
  return HATEOAS;
};
const getProductsController = async (req, res) => {
  try {
    const queryStrings = req.query;
    const products = await productModel.getProducts(queryStrings);
    const HATEOAS = prepararHATEOAS(products);
    res.json(HATEOAS);
  } catch (error) {
    console.log("falló la consulta", error.message);
  }
};

const getProductsFilteredController = async (req, res) => {
  try {
    const query = req.query;
    const result = await productModel.getProductsFiltered(query);
    return res.status(200).json({ result });
  } catch (error) {
    console.log("falló la consulta de filtro", error.message);
  }
};

const getProductByIdController = async (req, res) => { 
    const { id } = req.params;
    try {
        const product = await productModel.getProductById(id);
        if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
    };

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, message: "Usuario no autenticado" });
  }

  try {
    const product = await productModel.getProductById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }

    if (product.user_id !== user_id) {
      return res
        .status(403)
        .json({
          success: false,
          message: "No tienes permiso para borrar este producto",
        });
    }

    const result = await productModel.deleteProduct(id);
    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Se ha eliminado el producto" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Error al borrar el producto" });
    }
  } catch (error) {
    console.error("Error al borrar el producto:", error);
    return res
      .status(500)
      .json({ success: false, message: "Catch Error al borrar el producto" });
  }
};

export const productController = {
  createProductController,
  getProductLimitController,
  getProductsController,
  getProductsFilteredController,
  deleteProductController,
  getProductByIdController,
};
