'use client';

import { useState } from 'react';
import ImageCarousel from './ImageCarousel';
import TabbedContent from './TabbedContent';
import {
  BookOpen,
  Users,
  Building2,
  History,
  Target,
  FileText,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

interface TabbedLandingPageProps {
  carouselImages?: Array<{ src: string; alt: string; caption?: string }>;
}

export default function TabbedLandingPage({
  carouselImages = [],
}: TabbedLandingPageProps) {
  const tabs = [
    {
      id: 'lineage',
      label: 'True Lineage',
      icon: <BookOpen size={18} />,
      backgroundImage: '/Images/Backrounds/R.jpeg',
      content: (
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white mb-4">The True Lineage of Ga-Mawela</h3>
          <p className="text-lg text-gray-100 leading-relaxed">
            Ga-Mawela is not a land held by the Mankge family; it is the ancestral territory of Masetu and his descendants. Masetu's two lineages — <strong className="text-amber-400">Lesedi (firstborn)</strong> and <strong className="text-amber-400">Moroka (lastborn)</strong> — are the rightful custodians of the land, as confirmed by oral testimony, communal history, and primary documents.
          </p>
          <p className="text-lg text-gray-100 leading-relaxed">
            Over the years, however, narratives have been twisted, legal obstacles erected, and corporate interests imposed. This platform exists to restore the truth and empower the rightful custodians.
          </p>
        </div>
      ),
    },
    {
      id: 'mankge',
      label: 'Mankge Narrative',
      icon: <Users size={18} />,
      backgroundImage: '/Images/Backrounds/OIP.webp',
      content: (
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white mb-4">Exposing the Mankge Narrative</h3>
          <p className="text-lg text-gray-100 leading-relaxed">
            Public and corporate discourse has frequently cited a <strong className="text-amber-400">"Mankge" lineage</strong> when referring to Ga-Mawela ownership. Major media outlets and community organizations reported that a Mankge-led committee pursued restitution in the early 2000s.
          </p>
          <p className="text-lg text-gray-100 leading-relaxed">
            However, our investigation shows: the Mankge narrative is deeply contested. Documents, testimonies, and deeds suggest that title transfers during that period may have misrepresented the living Ga-Mawela lineage.
          </p>
          <p className="text-lg text-gray-100 leading-relaxed">
            This site collects and publishes the actual deeds, court filings, affidavits, and corporate SLPs to set the record straight.
          </p>
        </div>
      ),
    },
    {
      id: 'corporate',
      label: 'Corporate Involvement',
      icon: <Building2 size={18} />,
      backgroundImage: '/Images/Backrounds/140hXs.jpg',
      content: (
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white mb-4">Anglo American & Mining Interests</h3>
          <p className="text-lg text-gray-100 leading-relaxed">
            Ga-Mawela's ancestral land sits atop valuable mineral reserves. In recent decades, companies like <strong className="text-amber-400">Anglo American</strong> (via the Der Brochen / Mototolo project) and powerful joint ventures like <strong className="text-amber-400">Two Rivers (ARM + Implats)</strong> have established operations in and around the territory.
          </p>
          <p className="text-lg text-gray-100 leading-relaxed">
            Public <strong className="text-amber-400">SLP (Social & Labour Plan)</strong> documents show these companies promised community benefits. Yet, many Ga-Mawela descendants remain landless and unemployed, while minerals are extracted from under their land.
          </p>
          <p className="text-lg text-gray-100 leading-relaxed">
            This platform reveals these SLPs, environmental impact studies, and documents how corporate processes have excluded the rightful community custodians.
          </p>
        </div>
      ),
    },
    {
      id: 'history',
      label: 'Dispossession History',
      icon: <History size={18} />,
      backgroundImage: '/Images/Backrounds/R.jpeg',
      content: (
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white mb-4">A History of Dispossession</h3>
          <div className="space-y-4 text-lg text-gray-100">
            <p className="leading-relaxed">
              <strong className="text-amber-400 text-xl">Early 20th Century:</strong> Colonial and apartheid-era laws (such as the 1913 Natives Land Act and the 1936 Native Trust and Land Act) stripped many Black communities of their ancestral land.
            </p>
            <p className="leading-relaxed">
              <strong className="text-amber-400 text-xl">Forced Labour & Evictions:</strong> Ga-Mawela families were forced into labour tenancy, evicted, and marginalized — despite holding deep cultural and territorial ties.
            </p>
            <p className="leading-relaxed">
              <strong className="text-amber-400 text-xl">1998 Restitution Claim:</strong> Community leaders lodged a restitution claim under the Restitution of Land Rights Act. That claim remains unresolved.
            </p>
            <p className="leading-relaxed">
              <strong className="text-amber-400 text-xl">Present Day:</strong> Over decades, despite partial court rulings, the material conditions of many Ga-Mawela descendants reflect deep poverty, exclusion, and lack of benefit from the land they once owned.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'mission',
      label: 'Mission & Vision',
      icon: <Target size={18} />,
      backgroundImage: '/Images/Backrounds/OIP.webp',
      content: (
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-white mb-6">Our Mission & Vision</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-700/50 p-6 rounded-lg border border-amber-400/30 hover-lift">
              <h4 className="text-2xl font-bold text-amber-400 mb-6">Our Mission</h4>
              <ul className="space-y-4 text-gray-100">
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 text-xl font-bold">✓</span>
                  <span>Expose the truth about Ga-Mawela ownership, lineage, and legal history</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 text-xl font-bold">✓</span>
                  <span>Provide a secure, community-driven space for descendants to register and assert rights</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 text-xl font-bold">✓</span>
                  <span>Collect, preserve, and publish primary evidence for public scrutiny</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 text-xl font-bold">✓</span>
                  <span>Support legal action, policy advocacy, and community mobilization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 text-xl font-bold">✓</span>
                  <span>Hold corporate actors accountable for compliance and community benefit</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-700/50 p-6 rounded-lg border border-amber-400/30 hover-lift">
              <h4 className="text-2xl font-bold text-amber-400 mb-6">Our Vision</h4>
              <p className="text-gray-100 leading-relaxed text-lg">
                A Ga-Mawela land restored to its rightful custodians, where the descendants of Masetu (<strong className="text-amber-300">Lesedi and Moroka</strong>) lead, benefit, and preserve their heritage — with meaningful participation in mining benefits, decision-making, and cultural renewal.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'evidence',
      label: 'Evidence & Documents',
      icon: <FileText size={18} />,
      backgroundImage: '/Images/Backrounds/140hXs.jpg',
      content: (
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white mb-4">Evidence & Documents Vault</h3>
          <p className="text-lg text-gray-100 leading-relaxed">
            Our platform maintains a secure, searchable database of primary evidence supporting Ga-Mawela lineage claims:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 p-4 rounded border-l-4 border-amber-400 hover-lift">
              <p className="text-gray-100"><strong className="text-amber-400">📄 Historical Deeds:</strong> Land transfer documents and property records</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded border-l-4 border-amber-400 hover-lift">
              <p className="text-gray-100"><strong className="text-amber-400">⚖️ Court Filings:</strong> Legal cases and restitution claim documentation</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded border-l-4 border-amber-400 hover-lift">
              <p className="text-gray-100"><strong className="text-amber-400">✍️ Affidavits:</strong> Sworn statements from community members and witnesses</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded border-l-4 border-amber-400 hover-lift">
              <p className="text-gray-100"><strong className="text-amber-400">🏢 Corporate SLPs:</strong> Social & Labour Plans from mining companies</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded border-l-4 border-amber-400 hover-lift">
              <p className="text-gray-100"><strong className="text-amber-400">👨‍👩‍👧‍👦 Genealogical Records:</strong> Family trees and lineage documentation</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded border-l-4 border-amber-400 hover-lift">
              <p className="text-gray-100"><strong className="text-amber-400">📸 Photographs & Media:</strong> Historical imagery and contemporary documentation</p>
            </div>
          </div>
          <p className="text-lg text-gray-100 mt-6 leading-relaxed">
            All documents are verified, catalogued, and made available for legal proceedings and public accountability.
          </p>
        </div>
      ),
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: <HelpCircle size={18} />,
      backgroundImage: '/Images/Backrounds/R.jpeg',
      content: (
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg border-l-4 border-amber-400 hover-lift">
              <h4 className="font-bold text-amber-400 text-lg mb-3">Who are the rightful custodians of Ga-Mawela?</h4>
              <p className="text-gray-100 leading-relaxed">The descendants of Masetu, specifically through the <strong className="text-amber-300">Lesedi and Moroka lineages</strong>, are the rightful custodians as confirmed by oral history, genealogical records, and primary documents.</p>
            </div>
            <div className="bg-slate-700/50 p-6 rounded-lg border-l-4 border-amber-400 hover-lift">
              <h4 className="font-bold text-amber-400 text-lg mb-3">How can I register my lineage?</h4>
              <p className="text-gray-100 leading-relaxed">Visit our Lineage Registration page to submit your family information, genealogical documentation, and supporting evidence. All submissions are securely stored and verified.</p>
            </div>
            <div className="bg-slate-700/50 p-6 rounded-lg border-l-4 border-amber-400 hover-lift">
              <h4 className="font-bold text-amber-400 text-lg mb-3">What documents should I provide?</h4>
              <p className="text-gray-100 leading-relaxed">Identity documents, birth certificates, family trees, affidavits, photographs, or any historical records that establish your connection to Ga-Mawela and the Masetu lineage.</p>
            </div>
            <div className="bg-slate-700/50 p-6 rounded-lg border-l-4 border-amber-400 hover-lift">
              <h4 className="font-bold text-amber-400 text-lg mb-3">Is my information confidential?</h4>
              <p className="text-gray-100 leading-relaxed">Yes. Personal information is protected and only used for lineage verification and legal proceedings. We comply with all data protection regulations.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'legal',
      label: 'Legal & Disclosure',
      icon: <AlertCircle size={18} />,
      backgroundImage: '/Images/Backrounds/OIP.webp',
      content: (
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white mb-6">Legal & Disclosure Notice</h3>
          <div className="space-y-4">
            <div className="bg-slate-700/60 border-l-4 border-amber-400 p-6 rounded-lg hover-lift">
              <p className="text-gray-100 leading-relaxed">
                <strong className="text-amber-400 text-lg">⚖️ Purpose:</strong> This platform is an investigative journalism and advocacy resource dedicated to documenting the truth about Ga-Mawela land claims, lineage, and corporate accountability.
              </p>
            </div>
            <div className="bg-slate-700/60 border-l-4 border-amber-400 p-6 rounded-lg hover-lift">
              <p className="text-gray-100 leading-relaxed">
                <strong className="text-amber-400 text-lg">📚 Information Basis:</strong> All content is based on publicly available documents, court records, oral testimony, and primary research. We strive for accuracy and welcome corrections.
              </p>
            </div>
            <div className="bg-slate-700/60 border-l-4 border-amber-400 p-6 rounded-lg hover-lift">
              <p className="text-gray-100 leading-relaxed">
                <strong className="text-amber-400 text-lg">⚠️ Legal Disclaimer:</strong> This platform does not constitute legal advice. Users should consult qualified legal professionals regarding land claims, restitution, or corporate accountability matters.
              </p>
            </div>
            <div className="bg-slate-700/60 border-l-4 border-amber-400 p-6 rounded-lg hover-lift">
              <p className="text-gray-100 leading-relaxed">
                <strong className="text-amber-400 text-lg">🔒 Data Protection:</strong> We comply with applicable data protection laws. Personal information submitted through this platform is used solely for lineage verification and legal support purposes.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Carousel */}
        {carouselImages.length > 0 && (
          <div className="mb-12">
            <ImageCarousel images={carouselImages} autoPlay={true} autoPlayInterval={6000} />
          </div>
        )}

        {/* Tabbed Content */}
        <TabbedContent tabs={tabs} defaultTab="lineage" />
      </div>
    </section>
  );
}

