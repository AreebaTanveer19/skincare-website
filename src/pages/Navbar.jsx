import React, { useState } from 'react';
// import { Link as ScrollLink } from 'react-scroll'; 
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when overlay is clicked
  const handleOverlayClick = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="logo">LUMINAIRE</h1>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <nav
          id="nav-menu"
          className={`nav-links${menuOpen ? ' open' : ''}`}
          role="navigation"
        >
          <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/product" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/checkout" onClick={() => setMenuOpen(false)}>Checkout</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About us</Link>
          <Link to="/auth" onClick={() => setMenuOpen(false)}>Sign-in</Link>
        </nav>
      </div>
      {/* Overlay for mobile menu */}
      {menuOpen && <div className="nav-overlay" onClick={handleOverlayClick} aria-hidden="true"></div>}
    </header>
  );
}
