import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductItem from "../components/ProductItem";
import NavBar from "../components/NavBar";
import ProductDetailSidebar from '../components/ProductDetailSideBar';
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const Productos = () => {
  const { products, error, fetchProducts } = useContext(ProductsContext);
  const { user } = useAuth();
  const [token, setToken] = useState('');
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = storedUser ? storedUser.token : null;

    if (storedToken) {
      setToken(storedToken);
      fetchProducts(storedToken);
    }
  }, [fetchProducts]);

<<<<<<< HEAD
  // Función para manejar el clic en un producto
=======
>>>>>>> 2e99f3f7255a72c365208acbc699eb71697ed35b
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailSidebarOpen(true);
  };

<<<<<<< HEAD
  // Función para cerrar el sidebar de detalles del producto
=======
>>>>>>> 2e99f3f7255a72c365208acbc699eb71697ed35b
  const handleDetailSidebarClose = () => {
    setIsDetailSidebarOpen(false);
    setSelectedProduct(null);
  };
<<<<<<< HEAD

  // Función para manejar la adición al carrito de compras (corregida)
  const handleAddToCart = async (product) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/carrito`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user?.id,
          productId: product.id,
        }),
      });

      if (response.ok) {
        console.log("Producto agregado al carrito");
      } else {
        console.error("Error al agregar producto al carrito");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };
=======
>>>>>>> 2e99f3f7255a72c365208acbc699eb71697ed35b

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 bg-customColor -z-10">
      <NavBar />

      <ProductDetailSidebar
        isOpen={isDetailSidebarOpen}
        onClose={handleDetailSidebarClose}
        product={selectedProduct}
        handleAddToCart={handleAddToCart} 
      />
      <h1 className="text-3xl font-bold my-8">Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
<<<<<<< HEAD
              userId={user?.id} 
=======
>>>>>>> 2e99f3f7255a72c365208acbc699eb71697ed35b
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