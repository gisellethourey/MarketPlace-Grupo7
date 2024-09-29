import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductItem from "../components/ProductItem";
import NavBar from "../components/NavBar";
import ProductDetailSidebar from '../components/ProductDetailSideBar';
import Footer from "../components/Footer";
import FavoritesSidebar from "../components/FavoritesSideBar";

const Productos = () => {
  const { products, error, fetchProducts } = useContext(ProductsContext);
  const [token, setToken] = useState('');
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartSideBarOpen, setIsCartSideBarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesSidebarOpen, setIsFavoritesSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const handleLikeProduct = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((fav) => fav.id === product.id)) {
        return prevFavorites.filter((fav) => fav.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const handleOpenFavorites = () => {
    setIsFavoritesSidebarOpen(true);
  };

  const handleCloseFavorites = () => {
    setIsFavoritesSidebarOpen(false);
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 bg-customColor -z-10">
      <NavBar onSearchChange={handleSearchChange} onOpenFavorites={handleOpenFavorites} onGoToCart={handleGoToCart} />
      
      <FavoritesSidebar
        isOpen={isFavoritesSidebarOpen}
        onClose={handleCloseFavorites}
        favorites={favorites}
      /> 
      <ProductDetailSidebar
        isOpen={isDetailSidebarOpen}
        onClose={handleDetailSidebarClose}
        product={selectedProduct}
        onGoToCart={handleGoToCart} 
      />

      <h1 className="text-3xl font-bold my-8">Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
              onLike={() => handleLikeProduct(product)}
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