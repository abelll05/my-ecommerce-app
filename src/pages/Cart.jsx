// src/pages/Cart.jsx

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css'; // Asegúrate de que este archivo existe y tiene los estilos necesarios

const Cart = () => {
  const { state, removeFromCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: ''
  });

  // Calcular el total del carrito
  const calculateTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Manejar el cambio en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para procesar el pedido
    alert('Compra realizada con éxito');
    setIsCheckout(false); // Cierra el formulario después de la compra
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="cart-list">
            {state.items.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${calculateTotal()}</h3>
          </div>
          {!isCheckout ? (
            <button className="checkout-button" onClick={() => setIsCheckout(true)}>Buy Now</button>
          ) : (
            <form onSubmit={handleSubmit} className="checkout-form">
              <h3>Complete Your Purchase</h3>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Finalize Purchase</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
