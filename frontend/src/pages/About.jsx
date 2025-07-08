import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplet, FlaskConical, Flower } from 'lucide-react';
import './About.css';
import Navbar from './Navbar';
// import Footer from './Footer';
export default function About() {
  return (
    <>
      <section id="aboutus-section">
        {/* <div className="aboutus-container"> */}
          <h2 className="aboutus-title">About Us</h2>
          <div className="aboutus-divider"></div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aboutus-intro"
          >
            <p className="aboutus-intro-text">
              Luminaire Skin was born from a deep love for nature and a relentless pursuit of clean, honest skincare. Inspired by ancient botanicals and modern dermatology, we've created a line that nurtures your skin and your soul.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aboutus-highlight"
          >
            <h3 className="aboutus-subtitle">Our Mission</h3>
            <p className="aboutus-highlight-text">
              We empower individuals to embrace their natural beauty with confidence. Every formula we craft reflects our dedication to transparency, botanical purity, and sustainable wellness. This isn't just skincare — it's a ritual of self-love and mindful living.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="aboutus-corevalues"
          >
            <h3 className="aboutus-subtitle">Our Core Values</h3>
            <div className="aboutus-corevalues-grid">
              <div>
                <span className="aboutus-core-icon"><Leaf className="mx-auto" size={32} /></span>
                <h4 className="aboutus-core-title">Sustainability</h4>
                <p className="aboutus-core-desc">Eco-conscious sourcing & recyclable packaging.</p>
              </div>
              <div>
                <span className="aboutus-core-icon"><Droplet className="mx-auto" size={32} /></span>
                <h4 className="aboutus-core-title">Clean Ingredients</h4>
                <p className="aboutus-core-desc">No parabens, sulfates, or synthetic fragrances.</p>
              </div>
              <div>
                <span className="aboutus-core-icon"><FlaskConical className="mx-auto" size={32} /></span>
                <h4 className="aboutus-core-title">Clinically Tested</h4>
                <p className="aboutus-core-desc">Backed by science & dermatologically tested.</p>
              </div>
              <div>
                <span className="aboutus-core-icon"><Flower className="mx-auto" size={32} /></span>
                <h4 className="aboutus-core-title">Holistic Wellness</h4>
                <p className="aboutus-core-desc">A ritual that nourishes skin, mind, and spirit.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="aboutus-extra"
          >
            <p className="aboutus-extra-text">
              Our journey is guided by purpose, powered by passion. Every bottle is a testament to purity, care, and a belief in radiant skin for all.
            </p>
            <a
              href="/about"
              className="aboutus-cta-btn"
            >
              Learn More About Our Philosophy
            </a>
          </motion.div>
        {/* </div> */}
      </section>
      {/* <Footer /> */}
    </>
  );
}
