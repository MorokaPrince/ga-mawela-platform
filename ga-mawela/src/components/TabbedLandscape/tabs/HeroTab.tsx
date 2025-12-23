'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import SquareTileAnimation from '@/components/SquareTileAnimation';
import YouthChallengeSection from '@/components/YouthChallengeSection';
import GaMawelaStatsSection from '@/components/GaMawelaStatsSection';
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
    }, 8000); // Increased from 5000ms to 8000ms for slower transitions
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
      {/* Enhanced Hero Section with Square Tile Animation */}
      <motion.div
        className="w-full min-h-[85vh] relative flex items-center justify-start overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Square Tile Animation Background */}
        <div className="absolute inset-0 w-full h-full">
          <SquareTileAnimation
            imageSrc={slides[currentSlide]}
            title="Ga-Mawela Heritage"
            subtitle="Truth • Heritage • Justice"
            gridSize={8}
            animationSpeed={3000}
            autoLoop={true}
          />
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

        {/* Enhanced Content - Mobile-Optimized Layout */}
        <div ref={contentRef} className="relative z-20 w-full px-4 sm:px-8 md:px-16 py-8 md:py-16">
          <div className="max-w-6xl mx-0 hero-content-section">
            {/* Enhanced Main Heading with Better Mobile Typography */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-3 md:mb-4 font-merriweather leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
                    GA-MAWELA
                  </span>
                </h1>
                <motion.div
                  className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-12 md:w-16 h-0.5 md:h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                  <p className="text-sm md:text-base lg:text-lg text-yellow-200 font-medium font-inter tracking-wide">
                    Sedikane sa Rakgama
                  </p>
                </motion.div>
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-yellow-100 font-light mb-8 md:mb-12 font-merriweather max-w-2xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  The Truth Restored
                </motion.p>
              </motion.div>
            </ScrollRevealWrapper>

            {/* Enhanced Description with Better Mobile Typography */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
              <motion.div
                className="max-w-4xl space-y-4 md:space-y-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-inter font-light">
                  <span className="text-yellow-200 font-medium">Ga-Mawela</span> is the ancestral territory of Masetu and his descendants.
                  This platform documents the true lineage, collects evidence, and exposes contested narratives about land restitution in the Dwars River Valley.
                </p>
                <motion.div
                  className="flex items-center gap-2 md:gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="w-8 md:w-12 h-0.5 bg-yellow-400"></div>
                  <p className="text-sm md:text-base lg:text-lg text-white/80 font-inter italic">
                    The Rakgama community stands united in reclaiming our heritage, our land, and our dignity.
                  </p>
                </motion.div>
                <motion.p
                  className="text-yellow-200 font-medium text-base md:text-lg font-inter"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Join us in this journey of truth and restoration.
                </motion.p>
              </motion.div>
            </ScrollRevealWrapper>

            {/* Enhanced CTA Buttons - Mobile-Optimized */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.button
                  type="button"
                  onClick={handleExploreHistory}
                  className="px-6 md:px-8 py-3 md:py-4 bg-yellow text-black font-bold font-inter text-sm md:text-base relative overflow-hidden group hover:scale-105 transition-all duration-300"
                  title="Explore the history of Ga-Mawela"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                    <span>Explore History</span>
                    <motion.span
                      className="text-lg md:text-xl"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </span>
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
                  className="px-6 md:px-8 py-3 md:py-4 bg-white/20 text-white font-bold font-inter text-sm md:text-base border-2 border-white/50 backdrop-blur-sm rounded-lg relative overflow-hidden group hover:bg-white/30 hover:border-white/70 transition-all duration-300"
                  title="View evidence and documentation"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                    <span>View Evidence</span>
                    <motion.span
                      className="text-lg md:text-xl"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </ScrollRevealWrapper>
          </div>
        </div>

        {/* Enhanced Carousel Indicators - Mobile Friendly */}
        <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 lg:left-16 z-30 flex gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 touch-manipulation ${
                index === currentSlide
                  ? 'bg-yellow w-6 md:w-8 h-3'
                  : 'bg-white/50 hover:bg-white/70 w-3 h-3 hover:scale-110'
              }`}
              title={`Go to slide ${index + 1}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Youth Challenge Section - Emphasizing Community Status */}
      <YouthChallengeSection />

      {/* Ga-Mawela Heritage Statistics Section */}
      <GaMawelaStatsSection />

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

          {/* Restored Three Column Layout with Original Metallic Blue Colors - Mobile Optimized */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {/* Mankge Family Fraud */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0}>
              <div className="card-interactive bg-white/15 backdrop-blur-md p-4 md:p-6 border border-white/30 hover:border-yellow/60 rounded-lg hover:bg-white/20">
                <h3 className="text-base md:text-lg font-bold text-yellow mb-2 md:mb-3 font-merriweather">
                  The Mankge Deception
                </h3>
                <p className="text-white font-inter leading-relaxed text-xs md:text-sm">
                  Fraudulent claim through corrupt dealings with government officials. Never benefited Ga-Mawela people.
                </p>
              </div>
            </ScrollRevealWrapper>

            {/* True Lineage */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
              <div className="card-interactive bg-white/15 backdrop-blur-md p-4 md:p-6 border border-white/30 hover:border-yellow/60 rounded-lg hover:bg-white/20">
                <h3 className="text-base md:text-lg font-bold text-yellow mb-2 md:mb-3 font-merriweather">
                  True Descendants
                </h3>
                <p className="text-white font-inter text-xs md:text-sm mb-2">
                  <strong>Masetu</strong> - Founder
                </p>
                <p className="text-white font-inter text-xs md:text-sm">
                  <strong>Sons:</strong> Lesedi & Moroka (brothers)
                </p>
              </div>
            </ScrollRevealWrapper>

            {/* Community Impact */}
            <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
              <div className="card-interactive bg-gradient-to-r from-yellow/20 to-yellow/10 backdrop-blur-md p-4 md:p-6 border border-yellow/40 rounded-lg hover:from-yellow/25 hover:to-yellow/15">
                <h3 className="text-base md:text-lg font-bold text-yellow mb-2 md:mb-3 font-merriweather">
                  Our Mission
                </h3>
                <p className="text-white font-inter text-xs md:text-sm">
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

