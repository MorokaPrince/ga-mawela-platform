'use client';

import { useState, useEffect } from 'react';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface Document {
  _id: string;
  filename: string;
  type: string;
  size: number;
  description?: string;
  category?: string;
  url: string;
  uploadedAt: string;
}

export default function EvidenceTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/documents');
        if (response.ok) {
          const data = await response.json();
          setDocuments(data);
        } else {
          // Fallback to sample documents if API fails
          setDocuments([
            {
              _id: '1',
              filename: 'SA History PDF: Ga-Mawela Community',
              type: 'application/pdf',
              size: 2520000,
              description: 'Comprehensive historical account of Ga-Mawela settlement, colonial dispossession, and community resilience',
              category: 'historical',
              url: '#',
              uploadedAt: new Date().toISOString(),
            },
            {
              _id: '2',
              filename: 'LRC Annual Report Extracts',
              type: 'application/pdf',
              size: 1890000,
              description: 'Land Claims Commission documentation of Ga-Mawela restitution claim and evidence assessment',
              category: 'legal',
              url: '#',
              uploadedAt: new Date().toISOString(),
            },
            {
              _id: '3',
              filename: 'SAHRA Heritage Report',
              type: 'application/pdf',
              size: 3150000,
              description: 'South African Heritage Resources Agency certification of cultural and archaeological significance',
              category: 'heritage',
              url: '#',
              uploadedAt: new Date().toISOString(),
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch documents:', error);
        // Use fallback data
        setDocuments([
          {
            _id: '1',
            filename: 'SA History PDF: Ga-Mawela Community',
            type: 'application/pdf',
            size: 2520000,
            description: 'Comprehensive historical account of Ga-Mawela settlement, colonial dispossession, and community resilience',
            category: 'historical',
            url: '#',
            uploadedAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileType = (mimeType: string) => {
    if (mimeType.includes('pdf')) return 'PDF';
    if (mimeType.includes('doc')) return 'DOC';
    if (mimeType.includes('image')) return 'IMG';
    return 'FILE';
  };

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
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg animate-pulse">
                <div className="h-6 bg-white/20 rounded w-16 mb-2"></div>
                <div className="h-5 bg-white/20 rounded w-full mb-2"></div>
                <div className="space-y-1 mb-4">
                  <div className="h-3 bg-white/20 rounded"></div>
                  <div className="h-3 bg-white/20 rounded w-4/5"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-white/20 rounded w-12"></div>
                  <div className="h-6 bg-white/20 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {filteredDocs.map((doc, index) => (
              <ScrollRevealWrapper key={doc._id} type="fadeUp" duration={0.8} delay={index * 0.1}>
                <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 flex flex-col rounded-lg hover:bg-white/20">
                  <span className="inline-block px-2 py-1 bg-yellow text-black text-xs font-bold rounded mb-2 font-inter w-fit">
                    {getFileType(doc.type)}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 font-merriweather flex-grow">
                    {doc.filename}
                  </h3>
                  <p className="text-white text-xs mb-4 font-inter">
                    {doc.description || 'Document description not available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white font-semibold font-inter">
                      {formatFileSize(doc.size)}
                    </span>
                    <a
                      href={`/api/documents/${doc._id}?action=download`}
                      className="px-3 py-1 bg-yellow text-black text-xs font-semibold hover:bg-yellow/90 transition-all inline-block font-inter rounded"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </ScrollRevealWrapper>
            ))}
          </div>
        )}

        {/* Submit Evidence */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 text-center rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">Have Additional Evidence?</h3>
            <p className="text-white mb-6 font-inter text-sm">
              Help strengthen our documentation by submitting additional evidence, documents, or testimonies.
            </p>
            <a href="/upload" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-sm rounded">
              Submit Evidence
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

