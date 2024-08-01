// src/context/CartContext.jsx

import React, { createContext, useContext, useReducer } from 'react';

// Define el estado inicial del carrito
const initialState = {
  items: [],
};

// Define las acciones que se pueden realizar en el carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // Si el producto no está en el carrito, añádelo con la cantidad
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

// Crea el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalQuantity = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);
