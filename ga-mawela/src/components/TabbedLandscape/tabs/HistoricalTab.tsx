'use client';

import { useState, useEffect } from 'react';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface HistoricalEvent {
  _id: string;
  year: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function HistoricalTab() {
  const [timelineEvents, setTimelineEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricalEvents = async () => {
      try {
        const response = await fetch('/api/historical-events');
        if (response.ok) {
          const data = await response.json();
          setTimelineEvents(data);
        } else {
          // Fallback to hardcoded data if API fails
          setTimelineEvents([
            {
              _id: '1',
              year: 'Pre-1800s',
              title: 'Traditional Settlement',
              description: 'Masetu established Ga-Mawela in the Dwars River Valley as a thriving pastoral and agricultural community.',
              createdAt: new Date().toISOString(),
            },
            {
              _id: '2',
              year: '1800s-1900s',
              title: 'Colonial Dispossession',
              description: 'Systematic land appropriation through legal instruments and forced removals denied indigenous land rights.',
              createdAt: new Date().toISOString(),
            },
            {
              _id: '3',
              year: '1900-1960s',
              title: 'Labour Tenancy',
              description: 'Descendants reduced to labour tenants on ancestral land, working under exploitative conditions.',
              createdAt: new Date().toISOString(),
            },
            {
              _id: '4',
              year: '1994-2000s',
              title: 'Land Claims Commission',
              description: 'Post-apartheid South Africa established LRC. Ga-Mawela community filed restitution claims.',
              createdAt: new Date().toISOString(),
            },
            {
              _id: '5',
              year: '2010s-Present',
              title: 'Mining Conflicts & Restitution',
              description: 'Mining corporations sought rights on Ga-Mawela land. Community intensified restitution efforts.',
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch historical events:', error);
        // Use fallback data
        setTimelineEvents([
          {
            _id: '1',
            year: 'Pre-1800s',
            title: 'Traditional Settlement',
            description: 'Masetu established Ga-Mawela in the Dwars River Valley as a thriving pastoral and agricultural community.',
            createdAt: new Date().toISOString(),
          },
          {
            _id: '2',
            year: '1800s-1900s',
            title: 'Colonial Dispossession',
            description: 'Systematic land appropriation through legal instruments and forced removals denied indigenous land rights.',
            createdAt: new Date().toISOString(),
          },
          {
            _id: '3',
            year: '1900-1960s',
            title: 'Labour Tenancy',
            description: 'Descendants reduced to labour tenants on ancestral land, working under exploitative conditions.',
            createdAt: new Date().toISOString(),
          },
          {
            _id: '4',
            year: '1994-2000s',
            title: 'Land Claims Commission',
            description: 'Post-apartheid South Africa established LRC. Ga-Mawela community filed restitution claims.',
            createdAt: new Date().toISOString(),
          },
          {
            _id: '5',
            year: '2010s-Present',
            title: 'Mining Conflicts & Restitution',
            description: 'Mining corporations sought rights on Ga-Mawela land. Community intensified restitution efforts.',
            createdAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalEvents();
  }, []);

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-historical-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Historical Timeline
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            From Traditional Settlement to Modern Restitution
          </p>
        </ScrollRevealWrapper>

        {/* Timeline - Horizontal Landscape */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg animate-pulse">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-8 w-8 bg-white/20 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    <div className="h-5 bg-white/20 rounded w-full"></div>
                    <div className="space-y-1">
                      <div className="h-3 bg-white/20 rounded"></div>
                      <div className="h-3 bg-white/20 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {timelineEvents.map((event, index) => (
              <ScrollRevealWrapper
                key={event._id}
                type="fadeUp"
                delay={index * 0.1}
                duration={0.8}
              >
                <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 flex flex-col rounded-lg hover:bg-white/20">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow text-black font-bold text-xs">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-yellow mb-1 font-merriweather">
                        {event.year}
                      </h3>
                      <h4 className="text-base font-semibold text-white mb-2 font-inter">
                        {event.title}
                      </h4>
                      <p className="text-white leading-relaxed text-xs font-inter">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollRevealWrapper>
            ))}
          </div>
        )}

        {/* Download Section */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.3}>
          <div className="card-interactive mt-12 bg-white/15 backdrop-blur-md border border-white/30 p-6 rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">
              Download Historical Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <a href="#" className="px-4 py-2 bg-yellow text-black font-semibold hover:bg-yellow/90 hover:scale-105 transition-all text-center text-sm font-inter rounded">
                SA History PDF
              </a>
              <a href="#" className="px-4 py-2 bg-yellow text-black font-semibold hover:bg-yellow/90 hover:scale-105 transition-all text-center text-sm font-inter rounded">
                LRC Report
              </a>
              <a href="#" className="px-4 py-2 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all text-center text-sm font-inter">
                Heritage Report
              </a>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}

