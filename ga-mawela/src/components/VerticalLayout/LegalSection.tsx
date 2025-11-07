'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'legal' | 'process' | 'evidence' | 'contact';
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    category: 'legal',
    question: 'What is the legal basis for the Ga-Mawela restitution claim?',
    answer:
      'The claim is based on the Restitution of Land Rights Act, 1994, which provides for the restitution of land rights to persons or communities dispossessed of land after 19 June 1913. The Ga-Mawela community was dispossessed through colonial and apartheid-era policies.',
  },
  {
    id: '2',
    category: 'legal',
    question: 'What is CRLR and how does it relate to Ga-Mawela?',
    answer:
      'The Commission on Restitution of Land Rights (CRLR) was established to investigate and make recommendations on land restitution claims. The Ga-Mawela claim was filed with CRLR in 1998 and remains under review.',
  },
  {
    id: '3',
    category: 'process',
    question: 'How can I register my lineage to Ga-Mawela?',
    answer:
      'You can register your lineage through our online platform. Visit the "Register Lineage" section and provide documentation of your family connection to Masetu, Lesedi, or Moroka lineages.',
  },
  {
    id: '4',
    category: 'evidence',
    question: 'What types of evidence are accepted?',
    answer:
      'We accept deeds, letters, photographs, court documents, CRLR files, testimonies, and any other primary sources that document the Ga-Mawela community\'s historical presence and stewardship.',
  },
  {
    id: '5',
    category: 'contact',
    question: 'How do I contact the Ga-Mawela initiative?',
    answer:
      'You can reach us via email at info@gamawela.org or through our contact form. We also maintain social media channels for updates and community engagement.',
  },
  {
    id: '6',
    category: 'legal',
    question: 'What is the current status of the restitution claim?',
    answer:
      'The claim remains under review with relevant government departments. We are actively gathering evidence and community testimonies to strengthen the case for restitution.',
  },
];

export default function LegalSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | FAQItem['category']>('all');

  const filteredItems =
    selectedCategory === 'all' ? faqItems : faqItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="scroll-snap-section bg-gray-light">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-navy-dark mb-4">Legal & FAQ</h2>
        <p className="text-gray-dark mb-12 max-w-2xl">
          Frequently asked questions about the Ga-Mawela restitution process, legal framework, and how to get involved.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-navy-dark text-white'
                : 'bg-white text-navy-dark hover:bg-gray-medium'
            }`}
          >
            All
          </button>
          {['legal', 'process', 'evidence', 'contact'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as FAQItem['category'])}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 capitalize ${
                selectedCategory === cat
                  ? 'bg-navy-dark text-white'
                  : 'bg-white text-navy-dark hover:bg-gray-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-light transition-colors duration-300"
              >
                <div className="flex items-center gap-4 text-left">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                      item.category === 'legal'
                        ? 'bg-navy-dark/20 text-navy-dark'
                        : item.category === 'process'
                        ? 'bg-turquoise/20 text-turquoise'
                        : item.category === 'evidence'
                        ? 'bg-yellow/20 text-yellow'
                        : 'bg-gray-medium/20 text-gray-dark'
                    }`}
                  >
                    {item.category}
                  </span>
                  <h3 className="font-bold text-navy-dark">{item.question}</h3>
                </div>
                <svg
                  className={`w-6 h-6 text-navy-dark transition-transform duration-300 ${
                    expandedId === item.id ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {expandedId === item.id && (
                <div className="px-6 py-4 bg-gray-light border-t border-gray-medium">
                  <p className="text-gray-dark leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legal Compliance */}
        <div className="mt-16 p-8 bg-navy-dark text-white rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Legal Compliance & Transparency</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-2">PAIA Compliance</h4>
              <p className="text-sm text-gray-100">
                We comply with the Promotion of Access to Information Act (PAIA) for document requests.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">CRLR References</h4>
              <p className="text-sm text-gray-100">
                All claims are filed with the Commission on Restitution of Land Rights as required by law.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">SLP Compliance</h4>
              <p className="text-sm text-gray-100">
                We follow the Spatial Land Programme guidelines for land restitution processes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

