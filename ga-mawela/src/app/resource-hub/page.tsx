'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGlobe, FaIndustry, FaGavel, FaGraduationCap, FaUsers, FaSearch, FaDownload } from 'react-icons/fa';
import EnhancedSponsorsCarousel from '@/components/EnhancedSponsorsCarousel';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface ResourceCategory {
  title: string;
  icon: React.ReactNode;
  resources: {
    name: string;
    url: string;
    description: string;
    type?: string;
  }[];
}

export default function ResourceHubPage() {
  const [activeSection, setActiveSection] = useState('g20');
  const [searchTerm, setSearchTerm] = useState('');

  const resourceCategories: ResourceCategory[] = [
    {
      title: 'G20 & International Organizations',
      icon: <FaGlobe className="text-yellow text-2xl" />,
      resources: [
        {
          name: 'G20 Official Portal',
          url: 'https://g20.org',
          description: 'Global economic cooperation and policy coordination among major economies',
          type: 'International'
        },
        {
          name: 'G20 South Africa Membership',
          url: 'https://www.g20.org/en/about-g20/members/south-africa',
          description: 'South Africa\'s participation and contributions to G20 initiatives',
          type: 'Government'
        },
        {
          name: 'Innovation Bridge - G20 Open Innovation',
          url: 'https://innovationbridge.info/',
          description: 'Technology innovation portal connecting South African innovators with global opportunities',
          type: 'Innovation'
        },
        {
          name: 'B20 South Africa',
          url: 'https://www.b20southafrica.org/',
          description: 'Business engagement group facilitating private sector input to G20 processes',
          type: 'Business'
        },
        {
          name: 'United Nations Development Programme',
          url: 'https://www.undp.org/',
          description: 'Global development network advocating for change and connecting countries to knowledge and resources',
          type: 'International'
        },
        {
          name: 'World Bank South Africa',
          url: 'https://www.worldbank.org/en/country/southafrica',
          description: 'Economic development programs and financial assistance for South Africa',
          type: 'Financial'
        }
      ]
    },
    {
      title: 'Government & Mining Regulation',
      icon: <FaGavel className="text-yellow text-2xl" />,
      resources: [
        {
          name: 'Department of Mineral Resources and Energy',
          url: 'https://www.dmr.gov.za/',
          description: 'Government department responsible for mineral resources, energy policy, and regulation',
          type: 'Government'
        },
        {
          name: 'Department of Land Reform and Rural Development',
          url: 'https://www.dalrrd.gov.za/',
          description: 'Land restitution, rural development, and agricultural support programs',
          type: 'Government'
        },
        {
          name: 'Minerals Council South Africa',
          url: 'https://www.mineralscouncil.org.za/',
          description: 'Industry association representing mining companies and promoting sustainable mining',
          type: 'Industry'
        },
        {
          name: 'South African Heritage Resources Agency',
          url: 'https://www.sahra.org.za/',
          description: 'Heritage conservation, cultural resource management, and protection of historical sites',
          type: 'Heritage'
        },
        {
          name: 'National Heritage Council',
          url: 'https://www.nhc.org.za/',
          description: 'Promotion and preservation of South African cultural heritage and identity',
          type: 'Heritage'
        },
        {
          name: 'Council for Geoscience',
          url: 'https://www.geoscience.org.za/',
          description: 'Geological research, mapping, and mineral resource assessment',
          type: 'Scientific'
        }
      ]
    },
    {
      title: 'Mining Companies & Industry',
      icon: <FaIndustry className="text-yellow text-2xl" />,
      resources: [
        {
          name: 'Anglo American South Africa',
          url: 'https://southafrica.angloamerican.com/',
          description: 'Major mining corporation with operations in platinum, diamonds, and other minerals',
          type: 'Corporate'
        },
        {
          name: 'Impala Platinum (Implats)',
          url: 'https://www.implats.co.za/',
          description: 'Platinum group metals mining, processing, and refining',
          type: 'Corporate'
        },
        {
          name: 'Sibanye-Stillwater',
          url: 'https://www.sibanyestillwater.com/',
          description: 'Precious metals mining company with gold and platinum operations',
          type: 'Corporate'
        },
        {
          name: 'Mogalakwena Mine Profile',
          url: 'https://southafrica.angloamerican.com/our-stories/mine_profile_mogalakwena',
          description: 'Detailed information about Anglo American\'s Mogalakwena platinum mine',
          type: 'Mine Profile'
        },
        {
          name: 'Platinum Group Metals Association',
          url: 'https://www.pgma.co.za/',
          description: 'Industry association for platinum group metals producers and stakeholders',
          type: 'Industry'
        },
        {
          name: 'Mining Qualification Authority',
          url: 'https://www.mqa.org.za/',
          description: 'Skills development and qualifications for the mining industry workforce',
          type: 'Education'
        }
      ]
    },
    {
      title: 'Youth & Economic Development',
      icon: <FaGraduationCap className="text-yellow text-2xl" />,
      resources: [
        {
          name: 'National Youth Development Agency',
          url: 'https://www.nyda.gov.za/',
          description: 'Government agency for youth empowerment, funding, and development programs',
          type: 'Government'
        },
        {
          name: 'Youth Employment Service',
          url: 'https://www.yes4youth.org/',
          description: 'Youth employment initiatives and skills development programs',
          type: 'NGO'
        },
        {
          name: 'G20 Youth Entrepreneurship Alliance',
          url: 'https://www.g20.org/what-we-do/youth-entrepreneurship',
          description: 'Global youth entrepreneurship programs and economic participation initiatives',
          type: 'International'
        },
        {
          name: 'Department of Small Business Development',
          url: 'https://www.dsbd.gov.za/',
          description: 'Support for small businesses, entrepreneurs, and youth-led initiatives',
          type: 'Government'
        },
        {
          name: 'SEFA - Small Enterprise Finance Agency',
          url: 'https://www.sefa.org.za/',
          description: 'Financial support and funding for small and medium enterprises',
          type: 'Financial'
        },
        {
          name: 'Harambee Youth Employment Accelerator',
          url: 'https://www.harambee.co.za/',
          description: 'Youth employment programs and workforce development initiatives',
          type: 'NGO'
        }
      ]
    },
    {
      title: 'Legal & Research Resources',
      icon: <FaGavel className="text-yellow text-2xl" />,
      resources: [
        {
          name: 'Constitutional Court of South Africa',
          url: 'https://www.concourt.org.za/',
          description: 'Highest court for constitutional matters and human rights cases',
          type: 'Legal'
        },
        {
          name: 'Land Rights Act Resources',
          url: 'https://www.justice.gov.za/',
          description: 'Legislation and resources related to land rights and restitution',
          type: 'Legal'
        },
        {
          name: 'Land and Accountability Research Centre',
          url: 'https://www.lrc.org.za/',
          description: 'Research and advocacy on land rights, restitution, and rural development',
          type: 'Research'
        },
        {
          name: 'South African History Online',
          url: 'https://www.sahistory.org.za/',
          description: 'Comprehensive historical resources and educational materials',
          type: 'Educational'
        },
        {
          name: 'Statistics South Africa',
          url: 'https://www.statssa.gov.za/',
          description: 'Official statistical data on population, economy, and social indicators',
          type: 'Data'
        },
        {
          name: 'University of Witwatersrand Archives',
          url: 'https://www.wits.ac.za/library/',
          description: 'Academic research archives and historical documents',
          type: 'Academic'
        }
      ]
    }
  ];

  const filteredResources = resourceCategories.map(category => ({
    ...category,
    resources: category.resources.filter(resource =>
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.type?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.resources.length > 0);

  return (
    <div className="min-h-screen bg-metallic-blue-gradient-vertical">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-yellow focus:text-black focus:rounded-md focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      {/* Hero Section with Carousel */}
      <section id="main-content" className="relative py-16 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 overflow-hidden -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute top-20 left-10 w-40 h-40 bg-yellow/10 rounded-full opacity-20"
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
            className="absolute bottom-40 right-20 w-32 h-32 bg-white/10 rounded-full opacity-15"
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
        </motion.div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow to-white bg-clip-text text-transparent uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              G20 • Mining • Heritage • Youth
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Comprehensive Resource Hub for South African Development, Land Restitution, and Community Empowerment
            </motion.p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources by name, category, or keyword..."
                  className="w-full px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:border-yellow focus:ring-2 focus:ring-yellow/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search resources"
                  role="search"
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70" />
              </div>
            </div>
          </div>

          {/* Enhanced Sponsors Carousel */}
          <EnhancedSponsorsCarousel />
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white/5 backdrop-blur-md border-t border-b border-white/20 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2">
            {resourceCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveSection(category.title.toLowerCase().replace(/[&\s]+/g, '-'));
                  document.getElementById(category.title.toLowerCase().replace(/[&\s]+/g, '-'))?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeSection === category.title.toLowerCase().replace(/[&\s]+/g, '-')
                    ? 'bg-yellow text-black font-semibold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category.icon}
                <span className="text-sm font-medium">{category.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredResources.length > 0 ? (
            filteredResources.map((category, categoryIndex) => (
              <ScrollRevealWrapper key={categoryIndex} type="fadeUp" duration={0.8} delay={categoryIndex * 0.1}>
                <div
                  id={category.title.toLowerCase().replace(/[&\s]+/g, '-')}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-yellow/20 border border-yellow/30 rounded-lg flex items-center justify-center">
                      {category.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-yellow">
                      {category.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.resources.map((resource, resourceIndex) => (
                      <motion.div
                        key={resourceIndex}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/15 hover:border-yellow/40 transition-all cursor-pointer"
                        whileHover={{ y: -5, scale: 1.02 }}
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-yellow/15 border border-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaExternalLinkAlt className="text-yellow" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1 line-clamp-1">
                              {resource.name}
                            </h3>
                            <p className="text-white/80 text-sm mb-2 line-clamp-2">
                              {resource.description}
                            </p>
                            {resource.type && (
                              <span className="px-2 py-1 bg-yellow/20 text-yellow text-xs rounded-full">
                                {resource.type}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollRevealWrapper>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">No resources found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveSection('g20');
                }}
                className="mt-4 px-6 py-2 bg-yellow text-black rounded-lg hover:bg-yellow/90 transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Legal Entities Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollRevealWrapper type="fadeUp" duration={0.8}>
            <h2 className="text-3xl font-bold text-yellow mb-8">Legal Entities & Regulatory Bodies</h2>
            <p className="text-white/80 mb-8 max-w-3xl">
              Key government agencies, regulatory bodies, and legal institutions involved in land restitution, mining regulation, and heritage preservation
            </p>
          </ScrollRevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Constitutional Court of South Africa',
                image: '/Images/legal/constitutional-court.png',
                description: 'Highest court for constitutional matters, human rights, and land restitution cases',
                website: 'https://www.concourt.org.za/',
                role: 'Judicial'
              },
              {
                name: 'Land Claims Commission',
                image: '/Images/legal/land-claims-commission.png',
                description: 'Government body responsible for processing and adjudicating land restitution claims',
                website: 'https://www.lcc.org.za/',
                role: 'Government'
              },
              {
                name: 'Department of Mineral Resources and Energy',
                image: '/Images/sponsours/Department-of-Mineral-Resources-and-Energy-1200x675-cropped.jpg',
                description: 'Regulatory authority for mining operations, licenses, and environmental compliance',
                website: 'https://www.dmr.gov.za/',
                role: 'Regulatory'
              },
              {
                name: 'South African Heritage Resources Agency',
                image: '/Images/legal/heritage-council.png',
                description: 'Protection and management of cultural heritage sites and historical resources',
                website: 'https://www.sahra.org.za/',
                role: 'Heritage'
              },
              {
                name: 'Minerals Council South Africa',
                image: '/Images/sponsours/minerals-council.png',
                description: 'Industry association representing mining companies and promoting sustainable practices',
                website: 'https://www.mineralscouncil.org.za/',
                role: 'Industry'
              },
              {
                name: 'National Heritage Council',
                image: '/Images/legal/heritage-council.png',
                description: 'Promotion and preservation of South African cultural heritage and identity',
                website: 'https://www.nhc.org.za/',
                role: 'Cultural'
              }
            ].map((entity, index) => (
              <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
                <motion.div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 bg-gradient-to-br from-metallic-blue-dark to-metallic-blue-light flex items-center justify-center">
                    <img
                      src={entity.image}
                      alt={entity.name}
                      className="max-h-full max-w-full object-contain p-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/Images/sponsours/zimele.png'; // Fallback
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{entity.name}</h3>
                    <p className="text-white/80 text-sm mb-3 line-clamp-3">{entity.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-yellow/20 text-yellow text-xs rounded-full">{entity.role}</span>
                    </div>
                    <a
                      href={entity.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-yellow text-black text-sm font-semibold hover:bg-yellow/90 transition-all rounded"
                    >
                      <FaExternalLinkAlt />
                      <span>Visit Website</span>
                    </a>
                  </div>
                </motion.div>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollRevealWrapper type="fadeUp" duration={0.8}>
            <h2 className="text-3xl font-bold text-yellow mb-8">Additional Resources & Downloads</h2>
          </ScrollRevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'G20 Reports & Publications',
                description: 'Official G20 documents, reports, and policy briefs',
                icon: <FaGlobe className="text-yellow text-2xl" />,
                link: 'https://www.g20.org/publications'
              },
              {
                title: 'Mining Industry Statistics',
                description: 'Annual reports and statistical data on South African mining',
                icon: <FaIndustry className="text-yellow text-2xl" />,
                link: 'https://www.mineralscouncil.org.za/industry-news/statistics'
              },
              {
                title: 'Land Reform Legislation',
                description: 'Complete text of land reform laws and regulations',
                icon: <FaGavel className="text-yellow text-2xl" />,
                link: 'https://www.dalrrd.gov.za/legislation'
              },
              {
                title: 'Youth Development Programs',
                description: 'Government and NGO youth empowerment initiatives',
                icon: <FaGraduationCap className="text-yellow text-2xl" />,
                link: 'https://www.nyda.gov.za/programmes'
              }
            ].map((resource, index) => (
              <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow/20 border border-yellow/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      {resource.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{resource.title}</h3>
                      <p className="text-white/80 text-sm mb-3">{resource.description}</p>
                      <div className="flex items-center gap-2 text-yellow text-sm font-medium">
                        <FaDownload />
                        <span>Download Resources</span>
                      </div>
                    </div>
                  </div>
                </a>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-metallic-blue-dark to-metallic-blue-light">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollRevealWrapper type="fadeUp" duration={0.8}>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow mb-6">
              Get Involved in Ga-Mawela Restitution
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join our mission to restore justice, preserve heritage, and empower communities through land restitution and sustainable development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all rounded-lg flex items-center gap-2"
              >
                <FaUsers />
                <span>Partner With Us</span>
              </a>
              <a
                href="/youth"
                className="px-8 py-3 bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-all rounded-lg flex items-center gap-2"
              >
                <FaGraduationCap />
                <span>Youth Programs</span>
              </a>
              <a
                href="/resources"
                className="px-8 py-3 bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-all rounded-lg flex items-center gap-2"
              >
                <FaSearch />
                <span>Explore All Resources</span>
              </a>
            </div>
          </ScrollRevealWrapper>
        </div>
      </section>
    </div>
  );
}