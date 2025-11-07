'use client';

import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

export default function ResourcesTab() {
  const resources = [
    {
      category: 'Government Portals',
      items: [
        { name: 'Department of Land Affairs', url: 'https://www.dlapsa.gov.za/' },
        { name: 'Land Claims Commission', url: 'https://www.lcc.org.za/' },
        { name: 'SAHRA (Heritage Resources)', url: 'https://www.sahra.org.za/' },
        { name: 'Department of Mineral Resources', url: 'https://www.dmr.gov.za/' },
      ],
    },
    {
      category: 'NGO & Community Resources',
      items: [
        { name: 'Mines and Communities', url: 'https://www.minesandcommunities.org/' },
        { name: 'Land and Accountability Research Centre', url: 'https://www.lrc.org.za/' },
        { name: 'Community Law Centre', url: 'https://www.communitylawcentre.org.za/' },
        { name: 'Indigenous Peoples Network', url: 'https://www.iwgia.org/' },
      ],
    },
    {
      category: 'Academic & Research',
      items: [
        { name: 'University of Witwatersrand Archives', url: 'https://www.wits.ac.za/library/' },
        { name: 'South African History Online', url: 'https://www.sahistory.org.za/' },
        { name: 'Genealogy Research Databases', url: 'https://www.familysearch.org/' },
        { name: 'Heritage Documentation Projects', url: 'https://www.sahra.org.za/heritage-resources' },
      ],
    },
    {
      category: 'Legal & Rights',
      items: [
        { name: 'Constitutional Court of South Africa', url: 'https://www.concourt.org.za/' },
        { name: 'Land Rights Act Resources', url: 'https://www.justice.gov.za/' },
        { name: 'International Indigenous Rights', url: 'https://www.un.org/development/desa/indigenouspeoples/' },
        { name: 'Legal Aid Organizations', url: 'https://www.legalaid.org.za/' },
      ],
    },
  ];

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-resources-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Resources & References
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            Links to Government, NGO, Academic & Legal Resources
          </p>
        </ScrollRevealWrapper>

        {/* Resources Grid - Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {resources.map((section, index) => (
            <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
              <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 rounded-lg hover:bg-white/20">
                <h3 className="text-lg font-bold text-yellow mb-4 pb-3 border-b-2 border-yellow font-merriweather">
                  {section.category}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
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

        {/* Additional Resources */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 mb-8 rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-6 font-merriweather">Additional Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-interactive bg-white/15 backdrop-blur-md rounded-lg p-6 border border-white/30 hover:bg-white/20">
                <h4 className="text-lg font-bold text-white mb-3 font-merriweather">Reading List</h4>
                <p className="text-white mb-4 font-inter text-sm">
                  Recommended books, articles, and academic papers on land restitution, indigenous rights, and South African history.
                </p>
                <a href="#" className="text-yellow hover:text-yellow/80 transition-colors font-semibold font-inter text-sm">
                  View Reading List →
                </a>
              </div>
              <div className="card-interactive bg-white/15 backdrop-blur-md rounded-lg p-6 border border-white/30 hover:bg-white/20">
                <h4 className="text-lg font-bold text-white mb-3 font-merriweather">Educational Materials</h4>
                <p className="text-white mb-4 font-inter text-sm">
                  Educational resources for students, educators, and community members learning about Ga-Mawela and land restitution.
                </p>
                <a href="#" className="text-yellow hover:text-yellow/80 transition-colors font-semibold font-inter text-sm">
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
              Our team can help you locate specific documents, research materials, or connect you with relevant organizations.
            </p>
            <a href="#" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-sm rounded">
              Contact Support
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

