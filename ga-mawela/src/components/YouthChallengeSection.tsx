'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Challenge {
  title: string;
  description: string;
  impact: string;
  percentage: number;
  icon: string;
}

const youthChallenges: Challenge[] = [
  {
    title: 'Youth Unemployment Crisis',
    description: 'Over 60% of young people in the Dwars River Valley remain unemployed, lacking access to opportunities despite living in a resource-rich area.',
    impact: 'Community Development',
    percentage: 60,
    icon: '👥'
  },
  {
    title: 'Limited Mining Benefits',
    description: 'Despite being surrounded by mining operations, the Ga-Mawela community receives minimal direct benefits or employment opportunities from local mines.',
    impact: 'Economic Exclusion',
    percentage: 85,
    icon: '⛏️'
  },
  {
    title: 'Skills Development Gaps',
    description: 'Lack of access to modern technical training and skills development programs needed for contemporary employment opportunities.',
    impact: 'Education Access',
    percentage: 75,
    icon: '🎓'
  },
  {
    title: 'Infrastructure Deficits',
    description: 'Poor digital connectivity and limited infrastructure hinder access to online learning, remote work, and digital economy opportunities.',
    impact: 'Digital Divide',
    percentage: 70,
    icon: '📶'
  }
];

const opportunitySolutions = [
  {
    title: 'Skills Training Programs',
    description: 'Partnerships with mining companies and G20 innovation hubs to provide technical training and certification programs.',
    partners: ['CSIR', 'TIA', 'Mining Companies'],
    impact: 'Direct job placement in technical roles'
  },
  {
    title: 'Digital Economy Initiative',
    description: 'Leveraging G20 digital transformation programs to create remote work and online business opportunities.',
    partners: ['Innovation Bridge', 'Tshimologong', 'Government'],
    impact: 'Access to global digital markets'
  },
  {
    title: 'Community Development Fund',
    description: 'Establishing a community fund from mining royalties to fund education, healthcare, and infrastructure development.',
    partners: ['Mining Companies', 'Government', 'NGOs'],
    impact: 'Sustainable community development'
  },
  {
    title: 'Youth Entrepreneurship Hub',
    description: 'Creating a local innovation center supporting young entrepreneurs with mentorship, funding, and business development.',
    partners: ['Y20 SA', 'NYDA', 'Innovation Hub'],
    impact: 'Local business creation and job generation'
  }
];

export default function YouthChallengeSection() {
  const [activeTab, setActiveTab] = useState('challenges');
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>([]);

  useEffect(() => {
    if (activeTab === 'challenges') {
      const timer = setTimeout(() => {
        setAnimatedPercentages(youthChallenges.map(challenge => challenge.percentage));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical py-16 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFC107' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20zM0 20c0 11.046 8.954 20 20 20V20H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow mb-4 font-merriweather">
            Community Youth Challenges & Opportunities
          </h2>
          <p className="text-white/80 text-lg max-w-4xl mx-auto font-inter leading-relaxed">
            Understanding the challenges facing Ga-Mawela youth and the opportunities 
            for positive change through partnership and innovation.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'challenges'
                  ? 'bg-yellow text-black font-bold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Current Challenges
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'solutions'
                  ? 'bg-yellow text-black font-bold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Opportunity Solutions
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {youthChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/15 backdrop-blur-md border border-white/30 p-6 rounded-lg hover:bg-white/20 relative overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{challenge.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-yellow font-merriweather">
                        {challenge.title}
                      </h3>
                      <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                        {challenge.impact}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 text-sm mb-4 font-inter leading-relaxed">
                    {challenge.description}
                  </p>

                  {/* Impact Percentage */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60 font-inter">Impact Level</span>
                      <span className="text-sm font-bold text-red-300">{challenge.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ 
                          width: animatedPercentages[index] ? `${animatedPercentages[index]}%` : '0%'
                        }}
                        transition={{ 
                          delay: index * 0.1 + 0.5, 
                          duration: 1, 
                          ease: 'easeOut' 
                        }}
                      />
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full -translate-y-8 translate-x-8"></div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'solutions' && (
            <motion.div
              key="solutions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {opportunitySolutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/15 backdrop-blur-md border border-white/30 p-6 rounded-lg hover:bg-white/20 relative overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-yellow/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-yellow font-merriweather mb-2">
                        {solution.title}
                      </h3>
                      <p className="text-white/80 text-sm font-inter leading-relaxed">
                        {solution.description}
                      </p>
                    </div>
                  </div>

                  {/* Partners */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-white/60 mb-2 font-inter">Key Partners:</h4>
                    <div className="flex flex-wrap gap-1">
                      {solution.partners.map((partner, partnerIndex) => (
                        <span 
                          key={partnerIndex}
                          className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded"
                        >
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-yellow-300 font-medium">{solution.impact}</span>
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-yellow/10 rounded-full -translate-y-8 translate-x-8"></div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-yellow/20 to-yellow/10 backdrop-blur-md border border-yellow/30 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">
              Together We Can Create Change
            </h3>
            <p className="text-white/80 mb-6 font-inter max-w-3xl mx-auto">
              Through partnerships with G20 organizations, mining companies, and government agencies, 
              we can transform these challenges into opportunities for the Ga-Mawela youth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/resources" 
                className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all rounded-lg font-inter"
              >
                Explore Resources
              </a>
              <a 
                href="/partners" 
                className="px-6 py-3 bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-all rounded-lg font-inter"
              >
                View Partnerships
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow/10 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}