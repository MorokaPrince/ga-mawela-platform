'use client';

import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

export default function MiningTab() {
  const corporateInterests = [
    {
      company: 'Anglo American',
      interest: 'Mining Rights & Exploration',
      impact: 'Sought mining licenses on Ga-Mawela territory without community consent',
      status: 'Under Investigation',
    },
    {
      company: 'Implats (Impala Platinum)',
      interest: 'Platinum Mining Operations',
      impact: 'Historical mining activities affecting community land and water resources',
      status: 'Documented',
    },
    {
      company: 'ARM (African Rainbow Minerals)',
      interest: 'Mineral Exploration',
      impact: 'Exploration activities on disputed territory',
      status: 'Under Review',
    },
  ];

  const miningImpacts = [
    {
      title: 'Environmental Degradation',
      description: 'Mining operations have contaminated water sources, destroyed vegetation, and altered the landscape.',
    },
    {
      title: 'Community Displacement',
      description: 'Mining activities have forced community members off their land and disrupted traditional livelihoods.',
    },
    {
      title: 'Health Hazards',
      description: 'Exposure to mining dust, chemicals, and radiation poses serious health risks to residents.',
    },
    {
      title: 'Cultural Destruction',
      description: 'Mining has destroyed sacred sites, initiation grounds, and culturally significant locations.',
    },
  ];

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-mining-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Mining Interests & Corporate Involvement
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            Anglo American, Implats, ARM & Ga-Mawela Territory
          </p>
        </ScrollRevealWrapper>

        {/* Corporate Grid - Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {corporateInterests.map((item, index) => (
            <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
              <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 rounded-lg hover:bg-white/20">
                <h4 className="text-lg font-bold text-yellow mb-2 font-merriweather">{item.company}</h4>
                <p className="text-xs text-white mb-3 font-inter"><strong>Interest:</strong> {item.interest}</p>
                <p className="text-xs text-white mb-4 font-inter">{item.impact}</p>
                <span className="px-3 py-1 bg-yellow text-black font-bold rounded text-xs font-inter">
                  {item.status}
                </span>
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>

        {/* Mining Impacts - Landscape */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h3 className="text-3xl font-bold text-yellow mb-8 font-merriweather">Impact on Ga-Mawela Community</h3>
        </ScrollRevealWrapper>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {miningImpacts.map((impact, index) => (
            <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
              <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 rounded-lg hover:bg-white/20">
                <h4 className="text-base font-bold text-white mb-2 font-merriweather">{impact.title}</h4>
                <p className="text-white text-xs font-inter leading-relaxed">{impact.description}</p>
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>

        {/* Resources */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 text-center rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">Research & Documentation</h3>
            <p className="text-white mb-6 font-inter text-sm">
              Access detailed reports on corporate mining interests and their impact on Ga-Mawela
            </p>
            <a href="#" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-sm">
              View Mining Reports
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

