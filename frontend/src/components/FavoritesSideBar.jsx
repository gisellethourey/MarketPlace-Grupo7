import React from 'react';

const FavoritesSidebar = ({ isOpen, onClose, favorites }) => {
  return (
    <div className={`fixed right-0 top-0 w-64 h-full bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
      <button onClick={onClose} className="p-2">Cerrar</button>
      <h2 className="text-xl font-bold p-4">Favoritos</h2>
      <div className="p-4">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div key={product.id} className="mb-4">
              <h3 className="font-bold">{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>No hay productos favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesSidebar;