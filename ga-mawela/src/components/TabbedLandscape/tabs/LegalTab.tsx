'use client';

import { useState } from 'react';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

export default function LegalTab() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const legalSections = [
    {
      id: 'why-investigating',
      title: 'Why We Are Investigating',
      content: 'The Ga-Mawela community was systematically dispossessed of their ancestral land through colonial and apartheid-era policies. This investigation seeks to establish legal proof of traditional occupation, continuous habitation, and rightful ownership claims under South African restitution law.',
    },
    {
      id: 'what-documents-show',
      title: 'What the Documents Show',
      content: 'Our compiled evidence includes: (1) Colonial records acknowledging Ga-Mawela settlement, (2) Land deeds showing dispossession, (3) Labour tenancy contracts proving forced displacement, (4) LRC documentation of claims, (5) Genealogical records linking current residents to Masetu, (6) Testimonies from community elders.',
    },
    {
      id: 'how-contribute',
      title: 'How Descendants Can Contribute Evidence',
      content: 'Community members can submit: genealogical records, family photographs, oral histories, land deeds, employment records, testimonies, and any documentation proving connection to Ga-Mawela. All submissions are confidential and protected under legal privilege.',
    },
    {
      id: 'legal-framework',
      title: 'Legal Framework',
      content: 'Our claim is grounded in: (1) The Restitution of Land Rights Act, 1994, (2) The Constitution of South Africa (Section 25), (3) International Indigenous Rights Conventions, (4) Common law principles of adverse possession and traditional occupation.',
    },
    {
      id: 'contested-claims',
      title: 'Contested Narratives: Mankge vs. Other Lineages',
      description: 'Understanding the tension between different lineage claims',
      content: 'The Mankge family has made competing claims to Ga-Mawela territory. Our investigation documents: (1) The historical relationship between Mankge and Masetu lineages, (2) Evidence of Masetu\'s primary settlement and governance, (3) Documentation of Mankge\'s later arrival and secondary status, (4) Legal analysis of competing claims under restitution law.',
    },
  ];

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-legal-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Legal Rights & Restitution
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            Understanding Our Claim & Contributing Evidence
          </p>
        </ScrollRevealWrapper>

        {/* Accordion - Landscape Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {legalSections.map((section, index) => (
            <ScrollRevealWrapper key={section.id} type="fadeUp" duration={0.8} delay={index * 0.1}>
              <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 overflow-hidden hover:border-yellow/60 rounded-lg hover:bg-white/20">
                <button
                  type="button"
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-base font-bold text-yellow text-left font-merriweather">
                    {section.title}
                  </h3>
                  <span className={`text-xl text-yellow transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedSection === section.id && (
                  <div className="px-6 py-4 border-t border-white/30 bg-white/10">
                    <p className="text-white leading-relaxed text-xs font-inter">
                      {section.content}
                    </p>
                  </div>
                )}
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 text-center rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-3 font-merriweather">
              Have Evidence to Share?
            </h3>
            <p className="text-white mb-4 text-sm font-inter">
              Help strengthen our claim by submitting genealogical records, photographs, testimonies, or any documentation proving connection to Ga-Mawela.
            </p>
            <a href="/upload" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block text-sm font-inter rounded">
              Submit Evidence
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

