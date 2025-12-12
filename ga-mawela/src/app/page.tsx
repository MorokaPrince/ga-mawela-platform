'use client';

import TabbedLandscapeLayout from "@/components/TabbedLandscape/TabbedLandscapeLayout";
import SponsorsShowcase from "@/components/SponsorsShowcase";
import ParallaxSection from "@/components/saG20/ParallaxSection";
import FloatingBlobsSection from "@/components/saG20/FloatingBlobsSection";
import ScrollRevealSection from "@/components/saG20/ScrollRevealSection";
import BrandColorSection from "@/components/saG20/BrandColorSection";

export default function Home() {
  return (
    <main className="bg-metallic-blue-dark">
      {/* Skip link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-metallic-blue-accent focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
      >
        Skip to main content
      </a>

      <TabbedLandscapeLayout />

      {/* Featured Sponsors & Partners Section - Innovation Bridge Style */}
      <SponsorsShowcase />

{/* SA_G20_SECTION_INSERTED - the following sections were added by automation.
   Uncomment whichever variant you prefer OR keep multiple for A/B.
*/}

{/* --- SA G20 Modules (drop-in) --- */}
{/* <ParallaxSection /> */}
{/* <FloatingBlobsSection /> */}
{/* <ScrollRevealSection /> */}
{/* <BrandColorSection /> */}

    </main>
  );
}
