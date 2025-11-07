'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function LineageSection() {
  const [showTree, setShowTree] = useState(false);

  return (
    <section id="lineage" className="scroll-snap-section bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-navy-dark mb-4">The True Lineage</h2>
        <p className="text-gray-dark mb-12 max-w-2xl">
          Ga-Mawela is the ancestral territory of Masetu and his descendants through Lesedi (firstborn) and Moroka (lastborn).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/Images/Backrounds/Tab1.webp"
              alt="Masetu Lineage Heritage"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-navy-dark mb-3">Masetu's Legacy</h3>
              <p className="text-gray-dark leading-relaxed">
                Masetu established the foundational stewardship of Ga-Mawela lands. His two lineages represent the dual custodianship:
              </p>
            </div>

            {/* Lineage Cards */}
            <div className="space-y-4">
              <div className="p-6 bg-gray-light rounded-lg border-l-4 border-yellow">
                <h4 className="font-bold text-navy-dark mb-2">Lesedi (Firstborn)</h4>
                <p className="text-gray-dark text-sm">
                  Primary custodian lineage, maintaining ancestral rights and community stewardship.
                </p>
              </div>
              <div className="p-6 bg-gray-light rounded-lg border-l-4 border-turquoise">
                <h4 className="font-bold text-navy-dark mb-2">Moroka (Lastborn)</h4>
                <p className="text-gray-dark text-sm">
                  Secondary custodian lineage, supporting ancestral claims and community advocacy.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setShowTree(!showTree)}
              className="px-6 py-3 bg-navy-dark text-white font-bold rounded-lg hover:bg-navy-light transition-colors duration-300"
            >
              {showTree ? 'Hide' : 'View'} Lineage Tree
            </button>

            {/* Lineage Tree Placeholder */}
            {showTree && (
              <div className="p-6 bg-navy-dark text-white rounded-lg">
                <p className="text-sm">
                  Interactive lineage tree visualization would be rendered here using React Flow or D3.js
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

