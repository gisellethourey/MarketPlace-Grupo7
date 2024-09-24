import React from 'react';
import { BrowserRouter as , Route, Routes } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import { AuthProvider } from './context/AuthContext';
import Perfil from './views/Perfil';
import { ProductsProvider } from './context/ProductsContext';
import Productos from './views/Productos';
import CrearPublicacion from './views/CrearPublicacion'
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <AuthProvider>
     <ProductsProvider>
     <CartProvider>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/crear-publicacion" element={<CrearPublicacion />} /> 
      </Routes>
      </CartProvider>
      </ProductsProvider> 
    </AuthProvider>
  );
};

export default App;
