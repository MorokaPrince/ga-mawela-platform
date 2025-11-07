'use client';

import { useState } from 'react';

interface EvidenceItem {
  id: string;
  title: string;
  type: 'deed' | 'letter' | 'document' | 'photo';
  date: string;
  description: string;
}

const evidenceItems: EvidenceItem[] = [
  {
    id: '1',
    title: 'Original Land Deed - 1850s',
    type: 'deed',
    date: '1850',
    description: 'Original deed documenting Masetu family ownership and stewardship of Ga-Mawela lands.',
  },
  {
    id: '2',
    title: 'CRLR Documentation',
    type: 'document',
    date: '1998',
    description: 'Commission on Restitution of Land Rights official documentation and claims.',
  },
  {
    id: '3',
    title: 'Community Testimony Letters',
    type: 'letter',
    date: '2000-2025',
    description: 'Sworn statements from community members confirming lineage and historical stewardship.',
  },
  {
    id: '4',
    title: 'Historical Photographs',
    type: 'photo',
    date: '1900-1950',
    description: 'Archival photographs showing community presence and land use patterns.',
  },
  {
    id: '5',
    title: 'Mining Lease Agreements',
    type: 'document',
    date: '1980-2020',
    description: 'Corporate mining agreements and their impact on community land rights.',
  },
  {
    id: '6',
    title: 'Court Filings & Legal Records',
    type: 'document',
    date: '1998-2025',
    description: 'Relevant court cases and legal proceedings related to land restitution.',
  },
];

const typeColors = {
  deed: 'bg-yellow/20 text-yellow border-yellow',
  letter: 'bg-turquoise/20 text-turquoise border-turquoise',
  document: 'bg-navy-dark/20 text-navy-dark border-navy-dark',
  photo: 'bg-gray-medium/20 text-gray-dark border-gray-medium',
};

export default function EvidenceSection() {
  const [selectedType, setSelectedType] = useState<'all' | EvidenceItem['type']>('all');

  const filteredItems =
    selectedType === 'all' ? evidenceItems : evidenceItems.filter((item) => item.type === selectedType);

  return (
    <section id="evidence" className="scroll-snap-section bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-navy-dark mb-4">Evidence & Documents</h2>
        <p className="text-gray-dark mb-12 max-w-2xl">
          Primary documents, deeds, testimonies, and legal records supporting the Ga-Mawela restitution claim.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              selectedType === 'all'
                ? 'bg-navy-dark text-white'
                : 'bg-gray-light text-navy-dark hover:bg-gray-medium'
            }`}
          >
            All
          </button>
          {['deed', 'letter', 'document', 'photo'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as EvidenceItem['type'])}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 capitalize ${
                selectedType === type
                  ? 'bg-navy-dark text-white'
                  : 'bg-gray-light text-navy-dark hover:bg-gray-medium'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Evidence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
                typeColors[item.type]
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-bold capitalize border ${typeColors[item.type]}`}>
                  {item.type}
                </div>
                <span className="text-sm font-semibold">{item.date}</span>
              </div>
              <h3 className="text-lg font-bold text-navy-dark mb-2">{item.title}</h3>
              <p className="text-sm text-gray-dark leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Upload CTA */}
        <div className="mt-16 p-8 bg-gray-light rounded-lg text-center">
          <h3 className="text-2xl font-bold text-navy-dark mb-4">Have Evidence to Share?</h3>
          <p className="text-gray-dark mb-6 max-w-2xl mx-auto">
            Help strengthen the Ga-Mawela restitution case by uploading documents, photographs, or testimonies.
          </p>
          <a
            href="/upload"
            className="inline-block px-8 py-4 bg-yellow text-navy-dark font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
          >
            Upload Evidence
          </a>
        </div>
      </div>
    </section>
  );
}

