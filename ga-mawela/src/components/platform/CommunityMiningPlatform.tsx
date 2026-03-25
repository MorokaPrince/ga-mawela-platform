"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BellDot,
  MoonStar,
  Search,
  Sparkles,
  SunMedium,
} from "lucide-react";
import {
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
  type FormEvent,
} from "react";
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
  SlpSection,
} from "@/components/platform/sections/HomeAndMinesSections";
import {
  baseDocuments,
  benefitSlices,
  companyFilters,
  minePoints,
  opportunities,
  representationNodes,
  sectionConfigs,
  slpCommitments,
  transparencySignals,
  updates,
  type CompanyFilter,
  type DocumentCategory,
  type SectionId,
} from "@/data/platformData";

const SECTION_STORAGE_KEY = "ga-mawela-theme";
const ISSUE_STORAGE_KEY = "ga-mawela-local-issues";
const DOC_STORAGE_KEY = "ga-mawela-local-docs";

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

function IntroOverlay() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
      className="fixed inset-0 z-[80] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(209,74,40,0.26),transparent_35%),linear-gradient(180deg,#060913,#090f1f)]"
    >
      <div className="absolute inset-0 gm-grid-overlay opacity-30" />
      <div className="relative flex h-full items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <div className="mx-auto mb-8 h-16 w-16 rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-[0_0_80px_rgba(209,74,40,0.18)]">
            <div className="h-full w-full rounded-xl bg-[linear-gradient(135deg,#d14a28,#f59e0b)]" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.42em] text-white/60">
            Ga-Mawela intelligence platform
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
            Loading corridor intelligence
          </h1>
          <p className="mt-4 text-base leading-8 text-white/70">
            Preparing land context, mining operations, SLP status, and community access layers.
          </p>
          <div className="mx-auto mt-8 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,transparent,#d14a28,#ffffff)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CommunityMiningPlatform() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [selectedMineId, setSelectedMineId] = useState("st-george-2jt");
  const [expandedCommitmentId, setExpandedCommitmentId] = useState<string | null>(
    slpCommitments[0]?.id ?? null,
  );
  const [theme, setTheme] = useState<"dark" | "light">(readStoredTheme);
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [introVisible, setIntroVisible] = useState(true);
  const [issues, setIssues] = useState<StoredIssue[]>(() =>
    readStoredValue<StoredIssue[]>(ISSUE_STORAGE_KEY, []),
  );
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(() =>
    readStoredValue<UploadedDocument[]>(DOC_STORAGE_KEY, []),
  );
  const [activeUpdateIndex, setActiveUpdateIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(searchQuery);

  const [reportForm, setReportForm] = useState<{
    name: string;
    issueType: "Employment" | "Community exclusion" | "Procurement";
    description: string;
    file: File | null;
  }>({
    name: "",
    issueType: "Employment",
    description: "",
    file: null,
  });

  const [libraryForm, setLibraryForm] = useState<{
    title: string;
    category: DocumentCategory;
    description: string;
    file: File | null;
  }>({
    title: "",
    category: "PAIA Requests",
    description: "",
    file: null,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SECTION_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(ISSUE_STORAGE_KEY, JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    const docsToStore = uploadedDocuments.map((document) => {
      const rest = { ...document };
      delete rest.previewUrl;
      return rest;
    });
    window.localStorage.setItem(DOC_STORAGE_KEY, JSON.stringify(docsToStore));
  }, [uploadedDocuments]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveUpdateIndex((current) => (current + 1) % updates.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  const searchTerm = deferredSearch.trim().toLowerCase();

  const filteredMinePoints = minePoints.filter((point) => {
    const matchesCompany =
      companyFilter === "All" ||
      point.companyFilter === companyFilter ||
      point.type === "land parcel";
    const searchable = `${point.name} ${point.company} ${point.description} ${point.communityImpact} ${point.commodity}`.toLowerCase();
    const matchesSearch = !searchTerm || searchable.includes(searchTerm);
    return matchesCompany && matchesSearch;
  });

  const corridorPoints = filteredMinePoints.length > 0 ? filteredMinePoints : minePoints;
  const selectedMine =
    corridorPoints.find((point) => point.id === selectedMineId) ?? corridorPoints[0];

  const filteredCommitments = slpCommitments.filter((item) => {
    const matchesCompany =
      companyFilter === "All" || item.company === companyFilter;
    const searchable = `${item.mineName} ${item.type} ${item.notes} ${item.detail}`.toLowerCase();
    const matchesSearch = !searchTerm || searchable.includes(searchTerm);
    return matchesCompany && matchesSearch;
  });

  const filteredOpportunities = opportunities.filter((item) => {
    const searchable = `${item.category} ${item.title} ${item.owner} ${item.summary} ${item.howToApply}`.toLowerCase();
    return !searchTerm || searchable.includes(searchTerm);
  });

  const visibleDocuments = [...baseDocuments, ...uploadedDocuments].filter((item) => {
    const searchable = `${item.title} ${item.category} ${item.description} ${item.source}`.toLowerCase();
    return !searchTerm || searchable.includes(searchTerm);
  });

  const activeConfig =
    sectionConfigs.find((section) => section.id === activeSection) ?? sectionConfigs[0];

  const latestUpdates = updates.map((item) => item.detail);

  const handleSectionChange = (id: SectionId) => {
    startTransition(() => {
      setActiveSection(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const handleReportSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reportForm.description.trim()) {
      return;
    }

    const nextIssue: StoredIssue = {
      id: crypto.randomUUID(),
      name: reportForm.name.trim(),
      issueType: reportForm.issueType,
      description: reportForm.description.trim(),
      fileName: reportForm.file?.name,
      submittedAt: new Date().toISOString().slice(0, 10),
    };

    setIssues((current) => [nextIssue, ...current]);
    setReportForm({
      name: "",
      issueType: "Employment",
      description: "",
      file: null,
    });
  };

  const handleLibrarySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!libraryForm.title.trim()) {
      return;
    }

    const previewUrl = libraryForm.file
      ? URL.createObjectURL(libraryForm.file)
      : undefined;

    const nextDocument: UploadedDocument = {
      id: crypto.randomUUID(),
      title: libraryForm.title.trim(),
      category: libraryForm.category,
      description: libraryForm.description.trim() || "Resident-uploaded document",
      date: new Date().toISOString().slice(0, 10),
      source: "Local resident upload",
      previewUrl,
    };

    setUploadedDocuments((current) => [nextDocument, ...current]);
    setLibraryForm({
      title: "",
      category: "PAIA Requests",
      description: "",
      file: null,
    });
  };

  const renderSection = (section: (typeof sectionConfigs)[number]) => {
    switch (section.id) {
      case "home":
        return (
          <HomeSection
            config={section}
            points={corridorPoints}
            selectedMine={selectedMine}
            onSelectMine={setSelectedMineId}
            onSectionChange={handleSectionChange}
          />
        );
      case "mines":
        return (
          <MinesSection
            config={section}
            filteredPoints={corridorPoints}
            selectedMine={selectedMine}
            selectedMineId={selectedMine.id}
            onSelectMine={setSelectedMineId}
            companyFilter={companyFilter}
            onCompanyFilterChange={setCompanyFilter}
            filters={companyFilters}
          />
        );
      case "slp":
        return (
          <SlpSection
            config={section}
            commitments={filteredCommitments}
            expandedId={expandedCommitmentId}
            onToggleCommitment={(id) =>
              setExpandedCommitmentId((current) => (current === id ? null : id))
            }
          />
        );
      case "community":
        return <CommunitySection config={section} />;
      case "opportunities":
        return (
          <OpportunitiesSection config={section} cards={filteredOpportunities} />
        );
      case "transparency":
        return (
          <TransparencySection
            config={section}
            signals={transparencySignals}
          />
        );
      case "report":
        return (
          <ReportSection
            config={section}
            reportForm={reportForm}
            onReportFieldChange={(field, value) =>
              setReportForm((current) => ({ ...current, [field]: value }))
            }
            onReportFileChange={(file) =>
              setReportForm((current) => ({ ...current, file }))
            }
            onReportSubmit={handleReportSubmit}
            issues={issues}
          />
        );
      case "documents":
        return (
          <DocumentsSection
            config={section}
            documents={visibleDocuments}
            libraryForm={libraryForm}
            onLibraryFieldChange={(field, value) =>
              setLibraryForm((current) => ({ ...current, [field]: value }))
            }
            onLibraryFileChange={(file) =>
              setLibraryForm((current) => ({ ...current, file }))
            }
            onLibrarySubmit={handleLibrarySubmit}
          />
        );
      case "representation":
        return <RepresentationSection config={section} nodes={representationNodes} />;
      case "benefits":
        return <BenefitsSection config={section} slices={benefitSlices} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`gm-theme-shell ${theme === "dark" ? "gm-theme-dark" : "gm-theme-light"}`}
    >
      <AnimatePresence>{introVisible ? <IntroOverlay /> : null}</AnimatePresence>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,74,40,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_22%),linear-gradient(180deg,var(--gm-background),var(--gm-background-strong))]" />
      <div className="pointer-events-none fixed inset-0 gm-grid-overlay opacity-45" />
      <div className="pointer-events-none fixed inset-0 gm-noise-overlay opacity-20" />

      <div className="relative min-h-screen">
        <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[var(--gm-panel-header)] backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4 md:px-6 xl:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_0_40px_rgba(209,74,40,0.12)]">
                  <Sparkles size={18} className="text-[var(--gm-foreground)]" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--gm-subtle)]">
                    Ga-Mawela
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)] md:text-3xl">
                    Mining & Community Intelligence Platform
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--gm-muted)]">
                    A professional landing experience for transparency, land awareness, SLP visibility, and opportunity access around St George 2 JT.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-[minmax(280px,1fr)_220px_auto]">
                <div className="relative min-w-0">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]"
                  />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="gm-input h-12 w-full pl-11"
                    placeholder="Search mines, commitments, opportunities, and documents"
                  />
                </div>

                <select
                  value={companyFilter}
                  onChange={(event) =>
                    setCompanyFilter(event.target.value as CompanyFilter)
                  }
                  className="gm-input hidden h-12 min-w-[220px] md:block"
                >
                  {companyFilters.map((filter) => (
                    <option key={filter}>{filter}</option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() =>
                    setTheme((current) => (current === "dark" ? "light" : "dark"))
                  }
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
                  >
                    {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
                  <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                </button>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
              <nav className="gm-top-tabs overflow-x-auto pb-1">
                <div className="flex min-w-max gap-2">
                  {sectionConfigs.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleSectionChange(section.id)}
                      className={`group relative rounded-full border px-4 py-3 text-sm transition ${
                        activeSection === section.id
                          ? "border-white/18 bg-white text-slate-950 shadow-[0_12px_32px_rgba(255,255,255,0.08)]"
                          : "border-white/10 bg-white/[0.04] text-[var(--gm-foreground)] hover:border-white/18 hover:bg-white/[0.08]"
                      }`}
                    >
                      <span className="block font-medium">{section.label}</span>
                      <span className={`mt-1 block text-[11px] ${activeSection === section.id ? "text-slate-600" : "text-[var(--gm-subtle)]"}`}>
                        {section.eyebrow}
                      </span>
                    </button>
                  ))}
                </div>
              </nav>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                    Active module
                  </p>
                  <p className="mt-1 text-lg font-medium tracking-[-0.03em] text-[var(--gm-foreground)]">
                    {activeConfig.label}
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                    Filters
                  </p>
                  <p className="mt-1 text-sm text-[var(--gm-muted)]">
                    {companyFilter}
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                    Search state
                  </p>
                  <p className="mt-1 text-sm text-[var(--gm-muted)]">
                    {searchQuery ? `"${searchQuery}"` : "All records"}
                  </p>
                  {isPending ? (
                    <span className="mt-2 inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
                      Switching...
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 py-5 md:px-6 md:py-6 xl:px-8 xl:py-8">
          <div className="mb-5 grid gap-4 xl:grid-cols-[1fr_auto]">
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-4 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <BellDot size={18} className="mt-1 text-[var(--gm-foreground)]" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                    Live update
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                    {latestUpdates[activeUpdateIndex]}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:w-[420px]">
              <button
                type="button"
                onClick={() => handleSectionChange("opportunities")}
                className="rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-3 text-left transition hover:border-white/18 hover:bg-white/[0.08]"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  Quick access
                </p>
                <p className="mt-2 text-base font-medium text-[var(--gm-foreground)]">
                  Opportunities
                </p>
              </button>
              <button
                type="button"
                onClick={() => handleSectionChange("report")}
                className="rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-3 text-left transition hover:border-white/18 hover:bg-white/[0.08]"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  Quick action
                </p>
                <p className="mt-2 text-base font-medium text-[var(--gm-foreground)]">
                  Submit issue
                </p>
              </button>
            </div>
          </div>

          <div className="gm-section-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {renderSection(activeConfig)}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <footer className="mx-auto w-full max-w-[1600px] border-t border-white/[0.08] px-4 py-5 text-sm text-[var(--gm-subtle)] md:px-6 xl:px-8">
          World-class transparency interface for Ga-Mawela. Frontend now structured for backend integration, document pipelines, and richer data feeds.
        </footer>
      </div>
    </div>
  );
}
