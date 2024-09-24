import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductItem from "../components/ProductItem";
import NavBar from "../components/NavBar";
import ProductDetailSidebar from '../components/ProductDetailSideBar';
import Footer from "../components/Footer";

const Productos = () => {
  const { products, error, fetchProducts } = useContext(ProductsContext);
  const [token, setToken] = useState('');
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartSideBarOpen, setIsCartSideBarOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = storedUser ? storedUser.token : null;

    if (storedToken) {
      setToken(storedToken);
      fetchProducts(storedToken);
    }
  }, [fetchProducts]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailSidebarOpen(true);
  };

  const handleDetailSidebarClose = () => {
    setIsDetailSidebarOpen(false);
    setSelectedProduct(null);
  };

  const handleGoToCart = () => {
    setIsDetailSidebarOpen(false);
    setIsCartSideBarOpen(true);
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 bg-customColor -z-10">
      <NavBar onGoToCart={handleGoToCart} />

      <ProductDetailSidebar
        isOpen={isDetailSidebarOpen}
        onClose={handleDetailSidebarClose}
        product={selectedProduct}
        onGoToCart={handleGoToCart} // Pasar la función de handleGoToCart
      />
      <h1 className="text-3xl font-bold my-8">Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Productos;