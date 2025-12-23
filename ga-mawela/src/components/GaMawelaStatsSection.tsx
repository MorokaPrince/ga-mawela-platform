'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
  color: string;
  icon: string;
}

export default function GaMawelaStatsSection() {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const stats: StatItem[] = [
    {
      id: 'lineage',
      value: '200+',
      label: 'Years of Heritage',
      description: 'Documented lineage from Masetu to present day',
      color: 'from-yellow-400 to-yellow-600',
      icon: '👑'
    },
    {
      id: 'community',
      value: '150+',
      label: 'Community Members',
      description: 'Rakgama family members and descendants',
      color: 'from-blue-400 to-blue-600',
      icon: '👥'
    },
    {
      id: 'evidence',
      value: '500+',
      label: 'Evidence Documents',
      description: 'Historical records, photographs, and legal documents',
      color: 'from-green-400 to-green-600',
      icon: '📄'
    },
    {
      id: 'heritage',
      value: '50+',
      label: 'Sacred Sites',
      description: 'Protected cultural and heritage locations',
      color: 'from-purple-400 to-purple-600',
      icon: '🏛️'
    },
    {
      id: 'legacy',
      value: '7',
      label: 'Generations',
      description: 'From Masetu through to current youth',
      color: 'from-orange-400 to-orange-600',
      icon: '🌳'
    },
    {
      id: 'land',
      value: '1200',
      label: 'Hectares',
      description: 'Original ancestral territory in Dwars River Valley',
      color: 'from-emerald-400 to-emerald-600',
      icon: '🌍'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentStatIndex((prevIndex) => 
          prevIndex === stats.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 500); // Half second for fade out
      
    }, 2500); // Total cycle: 2s visible + 0.5s fade out

    return () => clearInterval(interval);
  }, [stats.length]);

  const currentStat = stats[currentStatIndex];

  return (
    <div className="w-full py-16 bg-metallic-blue-gradient-vertical relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255, 197, 0, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 70% 80%, rgba(13, 27, 42, 0.5) 0%, transparent 50%)`,
            backgroundSize: '600px 600px'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-merriweather">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Ga-Mawela Heritage
            </span>
          </h2>
          <p className="text-white/80 text-lg font-inter max-w-2xl mx-auto">
            Preserving truth, documenting legacy, and restoring dignity through comprehensive heritage documentation
          </p>
        </motion.div>

        {/* Animated Statistics Cards */}
        <div className="relative h-64 md:h-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStat.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                scale: isVisible ? 1 : 0.8,
                y: isVisible ? 0 : 50
              }}
              transition={{ 
                duration: 0.5, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-md mx-auto">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center shadow-2xl hover:bg-white/20 transition-all duration-300"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-6xl mb-4"
                  >
                    {currentStat.icon}
                  </motion.div>

                  {/* Value */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4"
                  >
                    <span className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${currentStat.color} bg-clip-text text-transparent font-merriweather`}>
                      {currentStat.value}
                    </span>
                  </motion.div>

                  {/* Label */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-3"
                  >
                    <h3 className="text-xl font-bold text-yellow font-merriweather">
                      {currentStat.label}
                    </h3>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-white/80 font-inter text-sm leading-relaxed">
                      {currentStat.description}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-8 space-x-2"
        >
          {stats.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStatIndex 
                  ? 'bg-yellow scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                setCurrentStatIndex(index);
                setIsVisible(true);
              }}
            />
          ))}
        </motion.div>

        {/* Auto-play indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6"
        >
          <p className="text-white/60 text-xs font-inter">
            Auto-cycling through heritage statistics
          </p>
        </motion.div>
      </div>
    </div>
  );
}