'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Company {
  name: string;
  role: string;
  description: string;
  impact: string;
}

const companies: Company[] = [
  {
    name: 'Anglo American',
    role: 'Primary Operator',
    description: 'Debrichen Project operations on disputed Ga-Mawela lands.',
    impact: 'Mineral extraction without community benefit-sharing.',
  },
  {
    name: 'Implats',
    role: 'Joint Venture Partner',
    description: 'Two Rivers mining operations in the region.',
    impact: 'Competing claims and resource extraction.',
  },
  {
    name: 'ARM',
    role: 'Mining Operations',
    description: 'Additional mining interests in the area.',
    impact: 'Fragmented land use and community displacement.',
  },
];

export default function CorporateSection() {
  const [selectedCompany, setSelectedCompany] = useState(0);

  return (
    <section id="corporate" className="scroll-snap-section bg-gray-light">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-navy-dark mb-4">Corporate Involvement</h2>
        <p className="text-gray-dark mb-12 max-w-2xl">
          Understanding the corporate entities and their roles in the Ga-Mawela dispute.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Cards */}
          {companies.map((company, index) => (
            <button
              key={index}
              onClick={() => setSelectedCompany(index)}
              className={`p-8 rounded-lg transition-all duration-300 text-left ${
                selectedCompany === index
                  ? 'bg-navy-dark text-white shadow-xl transform scale-105'
                  : 'bg-white text-navy-dark hover:shadow-lg'
              }`}
            >
              <div className="font-bold text-lg mb-2">{company.name}</div>
              <div className={`text-sm font-semibold mb-4 ${selectedCompany === index ? 'text-yellow' : 'text-turquoise'}`}>
                {company.role}
              </div>
              <p className={`text-sm leading-relaxed ${selectedCompany === index ? 'text-gray-100' : 'text-gray-600'}`}>
                {company.description}
              </p>
            </button>
          ))}
        </div>

        {/* Detailed View */}
        <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-navy-dark mb-4">{companies[selectedCompany].name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-navy-dark mb-2">Role</h4>
              <p className="text-gray-dark">{companies[selectedCompany].role}</p>
            </div>
            <div>
              <h4 className="font-bold text-navy-dark mb-2">Impact</h4>
              <p className="text-gray-dark">{companies[selectedCompany].impact}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

