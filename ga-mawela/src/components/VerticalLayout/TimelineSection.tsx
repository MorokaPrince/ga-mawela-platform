'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  color: 'green' | 'gray' | 'yellow' | 'turquoise';
}

const events: TimelineEvent[] = [
  {
    year: '1800s',
    title: 'Masetu Era',
    description: 'Masetu and descendants (Lesedi & Moroka) steward Ga-Mawela lands as ancestral territory.',
    color: 'green',
  },
  {
    year: '1913',
    title: 'Natives Land Act',
    description: 'Colonial dispossession begins. Ga-Mawela lands restricted from Black ownership.',
    color: 'gray',
  },
  {
    year: '1936',
    title: 'Native Trust & Land Act',
    description: 'Further restrictions on land ownership and community rights.',
    color: 'gray',
  },
  {
    year: '1998',
    title: 'Restitution Claim',
    description: 'Community leaders file formal restitution claim for Ga-Mawela lands.',
    color: 'yellow',
  },
  {
    year: 'Present',
    title: 'Ongoing Struggle',
    description: 'Fighting for land rights and corporate accountability.',
    color: 'turquoise',
  },
];

export default function TimelineSection() {
  const [selectedEvent, setSelectedEvent] = useState(0);

  return (
    <section id="timeline" className="scroll-snap-section bg-gray-light">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-navy-dark mb-4">Historical Timeline</h2>
        <p className="text-gray-dark mb-12 max-w-2xl">
          Key events in the Ga-Mawela restitution journey, from ancestral stewardship to present-day advocacy.
        </p>

        {/* Timeline Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Events */}
          <div className="lg:col-span-2 space-y-4">
            {events.map((event, index) => (
              <button
                key={index}
                onClick={() => setSelectedEvent(index)}
                className={`w-full text-left p-6 rounded-lg transition-all duration-300 ${
                  selectedEvent === index
                    ? 'bg-navy-dark text-white shadow-lg transform scale-105'
                    : 'bg-white text-navy-dark hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-4 h-4 rounded-full mt-2 flex-shrink-0 ${
                      event.color === 'green'
                        ? 'bg-green-500'
                        : event.color === 'gray'
                        ? 'bg-gray-400'
                        : event.color === 'yellow'
                        ? 'bg-yellow'
                        : 'bg-turquoise'
                    }`}
                  ></div>
                  <div>
                    <div className="font-bold text-lg">{event.year}</div>
                    <div className="font-semibold">{event.title}</div>
                    <div className={`text-sm mt-2 ${selectedEvent === index ? 'text-gray-100' : 'text-gray-600'}`}>
                      {event.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Timeline Map Image */}
          <div className="lg:col-span-1">
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/Images/Backrounds/Timeline Map.jpg"
                alt="Ga-Mawela Region Map"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

