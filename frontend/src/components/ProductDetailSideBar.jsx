import React from "react";
import SideBar from "./SideBarLeft";

const ProductDetailSideBar = ({ isOpen, onClose, product, handleAddToCart }) => {
  if (!product) return null;

  return (
    <SideBar isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl mb-4">Detalles del Producto</h2>
      <div className="overflow-y-auto h-5/6">
        <div className="p-4 bg flex flex-col">
          <h2 className="text-2xl mb-4">{product.name}</h2>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4">Categoría: {product.category}</p>
          <img
            src={product.image}
            alt={product.name}
            className="w-[70%] h-auto mb-4 drop-shadow-lg"
          />
          <p className="mb-4">Precio: ${product.price}</p>
          <div className="flex flex-row justify-between">
            <button
              type="submit"
              className="w-1/2 rounded-full bg-red-600 p-3 text-white transition hover:bg-opacity-90"
              onClick={() => handleAddToCart(product.id)} 
            >
              Agregar al Carrito
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-full bg-red-600 p-3 text-white transition hover:bg-opacity-90"
            >
              Ir a pagar
            </button>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default ProductDetailSideBar;
