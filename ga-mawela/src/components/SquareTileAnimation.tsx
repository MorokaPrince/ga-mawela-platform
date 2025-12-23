'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SquareTileAnimationProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  gridSize?: number;
  animationSpeed?: number;
  autoLoop?: boolean;
}

export default function SquareTileAnimation({ 
  imageSrc, 
  title, 
  subtitle,
  gridSize = 8,
  animationSpeed = 200,
  autoLoop = true
}: SquareTileAnimationProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tiles, setTiles] = useState<boolean[]>([]);

  // Sample images for the animation sequence
  const images = [
    '/Images/Mining/Landing home page 1.jpg',
    '/Images/Mining/Landing home page 2.jpg',
    '/Images/Mining/Landing home page 3.jpg',
    '/Images/Mining/Landing home page 4.jpg',
    '/Images/Mining/Landing home page 5.jpg'
  ];

  const totalTiles = gridSize * gridSize;

  useEffect(() => {
    // Initialize tiles state with delay to avoid cascading renders
    const timer = setTimeout(() => {
      setTiles(new Array(totalTiles).fill(false));
    }, 100);
    
    return () => clearTimeout(timer);
  }, [totalTiles]);

  const triggerTileAnimation = () => {
    setIsAnimating(true);
    
    // Reset all tiles to false
    setTiles(new Array(totalTiles).fill(false));
    
    // Animate tiles in sequence
    const sequence = Array.from({ length: totalTiles }, (_, i) => i);
    
    sequence.forEach((tileIndex, sequenceIndex) => {
      setTimeout(() => {
        setTiles(prev => {
          const newTiles = [...prev];
          newTiles[tileIndex] = true;
          return newTiles;
        });
      }, sequenceIndex * (animationSpeed / totalTiles));
    });

    // Change image when animation completes
    setTimeout(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, sequence.length * (animationSpeed / totalTiles) + 500);

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, sequence.length * (animationSpeed / totalTiles) + 1000);
  };

  useEffect(() => {
    if (!autoLoop) return;

    const interval = setInterval(() => {
      triggerTileAnimation();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoLoop]);

  const handleTileClick = (index: number) => {
    if (isAnimating) return;
    
    // Manual tile reveal
    setTiles(prev => {
      const newTiles = [...prev];
      newTiles[index] = !newTiles[index];
      return newTiles;
    });
  };

  // Calculate the correct background position for each tile to show image fragments
  const getTileBackgroundStyle = (index: number) => {
    const currentImage = images[currentImageIndex];
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    
    // Calculate the percentage position for this tile
    const posX = (col / (gridSize - 1)) * 100;
    const posY = (row / (gridSize - 1)) * 100;
    
    return {
      backgroundImage: `url('${currentImage}')`,
      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
      backgroundPosition: `${posX}% ${posY}%`,
      backgroundRepeat: 'no-repeat'
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const tileVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: 90
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0
    }
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] bg-metallic-blue-dark overflow-hidden rounded-lg">
      {/* Background Grid */}
      <div className="absolute inset-0 p-4">
        <motion.div 
          className="w-full h-full relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div 
            className="grid gap-1 w-full h-full"
            style={{ 
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`
            }}
          >
            {Array.from({ length: totalTiles }).map((_, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-md cursor-pointer group"
                variants={tileVariants}
                onClick={() => handleTileClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Tile Background with Image */}
                <div className="w-full h-full relative overflow-hidden">
                  <AnimatePresence>
                    {tiles[index] && (
                      <motion.div
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        style={getTileBackgroundStyle(index)}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Default overlay when tile is not revealed */}
                  <div className="absolute inset-0 bg-gradient-to-br from-metallic-blue-light to-metallic-blue-dark opacity-90 group-hover:opacity-70 transition-opacity duration-300" />
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Tile border */}
                  <div className="absolute inset-0 border border-white/10 group-hover:border-yellow/50 transition-colors duration-300 rounded-md" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
        {/* Top Section - Title */}
        <div className="pointer-events-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-merriweather">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white/80 text-sm md:text-base font-inter">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>

        {/* Bottom Section - Controls */}
        <div className="flex items-center justify-between pointer-events-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-white/60 text-xs font-inter"
          >
            {currentImageIndex + 1} / {images.length}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex gap-2"
          >
            <button
              onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
              className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={triggerTileAnimation}
              className="w-8 h-8 bg-yellow/20 backdrop-blur-md border border-yellow/30 rounded-full flex items-center justify-center hover:bg-yellow/30 transition-all"
              aria-label="Reveal tiles"
            >
              <svg className="w-4 h-4 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button
              onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
              className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
          initial={{ width: '0%' }}
          animate={{ 
            width: isAnimating ? '100%' : '0%',
            transition: { duration: sequenceDuration / 1000, ease: 'easeInOut' }
          }}
          key={isAnimating ? 'progress' : 'idle'}
        />
      </div>
    </div>
  );
}

// Helper function to calculate sequence duration
const sequenceDuration = 200; // milliseconds