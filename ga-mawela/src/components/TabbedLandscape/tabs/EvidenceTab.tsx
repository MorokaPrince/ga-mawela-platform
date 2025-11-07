'use client';

import { useState } from 'react';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

export default function EvidenceTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const documents = [
    {
      category: 'historical',
      title: 'SA History PDF: Ga-Mawela Community',
      description: 'Comprehensive historical account of Ga-Mawela settlement, colonial dispossession, and community resilience',
      type: 'PDF',
      size: '2.4 MB',
    },
    {
      category: 'legal',
      title: 'LRC Annual Report Extracts',
      description: 'Land Claims Commission documentation of Ga-Mawela restitution claim and evidence assessment',
      type: 'PDF',
      size: '1.8 MB',
    },
    {
      category: 'heritage',
      title: 'SAHRA Heritage Report',
      description: 'South African Heritage Resources Agency certification of cultural and archaeological significance',
      type: 'PDF',
      size: '3.2 MB',
    },
    {
      category: 'genealogical',
      title: 'Genealogical Records & Family Trees',
      description: 'Documented lineage connecting current residents to Masetu founder',
      type: 'PDF',
      size: '1.5 MB',
    },
    {
      category: 'testimonies',
      title: 'Community Testimonies & Oral Histories',
      description: 'Recorded statements from elders and community members about traditional occupation',
      type: 'PDF',
      size: '2.1 MB',
    },
    {
      category: 'legal',
      title: 'Land Deeds & Property Records',
      description: 'Historical documents showing dispossession and land transfers',
      type: 'PDF',
      size: '1.9 MB',
    },
    {
      category: 'historical',
      title: 'Colonial Records & Government Documents',
      description: 'Official colonial-era documents acknowledging Ga-Mawela settlement',
      type: 'PDF',
      size: '2.7 MB',
    },
    {
      category: 'testimonies',
      title: 'Labour Tenancy Contracts & Employment Records',
      description: 'Evidence of forced labour and economic exploitation during apartheid',
      type: 'PDF',
      size: '1.6 MB',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Documents' },
    { id: 'historical', label: 'Historical' },
    { id: 'legal', label: 'Legal' },
    { id: 'heritage', label: 'Heritage' },
    { id: 'genealogical', label: 'Genealogical' },
    { id: 'testimonies', label: 'Testimonies' },
  ];

  const filteredDocs = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-evidence-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Evidence & Documents
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            Downloadable Historical, Legal & Heritage Documentation
          </p>
        </ScrollRevealWrapper>

        {/* Category Filter - Horizontal */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded text-sm font-semibold transition-all font-inter ${
                  selectedCategory === cat.id
                    ? 'bg-yellow text-black'
                    : 'bg-white/15 backdrop-blur-md border border-white/30 text-white hover:border-yellow/60 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollRevealWrapper>

        {/* Documents Grid - Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {filteredDocs.map((doc, index) => (
            <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
              <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 flex flex-col rounded-lg hover:bg-white/20">
                <span className="inline-block px-2 py-1 bg-yellow text-black text-xs font-bold rounded mb-2 font-inter w-fit">
                  {doc.type}
                </span>
                <h3 className="text-base font-bold text-white mb-2 font-merriweather flex-grow">
                  {doc.title}
                </h3>
                <p className="text-white text-xs mb-4 font-inter">
                  {doc.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white font-semibold font-inter">
                    {doc.size}
                  </span>
                  <a href="#" className="px-3 py-1 bg-yellow text-black text-xs font-semibold hover:bg-yellow/90 transition-all inline-block font-inter rounded">
                    Download
                  </a>
                </div>
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>

        {/* Submit Evidence */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 text-center rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">Have Additional Evidence?</h3>
            <p className="text-white mb-6 font-inter text-sm">
              Help strengthen our documentation by submitting additional evidence, documents, or testimonies.
            </p>
            <a href="#" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-sm rounded">
              Submit Evidence
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

