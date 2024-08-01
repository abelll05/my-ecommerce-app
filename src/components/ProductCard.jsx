// src/components/ProductCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css"; // Importación correcta

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evita que el click en "Add to Cart" navegue al producto
    addToCart(product);
  };

  return (
    <div className="product-card" onClick={handleImageClick}>
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />
      <h2>{product.title}</h2>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
