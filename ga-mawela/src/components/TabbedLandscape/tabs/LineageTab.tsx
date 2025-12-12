'use client';

import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

export default function LineageTab() {
  const lineageTree = [
    {
      generation: 'Founder',
      name: 'Masetu',
      title: 'Founder of Ga-Mawela',
      description: 'Established Ga-Mawela settlement in the Dwars River Valley. Masetu was a respected leader who governed the community and maintained traditional practices. Father of Lesedi and Moroka.',
      descendants: 'Sons: Lesedi & Moroka',
    },
    {
      generation: 'Generation 2 - Brother 1',
      name: 'Lesedi',
      title: 'Son of Masetu',
      description: 'Brother of Moroka. Continued his father\'s leadership and maintained community traditions. Lesedi expanded the settlement and strengthened cultural practices during the early colonial period.',
      descendants: 'Multiple descendants',
    },
    {
      generation: 'Generation 2 - Brother 2',
      name: 'Moroka',
      title: 'Son of Masetu',
      description: 'Brother of Lesedi. Led the community through the colonial period. Moroka documented family history and maintained genealogical records during challenging times. Ancestor of current Rakgama family.',
      descendants: 'Current community members',
    },
    {
      generation: 'Present Day',
      name: 'Current Descendants',
      title: 'Ga-Mawela Community',
      description: 'Hundreds of descendants of Masetu, Lesedi, and Moroka living in and around the Dwars River Valley. Many maintain traditional knowledge and cultural practices. True heirs to the Ga-Mawela territory.',
      descendants: 'Ongoing lineage - Rakgama family line',
    },
  ];

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-lineage-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Lineage & Family Heritage
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            Masetu → Lesedi → Moroka → Present Day
          </p>
        </ScrollRevealWrapper>

        {/* Lineage Tree - Landscape Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {lineageTree.map((person, index) => (
            <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
              <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 rounded-lg hover:bg-white/20">
                {/* Generation Number */}
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow text-black font-bold text-lg font-inter mb-4">
                  {index + 1}
                </div>

                {/* Card Content */}
                <div>
                  <div className="text-xs font-semibold text-yellow uppercase tracking-wide font-inter mb-2">
                    {person.generation}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 font-merriweather">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold text-yellow mb-3 font-inter">
                    {person.title}
                  </p>
                  <p className="text-white leading-relaxed mb-3 font-inter text-xs">
                    {person.description}
                  </p>
                  <p className="text-xs text-yellow font-semibold font-inter">
                    {person.descendants}
                  </p>
                </div>
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>

        {/* Genealogical Records - Landscape */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 mb-8 rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-6 font-merriweather">Genealogical Documentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-interactive bg-white/15 backdrop-blur-md rounded-lg p-6 border border-white/30 hover:bg-white/20">
                <h4 className="text-lg font-bold text-white mb-3 font-merriweather">Family Records</h4>
                <p className="text-white font-inter text-sm">Documented genealogical records linking current community members to Masetu lineage</p>
              </div>
              <div className="card-interactive bg-white/15 backdrop-blur-md rounded-lg p-6 border border-white/30 hover:bg-white/20">
                <h4 className="text-lg font-bold text-white mb-3 font-merriweather">Oral Histories</h4>
                <p className="text-white font-inter text-sm">Recorded testimonies from elders preserving family stories and cultural knowledge</p>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>

        {/* CTA */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 text-center rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">Verify Your Connection</h3>
            <p className="text-white mb-6 font-inter text-sm">
              If you believe you are a descendant of Masetu, submit your genealogical information to strengthen our community claim.
            </p>
            <a href="/upload" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-sm rounded">
              Submit Family Records
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

