'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Ripple effect handler
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const element = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <footer className="bg-white text-gray-700 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-primary-700 mb-3 font-sans">GA-MAWELA</h3>
            <p className="text-gray-600 text-xs leading-relaxed font-sans">
              Documenting the true custodianship and community restitution efforts of the Ga-Mawela people in the Dwars River Valley.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3 font-sans">Quick Links</h4>
            <ul className="space-y-1">
              <li><button type="button" onClick={(e) => { handleRipple(e); const event = new CustomEvent('navigateToTab', { detail: 'hero' }); window.dispatchEvent(event); }} className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all text-xs font-sans relative overflow-hidden">Home</button></li>
              <li><button type="button" onClick={(e) => { handleRipple(e); const event = new CustomEvent('navigateToTab', { detail: 'historical' }); window.dispatchEvent(event); }} className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all text-xs font-sans relative overflow-hidden">History</button></li>
              <li><button type="button" onClick={(e) => { handleRipple(e); const event = new CustomEvent('navigateToTab', { detail: 'evidence' }); window.dispatchEvent(event); }} className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all text-xs font-sans relative overflow-hidden">Evidence</button></li>
              <li><button type="button" onClick={(e) => { handleRipple(e); const event = new CustomEvent('navigateToTab', { detail: 'legal' }); window.dispatchEvent(event); }} className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all text-xs font-sans relative overflow-hidden">Legal Rights</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3 font-sans">Resources</h4>
            <ul className="space-y-1">
              <li><a href="/resource-hub" onClick={handleRipple} className="text-gray-600 hover:text-primary-600 transition-all text-xs font-sans relative overflow-hidden inline-block" title="Comprehensive Resource Hub">Resource Hub</a></li>
              <li><a href="https://www.dlapsa.gov.za/" target="_blank" rel="noopener noreferrer" onClick={handleRipple} className="text-gray-600 hover:text-primary-600 transition-all text-xs font-sans relative overflow-hidden inline-block" title="Visit Department of Land Affairs">Government Portals</a></li>
              <li><a href="https://www.lrc.org.za/" target="_blank" rel="noopener noreferrer" onClick={handleRipple} className="text-gray-600 hover:text-primary-600 transition-all text-xs font-sans relative overflow-hidden inline-block" title="Visit Land and Accountability Research Centre">NGO Partners</a></li>
              <li><a href="https://www.sahistory.org.za/" target="_blank" rel="noopener noreferrer" onClick={handleRipple} className="text-gray-600 hover:text-primary-600 transition-all text-xs font-sans relative overflow-hidden inline-block" title="Visit South African History Online">Academic Research</a></li>
              <li><a href="mailto:info@gamawela.org" onClick={handleRipple} className="text-gray-600 hover:text-primary-600 transition-all text-xs font-sans relative overflow-hidden inline-block" title="Send us an email">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3 font-sans">Contact</h4>
            <ul className="space-y-1 text-xs text-gray-600 font-sans">
              <li>Email: <a href="mailto:info@gamawela.org" className="text-primary-600 hover:underline" title="Send us an email">info@gamawela.org</a></li>
              <li>Location: Dwars River Valley, South Africa</li>
              <li>Community: Ga-Mawela People</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Developer Credit */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <p className="text-gray-500 text-xs text-center font-sans">
            <strong>Developed and published by:</strong> May Rakgama (Mawela Moroka Sedikane sa Rakgama)
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-3 md:mb-0 font-sans">
            © {currentYear} GA-MAWELA. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="/privacy" onClick={handleRipple} className="text-gray-500 hover:text-primary-600 transition-all text-xs font-sans relative overflow-hidden inline-block" title="Privacy Policy">Privacy Policy</a>
            <a href="/terms" onClick={handleRipple} className="text-gray-500 hover:text-primary-600 transition-all text-xs font-sans relative overflow-hidden inline-block" title="Terms of Use">Terms of Use</a>
            <a href="/accessibility" onClick={handleRipple} className="text-gray-500 hover:text-primary-600 transition-all text-xs font-sans relative overflow-hidden inline-block" title="Accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

