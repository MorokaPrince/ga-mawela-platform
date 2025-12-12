'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaPlay, FaPause } from 'react-icons/fa';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  website?: string;
}

const partners: Partner[] = [
  // G20 South Africa Presidency & Engagement Groups
  {
    id: '1',
    name: 'G20 South Africa',
    logo: '/Images/sponsours/g20-sa.png',
    description: 'Official G20 South Africa Presidency and global economic cooperation',
    category: 'G20 Presidency',
    website: 'https://g20.org'
  },
  {
    id: '2',
    name: 'Y20 South Africa',
    logo: 'https://logo.clearbit.com/y20southafrica.org',
    description: 'Youth 20 South Africa - Youth engagement in G20 process',
    category: 'G20 Presidency',
    website: 'https://y20southafrica.org'
  },
  {
    id: '3',
    name: 'B20 South Africa',
    logo: 'https://logo.clearbit.com/b20southafrica.org',
    description: 'Business 20 South Africa - Private sector engagement in G20',
    category: 'G20 Presidency',
    website: 'https://b20southafrica.org'
  },
  {
    id: '4',
    name: 'DIRCO',
    logo: 'https://logo.clearbit.com/dirco.gov.za',
    description: 'Department of International Relations & Cooperation',
    category: 'Government',
    website: 'https://dirco.gov.za'
  },
  {
    id: '5',
    name: 'The Presidency',
    logo: 'https://logo.clearbit.com/thepresidency.gov.za',
    description: 'The Presidency - Media and G20 Resources',
    category: 'Government',
    website: 'https://www.thepresidency.gov.za'
  },

  // Innovation Bridge, Tech & SA Innovation Ecosystem
  {
    id: '6',
    name: 'Innovation Bridge Portal',
    logo: '/assets/images/innovation-bridge-logo.png',
    description: 'G20 Open Innovation Platform and technology innovation hub',
    category: 'Innovation',
    website: 'https://innovationbridge.info'
  },
  {
    id: '7',
    name: 'Technology Innovation Agency',
    logo: 'https://logo.clearbit.com/tia.org.za',
    description: 'National innovation agency supporting technology development',
    category: 'Innovation',
    website: 'http://www.tia.org.za'
  },
  {
    id: '8',
    name: 'Council for Scientific & Industrial Research',
    logo: 'https://logo.clearbit.com/csir.co.za',
    description: 'CSIR - Leading scientific research organization',
    category: 'Innovation',
    website: 'https://www.csir.co.za'
  },

  // Mining Industry Partners, Innovation Hubs & CSI Organizations
  {
    id: '9',
    name: 'Anglo American',
    logo: '/Images/sponsours/anglo-american.png',
    description: 'Major mining corporation with community development programs',
    category: 'Mining',
    website: 'https://www.angloamerican.com'
  },
  {
    id: '10',
    name: 'AngloGold Ashanti',
    logo: 'https://logo.clearbit.com/anglogoldashanti.com',
    description: 'South African legacy projects and community development',
    category: 'Mining',
    website: 'https://www.anglogoldashanti.com/sustainability/social/people/sa-legacy-projects/'
  },
  {
    id: '11',
    name: 'Impala Platinum',
    logo: '/Images/sponsours/implats.png',
    description: 'Platinum group metals mining and processing',
    category: 'Mining',
    website: 'https://www.implats.co.za'
  },
  {
    id: '12',
    name: 'Sibanye-Stillwater',
    logo: 'https://logo.clearbit.com/sibanyestillwater.com',
    description: 'Precious metals mining company with community initiatives',
    category: 'Mining',
    website: 'https://www.sibanyestillwater.com/news-investors/media-gallery/'
  },
  {
    id: '13',
    name: 'Mandela Mining Precinct',
    logo: 'https://logo.clearbit.com/mandelaminingprecinct.org.za',
    description: 'Mining innovation hub and research collaboration',
    category: 'Mining Innovation',
    website: 'https://mandelaminingprecinct.org.za'
  },
  {
    id: '14',
    name: 'MEMSA',
    logo: 'https://logo.clearbit.com/memsa.org.za',
    description: 'Mining Equipment Manufacturers of South Africa',
    category: 'Mining Innovation',
    website: 'https://memsa.org.za'
  },
  {
    id: '15',
    name: 'Minerals Council South Africa',
    logo: 'https://logo.clearbit.com/mineralscouncil.org.za',
    description: 'Industry association representing mining companies',
    category: 'Mining Industry',
    website: 'https://www.mineralscouncil.org.za'
  },

  // Land Affairs, Agriculture & Rural Development
  {
    id: '16',
    name: 'Department of Agriculture, Land Reform & Rural Development',
    logo: '/Images/sponsours/thumb_department_of_land_reform_and_rural_development_(dlrrd).png',
    description: 'Land restitution, agriculture and rural development initiatives',
    category: 'Government',
    website: 'https://www.dalrrd.gov.za'
  },
  {
    id: '17',
    name: 'Department of Mineral Resources and Energy',
    logo: '/Images/sponsours/Department-of-Mineral-Resources-and-Energy-1200x675-cropped.jpg',
    description: 'Government oversight of mining operations and energy policy',
    category: 'Government',
    website: 'https://www.dmr.gov.za'
  },

  // Heritage, Cultural & Historical Organizations
  {
    id: '18',
    name: 'South African Heritage Resources Agency',
    logo: '/Images/sponsours/sahra.png',
    description: 'Heritage conservation and cultural resource management',
    category: 'Heritage',
    website: 'http://www.sahra.org.za'
  },

  // Youth, Skills, Employment & Training
  {
    id: '19',
    name: 'National Youth Development Agency',
    logo: '/Images/sponsours/nyda.png',
    description: 'Youth empowerment and development programs',
    category: 'Youth',
    website: 'https://www.nyda.gov.za'
  },
  {
    id: '20',
    name: 'Youth Employment Service',
    logo: 'https://logo.clearbit.com/yes4youth.org',
    description: 'Youth employment initiatives and skills development',
    category: 'Youth',
    website: 'https://www.yes4youth.org'
  },

  // Development & Investment Partners
  {
    id: '21',
    name: 'UNDP South Africa',
    logo: 'https://logo.clearbit.com/undp.org',
    description: 'United Nations Development Programme South Africa',
    category: 'International Development',
    website: 'https://www.undp.org/sa/'
  },
  {
    id: '22',
    name: 'InvestSA',
    logo: 'https://logo.clearbit.com/investsa.gov.za',
    description: 'Investment promotion and facilitation agency',
    category: 'Investment',
    website: 'https://www.investsa.gov.za'
  },

  // Legacy Community Partners
  {
    id: '23',
    name: 'Zimele',
    logo: '/Images/sponsours/zimele.png',
    description: 'Community development and enterprise support',
    category: 'Community',
    website: 'https://www.zimele.co.za'
  }
];

const categories = ['All', 'G20 Presidency', 'Government', 'Innovation', 'Mining', 'Mining Innovation', 'Mining Industry', 'Heritage', 'Youth', 'International Development', 'Investment', 'Community'];

export default function PartnersExhibition() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter partners based on selected category using useMemo
  const filteredPartners = useMemo(() => {
    if (selectedCategory === 'All') {
      return partners;
    } else {
      return partners.filter(partner => partner.category === selectedCategory);
    }
  }, [selectedCategory]);

  // Reset current index when filtered partners change
  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredPartners.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || filteredPartners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredPartners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, filteredPartners.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPartners.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredPartners.length) % filteredPartners.length);
    setAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  if (filteredPartners.length === 0) {
    return null;
  }

  const currentPartner = filteredPartners[currentIndex];

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-yellow/10 rounded-full opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
            delay: 5
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-4 font-merriweather">
              Our Partners & Supporters
            </h2>
            <p className="text-white/90 text-lg md:text-xl font-inter max-w-3xl mx-auto">
              Collaborating with leading organizations to preserve heritage, empower communities, and drive sustainable development in Limpopo and beyond
            </p>
          </div>
        </ScrollRevealWrapper>

        {/* Category Filter */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-yellow text-black font-semibold'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollRevealWrapper>

        {/* Main Exhibition Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Featured Partner Display */}
          <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
            <div className="relative">
              {/* Main Partner Card */}
              <motion.div
                key={currentPartner.id}
                className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Logo */}
                  <div className="w-32 h-32 mb-6 flex items-center justify-center bg-white/15 rounded-xl overflow-hidden border-2 border-yellow/30 shadow-inner">
                    <Image
                      src={currentPartner.logo}
                      alt={currentPartner.name}
                      width={120}
                      height={120}
                      className="max-h-full max-w-full object-contain p-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/Images/sponsours/zimele.png';
                      }}
                    />
                  </div>

                  {/* Category Badge */}
                  <span className="px-3 py-1 bg-yellow/20 text-yellow text-sm font-semibold rounded-full mb-4 border border-yellow/30">
                    {currentPartner.category}
                  </span>

                  {/* Name */}
                  <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-yellow to-white bg-clip-text text-transparent">
                    {currentPartner.name}
                  </h3>

                  {/* Description */}
                  <p className="text-white/90 text-base mb-6 leading-relaxed">
                    {currentPartner.description}
                  </p>

                  {/* Website Link */}
                  {currentPartner.website && (
                    <a
                      href={currentPartner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all rounded-lg flex items-center gap-2"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                      Visit Website
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Navigation Controls */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
                  aria-label="Previous partner"
                >
                  <FaChevronLeft className="text-white text-xl" />
                </button>

                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
                  aria-label={autoPlay ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {autoPlay ? (
                    <FaPause className="text-white text-xl" />
                  ) : (
                    <FaPlay className="text-white text-xl" />
                  )}
                </button>

                <button
                  onClick={nextSlide}
                  className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
                  aria-label="Next partner"
                >
                  <FaChevronRight className="text-white text-xl" />
                </button>
              </div>
            </div>
          </ScrollRevealWrapper>

          {/* Grid View of All Partners */}
          <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredPartners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    className={`bg-white/10 backdrop-blur-md border rounded-xl p-3 hover:bg-white/15 transition-all cursor-pointer ${
                      index === currentIndex ? 'border-yellow bg-yellow/10' : 'border-white/20'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    onClick={() => goToSlide(index)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 mb-2 flex items-center justify-center bg-white/15 rounded-lg overflow-hidden border border-white/20">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={48}
                          height={48}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/Images/sponsours/zimele.png';
                          }}
                        />
                      </div>
                      <p className="text-white text-xs font-medium text-center line-clamp-2 mb-1">
                        {partner.name}
                      </p>
                      <span className="text-yellow text-xs font-semibold">
                        {partner.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollRevealWrapper>
        </div>

        {/* Progress Indicators */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.4}>
          <div className="flex justify-center items-center gap-2 mt-8">
            {filteredPartners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-yellow w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to partner ${index + 1}`}
              />
            ))}
          </div>
        </ScrollRevealWrapper>

        {/* Stats */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow mb-2">{partners.length}</div>
              <div className="text-white/80 text-sm">Total Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow mb-2">{categories.length - 1}</div>
              <div className="text-white/80 text-sm">Partner Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow mb-2">{filteredPartners.length}</div>
              <div className="text-white/80 text-sm">Currently Displayed</div>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}