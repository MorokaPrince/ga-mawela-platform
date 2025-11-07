'use client';

import Image from 'next/image';
import { useState } from 'react';

const galleryImages = [
  { src: '/Images/Gallery/Ga Mawela Debrochen Proj 3.png', alt: 'Ga-Mawela landscape' },
  { src: '/Images/Gallery/Ga Mawela Debrochen Proj 4.png', alt: 'Heritage site' },
  { src: '/Images/Gallery/Ga Mawela Debrochen Proj 6.png', alt: 'Mining operations' },
  { src: '/Images/Gallery/Ga Mawela Debrochen Proj 7.png', alt: 'Community gathering' },
  { src: '/Images/Gallery/Ga Mawela Debrochen Proj 2 Rivers.png', alt: 'Two Rivers area' },
  { src: '/Images/Gallery/Ga Mawela Debrochen Proj 8.png', alt: 'Landscape view' },
  { src: '/Images/Gallery/Ga Mawela Debrochen Proj 9.png', alt: 'Heritage documentation' },
  { src: '/Images/Gallery/Ga Mawela Debrochen Proj 10.png', alt: 'Community site' },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <section id="gallery" className="scroll-snap-section bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-navy-dark mb-4">Gallery</h2>
        <p className="text-gray-dark mb-12 max-w-2xl">
          Visual documentation of Ga-Mawela heritage, landscapes, and community sites.
        </p>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {galleryImages.slice(0, visibleCount).map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              title={`View ${image.alt}`}
              aria-label={`View ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/40 transition-colors duration-300"></div>
            </button>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < galleryImages.length && (
          <button
            type="button"
            onClick={() => setVisibleCount(visibleCount + 3)}
            className="w-full py-4 border-2 border-navy-dark text-navy-dark font-bold rounded-lg hover:bg-navy-dark hover:text-white transition-colors duration-300"
            title="Load more gallery images"
          >
            Load More
          </button>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-navy-dark/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-96 rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-navy-dark/50 hover:bg-navy-dark/80 rounded-full p-2 transition-colors duration-300"
              title="Close gallery"
              aria-label="Close gallery"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

