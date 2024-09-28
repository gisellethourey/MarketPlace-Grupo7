import React, { useState } from "react";

const ProductItem = ({ product, onClick, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLike();
  };

  return (
    <div
      className="bg-cardColor border border-gray-300 rounded-lg shadow-md my-3 p-4"
      onClick={onClick}
    >
      <img
        className="w-full h-[60%] object-cover rounded-t-lg cursor-pointer"
        src={product.image}
        alt={product.name}
      />
      <div className="p-4">
        <h3
          className="text-xl font-poppins mb-2 cursor-pointer"
          onClick={onClick}
        >
          {product.name}
        </h3>
        <p className="text-gray-700 mb-2 font-poppins">{product.description}</p>
        <p className="text-gray-800 font-bold">
          <strong>Price:</strong> ${product.price.toLocaleString()}
        </p>
      </div>
      <button
        onClick={handleLikeClick}
        className="mt-2 p-2 text-white"
      >
        {isLiked ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default ProductItem;