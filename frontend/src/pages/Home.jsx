import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';
import Navbar from './Navbar';
import { AnimatePresence } from 'framer-motion';

// Helper to get correct image URL for GitHub Pages
const getImageUrl = (img) => `${import.meta.env.BASE_URL}images/${img.replace(/^\/images\//, '')}`;

const products = [
  { name: 'Radiance Serum', desc: 'Brightens and revitalizes skin.', img: 'h1.jpeg', category: 'Serums' },
  { name: 'Hydra Cream', desc: 'Deep hydration for a dewy glow.', img: 'h2.jpeg', category: 'Creams' },
  { name: 'Botanical Cleanser', desc: 'Gentle, natural cleansing.', img: 'h3.jpeg', category: 'Cleansers' },
];

const testimonials = [
  { name: 'Sophia L.', text: 'My skin has never felt so luxurious and healthy!' },
  { name: 'Emma R.', text: 'The botanical cleanser is a game changer.' },
  { name: 'Olivia M.', text: 'Elegant, effective, and gentle on my skin.' },
];

const tips = [
  { step: 'Cleanse', desc: 'Start with a gentle botanical cleanser.', img: 'cleanser1.jpg' },
  { step: 'Serum', desc: 'Apply radiance serum for glow.', img: 'serum1.jpg' },
  { step: 'Moisturize', desc: 'Lock in hydration with our cream.', img: 'most1.jpg' },
];

export default function Home() {
  const [tipOpen, setTipOpen] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [currentTip, setCurrentTip] = useState(0); // For auto-slider
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const handleTipToggle = idx => setTipOpen(tipOpen === idx ? null : idx);
  const handleTestimonial = dir => {
    setTestimonialIdx((testimonialIdx + dir + testimonials.length) % testimonials.length);
  };
  const handleFormChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFormSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2000);
    setForm({ name: '', email: '', message: '' });
  };

  const handleFooterLink = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="luxury-skincare">
      {/* Hero Section */}
      <section className="hero">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="hero-content">
          <h1 className="brand-title">LUMINAIRE SKIN</h1>
          <p className="tagline">Elevate Your Glow. Embrace Your Radiance.</p>
          <a href="#about" className="cta-btn">Discover More</a>
        </motion.div>
        <img src={getImageUrl('skincare.jpg')} alt="Luxury skincare" className="hero-bg" loading="eager" fetchpriority="high" decoding="async" width="1920" height="1080" />
      </section>

      {/* About Us */}
      <section className="about" id="about">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="about-content redesigned">
          <img src={getImageUrl('about.jpeg')} alt="About us" className="about-img" loading="eager" />
          <div className="about-details-text-wrapper">
            <div className="about-details">
              <h2>About Us</h2>
              <div className="about-highlight">
                <p>
                  <b>Luminaire Skin</b> is more than just skincare—it's a celebration of self-care, science, and sustainability. Our journey began with a simple belief: everyone deserves radiant, healthy skin powered by nature and proven by science.
                </p>
                <blockquote className="about-quote">“We believe beauty is a ritual, not a routine.”</blockquote>
              </div>
              <p className="about-extra">
                Join us on a journey where skincare is mindful, luxurious, and always honest. Discover the Luminaire difference—where every product is a promise to your skin and the planet.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Products */}
      <section className="products" id="products">
        <h2>Our Products</h2>
        <div className="product-grid">
  {products.map((p) => (
    <motion.div
      key={p.name}
      className="product-card"
      whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(212,175,55,0.15)' }}
    >
      <img src={getImageUrl(p.img)} alt={p.name} loading="lazy" />
      <h3>{p.name}</h3>
      <p>{p.desc}</p>
      <button
        className="explore-btn"
        onClick={() => navigate(`/product?category=${encodeURIComponent(p.category)}`)}
      >
        Explore {p.category}
      </button>
    </motion.div>
  ))}
</div>

      </section>

      {/* Skincare Tips / Routine Guide */}
      <section className="tips" id="tips">
        <h2>Skincare Routine</h2>
        <div className="tip-cards-wrapper">
          {isMobile ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTip}
                  className="tip-card"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="tip-card-number-circle">{currentTip + 1}</span>
                  {tips[currentTip].img ? (
                    <img src={getImageUrl(tips[currentTip].img)} alt={tips[currentTip].step} className="tip-card-img-placeholder" />
                  ) : (
                    <div className="tip-card-img-placeholder">Image</div>
                  )}
                  <h3 className="tip-card-title">{tips[currentTip].step}</h3>
                  <p className="tip-card-desc">{tips[currentTip].desc}</p>
                </motion.div>
              </AnimatePresence>
              <div className="tip-slider-dots">
                {tips.map((_, idx) => (
                  <span
                    key={idx}
                    className={`tip-slider-dot${currentTip === idx ? ' active' : ''}`}
                    onClick={() => setCurrentTip(idx)}
                  />
                ))}
              </div>
            </>
          ) : (
            tips.map((tip, idx) => (
              <div key={tip.step} className="tip-card">
                <span className="tip-card-number-circle">{idx + 1}</span>
                {tip.img ? (
                  <img src={getImageUrl(tip.img)} alt={tip.step} className="tip-card-img-placeholder" />
                ) : (
                  <div className="tip-card-img-placeholder">Image</div>
                )}
                <h3 className="tip-card-title">{tip.step}</h3>
                <p className="tip-card-desc">{tip.desc}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonial-slider-modern">
          <button className="slider-btn" onClick={() => handleTestimonial(-1)} aria-label="Previous testimonial">&lt;</button>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={testimonialIdx}
              className="testimonial-card-modern"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <span className="testimonial-quote-icon">“</span>
              <p className="testimonial-text">{testimonials[testimonialIdx].text}</p>
              <span className="testimonial-user">- {testimonials[testimonialIdx].name}</span>
            </motion.div>
          </AnimatePresence>
          <button className="slider-btn" onClick={() => handleTestimonial(1)} aria-label="Next testimonial">&gt;</button>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleFormSubmit} autoComplete="off">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleFormChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleFormChange} required />
          <textarea name="message" placeholder="Message" value={form.message} onChange={handleFormChange} required />
          <button type="submit" className="send-btn">Send</button>
          {sent && <span className="sent-msg">Message sent!</span>}
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <span className="footer-logo">LUMINAIRE</span>
          <nav className="footer-links">
            <a href="#about" onClick={e => handleFooterLink(e, 'about')}>About</a>
            <a href="#products" onClick={e => handleFooterLink(e, 'products')}>Products</a>
            <a href="#tips" onClick={e => handleFooterLink(e, 'tips')}>Routine</a>
            <a href="#testimonials" onClick={e => handleFooterLink(e, 'testimonials')}>Testimonials</a>
            <a href="#contact" onClick={e => handleFooterLink(e, 'contact')}>Contact</a>
          </nav>
          <div className="footer-social">
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
          </div>
        </div>
        <span className="footer-copy">&copy; {new Date().getFullYear()} Luminaire Skin. All rights reserved.</span>
      </footer>
    </div>
  );
} 