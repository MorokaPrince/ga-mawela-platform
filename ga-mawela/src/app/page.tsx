'use client';

import TabbedLandscapeLayout from "@/components/TabbedLandscape/TabbedLandscapeLayout";

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

    </main>
  );
}
