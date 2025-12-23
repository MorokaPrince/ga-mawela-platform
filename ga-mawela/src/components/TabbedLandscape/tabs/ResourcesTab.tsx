'use client';

import { useState, useEffect } from 'react';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface Resource {
  _id: string;
  name: string;
  url: string;
  category: string;
  description?: string;
  createdAt: string;
}

// Comprehensive G20 SA Partners and Resources
const comprehensiveResources = [
  {
    category: '🇿🇦 G20 South Africa Presidency & Engagement Groups',
    items: [
      { name: 'G20 South Africa Official Site', url: 'https://g20.org/' },
      { name: 'G20 SA Logo & Theme (Brand + Media)', url: 'https://g20.org/g20-south-africa/g20-logo-and-theme/' },
      { name: 'Y20 South Africa (Youth 20)', url: 'https://y20southafrica.org/' },
      { name: 'B20 South Africa (Business 20)', url: 'https://b20southafrica.org/' },
      { name: 'DIRCO (Department of International Relations & Cooperation)', url: 'https://dirco.gov.za/' },
      { name: 'The Presidency – Media / G20 Resources', url: 'https://www.thepresidency.gov.za/' },
      { name: 'GovZA G20 Social Summit Advisory', url: 'https://www.gov.za/news/media-advisories/conferences-summits-seminars-and-workshops/south-africa-hosts-g20-social' },
    ],
  },
  {
    category: '🧠 Innovation Bridge, Tech & SA Innovation Ecosystem',
    items: [
      { name: 'Innovation Bridge Portal (SA)', url: 'https://innovationbridge.info/' },
      { name: 'G20 Tech Challenge (SA-aligned)', url: 'https://innovationbridge.info/' },
      { name: 'G20 Open Innovation Platform (SA-driven)', url: 'https://innovationbridge.info/' },
      { name: 'Technology Innovation Agency (TIA)', url: 'http://www.tia.org.za/' },
      { name: 'Council for Scientific & Industrial Research (CSIR)', url: 'https://www.csir.co.za/' },
    ],
  },
  {
    category: '⛏️ Mining Industry Partners, Innovation Hubs & CSI Organisations',
    items: [
      { name: 'Anglo American', url: 'https://www.angloamerican.com/' },
      { name: 'AngloGold Ashanti – SA Legacy Projects', url: 'https://www.anglogoldashanti.com/sustainability/social/people/sa-legacy-projects/' },
      { name: 'Impala Platinum (Implats)', url: 'https://www.implats.co.za/' },
      { name: 'Sibanye-Stillwater – Media Gallery', url: 'https://www.sibanyestillwater.com/news-investors/media-gallery/' },
      { name: 'Mandela Mining Precinct (MMP)', url: 'https://mandelaminingprecinct.org.za/' },
      { name: 'Mining Equipment Manufacturers of South Africa (MEMSA)', url: 'https://memsa.org.za/' },
      { name: 'Mining CSI Magazine', url: 'https://www.miningcsi.co.za/' },
      { name: 'Minerals Council South Africa', url: 'https://www.mineralscouncil.org.za/' },
    ],
  },
  {
    category: '🌱 Land Affairs, Agriculture & Rural Development',
    items: [
      { name: 'Department of Agriculture, Land Reform & Rural Development (DALRRD)', url: 'https://www.dalrrd.gov.za/' },
      { name: 'GovZA Land Reform Overview', url: 'https://www.gov.za/about-sa/agriculture-land-reform-and-rural-development' },
      { name: 'Department of Mineral Resources and Energy', url: 'https://www.dmr.gov.za/' },
      { name: 'Land Claims Commission', url: 'https://www.lcc.org.za/' },
    ],
  },
  {
    category: '🏛️ Heritage, Cultural & Historical Organisations',
    items: [
      { name: 'South African Heritage Resources Agency (SAHRA)', url: 'http://www.sahra.org.za/' },
      { name: 'SA Heritage Resources Information System (SAHRIS)', url: 'https://sahris.sahra.org.za/' },
      { name: 'National Heritage Council', url: 'https://www.nhc.org.za/' },
      { name: 'South African History Online', url: 'https://www.sahistory.org.za/' },
    ],
  },
  {
    category: '👩‍🎓 Youth, Skills, Employment & Training',
    items: [
      { name: 'National Youth Development Agency (NYDA)', url: 'https://www.nyda.gov.za/' },
      { name: 'Youth Employment Service (YES4Youth)', url: 'https://www.yes4youth.org/' },
      { name: 'Mining Community ICT Learnership Programme', url: 'https://www.africanminingnews.co.za/technology/learnership-empowers-101-youth-from-mining-communities-with-ict-skills/' },
      { name: 'Department of Small Business Development', url: 'https://www.dsbd.gov.za/' },
      { name: 'National Skills Fund', url: 'https://www.nsf.org.za/' },
    ],
  },
  {
    category: '🌍 Development & Investment Partners',
    items: [
      { name: 'UNDP South Africa', url: 'https://www.undp.org/sa/' },
      { name: 'InvestSA', url: 'https://www.investsa.gov.za/' },
      { name: 'Industrial Development Corporation', url: 'https://www.idc.co.za/' },
      { name: 'SEFA (Small Enterprise Finance Agency)', url: 'https://www.sefa.org.za/' },
    ],
  },
  {
    category: 'NGO & Community Resources',
    items: [
      { name: 'Mines and Communities', url: 'https://www.minesandcommunities.org/' },
      { name: 'Land and Accountability Research Centre', url: 'https://www.lrc.org.za/' },
      { name: 'Community Law Centre', url: 'https://www.communitylawcentre.org.za/' },
      { name: 'Indigenous Peoples Network', url: 'https://www.iwgia.org/' },
      { name: 'ActionAid South Africa', url: 'https://southafrica.actionaid.org/' },
      { name: 'Bench Marks Foundation', url: 'https://www.bench-marks.org.za/' },
      { name: 'Zimele', url: 'https://www.zimele.co.za/' },
    ],
  },
  {
    category: 'Academic & Research',
    items: [
      { name: 'University of Witwatersrand Archives', url: 'https://www.wits.ac.za/library/' },
      { name: 'University of Pretoria - Centre for Human Rights', url: 'https://www.up.ac.za/centre-for-human-rights' },
      { name: 'African Mining Vision', url: 'https://www.africaminingvision.org/' },
      { name: 'Council for Geoscience', url: 'https://www.geoscience.org.za/' },
      { name: 'Mining Qualification Authority', url: 'https://www.mqa.org.za/' },
    ],
  },
  {
    category: 'Legal & Rights',
    items: [
      { name: 'Constitutional Court of South Africa', url: 'https://www.concourt.org.za/' },
      { name: 'Land Rights Act Resources', url: 'https://www.justice.gov.za/' },
      { name: 'International Indigenous Rights', url: 'https://www.un.org/development/desa/indigenouspeoples/' },
      { name: 'Legal Aid Organizations', url: 'https://www.legalaid.org.za/' },
      { name: 'Mineral and Petroleum Resources Development Act', url: 'https://www.gov.za/documents/mineral-and-petroleum-resources-development-act' },
    ],
  },
  {
    category: 'Economic & Statistical Data',
    items: [
      { name: 'Statistics South Africa', url: 'https://www.statssa.gov.za/' },
      { name: 'South African Reserve Bank', url: 'https://www.resbank.co.za/' },
      { name: 'Department of Trade, Industry and Competition', url: 'https://www.thedtic.gov.za/' },
      { name: 'Mining Industry Statistics', url: 'https://www.mineralscouncil.org.za/industry-news/statistics' },
      { name: 'World Economic Forum - Mining & Metals', url: 'https://www.weforum.org/industries/mining-and-metals' },
      { name: 'Platinum Group Metals Association', url: 'https://www.pgma.co.za/' },
    ],
  },
];

export default function ResourcesTab() {
  const [resources, setResources] = useState<{category: string, items: {name: string, url: string}[]}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/resources');
        if (response.ok) {
          const data = await response.json();
          
          // Ensure data is an array before calling reduce
          if (Array.isArray(data)) {
            // Group resources by category
            const grouped = data.reduce((acc: Record<string, Resource[]>, resource: Resource) => {
              const category = resource.category || 'Other Resources';
              if (!acc[category]) {
                acc[category] = [];
              }
              acc[category].push(resource);
              return acc;
            }, {});

            // Convert to array format expected by component
            const formattedResources = Object.entries(grouped).map(([category, items]: [string, unknown]) => ({
              category,
              items: (items as Resource[]).map((item: Resource) => ({
                name: item.name,
                url: item.url,
              }))
            }));

            setResources(formattedResources);
          } else {
            // Use comprehensive fallback data if data is not an array
            setResources(comprehensiveResources);
          }
        } else {
          // Use comprehensive fallback data
          setResources(comprehensiveResources);
        }
      } catch (error) {
        console.error('Failed to fetch resources:', error);
        // Use comprehensive fallback data
        setResources(comprehensiveResources);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-resources-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Resources & References
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            Comprehensive G20 South Africa Partners, Government, NGO, Academic & Legal Resources
          </p>
        </ScrollRevealWrapper>

        {/* Resources Grid - Landscape */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg animate-pulse">
                <div className="h-6 bg-white/20 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  {[...Array(6)].map((_, itemIndex) => (
                    <div key={itemIndex} className="h-4 bg-white/20 rounded w-full"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {resources.map((section, index) => (
              <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
                <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 rounded-lg hover:bg-white/20">
                  <h3 className="text-lg font-bold text-yellow mb-4 pb-3 border-b-2 border-yellow font-merriweather">
                    {section.category}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item: {name: string, url: string}, itemIndex: number) => (
                      <li key={itemIndex}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white hover:text-yellow transition-colors font-semibold group font-inter text-xs"
                          title={`Visit ${item.name}`}
                        >
                          <span className="group-hover:underline">{item.name}</span>
                          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealWrapper>
            ))}
          </div>
        )}

        {/* Additional Resources */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 mb-8 rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-6 font-merriweather">Additional Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-interactive bg-white/15 backdrop-blur-md rounded-lg p-6 border border-white/30 hover:bg-white/20">
                <h4 className="text-lg font-bold text-white mb-3 font-merriweather">G20 SA Partner Network</h4>
                <p className="text-white mb-4 font-inter text-sm">
                  Access the complete G20 South Africa partner ecosystem including engagement groups, innovation platforms, and community development initiatives.
                </p>
                <a href="/sponsors" className="text-yellow hover:text-yellow/80 transition-colors font-semibold font-inter text-sm">
                  View Partners →
                </a>
              </div>
              <div className="card-interactive bg-white/15 backdrop-blur-md rounded-lg p-6 border border-white/30 hover:bg-white/20">
                <h4 className="text-lg font-bold text-white mb-3 font-merriweather">Educational Materials</h4>
                <p className="text-white mb-4 font-inter text-sm">
                  Educational resources for students, educators, and community members learning about Ga-Mawela and land restitution.
                </p>
                <a href="/resources" className="text-yellow hover:text-yellow/80 transition-colors font-semibold font-inter text-sm">
                  Access Materials →
                </a>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>

        {/* Contact & Support */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 text-center rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">Need Help Finding Resources?</h3>
            <p className="text-white mb-6 font-inter text-sm">
              Our team can help you locate specific documents, research materials, or connect you with relevant organizations from the G20 South Africa partner network.
            </p>
            <a href="/contact" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-sm rounded">
              Contact Support
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}
