import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';

const MisPublicaciones = () => {
  const { products, error, fetchProducts } = useContext(ProductsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [fetchProducts]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const publicaciones = Array.isArray(products) ? products : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {publicaciones.length > 0 ? (
        publicaciones.map((publicacion) => (
          <div key={publicacion.id} className="card bg-white shadow-md rounded-lg overflow-hidden">
            <img src={publicacion.image} alt={publicacion.name} className="w-full h-[70%] object-cover" />
            <div className="p-4">
              <h1 className="text-lg font-bold">{publicacion.name}</h1>
              <p className="text-sm text-gray-600">{publicacion.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay publicaciones</p>
      )}
    </div>
  );
};

export default MisPublicaciones;