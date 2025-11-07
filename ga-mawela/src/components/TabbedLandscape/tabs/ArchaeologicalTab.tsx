'use client';

import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

export default function ArchaeologicalTab() {
  const heritageItems = [
    {
      title: 'Initiation Sites',
      description: 'Sacred locations where traditional initiation ceremonies were conducted, representing spiritual continuity and cultural transmission across generations.',
      cardClass: 'card-initiation-sites',
    },
    {
      title: 'Ritual Practices',
      description: 'Documented evidence of traditional ceremonies, ancestral veneration, and spiritual practices unique to Ga-Mawela community.',
      cardClass: 'card-ritual-practices',
    },
    {
      title: 'Settlement Patterns',
      description: 'Archaeological evidence of traditional settlement layouts, homestead structures, and land use patterns dating back centuries.',
      cardClass: 'card-settlement-patterns',
    },
    {
      title: 'Oral Histories',
      description: 'Recorded testimonies from community elders documenting traditional knowledge, genealogies, and historical narratives.',
      cardClass: 'card-oral-history',
    },
    {
      title: 'Material Culture',
      description: 'Artifacts, pottery, tools, and other physical evidence of sustained occupation and cultural practices.',
      cardClass: 'card-material-culture',
    },
    {
      title: 'Land Features',
      description: 'Named geographical features, water sources, and sacred sites that hold cultural significance for the community.',
      cardClass: 'card-land-features',
    },
  ];

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-archaeological-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Archaeological & Heritage Evidence
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            SAHRA Reports & Cultural Documentation
          </p>
        </ScrollRevealWrapper>

        {/* Heritage Grid - Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {heritageItems.map((item, index) => (
            <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
              <div className={`${item.cardClass} card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 rounded-lg hover:bg-white/20 relative overflow-hidden group`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-yellow mb-3 font-merriweather">
                    {item.title}
                  </h3>
                  <p className="text-white leading-relaxed font-inter text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>

        {/* Key Findings - Landscape */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 mb-8 rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-6 font-merriweather">
              Key Archaeological Findings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-yellow font-bold text-xl flex-shrink-0">✓</span>
                <span className="text-white font-inter text-sm">Evidence of continuous settlement in Dwars River Valley dating back to pre-colonial times</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow font-bold text-xl flex-shrink-0">✓</span>
                <span className="text-white font-inter text-sm">Documented initiation sites and ritual spaces confirming cultural practices</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow font-bold text-xl flex-shrink-0">✓</span>
                <span className="text-white font-inter text-sm">Genealogical records linking current community to Masetu lineage</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow font-bold text-xl flex-shrink-0">✓</span>
                <span className="text-white font-inter text-sm">SAHRA certification of heritage significance and cultural importance</span>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>

        {/* Download */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 text-center rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">Download Heritage Reports</h3>
            <a href="#" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-sm rounded">
              SAHRA Heritage Report
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

