import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Product.css';
import S2 from '../assets/images/s2.jpeg';
import S1 from '../assets/images/s1.jpeg';
import S3 from '../assets/images/s3.jpeg';
import S4 from '../assets/images/s4.jpeg';
import S5 from '../assets/images/s5.jpeg';
import C1 from '../assets/images/h2.jpeg';
import C2 from '../assets/images/c2.jpeg';
import C3 from '../assets/images/c3.jpeg';
import C4 from '../assets/images/c4.jpeg';
import C5 from '../assets/images/c5.jpeg';
import K1 from '../assets/images/k1.jpeg';
import K2 from '../assets/images/k2.jpeg';
import K3 from '../assets/images/k3.jpeg';
import K4 from '../assets/images/k4.jpeg';
import K5 from '../assets/images/k5.jpeg';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

function getQueryParam(name, search) {
  return new URLSearchParams(search).get(name);
}


const productData = [
  // Serums
  { id: 1, name: 'Radiance Serum', category: 'Serums', price: '$68', tagline: 'Brightening Formula', img: S5, desc: 'A luxurious serum that brightens and revitalizes your skin with botanical extracts and vitamin C.', reviews: [{ stars: 5, text: 'My skin glows after using this serum!' }, { stars: 4, text: 'Lightweight and effective.' }] },
  { id: 4, name: 'Glow Serum', category: 'Serums', price: '$72', tagline: 'Radiance Booster', img: S4, desc: 'Boosts skin radiance and evens tone with a blend of natural oils and antioxidants.', reviews: [{ stars: 5, text: 'Instant glow!' }, { stars: 4, text: 'Love the texture.' }] },
  { id: 7, name: 'Vitamin C Serum', category: 'Serums', price: '$60', tagline: 'Vitamin C Infusion', img: S2, desc: 'Packed with Vitamin C for a radiant complexion.', reviews: [{ stars: 5, text: 'Brightens my face!' }, { stars: 5, text: 'Love this product.' }] },
  { id: 8, name: 'Hydrating Elixir', category: 'Serums', price: '$65', tagline: 'Hydration Booster', img: S3, desc: 'Locks in moisture for a supple look.', reviews: [{ stars: 5, text: 'Deep hydration.' }, { stars: 4, text: 'Feels great.' }] },
  { id: 9, name: 'Night Repair Serum', category: 'Serums', price: '$70', tagline: 'Overnight Renewal', img: S1, desc: 'Revives skin overnight with botanicals.', reviews: [{ stars: 5, text: 'Woke up glowing.' }, { stars: 4, text: 'Good night routine.' }] },

  // Creams
  { id: 2, name: 'Hydra Cream', category: 'Creams', price: '$54', tagline: 'Deep Hydration', img: C1, desc: 'A rich cream that deeply hydrates and plumps the skin for a dewy, youthful look.', reviews: [{ stars: 5, text: 'Perfect for my dry skin.' }, { stars: 4, text: 'Very moisturizing and smells great.' }] },
  { id: 5, name: 'Nourish Cream', category: 'Creams', price: '$59', tagline: 'Nourishing & Repairing', img: C2, desc: 'Repairs and nourishes skin overnight with peptides and ceramides.', reviews: [{ stars: 5, text: 'My skin feels renewed every morning.' }, { stars: 4, text: 'Rich but not greasy.' }] },
  { id: 10, name: 'Renewal Cream', category: 'Creams', price: '$58', tagline: 'Skin Renewal', img: C3, desc: 'Smooths skin texture and restores firmness.', reviews: [{ stars: 5, text: 'Improved texture!' }, { stars: 4, text: 'Works well.' }] },
  { id: 11, name: 'Ultra Moist Cream', category: 'Creams', price: '$63', tagline: 'Maximum Hydration', img: C4, desc: 'Locks moisture in for 24 hours.', reviews: [{ stars: 5, text: 'Amazing moisture.' }, { stars: 4, text: 'Feels rich.' }] },
  { id: 12, name: 'Silk Touch Cream', category: 'Creams', price: '$61', tagline: 'Silky Finish', img: C5, desc: 'Leaves skin feeling smooth like silk.', reviews: [{ stars: 5, text: 'Silky soft skin!' }, { stars: 4, text: 'Great texture.' }] },

  // Cleansers
  { id: 3, name: 'Botanical Cleanser', category: 'Cleansers', price: '$36', tagline: 'Gentle & Natural', img: K1, desc: 'A gentle cleanser with natural botanicals to remove impurities without stripping moisture.', reviews: [{ stars: 5, text: 'Leaves my skin soft and clean.' }, { stars: 4, text: 'Gentle enough for daily use.' }] },
  { id: 6, name: 'Purity Cleanser', category: 'Cleansers', price: '$34', tagline: 'Purifying Gel', img: K2, desc: 'A gel cleanser that purifies pores and refreshes skin with green tea and aloe.', reviews: [{ stars: 5, text: 'So refreshing!' }, { stars: 4, text: 'Cleans well and feels gentle.' }] },
  { id: 13, name: 'Foam Cleanser', category: 'Cleansers', price: '$33', tagline: 'Foaming Action', img: K3, desc: 'Foamy cleanser for deep clean feel.', reviews: [{ stars: 5, text: 'Cleans deeply.' }, { stars: 4, text: 'Love the foam.' }] },
  { id: 14, name: 'Herbal Cleanser', category: 'Cleansers', price: '$35', tagline: 'Herbal Infused', img: K4, desc: 'Infused with calming herbs.', reviews: [{ stars: 5, text: 'Soothing and clean.' }, { stars: 4, text: 'Good for daily use.' }] },
  { id: 15, name: 'Clear Pore Cleanser', category: 'Cleansers', price: '$38', tagline: 'Pore Minimizer', img: K5, desc: 'Minimizes pores and reduces oil.', reviews: [{ stars: 5, text: 'Smaller pores!' }, { stars: 4, text: 'Feels fresh.' }] },
];

const categories = ['Serums', 'Creams', 'Cleansers'];

function StarRating({ stars }) {
  return <span className="stars">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>;
}

export default function Product({ addToCart }) {
  const location = useLocation();
const initialCategory = getQueryParam('category', location.search);
const [activeCat, setActiveCat] = useState(initialCategory || 'Serums');

  const [modalProduct, setModalProduct] = useState(null);
  const [cartAnim, setCartAnim] = useState(false);

  const filtered = productData.filter(p => p.category === activeCat);
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (modalProduct) {
      addToCart({
        id: modalProduct.id,
        name: modalProduct.name,
        variant: modalProduct.tagline,
        price: parseFloat(modalProduct.price.replace('$', '')),
        image: modalProduct.img,
      });
    }
  
    setCartAnim(true);
    setTimeout(() => {
      setCartAnim(false);
      navigate('/checkout');
    }, 1000);
  };
  

  return (

    <div className="products-page">
      
      <h1 className="products-title">Our Skincare Collection</h1>
      <nav className="product-categories">
        {categories.map(cat => (
          <motion.button
            key={cat}
            className={`cat-btn${activeCat === cat ? ' active' : ''}`}
            onClick={() => setActiveCat(cat)}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </nav>
      <motion.div layout className="product-grid">
        <AnimatePresence>
          {filtered.map(product => (
            <motion.div
              key={product.id}
              className="product-card"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(212,175,55,0.13)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4 }}
              onClick={() => setModalProduct(product)}
            >
              <img src={product.img} alt={product.name} loading="lazy" />
              <h2>{product.name}</h2>
              <span className="product-price">{product.price}</span>
              <p className="product-tagline">{product.tagline}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {modalProduct && (
          <motion.div className="product-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="product-modal" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <button className="modal-close" onClick={() => setModalProduct(null)}>&times;</button>
              <img src={modalProduct.img} alt={modalProduct.name} />
              <h2>{modalProduct.name}</h2>
              <span className="modal-price">{modalProduct.price}</span>
              <p className="modal-desc">{modalProduct.desc}</p>
              <div className="modal-reviews">
                {modalProduct.reviews.map((r, i) => (
                  <div key={i} className="review">
                    <StarRating stars={r.stars} />
                    <span>{r.text}</span>
                  </div>
                ))}
              </div>
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
