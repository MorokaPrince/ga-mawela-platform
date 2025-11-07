'use client';

import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

export default function SponsorsTab() {
  const sponsors = [
    {
      name: 'Department of Mineral Resources and Energy',
      logo: '/Images/sponsours/Department-of-Mineral-Resources-and-Energy-1200x675-cropped.jpg',
      role: 'Government Partner',
      description: 'Supporting regulatory oversight and policy alignment',
    },
    {
      name: 'Department of Land Reform and Rural Development',
      logo: '/Images/sponsours/thumb_department_of_land_reform_and_rural_development_(dlrrd).png',
      role: 'Government Partner',
      description: 'Facilitating land restitution processes',
    },
    {
      name: 'Zimele',
      logo: '/Images/sponsours/zimele.png',
      role: 'Community Partner',
      description: 'Supporting community development initiatives',
    },
  ];

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-sponsors-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Partners & Supporters
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            Organizations Supporting Ga-Mawela Restitution
          </p>
        </ScrollRevealWrapper>

        {/* Sponsors Grid - Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {sponsors.map((sponsor, index) => (
            <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
              <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 rounded-lg hover:bg-white/20">
                <div className="h-24 mb-4 flex items-center justify-center bg-white/10 rounded-lg overflow-hidden border border-white/30">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-merriweather">
                  {sponsor.name}
                </h3>
                <p className="text-xs font-semibold text-yellow mb-2 font-inter">
                  {sponsor.role}
                </p>
                <p className="text-white font-inter text-xs">
                  {sponsor.description}
                </p>
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>

        {/* Partnership Info - Landscape */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 mb-8 rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-6 font-merriweather">
              Partnership Opportunities
            </h3>
            <p className="text-white mb-6 leading-relaxed font-inter text-sm">
              We welcome partnerships with government agencies, NGOs, academic institutions, and community organizations
              committed to supporting land restitution, heritage preservation, and community development.
              Together, we can ensure that Ga-Mawela's truth is restored and justice is served.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-yellow pl-4">
                <h4 className="font-bold text-white mb-2 font-merriweather">Government Support</h4>
                <p className="text-xs text-white font-inter">Policy alignment and regulatory oversight</p>
              </div>
              <div className="border-l-4 border-yellow pl-4">
                <h4 className="font-bold text-white mb-2 font-merriweather">Community Development</h4>
                <p className="text-xs text-white font-inter">Economic empowerment and capacity building</p>
              </div>
              <div className="border-l-4 border-yellow pl-4">
                <h4 className="font-bold text-white mb-2 font-merriweather">Research & Documentation</h4>
                <p className="text-xs text-white font-inter">Academic and heritage preservation support</p>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>

        {/* CTA */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 text-center rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">Interested in Partnering?</h3>
            <p className="text-white mb-6 font-inter text-sm">
              Contact us to explore partnership opportunities and support Ga-Mawela's restitution journey.
            </p>
            <a href="#" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-sm rounded">
              Get in Touch
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

