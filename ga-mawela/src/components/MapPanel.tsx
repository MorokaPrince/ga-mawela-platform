'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Affected areas data - in a real app, this would come from an API
const affectedAreas = [
  { name: 'Two Rivers', lat: -26.2041, lng: 28.0473, description: 'Primary investigation site' },
  { name: 'Der Brochen', lat: -26.1951, lng: 28.0573, description: 'Secondary investigation site' },
  { name: 'Central Johannesburg', lat: -26.2041, lng: 28.0473, description: 'Administrative center' },
];

interface MapPanelProps {
  className?: string;
  height?: string;
}

function MapControls() {
  const map = useMap();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayers, setShowLayers] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Simple geocoding - in a real app, use a proper geocoding service
      const area = affectedAreas.find(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (area) {
        map.setView([area.lat, area.lng], 15);
      }
    }
  };

  const toggleLayer = (layerType: string) => {
    // In a real implementation, toggle different map layers
    console.log('Toggling layer:', layerType);
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] space-y-2">
      {/* Search */}
      <div className="bg-gm-50 border border-gm-200 rounded-lg p-2 shadow-soft">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-3 py-1 text-sm border border-gm-300 rounded focus:outline-none focus:ring-2 focus:ring-gm-500"
            aria-label="Search for location"
          />
          <button
            onClick={handleSearch}
            className="px-3 py-1 bg-gm-500 text-white text-sm rounded hover:bg-gm-600 focus:outline-none focus:ring-2 focus:ring-gm-500"
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </div>

      {/* Layer Toggle */}
      <div className="relative">
        <button
          onClick={() => setShowLayers(!showLayers)}
          className="bg-gm-50 border border-gm-200 rounded-lg p-2 shadow-soft hover:bg-gm-100 focus:outline-none focus:ring-2 focus:ring-gm-500"
          aria-label="Toggle layer controls"
        >
          🗂️
        </button>
        {showLayers && (
          <div className="absolute top-full left-0 mt-1 bg-gm-50 border border-gm-200 rounded-lg p-2 shadow-soft min-w-[150px]">
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={() => toggleLayer('streets')}
                  aria-label="Toggle streets layer"
                />
                Streets
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  onChange={() => toggleLayer('satellite')}
                  aria-label="Toggle satellite layer"
                />
                Satellite
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MapPanel({ className = '', height = '400px' }: MapPanelProps) {
  const isClient = typeof window !== 'undefined';

  if (!isClient) {
    return (
      <div
        className={`bg-gm-50 border border-gm-200 rounded-xl flex items-center justify-center ${className}`}
        style={{ height }}
        role="region"
        aria-label="Map loading"
      >
        <div className="text-gm-600">Loading map...</div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-gm-50 border border-gm-200 rounded-xl overflow-hidden w-full h-full md:h-auto ${className}`}
      style={{ height }}
      role="region"
      aria-label="Interactive map of affected areas"
    >
      <MapContainer
        center={[-26.2041, 28.0473]} // Centered on Johannesburg
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
        aria-label="Map container"
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        boxZoom={true}
        keyboard={true}
        dragging={true}
        touchZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapControls />

        {affectedAreas.map((area, index) => (
          <Marker key={index} position={[area.lat, area.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gm-900">{area.name}</h3>
                <p className="text-sm text-gm-600 mt-1">{area.description}</p>
                <div className="mt-2 text-xs text-gm-500">
                  Lat: {area.lat.toFixed(4)}, Lng: {area.lng.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Zoom controls hint */}
      <div className="absolute bottom-4 right-4 bg-gm-50 border border-gm-200 rounded-lg p-2 shadow-soft text-xs text-gm-600 hidden sm:block">
        Use mouse wheel to zoom • Drag to pan
      </div>
    </div>
  );
}