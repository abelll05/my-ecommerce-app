import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products'; 
import { useCart } from '../context/CartContext';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [zoom, setZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ top: 0, left: 0 });
  const { addToCart } = useCart(); 

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { width, height } = target.getBoundingClientRect();
    const x = (offsetX / width) * 100;
    const y = (offsetY / height) * 100;
    setZoomPosition({ top: y, left: x });
  };

  const handleMouseEnter = () => {
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };

  return (
    <div className="product-container">
      <div className="product-details">
        <div
          className="product-image-container"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          {zoom && (
            <div
              className="zoomed-image"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundPosition: `${zoomPosition.left}% ${zoomPosition.top}%`,
                backgroundSize: '200%',
                width: '100px', // Tamaño del cuadrado de zoom
                height: '100px', // Tamaño del cuadrado de zoom
                position: 'absolute',
                top: `${zoomPosition.top}%`,
                left: `${zoomPosition.left}%`,
                transform: 'translate(-50%, -50%)', 
                border: '2px solid #000', 
                borderRadius: '4px',
                pointerEvents: 'none', 
              }}
            />
          )}
        </div>
        <div className="product-info">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button> 
        </div>
      </div>
    </div>
  );
};

export default Product;
