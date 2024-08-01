// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { useCart } from './context/CartContext';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { getTotalQuantity } = useCart();

  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="home-icon" onClick={() => navigate('/')}>
          <img 
            src="https://static.vecteezy.com/system/resources/previews/010/994/232/original/nike-logo-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg" 
            alt="Home" 
            width="30" 
          />
        </div>
        <div className="nav-links">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <a href="/cart" onClick={(e) => { e.preventDefault(); navigate('/cart'); }}>
            Cart ({getTotalQuantity()})
          </a>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <div className="auth-links">
              <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Login</a>
              <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Register</a>
            </div>
          )}
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
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={
          isAuthenticated ? <Cart /> : <p className="login-message">Please <a href="/login">login</a> to make a purchase.</p>
        } />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
