'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Ga-Mawela</h3>
            <p className="text-gray-300 text-sm">
              Restoring truth, dignity, and justice for the Ga-Mawela community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#hero" className="hover:text-yellow transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#lineage" className="hover:text-yellow transition-colors duration-300">
                  Lineage
                </Link>
              </li>
              <li>
                <Link href="#corporate" className="hover:text-yellow transition-colors duration-300">
                  Corporate
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-yellow transition-colors duration-300">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/upload" className="hover:text-yellow transition-colors duration-300">
                  Upload Evidence
                </Link>
              </li>
              <li>
                <Link href="/lineage" className="hover:text-yellow transition-colors duration-300">
                  Register Lineage
                </Link>
              </li>
              <li>
                <Link href="/investigations" className="hover:text-yellow transition-colors duration-300">
                  Investigations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: info@gamawela.org</li>
              <li>Phone: +27 (0) XX XXX XXXX</li>
              <li className="pt-4 flex gap-4">
                <a href="https://facebook.com" className="hover:text-yellow transition-colors duration-300" title="Visit our Facebook page" aria-label="Visit our Facebook page">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://twitter.com" className="hover:text-yellow transition-colors duration-300" title="Visit our Twitter page" aria-label="Visit our Twitter page">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2025 Ga-Mawela Restitution Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

