import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Home.css';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';
import image7 from '../assets/7.png';
import image8 from '../assets/8.png';
import image9 from '../assets/9.png';
import image10 from '../assets/10.png';

const products = [
  {
    id: 1,
    title: 'Jordan One Take 5',
    image: image1,
    price: 175999.00, 
  },
  {
    id: 2,
    title: 'Jordan Nu Retro 1 Low',
    image: image2,
    price: 189999.00, 
  },
  {
    id: 3,
    title: 'Nike Premier 3',
    image: image3,
    price: 189999.00,
  },
  {
    id: 4,
    title: 'Nike Phantom GX 2 Elite LV8',
    image: image4,
    price: 449999.00,
  },
  {
    id: 5,
    title: 'Nike Air Max SYSTM',
    image: image5,
    price: 118999.00,
  },
  {
    id: 6,
    title: 'Nike Air Max SYSTM',
    image: image6,
    price: 118999.00,
  },
  {
    id: 7,
    title: 'Nike Downshifter 12',
    image: image7,
    price: 59999.00,
  },
  {
    id: 8,
    title: 'Nike Zoom Mamba 6',
    image: image8,
    price: 79999.00,
  },
  {
    id: 9,
    title: 'Nike Dunk Low Retro',
    image: image9,
    price: 132999.00,
  },
  {
    id: 10,
    title: 'Nike SB Dunk Low Pro Premium',
    image: image10,
    price: 146999.00,
  },
];

const Home = ({ searchQuery }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Filtrado de productos según la consulta de búsqueda
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="home-container">
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
