import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplet, FlaskConical, Flower } from 'lucide-react';
import Navbar from './Navbar';
export default function About() {
  return (
    
      <section id="about" className="bg-[#f8f6f2] px-6 py-16 lg:px-20">
      {/* Title & Intro */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl lg:text-5xl font-serif text-[#2d2d2d] mb-6">
          Rooted in Nature. Backed by Science.
        </h2>
        <p className="text-lg text-[#6b6b6b] max-w-3xl mx-auto">
          Luminaire Skin was born from a deep love for nature and a relentless pursuit of clean, honest skincare. Inspired by ancient botanicals and modern dermatology, we’ve created a line that nurtures your skin and your soul.
        </p>
      </motion.div>

      {/* Mission Section (Gradient Background) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-r from-[#fff8ec] to-[#f0e8dc] p-10 rounded-xl shadow-inner max-w-6xl mx-auto text-center"
      >
        <h3 className="text-3xl font-serif text-[#2d2d2d] mb-4">Our Mission</h3>
        <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-3xl mx-auto">
          We empower individuals to embrace their natural beauty with confidence. Every formula we craft reflects our dedication to transparency, botanical purity, and sustainable wellness. This isn’t just skincare — it’s a ritual of self-love and mindful living.
        </p>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-20 max-w-6xl mx-auto"
      >
        <h3 className="text-3xl font-serif text-[#2d2d2d] text-center mb-8">Our Core Values</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <Leaf className="mx-auto text-[#b7c6b0]" size={32} />
            <h4 className="mt-4 font-medium text-[#2d2d2d]">Sustainability</h4>
            <p className="text-sm text-[#6b6b6b]">Eco-conscious sourcing & recyclable packaging.</p>
          </div>
          <div>
            <Droplet className="mx-auto text-[#b7c6b0]" size={32} />
            <h4 className="mt-4 font-medium text-[#2d2d2d]">Clean Ingredients</h4>
            <p className="text-sm text-[#6b6b6b]">No parabens, sulfates, or synthetic fragrances.</p>
          </div>
          <div>
            <FlaskConical className="mx-auto text-[#b7c6b0]" size={32} />
            <h4 className="mt-4 font-medium text-[#2d2d2d]">Clinically Tested</h4>
            <p className="text-sm text-[#6b6b6b]">Backed by science & dermatologically tested.</p>
          </div>
          <div>
            <Flower className="mx-auto text-[#b7c6b0]" size={32} />
            <h4 className="mt-4 font-medium text-[#2d2d2d]">Holistic Wellness</h4>
            <p className="text-sm text-[#6b6b6b]">A ritual that nourishes skin, mind, and spirit.</p>
          </div>
        </div>
      </motion.div>

      {/* Closing CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-16 text-center max-w-3xl mx-auto"
      >
        <p className="text-[#6b6b6b] text-lg">
          Our journey is guided by purpose, powered by passion. Every bottle is a testament to purity, care, and a belief in radiant skin for all.
        </p>
        <a
          href="/about"
          className="inline-block mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b76e79] text-white font-medium shadow-md hover:scale-105 transition"
        >
          Learn More About Our Philosophy
        </a>
      </motion.div>
    </section>
    
    
  );
}
