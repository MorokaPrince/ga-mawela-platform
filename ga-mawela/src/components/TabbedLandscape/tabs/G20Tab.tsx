'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import ParallaxSection from '@/components/saG20/ParallaxSection';
import ScrollRevealSection from '@/components/saG20/ScrollRevealSection';
import FloatingBlobsSection from '@/components/saG20/FloatingBlobsSection';
import BrandColorSection from '@/components/saG20/BrandColorSection';
import PartnersExhibition from '@/components/PartnersExhibition';

interface G20Member {
  name: string;
  region: string;
  flag: string;
  economy: string;
}

interface G20Priority {
  title: string;
  description: string;
  icon: string;
}

export default function G20Tab() {
  const [activeSection, setActiveSection] = useState('overview');

  const g20Members: G20Member[] = [
    { name: 'Argentina', region: 'Americas', flag: '🇦🇷', economy: 'G20 Member' },
    { name: 'Australia', region: 'Asia-Pacific', flag: '🇦🇺', economy: 'G20 Member' },
    { name: 'Brazil', region: 'Americas', flag: '🇧🇷', economy: 'G20 Member' },
    { name: 'Canada', region: 'Americas', flag: '🇨🇦', economy: 'G20 Member' },
    { name: 'China', region: 'Asia', flag: '🇨🇳', economy: 'G20 Member' },
    { name: 'France', region: 'Europe', flag: '🇫🇷', economy: 'G20 Member' },
    { name: 'Germany', region: 'Europe', flag: '🇩🇪', economy: 'G20 Member' },
    { name: 'India', region: 'Asia', flag: '🇮🇳', economy: 'G20 Member' },
    { name: 'Indonesia', region: 'Asia', flag: '🇮🇩', economy: 'G20 Member' },
    { name: 'Italy', region: 'Europe', flag: '🇮🇹', economy: 'G20 Member' },
    { name: 'Japan', region: 'Asia', flag: '🇯🇵', economy: 'G20 Member' },
    { name: 'Mexico', region: 'Americas', flag: '🇲🇽', economy: 'G20 Member' },
    { name: 'Russia', region: 'Europe/Asia', flag: '🇷🇺', economy: 'G20 Member' },
    { name: 'Saudi Arabia', region: 'Middle East', flag: '🇸🇦', economy: 'G20 Member' },
    { name: 'South Africa', region: 'Africa', flag: '🇿🇦', economy: 'G20 Member' },
    { name: 'South Korea', region: 'Asia', flag: '🇰🇷', economy: 'G20 Member' },
    { name: 'Turkey', region: 'Europe/Asia', flag: '🇹🇷', economy: 'G20 Member' },
    { name: 'United Kingdom', region: 'Europe', flag: '🇬🇧', economy: 'G20 Member' },
    { name: 'United States', region: 'Americas', flag: '🇺🇸', economy: 'G20 Member' },
    { name: 'European Union', region: 'Europe', flag: '🇪🇺', economy: 'EU' },
  ];

  const g20Priorities: G20Priority[] = [
    {
      title: 'Global Economic Stability',
      description: 'Coordinating fiscal and monetary policies to ensure global economic resilience and growth.',
      icon: '🌍'
    },
    {
      title: 'Trade & Investment',
      description: 'Promoting free trade, investment flows, and inclusive global economic integration.',
      icon: '💼'
    },
    {
      title: 'Climate Action',
      description: 'Advancing sustainable development goals and climate change mitigation strategies.',
      icon: '🌱'
    },
    {
      title: 'Digital Transformation',
      description: 'Fostering digital economy development and technological innovation across member nations.',
      icon: '💻'
    },
    {
      title: 'Health & Security',
      description: 'Strengthening global health security and pandemic preparedness frameworks.',
      icon: '🏥'
    },
    {
      title: 'Youth Employment',
      description: 'Creating opportunities for young people through education, training, and entrepreneurship.',
      icon: '👥'
    }
  ];

  const southAfricaHighlights = [
    {
      title: 'Mining & Energy Transition',
      description: 'Leading discussions on sustainable mining practices and renewable energy transition in Africa.',
      image: '/Images/Mining/Landing home page 1.jpg'
    },
    {
      title: 'Youth Development Programs',
      description: 'Initiatives supporting youth entrepreneurship and skills development across the continent.',
      image: '/Images/Mining/Youth Tab backround.webp'
    },
    {
      title: 'Heritage Preservation',
      description: 'Protecting and promoting cultural heritage sites and indigenous knowledge systems.',
      image: '/Images/Mining/Material Culture Card.webp'
    }
  ];

  return (
    <div className="w-full bg-metallic-blue-dark relative overflow-hidden">
      {/* Hero Section with G20 Background */}
      <section 
        className="relative w-full min-h-[70vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/assets/images/g20-partners.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-metallic-blue-dark/90 via-metallic-blue-dark/70 to-transparent"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <ScrollRevealWrapper type="fadeUp" duration={0.8}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-merriweather leading-tight">
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  G20
                </span>
                <br />
                <span className="text-3xl md:text-5xl text-white font-light">
                  South Africa
                </span>
              </h1>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                <p className="text-xl md:text-2xl text-yellow-200 font-medium font-inter tracking-wide">
                  Global Economic Cooperation
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-600 to-yellow-400"></div>
              </div>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-inter font-light">
                Advancing global economic cooperation, sustainable development, and international partnership 
                through the G20 platform, with South Africa&apos;s leadership in mining, youth development, and heritage preservation.
              </p>
            </motion.div>
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-metallic-blue-dark border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 py-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'members', label: 'Members' },
              { id: 'priorities', label: 'Priorities' },
              { id: 'partners', label: 'Partners' },
              { id: 'highlights', label: 'SA Highlights' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === tab.id
                    ? 'bg-yellow text-black font-bold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative">
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-6"
          >
            <div className="max-w-6xl mx-auto">
              <ScrollRevealWrapper type="fadeUp" duration={0.8}>
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-merriweather">
                    About the G20
                  </h2>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-inter">
                    The G20 is an international forum for the governments and central bank governors from 19 countries and the European Union. 
                    Founded in 1999, it aims to prevent future international financial crises by promoting international financial stability.
                  </p>
                </div>
              </ScrollRevealWrapper>

              {/* Parallax Section from saG20 */}
              <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
                <ParallaxSection />
              </ScrollRevealWrapper>

              {/* Floating Blobs Section */}
              <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
                <FloatingBlobsSection />
              </ScrollRevealWrapper>
            </div>
          </motion.div>
        )}

        {/* Members Section */}
        {activeSection === 'members' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-6 bg-metallic-blue-gradient-vertical"
          >
            <div className="max-w-6xl mx-auto">
              <ScrollRevealWrapper type="fadeUp" duration={0.8}>
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-merriweather">
                    G20 Member Economies
                  </h2>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-inter">
                    19 countries plus the European Union, representing the world&apos;s major advanced and emerging economies.
                  </p>
                </div>
              </ScrollRevealWrapper>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {g20Members.map((member, index) => (
                  <ScrollRevealWrapper key={member.name} type="fadeUp" duration={0.6} delay={index * 0.05}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 rounded-lg hover:bg-white/20 text-center"
                    >
                      <div className="text-4xl mb-3">{member.flag}</div>
                      <h3 className="font-bold text-white mb-2 font-merriweather text-sm">{member.name}</h3>
                      <p className="text-yellow text-xs font-inter">{member.region}</p>
                      <p className="text-white/70 text-xs font-inter mt-1">{member.economy}</p>
                    </motion.div>
                  </ScrollRevealWrapper>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Priorities Section */}
        {activeSection === 'priorities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-6"
          >
            <div className="max-w-6xl mx-auto">
              <ScrollRevealWrapper type="fadeUp" duration={0.8}>
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-merriweather">
                    G20 Policy Priorities
                  </h2>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-inter">
                    Key focus areas for global economic cooperation and sustainable development.
                  </p>
                </div>
              </ScrollRevealWrapper>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {g20Priorities.map((priority, index) => (
                  <ScrollRevealWrapper key={priority.title} type="fadeUp" duration={0.6} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 rounded-lg hover:bg-white/20 h-full"
                    >
                      <div className="text-5xl mb-4 text-center">{priority.icon}</div>
                      <h3 className="text-xl font-bold text-yellow mb-4 font-merriweather text-center">
                        {priority.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed font-inter text-sm text-center">
                        {priority.description}
                      </p>
                    </motion.div>
                  </ScrollRevealWrapper>
                ))}
              </div>

              {/* Scroll Reveal Section from saG20 */}
              <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.3}>
                <ScrollRevealSection />
              </ScrollRevealWrapper>
            </div>
          </motion.div>
        )}

        {/* Partners Section */}
        {activeSection === 'partners' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-6 bg-metallic-blue-gradient-vertical"
          >
            <div className="max-w-7xl mx-auto">
              <ScrollRevealWrapper type="fadeUp" duration={0.8}>
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-merriweather">
                    G20 Partners & Stakeholders
                  </h2>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-inter">
                    Comprehensive network of partners, engagement groups, and stakeholders supporting G20 initiatives.
                  </p>
                </div>
              </ScrollRevealWrapper>

              {/* Partners Exhibition Component */}
              <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
                <PartnersExhibition />
              </ScrollRevealWrapper>

              {/* Brand Color Section from saG20 */}
              <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
                <BrandColorSection />
              </ScrollRevealWrapper>
            </div>
          </motion.div>
        )}

        {/* South Africa Highlights Section */}
        {activeSection === 'highlights' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-6"
          >
            <div className="max-w-6xl mx-auto">
              <ScrollRevealWrapper type="fadeUp" duration={0.8}>
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-merriweather">
                    South Africa G20 Highlights
                  </h2>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-inter">
                    Key areas where South Africa is leading G20 initiatives and making significant contributions.
                  </p>
                </div>
              </ScrollRevealWrapper>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {southAfricaHighlights.map((highlight, index) => (
                  <ScrollRevealWrapper key={highlight.title} type="fadeUp" duration={0.6} delay={index * 0.2}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 rounded-lg overflow-hidden hover:bg-white/20"
                    >
                      <div 
                        className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url('${highlight.image}')` }}
                      >
                        <div className="h-full bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <div className="p-6 w-full">
                            <h3 className="text-xl font-bold text-white mb-2 font-merriweather">
                              {highlight.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-white/80 leading-relaxed font-inter text-sm">
                          {highlight.description}
                        </p>
                      </div>
                    </motion.div>
                  </ScrollRevealWrapper>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}