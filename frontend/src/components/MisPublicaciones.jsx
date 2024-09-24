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
    <div>
      {publicaciones.length > 0 ? (
        publicaciones.map((publicacion) => (
          <div key={publicacion.id} className="card">
            <h1 className="text-lg md:text-sm">{publicacion.name}</h1>
            <p className="text-sm md:text-xs pb-2">{publicacion.description}</p>
            <img src={publicacion.image} alt={publicacion.name} className="w-full sm:w-48 md:w-64 lg:w-80 object-cover" />
          </div>
        ))
      ) : (
        <p>No hay publicaciones</p>
      )}
    </div>
  );
};

export default MisPublicaciones;