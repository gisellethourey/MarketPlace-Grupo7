import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const { cartItems, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    // inicializar las cantidades con las cantidades actuales de los productos en el carrito
    setQuantities(cartItems.map(item => item.quantity));
  }, [cartItems]);

  // controlar las cantidades de los productos
  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = isNaN(value) || value < 1 ? 1 : value;
    setQuantities(newQuantities);
  };

  // eliminar productos del carrito
  const handleRemoveItem = (index) => {
    const itemToRemove = cartItems[index];
    removeFromCart(itemToRemove.id);
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
  };

  // precio total
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item, index) => {
      const quantity = quantities[index] || 1; // asegurarse de que la cantidad sea al menos 1
      return total + item.price * quantity;
    }, 0);
  };

  return (
    <div className="cart-sidebar p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Carrito</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-4">
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={quantities[index]}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  className="w-16 p-2 border rounded"
                />
                <p className="ml-4 text-lg font-semibold">
                  ${item.price * (quantities[index] || 1)}
                </p>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="ml-4 p-2 bg-red-500 text-white rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío</p>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-bold">Total: ${calculateTotalPrice()}</h3>
      </div>
    </div>
  );
};

export default CartSidebar;