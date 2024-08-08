import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Actualiza la ruta aquí

const NavBar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="home-icon" onClick={() => navigate('/')}>
        <img src="path_to_home_icon.png" alt="Home" width="30" />
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
      </div>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default NavBar;
