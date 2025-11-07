'use client';

import { useState, ReactNode } from 'react';
import Image from 'next/image';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  backgroundImage?: string;
}

interface TabbedContentProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export default function TabbedContent({
  tabs,
  defaultTab,
  className = '',
}: TabbedContentProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab navigation with enhanced styling */}
      <div className="flex flex-wrap gap-2 border-b-2 border-amber-400 overflow-x-auto bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-lg shadow-lg" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-semibold text-sm sm:text-base whitespace-nowrap transition-all duration-300 border-b-2 flex items-center gap-2 hover-lift tab-animation-${index} ${
              activeTab === tab.id
                ? 'border-amber-400 text-amber-400 bg-slate-700 shadow-lg'
                : 'border-transparent text-gray-300 hover:text-amber-300 hover:bg-slate-700/50'
            }`}
            type="button"
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.icon && <span className="flex-shrink-0 text-lg">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content with background image */}
      <div className="relative overflow-hidden rounded-b-lg border-2 border-t-0 border-slate-600 bg-slate-800">
        {/* Background Image with overlay */}
        {activeTabData?.backgroundImage && (
          <>
            <div className="absolute inset-0 opacity-15">
              <Image
                src={activeTabData.backgroundImage}
                alt="Tab background"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-800/70 to-slate-900/80"></div>
          </>
        )}

        {/* Content */}
        {activeTabData && (
          <div
            className="relative z-10 p-8 sm:p-12 animate-fade-in"
            role="tabpanel"
            aria-labelledby={activeTab}
          >
            <div className="max-w-3xl">
              {activeTabData.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

