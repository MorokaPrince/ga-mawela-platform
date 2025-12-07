'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import { createScrollRevealAnimation, createParallaxAnimation } from '@/animations/gsapAnimations';

export default function HeroTab() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const slides = [
    '/Images/Mining/Landing home page 1.jpg',
    '/Images/Mining/Landing home page 2.jpg',
    '/Images/Mining/Landing home page 3.jpg',
    '/Images/Mining/Landing home page 4.jpg',
    '/Images/Mining/Landing home page 5.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    // Initialize GSAP animations
    if (heroRef.current) {
      createParallaxAnimation('.carousel-slide', 0.2);
    }

    // Animate content sections on scroll
    if (contentRef.current) {
      createScrollRevealAnimation('.hero-content-section', 0.2);
    }
  }, []);

  const handleExploreHistory = () => {
    const event = new CustomEvent('navigateToTab', { detail: 'historical' });
    window.dispatchEvent(event);
  };

  const handleViewEvidence = () => {
    const event = new CustomEvent('navigateToTab', { detail: 'evidence' });
    window.dispatchEvent(event);
  };

  return (
    <div ref={heroRef} className="flex flex-col w-full">
      {/* Enhanced Hero Section - Modern Marketing Style */}
      <motion.div
        className="w-full min-h-[85vh] relative flex items-center justify-start overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Image Carousel Background with Enhanced Effects */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 carousel-slide"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{
                scale: index === currentSlide ? 1 : 1.1,
                opacity: index === currentSlide ? 1 : 0
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                backgroundImage: `url('${slide}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            />
          ))}
        </div>

        {/* Enhanced Gradient Overlay with Multiple Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "100% 100%" }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 197, 0, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255, 107, 53, 0.3) 0%, transparent 50%)`,
            backgroundSize: '400px 400px'
          }}
        />

        {/* Enhanced Content - Modern Marketing Layout */}
        <div ref={contentRef} className="relative z-20 w-full px-8 md:px-16 py-16">
          <div className="max-w-6xl mx-0 hero-content-section">
            {/* Enhanced Main Heading with Modern Typography */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-8xl font-black text-white mb-4 font-merriweather leading-none tracking-tight">
                  <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
                    GA-MAWELA
                  </span>
                </h1>
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                  <p className="text-base md:text-lg text-yellow-200 font-medium font-inter tracking-wide">
                    Sedikane sa Rakgama
                  </p>
                </motion.div>
                <motion.p
                  className="text-xl md:text-2xl text-yellow-100 font-light mb-12 font-merriweather max-w-2xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  The Truth Restored
                </motion.p>
              </motion.div>
            </ScrollRevealWrapper>

            {/* Enhanced Description with Modern Typography */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
              <motion.div
                className="max-w-4xl space-y-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-inter font-light">
                  <span className="text-yellow-200 font-medium">Ga-Mawela</span> is the ancestral territory of Masetu and his descendants.
                  This platform documents the true lineage, collects evidence, and exposes contested narratives about land restitution in the Dwars River Valley.
                </p>
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="w-12 h-0.5 bg-yellow-400"></div>
                  <p className="text-base md:text-lg text-white/80 font-inter italic">
                    The Rakgama community stands united in reclaiming our heritage, our land, and our dignity.
                  </p>
                </motion.div>
                <motion.p
                  className="text-yellow-200 font-medium text-lg font-inter"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Join us in this journey of truth and restoration.
                </motion.p>
              </motion.div>
            </ScrollRevealWrapper>

            {/* Enhanced CTA Buttons - Professional Marketing Style */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
              <motion.div
                className="flex flex-col sm:flex-row gap-6 mt-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.button
                  type="button"
                  onClick={handleExploreHistory}
                  className="btn-professional group"
                  title="Explore the history of Ga-Mawela"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>Explore History</span>
                    <motion.span
                      className="text-2xl"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleViewEvidence}
                  className="px-8 py-4 bg-white/10 text-white font-bold font-inter text-base border-2 border-white/60 backdrop-blur-md rounded-xl relative overflow-hidden group hover:bg-white/20 hover:border-white/80 transition-all duration-300"
                  title="View evidence and documentation"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>View Evidence</span>
                    <motion.span
                      className="text-xl"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.button>
              </motion.div>
            </ScrollRevealWrapper>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-8 md:left-16 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-yellow w-8' : 'bg-white/50 hover:bg-white/70'
              }`}
              title={`Go to slide ${index + 1}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Fraud Exposure - Compact Horizontal Layout */}
      <div className="w-full py-12 px-6 md:px-12 bg-metallic-blue-gradient-vertical relative overflow-hidden">
        {/* Background Image - Top Right Corner */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none bg-fraud-section-bg"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollRevealWrapper type="fadeUp" duration={0.8}>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-lighter mb-8 font-merriweather">
              Exposing the Fraud
            </h2>
          </ScrollRevealWrapper>

          {/* Enhanced Three Column Layout with Professional Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Mankge Family Fraud */}
            <motion.div
              className="card-professional group cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8">
                <motion.div
                  className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <span className="text-red-400 text-2xl">⚠️</span>
                </motion.div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4 font-merriweather">
                  The Mankge Deception
                </h3>
                <p className="text-white/90 font-inter leading-relaxed text-sm">
                  Fraudulent claim through corrupt dealings with government officials. Never benefited Ga-Mawela people.
                </p>
              </div>
            </motion.div>

            {/* True Lineage */}
            <motion.div
              className="card-professional group cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="p-8">
                <motion.div
                  className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: -5, scale: 1.1 }}
                >
                  <span className="text-blue-400 text-2xl">👑</span>
                </motion.div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4 font-merriweather">
                  True Descendants
                </h3>
                <div className="space-y-3 text-white/90 font-inter text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span><strong>Masetu</strong> - Founder</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span><strong>Sons:</strong> Lesedi & Moroka (brothers)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Community Impact */}
            <motion.div
              className="card-professional group cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="p-8">
                <motion.div
                  className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <span className="text-green-400 text-2xl">🎯</span>
                </motion.div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4 font-merriweather">
                  Our Mission
                </h3>
                <p className="text-white/90 font-inter leading-relaxed text-sm">
                  Restore truth, reclaim heritage, and secure justice for Ga-Mawela community.
                </p>
                <motion.div
                  className="mt-4 flex items-center gap-2 text-yellow-400 font-medium"
                  whileHover={{ x: 5 }}
                >
                  <span>Learn More</span>
                  <span>→</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

