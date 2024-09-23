import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductItem = ({ product, onToggleFavorite, onClick, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) {
        console.error('El userId está indefinido');
        return;
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/favorites?userId=${userId}`);
        const favorites = await response.json();

        // Verifica si 'favorites' es un array antes de usar includes
        if (Array.isArray(favorites)) {
          setIsFavorite(favorites.some(fav => fav.product_id === product.id)); 
        } else {
          console.error('Favoritos no es un array:', favorites);
        }
      } catch (error) {
        console.error('Error al obtener favoritos:', error);
      }
    };

    fetchFavorites();
  }, [product.id, userId]);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, productId: product.id }),
        });
      } else {
        await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, productId: product.id }),
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error al actualizar favorito:', error);
    }
  };

  return (
    <div className="bg-cardColor border border-gray-300 rounded-lg shadow-md my-3 p-4" onClick={onClick}>
      <img
        className="w-full h-[70%] object-cover rounded-t-lg cursor-pointer"
        src={product.image}
        alt={product.name}
      />
      <div className="p-4">
        <h3 className="text-xl font-poppins mb-2 cursor-pointer" onClick={onClick}>{product.name}</h3>
        <p className="text-gray-700 mb-2 font-poppins">{product.description}</p>
        <p className="text-gray-800 font-bold">
          <strong>Price:</strong> ${product.price.toLocaleString()}
        </p>
        <FontAwesomeIcon
          icon={faHeart}
          onClick={handleFavoriteClick}
          className={isFavorite ? 'text-red-500' : 'text-gray-500'}
        />
      </div>
    </div>
  );
};

export default ProductItem;
