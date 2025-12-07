'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import { fadeInVariants, scaleVariants, containerVariants } from '@/animations/framerVariants';

// Loading Spinner Component
const LoadingSpinner = () => (
  <motion.div
    className="flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="w-8 h-8 border-2 border-yellow/30 border-t-yellow rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

export default function GalleryTab() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={scaleVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative h-32 bg-gray-800 rounded-lg overflow-hidden cursor-pointer group border border-white/30 hover:border-yellow/60 backdrop-blur-sm"
              onClick={() => setSelectedImage(image)}
            >
              {/* Loading skeleton */}
              {!loadedImages.has(index) && (
                <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-lg flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              )}

              <motion.div
                className="w-full h-full"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={loadedImages.has(index) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-500"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageLoad(index)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="text-yellow text-3xl"
                  initial={{ scale: 0.8, rotate: -10 }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  🔍
                </motion.span>
              </motion.div>

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-5xl w-full"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <motion.button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white text-4xl hover:text-yellow transition-colors p-2 rounded-full hover:bg-white/10"
                  title="Close"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>

                {/* Image container */}
                <motion.div
                  className="relative overflow-hidden rounded-xl shadow-2xl"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <motion.img
                    src={selectedImage}
                    alt="Full size gallery image"
                    className="w-full h-auto"
                    initial={{ scale: 1.1, filter: "blur(10px)" }}
                    animate={{ scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />

                  {/* Image info overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <p className="text-white text-sm font-inter">
                      Ga-Mawela Heritage Documentation
                    </p>
                  </motion.div>
                </motion.div>

                {/* Navigation hints */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Click outside or press ✕ to close
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

