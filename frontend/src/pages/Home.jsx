import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';
import Navbar from './Navbar';

const products = [
  { name: 'Radiance Serum', desc: 'Brightens and revitalizes skin.', img: '/images/h1.jpeg', category: 'Serums' },
  { name: 'Hydra Cream', desc: 'Deep hydration for a dewy glow.', img: '/images/h2.jpeg', category: 'Creams' },
  { name: 'Botanical Cleanser', desc: 'Gentle, natural cleansing.', img: '/images/h3.jpeg', category: 'Cleansers' },
];


const testimonials = [
  { name: 'Sophia L.', text: 'My skin has never felt so luxurious and healthy!' },
  { name: 'Emma R.', text: 'The botanical cleanser is a game changer.' },
  { name: 'Olivia M.', text: 'Elegant, effective, and gentle on my skin.' },
];

const tips = [
  { step: 'Cleanse', desc: 'Start with a gentle botanical cleanser.' },
  { step: 'Serum', desc: 'Apply radiance serum for glow.' },
  { step: 'Moisturize', desc: 'Lock in hydration with our cream.' },
];

export default function Home() {
  const [tipOpen, setTipOpen] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();


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
        <img src="/images/skincare.jpg" alt="Luxury skincare" className="hero-bg" loading="eager" fetchpriority="high" decoding="async" width="1920" height="1080" />
      </section>

      {/* About Us */}
      <section className="about" id="about">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="about-content">
          <img src="/images/about.jpeg" alt="About us" className="about-img" loading="eager" />
          <div>
            <h2>About Us</h2>
            <p>
              At Luminaire Skin, we blend nature and science to create luxurious skincare rituals. Our products are crafted with botanical extracts and advanced actives for radiant, healthy skin.
            </p>
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
      <img src={p.img} alt={p.name} loading="lazy" />
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
        <div className="tip-accordion">
          {tips.map((tip, idx) => (
            <div key={tip.step} className={`tip-item${tipOpen === idx ? ' open' : ''}`}> 
              <button className="tip-title" onClick={() => handleTipToggle(idx)}>{tip.step}</button>
              <motion.div initial={false} animate={{ height: tipOpen === idx ? 'auto' : 0, opacity: tipOpen === idx ? 1 : 0 }} className="tip-desc">
                <p>{tip.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonial-slider">
          <button className="slider-btn" onClick={() => handleTestimonial(-1)}>&lt;</button>
          <motion.div key={testimonialIdx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="testimonial-card">
            <p>"{testimonials[testimonialIdx].text}"</p>
            <span>- {testimonials[testimonialIdx].name}</span>
          </motion.div>
          <button className="slider-btn" onClick={() => handleTestimonial(1)}>&gt;</button>
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