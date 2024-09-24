import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const FavoritesSidebar = ({ isOpen, onClose, favorites }) => {
  return (
    <>
      {/* Fondo con desenfoque */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      
      {/* Barra lateral de favoritos */}
      <div className={`fixed right-0 top-0 w-64 h-full rounded-lg bg-customColor shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Favoritos</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          {favorites.length > 0 ? (
            favorites.map((product) => (
              <div key={product.id} className="mb-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay productos favoritos.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesSidebar;