'use client';

import Image from 'next/image';

const sponsors = [
  { src: '/Images/sponsours/zimele.png', alt: 'Zimele' },
  { src: '/Images/sponsours/Department-of-Mineral-Resources-and-Energy-1200x675-cropped.jpg', alt: 'DMRE' },
  { src: '/Images/sponsours/thumb_department_of_land_reform_and_rural_development_(dlrrd).png', alt: 'DLRRD' },
  { src: '/Images/sponsours/Screenshot 2025-11-02 095606.png', alt: 'Partner 1' },
  { src: '/Images/sponsours/Screenshot 2025-11-02 102808.png', alt: 'Partner 2' },
  { src: '/Images/sponsours/download.webp', alt: 'Partner 3' },
];

export default function SponsorsSection() {
  return (
    <section className="scroll-snap-section-compact bg-gray-light">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-navy-dark mb-4">Supporting Organizations</h2>
        <p className="text-gray-dark mb-12 max-w-2xl">
          Partners and organizations supporting the Ga-Mawela restitution initiative.
        </p>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="relative h-32 rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300 group grayscale hover:grayscale-0"
            >
              <Image
                src={sponsor.src}
                alt={sponsor.alt}
                fill
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

