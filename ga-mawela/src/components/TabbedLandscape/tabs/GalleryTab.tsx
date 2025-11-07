'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

export default function GalleryTab() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Gallery images from the public/Images/Gallery folder
  const galleryImages = [
    '/Images/Gallery/Ga Mawela Debrochen Proj 2.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 3.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 4.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 6.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 7.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 8.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 9.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 10.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 11.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 13.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 14.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 15.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 16.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 18.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 20.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 22.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 23.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 24.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 26.png',
    '/Images/Gallery/Ga Mawela Debrochen Proj 27.png',
  ];

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-gallery-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Heritage Gallery
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            Visual Documentation of Ga-Mawela Territory & Community
          </p>
        </ScrollRevealWrapper>

        {/* Gallery Grid - Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {galleryImages.map((image, index) => (
            <ScrollRevealWrapper key={index} type="scale" duration={0.8} delay={index * 0.05}>
              <div
                onClick={() => setSelectedImage(image)}
                className="card-interactive relative h-32 bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl hover:scale-110 group border border-white/30 hover:border-yellow/60 backdrop-blur-sm"
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:brightness-50 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-yellow text-2xl">🔍</span>
                </div>
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white text-3xl hover:text-primary transition-colors"
                title="Close"
              >
                ✕
              </button>
              <img
                src={selectedImage}
                alt="Full size gallery image"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Info Section */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/10 backdrop-blur-sm border border-white/20 p-8 text-center">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">
              Documenting Our Heritage
            </h3>
            <p className="text-white mb-6 font-inter text-sm">
              These images document the Ga-Mawela territory, community spaces, heritage sites, and cultural landmarks.
              Each image represents a piece of our collective history and connection to the land.
            </p>
            <a href="#" className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-sm">
              Share Your Photos
            </a>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

