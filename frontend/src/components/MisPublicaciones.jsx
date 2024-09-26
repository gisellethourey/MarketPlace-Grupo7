import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { useAuth } from '../context/AuthContext';

const MisPublicaciones = () => {
  const { products, error, fetchUserProducts} = useContext(ProductsContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProducts = async () => {
      if (user && user.token) { 
        try {
          await fetchUserProducts(user.token); 
        } catch (error) {
          console.error('Error al obtener las publicaciones del usuario:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    getUserProducts();
  }, [fetchUserProducts, user]);
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