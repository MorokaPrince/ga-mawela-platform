"use client";

// Simplified imports for minimal component
import { useDeferredValue, useEffect, useState, type FormEvent } from "react";
import {
  BenefitsSection,
  DocumentsSection,
  type StoredIssue,
  type UploadedDocument,
  ReportSection,
  RepresentationSection,
} from "@/components/platform/sections/ActionSections";
import {
  CommunitySection,
  OpportunitiesSection,
  TransparencySection,
} from "@/components/platform/sections/CommunityAndOpportunitySections";
import {
  HomeSection,
  MinesSection,
} from "@/components/platform/sections/HomeAndMinesSections";
import { HistoryLineageSection } from "@/components/platform/sections/HistoryLineageSections";
import {
  ProfilesSection,
  SlpLiveTracker,
} from "@/components/platform/sections/ProfileSections";
// import {
//   baseDocuments,
//   benefitSlices,
//   companyFilters,
//   cpaProfiles,
//   minePoints,
//   opportunities,
//   researchSources,
//   representationNodes,
//   sectionConfigs,
//   slpCommitments,
//   transparencyMatrixRows,
//   transparencySignals,
//   updates,
//   farmsData,
//   pressureMetrics,
//   royalLineage,
//   type CompanyFilter,
//   type DocumentCategory,
//   type ResearchSource,
//   type SectionId,
// } from "@/data/platformData";
import { type PlatformLocale } from "@/lib/platform-i18n";
// import { GaMawelaMap } from "./MapComponent";
// import { EvidenceLibrary } from "./EvidenceLibrary";
// import { PressureDashboard } from "./PressureDashboard";
// import { RoyalAuthorityRegistry } from "./RoyalAuthorityRegistry";

// Simplified component - minimal types
    configured: boolean;
    database: string;
    dataSource: string;
    usesIntegratedSecurity: boolean;
    usesDefaultLocalConnection: boolean;
    serverTarget: string;
  };
  users: number;
  documents: number;
  sources: number;
  updates: number;
};

type HomeStat = {
  label: string;
  value: string;
  note: string;
};

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function readStoredTheme(): "dark" | "light" {
  if (typeof window === "undefined") {
    return "dark";
  }

  const raw = window.localStorage.getItem(SECTION_STORAGE_KEY);
  return raw === "light" ? "light" : "dark";
}

function readStoredLocale(): PlatformLocale {
  if (typeof window === "undefined") {
    return "en";
  }

  const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return raw === "nso" ? "nso" : "en";
}

function IntroOverlay() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
      className="fixed inset-0 z-[80] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(199,165,109,0.22),transparent_30%),linear-gradient(180deg,#071018,#0a141b)]"
    >
      <div className="absolute inset-0 gm-grid-overlay opacity-20" />
      <div className="relative flex h-full items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_0_70px_rgba(199,165,109,0.14)]">
            <div className="h-9 w-9 rounded-full border border-[rgba(199,165,109,0.38)] bg-[linear-gradient(135deg,#e0c38f,#9e7f4d)]" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.42em] text-white/60">
            Ga-Mawela intelligence platform
          </p>
