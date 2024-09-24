import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductItem = ({ product, onClick }) => {


  return (
    <div
      className="bg-cardColor border border-gray-300 rounded-lg shadow-md my-3 p-4  "
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
      <FontAwesomeIcon icon={faHeart} />
    </div>
  );
};

export default ProductItem;
