"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BellDot,
  Languages,
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
  transparencyMatrixRows,
  transparencySignals,
  updates,
  type CompanyFilter,
  type DocumentCategory,
  type SectionId,
} from "@/data/platformData";
import {
  platformCopy,
  type PlatformLocale,
} from "@/lib/platform-i18n";

const SECTION_STORAGE_KEY = "ga-mawela-theme";
const ISSUE_STORAGE_KEY = "ga-mawela-local-issues";
const DOC_STORAGE_KEY = "ga-mawela-local-docs";
const COMMENT_STORAGE_KEY = "ga-mawela-local-comments";
const LOCALE_STORAGE_KEY = "ga-mawela-locale";

type PlatformComment = {
  id: string;
  name: string;
  message: string;
  submittedAt: string;
};

type EngagementEntry = {
  id: string;
  kind: "comment" | "report";
  name: string;
  message: string;
  submittedAt: string;
  issueType?: string;
  fileName?: string;
};

type AuthViewer = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
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
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [selectedMineId, setSelectedMineId] = useState("st-george-2jt");
  const [expandedCommitmentId, setExpandedCommitmentId] = useState<string | null>(
    slpCommitments[0]?.id ?? null,
  );
  const [theme, setTheme] = useState<"dark" | "light">(readStoredTheme);
  const [locale, setLocale] = useState<PlatformLocale>(readStoredLocale);
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [introVisible, setIntroVisible] = useState(true);
  const [issues, setIssues] = useState<StoredIssue[]>(() =>
    readStoredValue<StoredIssue[]>(ISSUE_STORAGE_KEY, []),
  );
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(() =>
    readStoredValue<UploadedDocument[]>(DOC_STORAGE_KEY, []),
  );
  const [comments, setComments] = useState<PlatformComment[]>(() =>
    readStoredValue<PlatformComment[]>(COMMENT_STORAGE_KEY, []),
  );
  const [viewer, setViewer] = useState<AuthViewer | null>(null);
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
  const [commentForm, setCommentForm] = useState({
    name: "",
    message: "",
  });

  const copy = platformCopy[locale];
  const localizedSectionConfigs = sectionConfigs.map((section) => ({
    ...section,
    label: copy.sections[section.id].label,
    eyebrow: copy.sections[section.id].eyebrow,
  }));

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SECTION_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(ISSUE_STORAGE_KEY, JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    window.localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

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

  useEffect(() => {
    let cancelled = false;

    async function loadEngagement() {
      try {
        const response = await fetch("/api/platform-engagement/", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load platform engagement");
        }

        const payload = (await response.json()) as {
          success: boolean;
          data?: EngagementEntry[];
        };

        if (!payload.success || !payload.data || cancelled) {
          return;
        }

        setIssues(
          payload.data
            .filter((entry) => entry.kind === "report")
            .map<StoredIssue>((entry) => ({
              id: entry.id,
              name: entry.name,
              issueType:
                entry.issueType === "Community exclusion" ||
                entry.issueType === "Procurement"
                  ? entry.issueType
                  : "Employment",
              description: entry.message,
              fileName: entry.fileName,
              submittedAt: entry.submittedAt,
            })),
        );

        setComments(
          payload.data
            .filter((entry) => entry.kind === "comment")
            .map<PlatformComment>((entry) => ({
              id: entry.id,
              name: entry.name,
              message: entry.message,
              submittedAt: entry.submittedAt,
            })),
        );
      } catch {
        // Preserve local fallback if backend engagement storage is unavailable.
      }
    }

    void loadEngagement();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      try {
        const response = await fetch("/api/platform-auth/session/", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load session");
        }

        const payload = (await response.json()) as {
          authenticated: boolean;
          user: AuthViewer | null;
        };

        if (!cancelled) {
          setViewer(payload.authenticated ? payload.user : null);
        }
      } catch {
        if (!cancelled) {
          setViewer(null);
        }
      }
    }

    void loadSession();

    return () => {
      cancelled = true;
    };
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
    localizedSectionConfigs.find((section) => section.id === activeSection) ??
    localizedSectionConfigs[0];

  const latestUpdates = updates.map((item) => item.detail);

  const handleSectionChange = (id: SectionId) => {
    startTransition(() => {
      setActiveSection(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const handleReportSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    try {
      const response = await fetch("/api/platform-engagement/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: "report",
          section: "report",
          name: nextIssue.name,
          message: nextIssue.description,
          issueType: nextIssue.issueType,
          fileName: nextIssue.fileName,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save report");
      }

      const payload = (await response.json()) as {
        success: boolean;
        data?: EngagementEntry;
      };

      if (!payload.success || !payload.data) {
        throw new Error("Invalid report response");
      }

      setIssues((current) => [
        {
          id: payload.data.id,
          name: payload.data.name,
          issueType:
            payload.data.issueType === "Community exclusion" ||
            payload.data.issueType === "Procurement"
              ? payload.data.issueType
              : "Employment",
          description: payload.data.message,
          fileName: payload.data.fileName,
          submittedAt: payload.data.submittedAt,
        },
        ...current,
      ]);
    } catch {
      setIssues((current) => [nextIssue, ...current]);
    }

    setReportForm({
      name: "",
      issueType: "Employment",
      description: "",
      file: null,
    });
  };

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentForm.message.trim()) {
      return;
    }

    const nextComment: PlatformComment = {
      id: crypto.randomUUID(),
      name: commentForm.name.trim() || "Anonymous",
      message: commentForm.message.trim(),
      submittedAt: new Date().toISOString().slice(0, 10),
    };

    try {
      const response = await fetch("/api/platform-engagement/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: "comment",
          section: "transparency",
          name: nextComment.name,
          message: nextComment.message,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save comment");
      }

      const payload = (await response.json()) as {
        success: boolean;
        data?: EngagementEntry;
      };

      if (!payload.success || !payload.data) {
        throw new Error("Invalid comment response");
      }

      setComments((current) => [
        {
          id: payload.data.id,
          name: payload.data.name,
          message: payload.data.message,
          submittedAt: payload.data.submittedAt,
        },
        ...current,
      ]);
    } catch {
      setComments((current) => [nextComment, ...current]);
    }

    setCommentForm({
      name: "",
      message: "",
    });
  };

  const handleLogout = async () => {
    await fetch("/api/platform-auth/logout/", {
      method: "POST",
    });
    setViewer(null);
    router.refresh();
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

  const renderSection = (section: (typeof localizedSectionConfigs)[number]) => {
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
            matrixRows={transparencyMatrixRows}
            comments={comments}
            commentForm={commentForm}
            onCommentFieldChange={(field, value) =>
              setCommentForm((current) => ({ ...current, [field]: value }))
            }
            onCommentSubmit={handleCommentSubmit}
            copy={{
              title:
                locale === "nso"
                  ? "Ponagalo le boikarabelo"
                  : "Transparency & accountability",
              description:
                locale === "nso"
                  ? "Segalo se dula e le sa profeshenale: dingongorego tsa setshaba, dikgoba tsa ponagalo le ditlhohlo tsa poledisano di bewa bjalo ka ditaba tsa taolo le kabo ya tshedimoso."
                  : "The tone stays professional: community concerns, transparency gaps, and engagement challenges are framed as governance and disclosure issues rather than accusations.",
              matrixTitle: copy.matrixTitle,
              matrixDescription: copy.matrixDescription,
              chartOverview: copy.chartOverview,
              commentTitle: copy.commentTitle,
              commentPrompt: copy.commentPrompt,
              commentName: copy.commentName,
              commentMessage: copy.commentMessage,
              commentButton: copy.commentButton,
              commentEmptyTitle: copy.commentEmptyTitle,
              commentEmptyDetail: copy.commentEmptyDetail,
            }}
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
        <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[var(--gm-panel-header)] shadow-[0_18px_60px_rgba(7,10,24,0.18)] backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-4 py-3 md:px-6 xl:px-8">
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
                    {copy.appTitle}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--gm-muted)]">
                    {copy.appSubtitle}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_220px_190px_auto]">
                <div className="relative min-w-0">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]"
                  />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="gm-input h-12 w-full pl-11"
                    placeholder={copy.searchPlaceholder}
                  />
                </div>

                <select
                  value={companyFilter}
                  onChange={(event) =>
                    setCompanyFilter(event.target.value as CompanyFilter)
                  }
                  className="gm-input h-12 min-w-[220px]"
                >
                  {companyFilters.map((filter) => (
                    <option key={filter}>{filter}</option>
                  ))}
                </select>

                <label className="relative min-w-0">
                  <Languages
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]"
                  />
                  <select
                    value={locale}
                    onChange={(event) => setLocale(event.target.value as PlatformLocale)}
                    className="gm-input h-12 w-full pl-11"
                    aria-label={copy.languageLabel}
                  >
                    <option value="en">English</option>
                    <option value="nso">Sepedi / Northern Sotho</option>
                  </select>
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setTheme((current) => (current === "dark" ? "light" : "dark"))
                  }
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
                >
                  {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
                  <span>{theme === "dark" ? copy.lightMode : copy.darkMode}</span>
                </button>
              </div>
            </div>

            <div className="grid gap-3 xl:grid-cols-[1fr_auto] xl:items-center">
              <nav className="gm-top-tabs overflow-x-auto pb-1">
                <div className="flex min-w-max gap-2">
                  {localizedSectionConfigs.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleSectionChange(section.id)}
                      className={`group relative rounded-full border px-4 py-3 text-sm transition ${
                        activeSection === section.id
                          ? "border-white/18 bg-white text-slate-950"
                          : "border-white/10 bg-white/[0.04] text-[var(--gm-foreground)] hover:border-white/18 hover:bg-white/[0.08]"
                      }`}
                      style={
                        activeSection === section.id
                          ? {
                              borderColor: `${section.accent}66`,
                              boxShadow: `0 14px 42px ${section.accent}24`,
                            }
                          : undefined
                      }
                    >
                      <span className="block font-medium">{section.label}</span>
                      <span className={`mt-1 block text-[11px] ${activeSection === section.id ? "text-slate-600" : "text-[var(--gm-subtle)]"}`}>
                        {section.eyebrow}
                      </span>
                    </button>
                  ))}
                </div>
              </nav>

              <div className="flex flex-wrap gap-2 xl:justify-end">
                <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--gm-muted)]">
                  <span className="text-[var(--gm-subtle)]">{copy.moduleLabel}:</span>{" "}
                  <span className="font-medium text-[var(--gm-foreground)]">
                    {activeConfig.label}
                  </span>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--gm-muted)]">
                  <span className="text-[var(--gm-subtle)]">{copy.filterLabel}:</span>{" "}
                  <span className="font-medium text-[var(--gm-foreground)]">
                    {companyFilter}
                  </span>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--gm-muted)]">
                  <span className="text-[var(--gm-subtle)]">{copy.searchLabel}:</span>{" "}
                  <span className="font-medium text-[var(--gm-foreground)]">
                    {searchQuery ? `"${searchQuery}"` : copy.allRecords}
                  </span>
                </div>
                {isPending ? (
                  <span className="inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs text-amber-100">
                    {copy.switching}
                  </span>
                ) : null}
                {viewer ? (
                  <>
                    <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--gm-muted)]">
                      <span className="text-[var(--gm-subtle)]">{copy.welcomeBack}:</span>{" "}
                      <span className="font-medium text-[var(--gm-foreground)]">
                        {viewer.name}
                      </span>
                    </div>
                    <Link
                      href={viewer.role === "admin" ? "/admin/dashboard" : "/member/dashboard"}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                    >
                      {copy.dashboard}
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                    >
                      {copy.signOut}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                  >
                    {copy.signIn}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 py-4 md:px-6 md:py-5 xl:px-8 xl:py-6">
          <div className="mb-4 grid gap-4 xl:grid-cols-[1fr_auto]">
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-4 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <BellDot size={18} className="mt-1 text-[var(--gm-foreground)]" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                    {copy.liveUpdate}
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
                  {copy.quickAccess}
                </p>
                <p className="mt-2 text-base font-medium text-[var(--gm-foreground)]">
                  {copy.opportunities}
                </p>
              </button>
              <button
                type="button"
                onClick={() => handleSectionChange("report")}
                className="rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-3 text-left transition hover:border-white/18 hover:bg-white/[0.08]"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  {copy.quickAction}
                </p>
                <p className="mt-2 text-base font-medium text-[var(--gm-foreground)]">
                  {copy.submitIssue}
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
          {copy.footer}
        </footer>
      </div>
    </div>
  );
}
