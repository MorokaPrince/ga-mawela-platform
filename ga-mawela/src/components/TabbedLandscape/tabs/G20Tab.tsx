'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import ParallaxSection from '@/components/saG20/ParallaxSection';
import ScrollRevealSection from '@/components/saG20/ScrollRevealSection';
import FloatingBlobsSection from '@/components/saG20/FloatingBlobsSection';
import BrandColorSection from '@/components/saG20/BrandColorSection';
import PartnersExhibition from '@/components/PartnersExhibition';

interface SAPartner {
  name: string;
  description: string;
  website: string;
  category: string;
  logo?: string;
}

interface SAInitiative {
  title: string;
  description: string;
  status: string;
  impact: string;
}

export default function G20Tab() {
  const [activeSection, setActiveSection] = useState('overview');

  const saG20Priorities: SAInitiative[] = [
    {
      title: 'Inclusive Economic Growth',
      description: 'Promoting sustainable and inclusive economic development across the African continent through G20 cooperation.',
      status: 'Active',
      impact: 'Continental'
    },
    {
      title: 'Mining & Energy Transition',
      description: 'Leading global discussions on sustainable mining practices and renewable energy transition in developing economies.',
      status: 'Active',
      impact: 'Global'
    },
    {
      title: 'Digital Economy Development',
      description: 'Advancing digital transformation and technology innovation across G20 member states.',
      status: 'Active',
      impact: 'Global'
    },
    {
      title: 'Youth Employment & Skills',
      description: 'Creating opportunities for young people through education, training, and entrepreneurship programs.',
      status: 'Active',
      impact: 'Continental'
    },
    {
      title: 'Health Security & Pandemic Preparedness',
      description: 'Strengthening global health systems and pandemic response capabilities.',
      status: 'Active',
      impact: 'Global'
    },
    {
      title: 'Climate Action & Sustainability',
      description: 'Implementing sustainable development goals and climate change mitigation strategies.',
      status: 'Active',
      impact: 'Global'
    }
  ];

  const saG20Partners: SAPartner[] = [
    {
      name: 'Council for Scientific and Industrial Research (CSIR)',
      description: 'Leading scientific research organization supporting G20 technology and innovation initiatives.',
      website: 'https://www.csir.co.za',
      category: 'Research & Innovation'
    },
    {
      name: 'Technology Innovation Agency (TIA)',
      description: 'Government agency funding technology innovation and supporting G20 innovation challenges.',
      website: 'http://www.tia.org.za',
      category: 'Innovation'
    },
    {
      name: 'Tshimologong Digital Innovation Precinct',
      description: 'Digital hub fostering entrepreneurship and supporting G20 digital economy objectives.',
      website: 'https://tshimologong.jezi.co.za',
      category: 'Digital Innovation'
    },
    {
      name: 'Companies and Intellectual Property Commission (CIPC)',
      description: 'Regulatory body supporting intellectual property protection for G20 innovation initiatives.',
      website: 'https://www.cipc.co.za',
      category: 'Intellectual Property'
    },
    {
      name: 'Innovation Hub',
      description: 'Public-private partnership supporting technology commercialization and G20 innovation goals.',
      website: 'https://www.innovationhub.co.za',
      category: 'Innovation'
    },
    {
      name: 'Innovation Bridge Portal',
      description: 'Digital platform connecting innovators with funding and partnership opportunities.',
      website: 'https://innovationbridge.info/ibportal/g20',
      category: 'Innovation Platform'
    }
  ];

  const saG20Resources = [
    {
      title: 'G20 SA Presidency Knowledge Management Set',
      description: 'Comprehensive knowledge management resources from South Africa\'s G20 presidency.',
      url: 'https://www.gov.za/sites/default/files/2024-12/20241025_G20%20SA%20Presidency%20KMs%20SET%201%20-%20Final.pdf',
      type: 'Official Document'
    },
    {
      title: 'G20 Review Report - SA News',
      description: 'Official review of South Africa\'s G20 participation and achievements.',
      url: 'https://www.sanews.gov.za/features-south-africa/g2020-review-report',
      type: 'Government Report'
    },
    {
      title: 'P20 Parliament G20 Information',
      description: 'Parliamentary information about South Africa\'s G20 participation and processes.',
      url: 'https://p20.parliament.gov.za/about-g20',
      type: 'Parliamentary Resource'
    },
    {
      title: 'G20 Tech Challenge Finalists',
      description: 'Innovation Bridge Portal showcasing G20 technology challenge finalists and winners.',
      url: 'https://innovationbridge.info/ibportal/g20/tech-challenge-finalists',
      type: 'Innovation Showcase'
    }
  ];

  const saG20Engagement = [
    {
      title: 'South Africa\'s G20 Presidency',
      description: 'Leadership role in promoting African interests and development priorities within the G20 framework.',
      achievements: [
        'Advocated for African Union membership in G20',
        'Promoted inclusive economic growth across developing nations',
        'Led discussions on sustainable mining and energy transition',
        'Supported youth employment and skills development initiatives'
      ]
    },
    {
      title: 'B20 Business Engagement',
      description: 'Private sector engagement through Business 20 South Africa (B20SA) representing business interests.',
      achievements: [
        'Facilitated private sector input to G20 policy development',
        'Promoted trade and investment opportunities',
        'Supported digital transformation initiatives',
        'Advocated for SME development and entrepreneurship'
      ]
    },
    {
      title: 'Y20 Youth Participation',
      description: 'Youth engagement through Youth 20 South Africa (Y20SA) ensuring young voices are heard.',
      achievements: [
        'Promoted youth employment and entrepreneurship',
        'Advocated for digital skills development',
        'Supported education and training programs',
        'Facilitated youth participation in policy discussions'
      ]
    }
  ];

  const saHighlights = [
    {
      title: 'Mining Innovation Leadership',
      description: 'South Africa leading global discussions on sustainable mining practices and technology innovation in the mining sector.',
      image: '/Images/Mining/Landing home page 1.jpg',
      stats: 'Global Leadership'
    },
    {
      title: 'Digital Economy Advancement',
      description: 'Driving digital transformation initiatives across G20 member states through technology innovation and skills development.',
      image: '/Images/Mining/Youth Tab backround.webp',
      stats: 'Continental Impact'
    },
    {
      title: 'Youth Empowerment Programs',
      description: 'Comprehensive youth development initiatives creating employment and entrepreneurship opportunities across Africa.',
      image: '/Images/Mining/Material Culture Card.webp',
      stats: 'Continental Reach'
    }
  ];

  return (
    <div className="w-full bg-metallic-blue-dark relative overflow-hidden">
      {/* Hero Section with SA G20 Logo Background */}
      <section 
        className="relative w-full min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.9), rgba(13, 27, 42, 0.95)), url('/Images/Mining/Landing home page 1.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        {/* Additional overlay for mining background */}
        <div className="absolute inset-0 bg-gradient-to-r from-metallic-blue-dark/90 via-metallic-blue-dark/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-metallic-blue-dark/80 via-transparent to-metallic-blue-dark/60"></div>
        
        {/* SA G20 Logo overlay */}
        <div 
          className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-20"
          style={{
            backgroundImage: `url('/Images/sponsours/g20-sa.png')`
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <ScrollRevealWrapper type="fadeUp" duration={0.8}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 font-merriweather leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  🇿🇦 G20
                </span>
                <br />
                <span className="text-2xl md:text-4xl text-white font-light">
                  South Africa
                </span>
              </h1>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                <p className="text-lg md:text-xl text-yellow-200 font-medium font-inter tracking-wide">
                  SA Presidency & Continental Development
                </p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-600 to-yellow-400"></div>
              </div>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-inter font-light">
                South Africa&apos;s leadership in the G20, advancing African development priorities, sustainable mining, 
                digital transformation, and youth empowerment through continental and global cooperation initiatives.
              </p>
            </motion.div>
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-metallic-blue-dark border-b border-yellow/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'priorities', label: 'Priorities' },
              { id: 'partners', label: 'Partners' },
              { id: 'resources', label: 'Resources' },
              { id: 'engagement', label: 'Engagement' },
              { id: 'impact', label: 'Impact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 text-sm ${
                  activeSection === tab.id
                    ? 'bg-yellow text-black font-bold shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
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
                    South Africa in the G20
                  </h2>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-inter">
                    South Africa represents Africa&apos;s interests in the G20, promoting inclusive economic growth, 
                    sustainable development, and continental integration through global cooperation.
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

        {/* SA Priorities Section */}
        {activeSection === 'priorities' && (
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
                    South Africa&apos;s G20 Priorities
                  </h2>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-inter">
                    Key focus areas where South Africa is leading G20 initiatives and advancing African development priorities.
                  </p>
                </div>
              </ScrollRevealWrapper>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {saG20Priorities.map((priority, index) => (
                  <ScrollRevealWrapper key={priority.title} type="fadeUp" duration={0.6} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 rounded-lg hover:bg-white/20 h-full"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-yellow font-merriweather">
                          {priority.title}
                        </h3>
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                          {priority.status}
                        </span>
                      </div>
                      <p className="text-white/80 leading-relaxed font-inter text-sm mb-4">
                        {priority.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-yellow-300 font-medium">
                          Impact: {priority.impact}
                        </span>
                        <span className="text-2xl">🇿🇦</span>
                      </div>
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

        {/* SA Partners Section */}
        {activeSection === 'partners' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <ScrollRevealWrapper type="fadeUp" duration={0.8}>
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-merriweather">
                    South African G20 Partners
                  </h2>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-inter">
                    Key South African institutions and organizations supporting G20 initiatives and continental development.
                  </p>
                </div>
              </ScrollRevealWrapper>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {saG20Partners.map((partner, index) => (
                  <ScrollRevealWrapper key={partner.name} type="fadeUp" duration={0.6} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 rounded-lg hover:bg-white/20 h-full"
                    >
                      <h3 className="text-lg font-bold text-yellow mb-3 font-merriweather">
                        {partner.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 font-inter leading-relaxed">
                        {partner.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          {partner.category}
                        </span>
                        <a 
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow hover:text-yellow-300 text-sm font-medium"
                        >
                          Visit →
                        </a>
                      </div>
                    </motion.div>
                  </ScrollRevealWrapper>
                ))}
              </div>

              {/* Partners Exhibition Component */}
              <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
                <PartnersExhibition />
              </ScrollRevealWrapper>

              {/* Brand Color Section from saG20 */}
              <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.3}>
                <BrandColorSection />
              </ScrollRevealWrapper>
            </div>
          </motion.div>
        )}

        {/* Resources Section */}
        {activeSection === 'resources' && (
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
                    South African G20 Resources
                  </h2>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-inter">
                    Official South African government resources, parliamentary information, and innovation platforms 
                    supporting G20 participation and continental development.
                  </p>
                </div>
              </ScrollRevealWrapper>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {saG20Resources.map((resource, index) => (
                  <ScrollRevealWrapper key={resource.title} type="fadeUp" duration={0.6} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 rounded-lg hover:bg-white/20"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-yellow font-merriweather flex-1">
                          {resource.title}
                        </h3>
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded ml-4">
                          {resource.type}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm mb-6 font-inter leading-relaxed">
                        {resource.description}
                      </p>
                      <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow text-black font-medium rounded hover:bg-yellow/90 transition-colors font-inter text-sm"
                      >
                        Access Resource
                        <span>↗</span>
                      </a>
                    </motion.div>
                  </ScrollRevealWrapper>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Engagement Section */}
        {activeSection === 'engagement' && (
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
                    South Africa&apos;s G20 Engagement
                  </h2>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed font-inter">
                    How South Africa engages with the G20 through official presidency, business engagement, 
                    and youth participation to advance continental and global development.
                  </p>
                </div>
              </ScrollRevealWrapper>

              <div className="space-y-8">
                {saG20Engagement.map((engagement, index) => (
                  <ScrollRevealWrapper key={engagement.title} type="fadeUp" duration={0.6} delay={index * 0.2}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 rounded-lg hover:bg-white/20"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-yellow/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🇿🇦</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-yellow font-merriweather">
                            {engagement.title}
                          </h3>
                          <p className="text-white/80 font-inter">
                            {engagement.description}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {engagement.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-yellow rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-white/80 text-sm font-inter leading-relaxed">
                              {achievement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </ScrollRevealWrapper>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* SA Highlights Section */}
        {activeSection === 'highlights' && (
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
                    South Africa&apos;s G20 Impact
                  </h2>
                  <p className="text-lg text-white/80 max-w-4-relaxed fontxl mx-auto leading-inter">
                    Key areas where South Africa is making significant contributions to G20 objectives 
                    and advancing continental development through leadership and innovation.
                  </p>
                </div>
              </ScrollRevealWrapper>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {saHighlights.map((highlight, index) => (
                  <ScrollRevealWrapper key={highlight.title} type="fadeUp" duration={0.6} delay={index * 0.2}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 rounded-lg overflow-hidden hover:bg-white/20"
                    >
                      <div 
                        className="h-48 bg-cover bg-center relative"
                        style={{ backgroundImage: `url('${highlight.image}')` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white font-merriweather">
                              {highlight.title}
                            </h3>
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                              {highlight.stats}
                            </span>
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