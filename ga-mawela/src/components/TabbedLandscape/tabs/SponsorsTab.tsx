'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface Partner {
  id: string;
  name: string;
  logo: string;
  title: string;
  description: string;
  website?: string;
  category: 'government' | 'business' | 'organization' | 'development';
  established?: string;
  focus?: string;
}

export default function SponsorsTab() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const partners: Partner[] = [
    // Government Partners
    {
      id: 'dirco',
      name: 'Department of International Relations and Cooperation',
      logo: '/Images/sponsours/dirco-logo.png',
      title: 'Government Department',
      description: 'Leading South Africa\'s foreign policy and international cooperation initiatives.',
      website: 'https://www.dirco.gov.za',
      category: 'government',
      established: '1994',
      focus: 'International Relations'
    },
    {
      id: 'presidency',
      name: 'The Presidency',
      logo: '/Images/sponsours/presidency-logo.png',
      title: 'Executive Office',
      description: 'Coordinating government policy and driving national development priorities.',
      website: 'https://www.thepresidency.gov.za',
      category: 'government',
      established: '1994',
      focus: 'Policy Coordination'
    },
    {
      id: 'dmre',
      name: 'Department of Mineral Resources and Energy',
      logo: '/Images/sponsours/dmre-logo.png',
      title: 'Government Department',
      description: 'Regulating mining sector and energy development in South Africa.',
      website: 'https://www.dmr.gov.za',
      category: 'government',
      established: '1994',
      focus: 'Mining & Energy'
    },
    {
      id: 'dalrrd',
      name: 'Department of Agriculture, Land Reform and Rural Development',
      logo: '/Images/sponsours/dalrrd-logo.png',
      title: 'Government Department',
      description: 'Promoting agricultural development and land reform initiatives.',
      website: 'https://www.dalrrd.gov.za',
      category: 'government',
      established: '1994',
      focus: 'Land Reform'
    },
    {
      id: 'sahra',
      name: 'South African Heritage Resources Agency',
      logo: '/Images/sponsours/sahra-logo.png',
      title: 'Heritage Authority',
      description: 'Protecting and managing South Africa\'s cultural and natural heritage.',
      website: 'https://www.sahra.org.za',
      category: 'government',
      established: '1999',
      focus: 'Heritage Preservation'
    },

    // Business Partners
    {
      id: 'anglo-american',
      name: 'Anglo American',
      logo: '/Images/sponsours/anglo-american-logo.png',
      title: 'Mining Corporation',
      description: 'Global mining company committed to sustainable mining practices.',
      website: 'https://www.angloamerican.com',
      category: 'business',
      established: '1917',
      focus: 'Sustainable Mining'
    },
    {
      id: 'anglogold-ashanti',
      name: 'AngloGold Ashanti',
      logo: '/Images/sponsours/anglogold-ashanti-logo.png',
      title: 'Gold Mining Company',
      description: 'Leading global gold mining company with operations in South Africa.',
      website: 'https://www.anglogoldashanti.com',
      category: 'business',
      established: '1944',
      focus: 'Gold Mining'
    },
    {
      id: 'implats',
      name: 'Impala Platinum',
      logo: '/Images/sponsours/implats-logo.png',
      title: 'Platinum Mining Company',
      description: 'Major platinum group metals producer in South Africa.',
      website: 'https://www.implats.co.za',
      category: 'business',
      established: '1967',
      focus: 'Platinum Mining'
    },
    {
      id: 'sibanye-stillwater',
      name: 'Sibanye-Stillwater',
      logo: '/Images/sponsours/sibanye-stillwater-logo.png',
      title: 'Mining Company',
      description: 'Diversified mining company focused on precious metals.',
      website: 'https://www.sibanyestillwater.com',
      category: 'business',
      established: '2013',
      focus: 'Precious Metals'
    },
    {
      id: 'memsa',
      name: 'Mining Equipment Manufacturers of South Africa',
      logo: '/Images/sponsours/memsa-logo.png',
      title: 'Industry Association',
      description: 'Representing manufacturers of mining equipment in South Africa.',
      website: 'https://www.memsa.org.za',
      category: 'business',
      established: '1980',
      focus: 'Mining Equipment'
    },
    {
      id: 'minerals-council',
      name: 'Minerals Council South Africa',
      logo: '/Images/sponsours/minerals-council-logo.png',
      title: 'Industry Body',
      description: 'Leading the mining industry in South Africa through advocacy and support.',
      website: 'https://www.mineralscouncil.org.za',
      category: 'business',
      established: '1887',
      focus: 'Industry Advocacy'
    },

    // Organizations
    {
      id: 'mandela-mining-precinct',
      name: 'Mandela Mining Precinct',
      logo: '/Images/sponsours/mandela-mining-precinct-logo.png',
      title: 'Research Institute',
      description: 'Mining research and innovation hub in South Africa.',
      website: 'https://www.mandelaminingprecinct.org.za',
      category: 'organization',
      established: '1995',
      focus: 'Mining Innovation'
    },
    {
      id: 'nyda',
      name: 'National Youth Development Agency',
      logo: '/Images/sponsours/nyda-logo.png',
      title: 'Development Agency',
      description: 'Promoting youth development and economic empowerment.',
      website: 'https://www.nyda.gov.za',
      category: 'organization',
      established: '2009',
      focus: 'Youth Development'
    },
    {
      id: 'csir',
      name: 'Council for Scientific and Industrial Research',
      logo: '/Images/sponsours/csir-logo.png',
      title: 'Research Organization',
      description: 'Leading scientific research organization in South Africa.',
      website: 'https://www.csir.co.za',
      category: 'organization',
      established: '1945',
      focus: 'Scientific Research'
    },
    {
      id: 'tia',
      name: 'Technology Innovation Agency',
      logo: '/Images/sponsours/tia-logo.png',
      title: 'Innovation Agency',
      description: 'Funding and supporting technology innovation in South Africa.',
      website: 'https://www.tia.org.za',
      category: 'organization',
      established: '2008',
      focus: 'Technology Innovation'
    },
    {
      id: 'innovation-bridge',
      name: 'Innovation Bridge Portal',
      logo: '/Images/sponsours/innovation-bridge-logo.png',
      title: 'Digital Platform',
      description: 'Connecting innovators with funding and partnership opportunities.',
      website: 'https://innovationbridge.info',
      category: 'organization',
      established: '2011',
      focus: 'Innovation Support'
    },

    // Development Partners
    {
      id: 'yes',
      name: 'YES Youth Employment Service',
      logo: '/Images/sponsours/yes-logo.png',
      title: 'Youth Program',
      description: 'Creating job opportunities for young South Africans.',
      website: 'https://yes4youth.co.za',
      category: 'development',
      established: '2018',
      focus: 'Youth Employment'
    },
    {
      id: 'undp',
      name: 'United Nations Development Programme',
      logo: '/Images/sponsours/undp-logo.png',
      title: 'International Organization',
      description: 'Supporting sustainable development and poverty eradication.',
      website: 'https://www.undp.org',
      category: 'development',
      established: '1965',
      focus: 'Sustainable Development'
    },
    {
      id: 'investsa',
      name: 'Invest South Africa',
      logo: '/Images/sponsours/investsa-logo.png',
      title: 'Investment Promotion',
      description: 'Attracting foreign and domestic investment to South Africa.',
      website: 'https://www.investsa.gov.za',
      category: 'development',
      established: '2007',
      focus: 'Investment Promotion'
    },
    {
      id: 'zimele',
      name: 'Zimele Fund',
      logo: '/Images/sponsours/zimele-logo.png',
      title: 'Enterprise Development',
      description: 'Supporting small and medium enterprises in South Africa.',
      website: 'https://www.zimele.com',
      category: 'development',
      established: '1989',
      focus: 'Enterprise Development'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Partners', count: partners.length },
    { id: 'government', label: 'Government', count: partners.filter(p => p.category === 'government').length },
    { id: 'business', label: 'Business', count: partners.filter(p => p.category === 'business').length },
    { id: 'organization', label: 'Organizations', count: partners.filter(p => p.category === 'organization').length },
    { id: 'development', label: 'Development', count: partners.filter(p => p.category === 'development').length }
  ];

  const filteredPartners = activeCategory === 'all' 
    ? partners 
    : partners.filter(partner => partner.category === activeCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'government': return 'border-blue-400 bg-blue-500/10';
      case 'business': return 'border-yellow-400 bg-yellow-500/10';
      case 'organization': return 'border-green-400 bg-green-500/10';
      case 'development': return 'border-purple-400 bg-purple-500/10';
      default: return 'border-white/30 bg-white/5';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'government': return '🏛️';
      case 'business': return '🏢';
      case 'organization': return '🤝';
      case 'development': return '🌱';
      default: return '🏢';
    }
  };

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-merriweather">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                Partners & Resources
              </span>
            </h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-inter">
              Our comprehensive network of government departments, mining companies, organizations, 
              and development partners committed to supporting Ga-Mawela&apos;s heritage preservation and community development.
            </p>
          </div>
        </ScrollRevealWrapper>

        {/* Category Filter */}
        <ScrollRevealWrapper type="fadeUp" duration={0.6} delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                  activeCategory === category.id
                    ? 'bg-yellow text-black font-bold shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </ScrollRevealWrapper>
      </div>

      {/* Partners Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedPartner(partner)}
                className={`card-interactive backdrop-blur-md border-2 p-6 rounded-lg cursor-pointer transition-all duration-300 h-full ${getCategoryColor(partner.category)}`}
              >
                <div className="flex flex-col h-full">
                  {/* Logo */}
                  <div className="flex items-center justify-center mb-4 h-16">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{getCategoryIcon(partner.category)}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-yellow mb-2 font-merriweather text-center">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-white/60 mb-3 text-center font-medium">
                      {partner.title}
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed font-inter text-center line-clamp-3">
                      {partner.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                    <span className="text-xs text-white/60 capitalize">
                      {partner.category}
                    </span>
                    {partner.website && (
                      <div className="w-2 h-2 bg-yellow rounded-full"></div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Partner Detail Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPartner(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-metallic-blue-dark border-2 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto ${getCategoryColor(selectedPartner.category)}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">{getCategoryIcon(selectedPartner.category)}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-yellow font-merriweather">
                      {selectedPartner.name}
                    </h2>
                    <p className="text-white/60 font-medium">
                      {selectedPartner.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-white">×</span>
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-white/90 leading-relaxed font-inter">
                  {selectedPartner.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPartner.established && (
                    <div>
                      <h4 className="text-sm font-bold text-yellow mb-1">Established</h4>
                      <p className="text-white/80 text-sm">{selectedPartner.established}</p>
                    </div>
                  )}
                  {selectedPartner.focus && (
                    <div>
                      <h4 className="text-sm font-bold text-yellow mb-1">Focus Area</h4>
                      <p className="text-white/80 text-sm">{selectedPartner.focus}</p>
                    </div>
                  )}
                </div>

                {selectedPartner.website && (
                  <div className="pt-4">
                    <a
                      href={selectedPartner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-yellow text-black font-medium rounded hover:bg-yellow/90 transition-colors"
                    >
                      Visit Website
                      <span>↗</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
