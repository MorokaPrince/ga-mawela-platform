'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  website?: string;
}

const sponsors: Sponsor[] = [
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
    name: 'Mining CSI Magazine',
    logo: 'https://logo.clearbit.com/miningcsi.co.za',
    description: 'Corporate social investment in mining sector',
    category: 'Mining',
    website: 'https://www.miningcsi.co.za'
  },
  {
    id: '16',
    name: 'Minerals Council South Africa',
    logo: 'https://logo.clearbit.com/mineralscouncil.org.za',
    description: 'Industry association representing mining companies',
    category: 'Mining Industry',
    website: 'https://www.mineralscouncil.org.za'
  },

  // Land Affairs, Agriculture & Rural Development
  {
    id: '17',
    name: 'Department of Agriculture, Land Reform & Rural Development',
    logo: '/Images/sponsours/thumb_department_of_land_reform_and_rural_development_(dlrrd).png',
    description: 'Land restitution, agriculture and rural development initiatives',
    category: 'Government',
    website: 'https://www.dalrrd.gov.za'
  },
  {
    id: '18',
    name: 'Department of Mineral Resources and Energy',
    logo: '/Images/sponsours/Department-of-Mineral-Resources-and-Energy-1200x675-cropped.jpg',
    description: 'Government oversight of mining operations and energy policy',
    category: 'Government',
    website: 'https://www.dmr.gov.za'
  },

  // Heritage, Cultural & Historical Organizations
  {
    id: '19',
    name: 'South African Heritage Resources Agency',
    logo: '/Images/sponsours/sahra.png',
    description: 'Heritage conservation and cultural resource management',
    category: 'Heritage',
    website: 'http://www.sahra.org.za'
  },
  {
    id: '20',
    name: 'SA Heritage Resources Information System',
    logo: 'https://logo.clearbit.com/sahris.sahra.org.za',
    description: 'Digital heritage resources information system',
    category: 'Heritage',
    website: 'https://sahris.sahra.org.za'
  },

  // Youth, Skills, Employment & Training
  {
    id: '21',
    name: 'National Youth Development Agency',
    logo: '/Images/sponsours/nyda.png',
    description: 'Youth empowerment and development programs',
    category: 'Youth',
    website: 'https://www.nyda.gov.za'
  },
  {
    id: '22',
    name: 'Youth Employment Service',
    logo: 'https://logo.clearbit.com/yes4youth.org',
    description: 'Youth employment initiatives and skills development',
    category: 'Youth',
    website: 'https://www.yes4youth.org'
  },
  {
    id: '23',
    name: 'Mining Community ICT Learnership Programme',
    logo: 'https://logo.clearbit.com/africanminingnews.co.za',
    description: 'ICT skills development for mining communities',
    category: 'Youth',
    website: 'https://www.africanminingnews.co.za/technology/learnership-empowers-101-youth-from-mining-communities-with-ict-skills/'
  },

  // Development & Investment Partners
  {
    id: '24',
    name: 'UNDP South Africa',
    logo: 'https://logo.clearbit.com/undp.org',
    description: 'United Nations Development Programme South Africa',
    category: 'International Development',
    website: 'https://www.undp.org/sa/'
  },
  {
    id: '25',
    name: 'InvestSA',
    logo: 'https://logo.clearbit.com/investsa.gov.za',
    description: 'Investment promotion and facilitation agency',
    category: 'Investment',
    website: 'https://www.investsa.gov.za'
  },

  // Legacy Community Partners
  {
    id: '26',
    name: 'Zimele',
    logo: '/Images/sponsours/zimele.png',
    description: 'Community development and enterprise support',
    category: 'Community',
    website: 'https://www.zimele.co.za'
  }
];

export default function EnhancedSponsorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        if (newIndex >= sponsors.length) {
          // Reset to beginning after showing all unique sponsors
          return 0;
        }
        return newIndex;
      });
      setDirection(1);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + sponsors.length) % sponsors.length);
    setAutoPlay(false);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  // Get visible sponsors (current + next 2 for 3D effect)
  const getVisibleSponsors = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + sponsors.length) % sponsors.length;
      visible.push({
        sponsor: sponsors[index],
        position: i,
        zIndex: 10 - Math.abs(i)
      });
    }
    return visible;
  };

  return (
    <div
      className="relative w-full bg-gradient-to-br from-metallic-blue-dark to-metallic-blue-light py-12 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title with animated gradient */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-yellow to-white bg-clip-text text-transparent uppercase tracking-wider">
            Our Partners & Supporters
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-3xl mx-auto">
            Organizations supporting Ga-Mawela restitution, heritage preservation, and community development
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* 3D Carousel */}
          <div className="relative h-96 md:h-[500px] perspective-1000">
            <AnimatePresence custom={direction}>
              {getVisibleSponsors().map(({ sponsor, position, zIndex }) => (
                <motion.div
                  key={`${sponsor.id}-${position}`}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    zIndex,
                    transform: `translateX(${position * 20}%) scale(${1 - Math.abs(position) * 0.2})`,
                    opacity: 1 - Math.abs(position) * 0.3
                  }}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 100 : -100,
                    scale: 0.8
                  }}
                  animate={{
                    opacity: 1 - Math.abs(position) * 0.3,
                    x: position * 20,
                    scale: 1 - Math.abs(position) * 0.2,
                    transition: {
                      type: 'spring',
                      damping: 20,
                      stiffness: 200
                    }
                  }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -100 : 100,
                    scale: 0.8,
                    transition: {
                      duration: 0.3
                    }
                  }}
                >
                  <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-yellow/20 transition-all duration-300">
                    <div className="flex flex-col items-center text-center">
                      {/* Logo with pulse animation */}
                      <div className="w-24 h-24 mb-4 flex items-center justify-center bg-white/15 rounded-xl overflow-hidden border-2 border-yellow/30 shadow-inner">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-full max-w-full object-contain p-2"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/Images/sponsours/zimele.png'; // Fallback image
                          }}
                        />
                      </div>

                      {/* Category Badge */}
                      <span className="px-3 py-1 bg-yellow/20 text-yellow text-xs font-semibold rounded-full mb-2 border border-yellow/30">
                        {sponsor.category}
                      </span>

                      {/* Name with gradient */}
                      <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-yellow to-white bg-clip-text text-transparent">
                        {sponsor.name}
                      </h3>

                      {/* Description */}
                      <p className="text-white/90 text-sm mb-4 line-clamp-3">
                        {sponsor.description}
                      </p>

                      {/* Website Link */}
                      {sponsor.website && (
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all rounded-lg text-sm flex items-center gap-2"
                        >
                          Visit Website
                          <span className="text-xs">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
              aria-label="Previous sponsor"
            >
              <FaChevronLeft className="text-white text-xl" />
            </button>

            <button
              onClick={toggleAutoPlay}
              className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
              aria-label={autoPlay ? 'Pause carousel' : 'Play carousel'}
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
              aria-label="Next sponsor"
            >
              <FaChevronRight className="text-white text-xl" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {sponsors.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-yellow w-6'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to sponsor ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              'All',
              'G20 Presidency',
              'Government',
              'Innovation',
              'Mining',
              'Mining Innovation',
              'Mining Industry',
              'Heritage',
              'Youth',
              'Community',
              'International Development',
              'Investment'
            ].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-all"
                onClick={() => {
                  // Filter functionality would go here
                  console.log(`Filter by ${category}`);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid view of all sponsors */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor.id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => goToSlide(parseInt(sponsor.id) - 1)}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-2 flex items-center justify-center bg-white/15 rounded-lg overflow-hidden border border-white/20">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/Images/sponsours/zimele.png';
                      }}
                    />
                  </div>
                  <p className="text-white text-xs font-medium text-center line-clamp-2">
                    {sponsor.name}
                  </p>
                  <span className="text-yellow text-xs font-semibold">
                    {sponsor.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow/10 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}