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
      {/* Hero Section - Image Carousel with Overlay Content */}
      <motion.div
        className="w-full min-h-[75vh] relative flex items-center justify-start overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Image Carousel Background */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 carousel-slide ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${slide}')`,
              }}
            />
          ))}
        </div>

        {/* Dark Overlay - Tinted and Faded */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

        {/* Content - Left Aligned Landscape Layout */}
        <div ref={contentRef} className="relative z-20 w-full px-8 md:px-16 py-12">
          <div className="max-w-6xl mx-0 hero-content-section">
            {/* Main Heading with Animation */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 font-merriweather leading-tight">
                GA-MAWELA
              </h1>
              <p className="text-sm md:text-base text-yellow/80 font-light mb-1 font-inter italic">
                Sedikane sa Rakgama
              </p>
              <p className="text-lg md:text-xl text-yellow/90 font-light mb-8 font-merriweather">
                The Truth Restored
              </p>
            </ScrollRevealWrapper>

            {/* Description with Animation - Landscape Layout */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
              <p className="text-base md:text-lg text-white mb-4 leading-relaxed font-inter max-w-3xl">
                Ga-Mawela is the ancestral territory of Masetu and his descendants. This platform documents the true lineage, collects evidence, and exposes contested narratives about land restitution in the Dwars River Valley.
              </p>
              <p className="text-sm md:text-base text-white mb-8 leading-relaxed font-inter max-w-3xl">
                The Rakgama community stands united in reclaiming our heritage, our land, and our dignity. Join us in this journey of truth and restoration.
              </p>
            </ScrollRevealWrapper>

            {/* CTA Buttons - Horizontal with Enhanced Animations */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
              <div className="flex flex-row gap-4">
                <motion.button
                  type="button"
                  onClick={handleExploreHistory}
                  className="px-8 py-4 bg-yellow text-black font-bold font-inter text-sm md:text-base relative overflow-hidden group"
                  title="Explore the history of Ga-Mawela"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">Explore History</span>
                  <motion.div
                    className="absolute inset-0 bg-yellow/80"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleViewEvidence}
                  className="px-8 py-4 bg-white/20 text-white font-bold font-inter text-sm md:text-base border-2 border-white/50 backdrop-blur-sm relative overflow-hidden group"
                  title="View evidence and documentation"
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    borderColor: "rgba(255, 255, 255, 0.8)",
                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">View Evidence</span>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
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

          {/* Three Column Compact Landscape Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mankge Family Fraud */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0}>
              <div className="card-interactive bg-white/15 backdrop-blur-md p-6 border border-white/30 hover:border-yellow/60 rounded-lg hover:bg-white/20">
                <h3 className="text-lg font-bold text-yellow mb-3 font-merriweather">
                  The Mankge Deception
                </h3>
                <p className="text-white font-inter leading-relaxed text-xs">
                  Fraudulent claim through corrupt dealings with government officials. Never benefited Ga-Mawela people.
                </p>
              </div>
            </ScrollRevealWrapper>

            {/* True Lineage */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
              <div className="card-interactive bg-white/15 backdrop-blur-md p-6 border border-white/30 hover:border-yellow/60 rounded-lg hover:bg-white/20">
                <h3 className="text-lg font-bold text-yellow mb-3 font-merriweather">
                  True Descendants
                </h3>
                <p className="text-white font-inter text-xs mb-2">
                  <strong>Masetu</strong> - Founder
                </p>
                <p className="text-white font-inter text-xs">
                  <strong>Sons:</strong> Lesedi & Moroka (brothers)
                </p>
              </div>
            </ScrollRevealWrapper>

            {/* Community Impact */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
              <div className="card-interactive bg-gradient-to-r from-yellow/20 to-yellow/10 backdrop-blur-md p-6 border border-yellow/40 rounded-lg hover:from-yellow/25 hover:to-yellow/15">
                <h3 className="text-lg font-bold text-yellow mb-3 font-merriweather">
                  Our Mission
                </h3>
                <p className="text-white font-inter text-xs">
                  Restore truth, reclaim heritage, and secure justice for Ga-Mawela community.
                </p>
              </div>
            </ScrollRevealWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

