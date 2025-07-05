import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Product";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Auth from "./pages/Auth";
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './pages/ScrollToTop';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/product" element={<><Navbar /><Products addToCart={addToCart} /></>} />
        <Route path="/checkout" element={<><Navbar /><Checkout cartItems={cartItems} setCartItems={setCartItems} /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/auth" element={<><Navbar /><Auth /></>} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
