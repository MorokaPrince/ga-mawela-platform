'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  website?: string;
}

const partners: Partner[] = [
  {
    id: '1',
    name: 'G20 South Africa',
    logo: '/Images/sponsours/g20-sa.png',
    description: 'Official G20 South Africa Presidency',
    category: 'G20 Presidency',
    website: 'https://g20.org'
  },
  {
    id: '2',
    name: 'Y20 South Africa',
    logo: 'https://logo.clearbit.com/y20southafrica.org',
    description: 'Youth engagement in G20 process',
    category: 'G20 Presidency',
    website: 'https://y20southafrica.org'
  },
  {
    id: '3',
    name: 'B20 South Africa',
    logo: 'https://logo.clearbit.com/b20southafrica.org',
    description: 'Business sector engagement in G20',
    category: 'G20 Presidency',
    website: 'https://b20southafrica.org'
  },
  {
    id: '4',
    name: 'DIRCO',
    logo: 'https://logo.clearbit.com/dirco.gov.za',
    description: 'Department of International Relations',
    category: 'Government',
    website: 'https://dirco.gov.za'
  },
  {
    id: '5',
    name: 'The Presidency',
    logo: 'https://logo.clearbit.com/thepresidency.gov.za',
    description: 'South African Presidency',
    category: 'Government',
    website: 'https://www.thepresidency.gov.za'
  },
  {
    id: '6',
    name: 'Innovation Bridge',
    logo: '/assets/images/innovation-bridge-logo.png',
    description: 'Technology innovation platform',
    category: 'Innovation',
    website: 'https://innovationbridge.info'
  },
  {
    id: '7',
    name: 'CSIR',
    logo: 'https://logo.clearbit.com/csir.co.za',
    description: 'Council for Scientific & Industrial Research',
    category: 'Innovation',
    website: 'https://www.csir.co.za'
  },
  {
    id: '8',
    name: 'Anglo American',
    logo: '/Images/sponsours/anglo-american.png',
    description: 'Major mining corporation',
    category: 'Mining',
    website: 'https://www.angloamerican.com'
  },
  {
    id: '9',
    name: 'AngloGold Ashanti',
    logo: 'https://logo.clearbit.com/anglogoldashanti.com',
    description: 'South African mining company',
    category: 'Mining',
    website: 'https://www.anglogoldashanti.com'
  },
  {
    id: '10',
    name: 'Impala Platinum',
    logo: '/assets/logos/implats.png',
    description: 'Platinum group metals mining',
    category: 'Mining',
    website: 'https://www.implats.co.za'
  },
  {
    id: '11',
    name: 'Sibanye-Stillwater',
    logo: 'https://logo.clearbit.com/sibanyestillwater.com',
    description: 'Precious metals mining',
    category: 'Mining',
    website: 'https://www.sibanyestillwater.com'
  },
  {
    id: '12',
    name: 'SAHRA',
    logo: '/assets/logos/sahra.png',
    description: 'South African Heritage Resources Agency',
    category: 'Heritage',
    website: 'http://www.sahra.org.za'
  },
  {
    id: '13',
    name: 'NYDA',
    logo: '/assets/logos/nyda.png',
    description: 'National Youth Development Agency',
    category: 'Youth',
    website: 'https://www.nyda.gov.za'
  },
  {
    id: '14',
    name: 'Zimele',
    logo: '/Images/sponsours/zimele.png',
    description: 'Community development',
    category: 'Community',
    website: 'https://www.zimele.co.za'
  }
];

export default function CompactPartnersSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(partners.length / 6));
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const getVisiblePartners = () => {
    const startIndex = currentIndex * 6;
    return partners.slice(startIndex, startIndex + 6);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const tileVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -20
    }
  };

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical py-8 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFC107' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-yellow mb-2 font-merriweather">
            Partner Network
          </h3>
          <p className="text-white/70 text-sm font-inter">
            Collaborative partnerships driving community development
          </p>
        </motion.div>

        {/* Compact Slideshow Container */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="grid grid-cols-3 md:grid-cols-6 gap-3"
              variants={tileVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {getVisiblePartners().map((partner, index) => (
                <motion.div
                  key={partner.id}
                  className="group relative"
                  variants={tileVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Square Tile */}
                  <div className="aspect-square bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden hover:border-yellow/50 transition-all duration-300 cursor-pointer relative">
                    {/* Logo Container */}
                    <div className="w-full h-full flex items-center justify-center p-2 relative">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/Images/sponsours/zimele.png';
                        }}
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                        <p className="text-white text-xs font-semibold leading-tight mb-1">
                          {partner.name}
                        </p>
                        <span className="text-yellow/80 text-xs">
                          {partner.category}
                        </span>
                      </div>
                    </div>

                    {/* Click Handler */}
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-10"
                        title={`Visit ${partner.name}`}
                      />
                    )}
                  </div>

                  {/* Category Badge (visible on hover) */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-yellow text-black text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    {partner.category}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(partners.length / 6) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-yellow w-6'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play controls */}
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : Math.ceil(partners.length / 6) - 1)}
            className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Previous partners"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentIndex(prev => (prev + 1) % Math.ceil(partners.length / 6))}
            className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Next partners"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Partner Count */}
        <div className="text-center mt-4">
          <span className="text-white/60 text-xs font-inter">
            {partners.length} Partners • {Math.ceil(partners.length / 6)} Groups
          </span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-yellow/10 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}