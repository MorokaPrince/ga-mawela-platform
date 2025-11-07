'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'The Truth', href: '#hero' },
    { label: 'Lineage', href: '#lineage' },
    { label: 'Corporate', href: '#corporate' },
    { label: 'Documents', href: '#evidence' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark shadow-lg">
      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="#hero" className="text-2xl font-bold text-white">
          Ga-Mawela
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white font-medium hover:text-yellow transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          title="Toggle navigation menu"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-navy-light px-8 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-white font-medium hover:text-yellow transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

