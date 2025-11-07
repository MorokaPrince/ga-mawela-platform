'use client';

import { useState, useEffect } from 'react';
import TabNavigation from './TabNavigation';
import Footer from './Footer';
import HeroTab from './tabs/HeroTab';
import HistoricalTab from './tabs/HistoricalTab';
import ArchaeologicalTab from './tabs/ArchaeologicalTab';
import LegalTab from './tabs/LegalTab';
import MiningTab from './tabs/MiningTab';
import LineageTab from './tabs/LineageTab';
import EvidenceTab from './tabs/EvidenceTab';
import GalleryTab from './tabs/GalleryTab';
import SponsorsTab from './tabs/SponsorsTab';
import ResourcesTab from './tabs/ResourcesTab';
import YouthTab from './tabs/YouthTab';

export type TabId = 'hero' | 'historical' | 'archaeological' | 'legal' | 'mining' | 'lineage' | 'evidence' | 'gallery' | 'sponsors' | 'youth' | 'resources';

const TABS: { id: TabId; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'historical', label: 'History' },
  { id: 'archaeological', label: 'Heritage' },
  { id: 'legal', label: 'Legal' },
  { id: 'mining', label: 'Mining' },
  { id: 'lineage', label: 'Lineage' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'sponsors', label: 'Partners' },
  { id: 'youth', label: 'Youth' },
  { id: 'resources', label: 'Resources' },
];

export default function TabbedLandscapeLayout() {
  const [activeTab, setActiveTab] = useState<TabId>('hero');

  useEffect(() => {
    const handleNavigateToTab = (event: Event) => {
      const customEvent = event as CustomEvent;
      const tabId = customEvent.detail as TabId;
      setActiveTab(tabId);
    };

    window.addEventListener('navigateToTab', handleNavigateToTab);
    return () => window.removeEventListener('navigateToTab', handleNavigateToTab);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroTab />;
      case 'historical':
        return <HistoricalTab />;
      case 'archaeological':
        return <ArchaeologicalTab />;
      case 'legal':
        return <LegalTab />;
      case 'mining':
        return <MiningTab />;
      case 'lineage':
        return <LineageTab />;
      case 'evidence':
        return <EvidenceTab />;
      case 'gallery':
        return <GalleryTab />;
      case 'sponsors':
        return <SponsorsTab />;
      case 'youth':
        return <YouthTab />;
      case 'resources':
        return <ResourcesTab />;
      default:
        return <HeroTab />;
    }
  };

  return (
    <div className="min-h-screen bg-metallic-blue-dark flex flex-col">
      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="pt-24 flex-grow bg-metallic-blue-dark">
        {renderTabContent()}
      </div>

      <Footer />
    </div>
  );
}

