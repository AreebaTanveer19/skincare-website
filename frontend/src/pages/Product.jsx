import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Product.css';
import { useLocation } from 'react-router-dom';

function getQueryParam(name, search) {
  return new URLSearchParams(search).get(name);
}

const categories = ['Serums', 'Creams', 'Cleansers'];

export default function Product({ addToCart }) {
  const location = useLocation();
  const initialCategory = getQueryParam('category', location.search);
  const [activeCat, setActiveCat] = useState(initialCategory || 'Serums');
  const [modalProduct, setModalProduct] = useState(null);
  const [cartAnim, setCartAnim] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch products by category from database
  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/category/${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} products`);
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when category changes
  useEffect(() => {
    fetchProductsByCategory(activeCat);
  }, [activeCat]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCat(category);
    // Update URL with category parameter
    const newUrl = `${window.location.pathname}?category=${category}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleAddToCart = () => {
    if (modalProduct) {
      addToCart({
        id: modalProduct._id,
        name: modalProduct.name,
        variant: modalProduct.category,
        price: modalProduct.price,
        image: modalProduct.image,
      });
    }
  
    setCartAnim(true);
    setTimeout(() => {
      setCartAnim(false);
      navigate('/checkout');
    }, 1000);
  };

  useEffect(() => {
    if (!loading && !error && products.length > 0) {
      const productId = getQueryParam('productId', location.search);
      if (productId) {
        const found = products.find(p => p._id === productId);
        if (found) setModalProduct(found);
      }
    }
    // eslint-disable-next-line
  }, [loading, error, products, location.search]);

  return (
    <div className="products-page">
      <h1 className="products-title">Our Skincare Collection</h1>
      <nav className="product-categories">
        {categories.map(cat => (
          <motion.button
            key={cat}
            className={`cat-btn${activeCat === cat ? ' active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </nav>

      {loading && (
        <div className="loading-container">
          <div className="loading">Loading {activeCat}...</div>
        </div>
      )}

      {error && (
        <div className="error-container">
          <div className="error">Error: {error}</div>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="no-products">
          <p>No {activeCat} found. Please check back later!</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <motion.div layout className="product-grid">
          <AnimatePresence>
            {products.map(product => (
              <motion.div
                key={product._id}
                className="product-card"
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(212,175,55,0.13)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.4 }}
                onClick={() => setModalProduct(product)}
              >
                <img src={product.image.startsWith('/images/') ? product.image : `/images/${product.image.split('/').pop()}`}
                     alt={product.name}
                     className="product-image" />
                <h2>{product.name}</h2>
                <span className="product-price">${product.price}</span>
                <p className="product-desc">{product.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {modalProduct && (
          <motion.div className="product-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="product-modal" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <button className="modal-close" onClick={() => setModalProduct(null)}>&times;</button>
              <img src={modalProduct.image} alt={modalProduct.name} />
              <h2>{modalProduct.name}</h2>
              <span className="modal-price">${modalProduct.price}</span>
              <p className="modal-desc">{modalProduct.desc}</p>
              
              <motion.button
                className={`add-cart-btn${cartAnim ? ' anim' : ''}`}
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
              >
                {cartAnim ? 'Added!' : 'Add to Cart'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
