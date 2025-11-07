'use client';

import { useState, useEffect } from 'react';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
}

const sponsors: Sponsor[] = [
  {
    id: '1',
    name: 'Department of Mineral Resources',
    logo: '/Images/sponsours/dmr.png',
    description: 'Government oversight of mining operations',
  },
  {
    id: '2',
    name: 'Department of Land Reform',
    logo: '/Images/sponsours/dlr.png',
    description: 'Land restitution and claims management',
  },
  {
    id: '3',
    name: 'Zimele',
    logo: '/Images/sponsours/zimele.png',
    description: 'Community development partner',
  },
  {
    id: '4',
    name: 'Land and Accountability Research Centre',
    logo: '/Images/sponsours/larc.png',
    description: 'Research and documentation support',
  },
];

export default function SponsorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sponsors.length) % sponsors.length);
    setAutoPlay(false);
  };

  return (
    <div
      className="relative w-full bg-black/50 backdrop-blur-sm py-6 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h3 className="text-center text-white text-sm font-semibold mb-6 uppercase tracking-widest">
          Our Partners & Supporters
        </h3>

        {/* Landscape Grid - All Sponsors Visible */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="h-16 flex items-center justify-center mb-2">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-yellow text-xs font-medium text-center group-hover:text-white transition-colors">{sponsor.name}</p>
              <p className="text-gray-light text-xs mt-1 text-center hidden md:block">{sponsor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

