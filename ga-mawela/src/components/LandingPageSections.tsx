'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';

export function TrueLineageSection() {
  const ref = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="scroll-animate py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          The True Lineage of Ga-Mawela
        </h2>
        <p className="text-lg text-gray-100 mb-4">
          Ga-Mawela is not a land held by the Mankge family; it is the ancestral territory of Masetu and his descendants. Masetu's two lineages — Lesedi (firstborn) and Moroka (lastborn) — are the rightful custodians of the land, as confirmed by oral testimony, communal history, and primary documents.
        </p>
        <p className="text-lg text-gray-100">
          Over the years, however, narratives have been twisted, legal obstacles erected, and corporate interests imposed. This platform exists to restore the truth and empower the rightful custodians.
        </p>
      </div>
    </section>
  );
}

export function MankgeNarrativeSection() {
  const ref = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="scroll-animate py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Exposing the Mankge Narrative
        </h2>
        <p className="text-lg text-gray-100 mb-4">
          Public and corporate discourse has frequently cited a "Mankge" lineage when referring to Ga-Mawela ownership. Major media outlets and community organizations reported that a Mankge-led committee pursued restitution in the early 2000s.
        </p>
        <p className="text-lg text-gray-100 mb-4">
          However, our investigation shows: the Mankge narrative is deeply contested. Documents, testimonies, and deeds suggest that title transfers during that period may have misrepresented the living Ga-Mawela lineage.
        </p>
        <p className="text-lg text-gray-100">
          This site collects and publishes the actual deeds, court filings, affidavits, and corporate SLPs to set the record straight.
        </p>
      </div>
    </section>
  );
}

export function CorporateInvolvementSection() {
  const ref = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="scroll-animate py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Anglo American & Mining Interests on Ga-Mawela Land
        </h2>
        <p className="text-lg text-gray-100 mb-4">
          Ga-Mawela's ancestral land sits atop valuable mineral reserves. In recent decades, companies like Anglo American (via the Der Brochen / Mototolo project) and powerful joint ventures like Two Rivers (ARM + Implats) have established operations in and around the territory.
        </p>
        <p className="text-lg text-gray-100 mb-4">
          Public SLP (Social & Labour Plan) documents show these companies promised community benefits. Yet, many Ga-Mawela descendants remain landless and unemployed, while minerals are extracted from under their land.
        </p>
        <p className="text-lg text-gray-100">
          This platform reveals these SLPs, environmental impact studies, and documents how corporate processes have excluded the rightful community custodians.
        </p>
      </div>
    </section>
  );
}

export function DispossessionHistorySection() {
  const ref = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="scroll-animate py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          A History of Dispossession
        </h2>
        <div className="space-y-4 text-lg text-gray-100">
          <p>
            <strong>Early 20th Century:</strong> Colonial and apartheid-era laws (such as the 1913 Natives Land Act and the 1936 Native Trust and Land Act) stripped many Black communities of their ancestral land.
          </p>
          <p>
            <strong>Forced Labour & Evictions:</strong> Ga-Mawela families were forced into labour tenancy, evicted, and marginalized — despite holding deep cultural and territorial ties.
          </p>
          <p>
            <strong>1998 Restitution Claim:</strong> Community leaders lodged a restitution claim under the Restitution of Land Rights Act. That claim remains unresolved.
          </p>
          <p>
            <strong>Present Day:</strong> Over decades, despite partial court rulings, the material conditions of many Ga-Mawela descendants reflect deep poverty, exclusion, and lack of benefit from the land they once owned.
          </p>
        </div>
      </div>
    </section>
  );
}

export function MissionVisionSection() {
  const ref = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="scroll-animate py-20 px-4 bg-gradient-to-r from-slate-800 to-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
          Our Mission & Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">Our Mission</h3>
            <ul className="space-y-3 text-gray-100">
              <li>✓ Expose the truth about Ga-Mawela ownership, lineage, and legal history</li>
              <li>✓ Provide a secure, community-driven space for descendants to register and assert rights</li>
              <li>✓ Collect, preserve, and publish primary evidence for public scrutiny</li>
              <li>✓ Support legal action, policy advocacy, and community mobilization</li>
              <li>✓ Hold corporate actors accountable for compliance and community benefit</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">Our Vision</h3>
            <p className="text-gray-100">
              A Ga-Mawela land restored to its rightful custodians, where the descendants of Masetu (Lesedi and Moroka) lead, benefit, and preserve their heritage — with meaningful participation in mining benefits, decision-making, and cultural renewal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TakeActionSection() {
  const ref = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="scroll-animate py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
          How You Can Help
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <h3 className="text-xl font-bold text-amber-400 mb-3">Register & Document</h3>
            <p className="text-gray-100">Register your family lineage and upload identity or clan documentation to establish your connection to Ga-Mawela.</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <h3 className="text-xl font-bold text-amber-400 mb-3">Provide Evidence</h3>
            <p className="text-gray-100">Share affidavits, old deeds, photographs, or community testimony that supports Ga-Mawela lineage claims.</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <h3 className="text-xl font-bold text-amber-400 mb-3">Sign & Share</h3>
            <p className="text-gray-100">Sign our petition urging government and mining companies to respect rightful ownership and distribute benefits.</p>
          </div>
          <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
            <h3 className="text-xl font-bold text-amber-400 mb-3">Support Legal Action</h3>
            <p className="text-gray-100">Donate or support legal representation, research, and community organizing efforts.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

