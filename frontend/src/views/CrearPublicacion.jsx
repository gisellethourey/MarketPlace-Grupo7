import React, { useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import NavBar from '../components/NavBar';

const CrearPublicacion = () => {
  const { user } = useAuth();
  const { createProduct } = useContext(ProductsContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const categories = [
    { id: 1, category: 'Electronica' },
    { id: 2, category: 'Libros' },
    { id: 3, category: 'Ropa' },
    { id: 4, category: 'Juguetes' },
    { id: 5, category: 'Electrodomesticos' },
    { id: 6, category: 'Otros' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      setError('No estás autenticado');
      return;
    }
  
    // Verifica que la categoría sea válida
    if (!category) {
      setError('Por favor, selecciona una categoría válida.');
      return;
    }
  
    const newProduct = {
      category_id: category,
      name,
      description,
      image,
      price
    };
  
    try {
      await createProduct(newProduct, user.token);
    } catch (error) {
      setError('Error al crear el producto');
    } finally {
      navigate('/perfil');
    }
  };
  
  return (
    <>
    <NavBar onFavoriteClick={() => setIsSidebarOpen(true)} />
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      
      <h1 className="text-2xl font-bold mb-6">Crear Producto</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Categoría:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Imagen:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Crear Producto
        </button>
      </form>
    </div>
  </>
  );
};

export default CrearPublicacion;