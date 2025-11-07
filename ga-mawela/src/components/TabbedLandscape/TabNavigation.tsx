'use client';

import { useState } from 'react';
import type { TabId } from './TabbedLandscapeLayout';

interface Tab {
  id: TabId;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ripple effect handler
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-metallic-blue-gradient border-b border-yellow/20 font-inter nav-professional backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold font-merriweather text-white">
              GA-MAWELA
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={(e) => {
                  handleRipple(e);
                  onTabChange(tab.id);
                }}
                type="button"
                title={tab.label}
                className={`font-inter transition-all duration-300 text-sm font-medium px-4 py-2 relative overflow-hidden ${
                  activeTab === tab.id
                    ? 'text-yellow border-b-2 border-yellow'
                    : 'text-white hover:text-yellow hover:scale-105'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            title="Toggle menu"
            className="lg:hidden transition-colors text-white hover:text-yellow"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-yellow/20">
            <div className="grid grid-cols-2 gap-2 mt-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(e) => {
                    handleRipple(e);
                    onTabChange(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm font-inter relative overflow-hidden ${
                    activeTab === tab.id
                      ? 'bg-yellow text-black hover:scale-105'
                      : 'text-white hover:text-yellow hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

