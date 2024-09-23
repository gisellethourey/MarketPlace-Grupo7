import React from 'react';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const { cartItems } = useCart();

  return (
    <div className="cart-sidebar">
      <h2>Carrito</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

export default CartSidebar;