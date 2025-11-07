'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  useStaggeredAnimation(containerRef as React.RefObject<HTMLElement>, { threshold: 0.2 });

  const events = [
    {
      year: "1800s",
      title: "Masetu Lineage Established",
      description: "The Masetu family begins stewarding the Ga-Mawela lands, establishing a legacy of custodianship.",
      backgroundImage: "/Images/Ga Mawela Debrochen Proj 3.png"
    },
    {
      year: "1900s",
      title: "Lesedi and Moroka Generations",
      description: "Subsequent generations continue the stewardship, maintaining cultural and land connections.",
      backgroundImage: "/Images/Ga Mawela Debrochen Proj 4.png"
    },
    {
      year: "2000s",
      title: "Contested Narratives Emerge",
      description: "Competing claims to the land surface, leading to legal and historical investigations.",
      backgroundImage: "/Images/Ga Mawela Debrochen Proj 6.png"
    },
    {
      year: "2020s",
      title: "Digital Documentation Begins",
      description: "This platform is created to collect evidence, document lineage, and restore historical truth.",
      backgroundImage: "/Images/Ga Mawela Debrochen Proj 7.png"
    }
  ];

  return (
    <section
      className="bg-gradient-to-b from-slate-800 to-slate-900 py-20 px-4 sm:py-24"
      role="region"
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="timeline-heading"
          className="scroll-animate text-2xl sm:text-3xl font-bold text-center text-white mb-12"
        >
          Historical Timeline
        </h2>
        <div
          ref={containerRef}
          className="relative"
          role="list"
          aria-label="Historical events timeline"
        >
          {/* Timeline line - hidden from screen readers */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-300 h-full"
            aria-hidden="true"
          ></div>
          {events.map((event, index) => (
            <div
              key={index}
              className={`scroll-animate flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              role="listitem"
            >
              <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? 'pr-4 sm:pr-8 text-left sm:text-right' : 'pl-4 sm:pl-8 text-left'}`}>
                <article className="card-bg bg-slate-700 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-600 relative overflow-hidden">
                  {event.backgroundImage && (
                    <>
                      <Image
                        src={event.backgroundImage}
                        alt={`${event.title} background`}
                        fill
                        className="object-cover opacity-20"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-transparent"></div>
                    </>
                  )}
                  <div className="relative z-10">
                    <time
                      className="text-amber-400 font-semibold mb-2 block"
                      dateTime={`${event.year}-01-01`}
                    >
                      {event.year}
                    </time>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-100 text-sm sm:text-base">{event.description}</p>
                  </div>
                </article>
              </div>
              {/* Timeline dot - decorative */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-4 border-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                aria-hidden="true"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}