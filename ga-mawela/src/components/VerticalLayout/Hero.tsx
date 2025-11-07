'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function VerticalHero() {
  return (
    <section className="scroll-snap-section relative w-full bg-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/Backrounds/landing.jpg"
          alt="Ga-Mawela Heritage"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/80 to-navy-dark/70"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 h-full flex flex-col justify-center">
        <div className="space-y-8 animate-fadeIn">
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Ga-Mawela: The Truth Restored
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed">
            For generations, the Ga-Mawela lands were stewarded by the descendants of Masetu, through his firstborn Lesedi and lastborn Moroka. This platform documents the lineage, collects primary evidence, and exposes contested narratives.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-8">
            <Link
              href="#lineage"
              className="px-8 py-4 bg-yellow text-navy-dark font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Register Your Lineage
            </Link>
            <Link
              href="#evidence"
              className="px-8 py-4 bg-turquoise text-white font-bold rounded-lg hover:bg-turquoise-light transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Upload Evidence
            </Link>
            <Link
              href="#timeline"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-navy-dark transition-all duration-300"
            >
              View Timeline
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

