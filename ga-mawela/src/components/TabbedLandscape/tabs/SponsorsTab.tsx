'use client';

import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import EnhancedSponsorsCarousel from '@/components/EnhancedSponsorsCarousel';

export default function SponsorsTab() {
  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-sponsors-tab">
      {/* Enhanced Sponsors Carousel */}
      <EnhancedSponsorsCarousel />

      {/* Additional Partnership Information */}
      <div className="max-w-7xl mx-auto mt-12">
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
            <a href="/contact" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-sm rounded">
              Get in Touch
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

