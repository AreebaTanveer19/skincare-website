import React, { useState, useEffect } from 'react';
// import { Link as ScrollLink } from 'react-scroll'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    // Listen for login/logout changes from other tabs/windows
    const handleStorage = () => setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [location]);

  // Close menu when overlay is clicked
  const handleOverlayClick = () => setMenuOpen(false);

  const handleLogout = () => {
    // Simulate logout (no token to remove)
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/auth', { state: { logout: true } });
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="logo">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>LUMINAIRE</Link>
        </h1>
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
          {isLoggedIn && (
            <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
          )}
          {!isLoggedIn && (
            <Link to="/auth" className="signin-link" onClick={() => setMenuOpen(false)}>Sign-in</Link>
          )}
          {isLoggedIn && location.pathname !== '/auth' && (
            <button onClick={handleLogout} className="signin-link logout-btn" style={{ marginLeft: '1rem' }}>Logout</button>
          )}
        </nav>
      </div>
      {/* Overlay for mobile menu */}
      {menuOpen && <div className="nav-overlay" onClick={handleOverlayClick} aria-hidden="true"></div>}
    </header>
  );
}
