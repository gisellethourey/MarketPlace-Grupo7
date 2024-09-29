import React, { useState, useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

const AddProductForm = () => {
  const { createProduct } = useContext(ProductsContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(''); 
  const [message, setMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = storedUser ? storedUser.token : null;

    if (!token) {
      setMessage('Token inválido o no encontrado. Inicia sesión nuevamente.');
      return;
    }

    const newProduct = {
      name,
      description,
      category,
      price: parseFloat(price),
      image, 
    };

    try {
      await createProduct(newProduct, token);
      setName('');
      setDescription('');
      setCategory('');
      setPrice('');
      setImage('');
      setMessage('Producto creado exitosamente.');
    } catch (error) {
      setMessage('Hubo un error al crear el producto. Inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded-lg shadow-md mb-8">
      <div>
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Añadir Producto</button>
      {message && <p className="mt-4">{message}</p>}
    </form>
  );
};

export default AddProductForm;
