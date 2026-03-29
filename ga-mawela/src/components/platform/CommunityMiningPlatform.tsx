"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  BellDot,
  Languages,
  MoonStar,
  Search,
  Sparkles,
  SunMedium,
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Shield,
  Users,
  Briefcase,
  Building2,
  Globe,
  ChevronDown,
} from "lucide-react";
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
  SlpSection,
} from "@/components/platform/sections/HomeAndMinesSections";
import {
  baseDocuments,
  benefitSlices,
  companyFilters,
  minePoints,
  opportunities,
  researchSources,
  representationNodes,
  sectionConfigs,
  slpCommitments,
  transparencyMatrixRows,
  transparencySignals,
  updates,
  type CompanyFilter,
  type DocumentCategory,
  type ResearchSource,
  type SectionId,
} from "@/data/platformData";
import {
  platformCopy,
  type PlatformLocale,
} from "@/lib/platform-i18n";
import { platformUiCopy } from "@/lib/platform-ui-copy";

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

type PlatformSystemSnapshot = {
  sql: {
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
    readStoredValue<UploadedDocument[]>(
      DOC_STORAGE_KEY,
      baseDocuments.map((document) => ({ ...document })),
    ),
  );
  const [comments, setComments] = useState<PlatformComment[]>(() =>
    readStoredValue<PlatformComment[]>(COMMENT_STORAGE_KEY, []),
  );
  const [viewer, setViewer] = useState<AuthViewer | null>(null);
  const [activeUpdateIndex, setActiveUpdateIndex] = useState(0);
  const [mineRecords, setMineRecords] = useState(minePoints);
  const [commitmentRecords, setCommitmentRecords] = useState(slpCommitments);
  const [opportunityRecords, setOpportunityRecords] = useState(opportunities);
  const [sourceRecords, setSourceRecords] = useState<ResearchSource[]>(researchSources);
  const [updateRecords, setUpdateRecords] = useState(updates);
  const [systemSnapshot, setSystemSnapshot] = useState<PlatformSystemSnapshot | null>(
    null,
  );
  // Mobile menu state for fade animation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const uiCopy = platformUiCopy[locale];
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
    if (updateRecords.length === 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveUpdateIndex((current) => (current + 1) % updateRecords.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [updateRecords.length]);

  useEffect(() => {
    let cancelled = false;

    async function loadOverview() {
      try {
        const response = await fetch("/api/platform-overview/", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load platform overview");
        }

        const payload = (await response.json()) as {
          success: boolean;
          data?: {
            mines: typeof minePoints;
            commitments: typeof slpCommitments;
            opportunities: typeof opportunities;
            documents: UploadedDocument[];
            sources: ResearchSource[];
            updates: typeof updates;
            system: PlatformSystemSnapshot;
          };
        };

        if (!payload.success || !payload.data || cancelled) {
          return;
        }

        setMineRecords(payload.data.mines);
        setCommitmentRecords(payload.data.commitments);
        setOpportunityRecords(payload.data.opportunities);
        setUploadedDocuments(payload.data.documents);
        setSourceRecords(payload.data.sources);
        setUpdateRecords(payload.data.updates);
        setSystemSnapshot(payload.data.system);
      } catch {
        // Preserve the static dataset if the backend overview is unavailable.
      }
    }

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

    void loadOverview();
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

  const filteredMinePoints = mineRecords.filter((point) => {
    const matchesCompany =
      companyFilter === "All" ||
      point.companyFilter === companyFilter ||
      point.type === "land parcel";
    const searchable = `${point.name} ${point.company} ${point.description} ${point.communityImpact} ${point.commodity}`.toLowerCase();
    const matchesSearch = !searchTerm || searchable.includes(searchTerm);
    return matchesCompany && matchesSearch;
  });

  const corridorPoints = filteredMinePoints.length > 0 ? filteredMinePoints : mineRecords;
  const selectedMine =
    corridorPoints.find((point) => point.id === selectedMineId) ?? corridorPoints[0];

  const filteredCommitments = commitmentRecords.filter((item) => {
    const matchesCompany =
      companyFilter === "All" || item.company === companyFilter;
    const searchable = `${item.mineName} ${item.type} ${item.notes} ${item.detail}`.toLowerCase();
    const matchesSearch = !searchTerm || searchable.includes(searchTerm);
    return matchesCompany && matchesSearch;
  });

  const filteredOpportunities = opportunityRecords.filter((item) => {
    const searchable = `${item.category} ${item.title} ${item.owner} ${item.summary} ${item.howToApply}`.toLowerCase();
    return !searchTerm || searchable.includes(searchTerm);
  });

  const visibleDocuments = uploadedDocuments.filter((item) => {
    const searchable = `${item.title} ${item.category} ${item.description} ${item.source}`.toLowerCase();
    return !searchTerm || searchable.includes(searchTerm);
  });

  const activeConfig =
    localizedSectionConfigs.find((section) => section.id === activeSection) ??
    localizedSectionConfigs[0];

  const latestUpdates = updateRecords.map((item) => item.detail);

  const handleSectionChange = (id: SectionId) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      const body = new FormData();
      body.set("kind", "report");
      body.set("section", "report");
      body.set("name", nextIssue.name);
      body.set("message", nextIssue.description);
      body.set("issueType", nextIssue.issueType);
      body.set("locale", locale);
      if (reportForm.file) {
        body.set("file", reportForm.file);
      }

      const response = await fetch("/api/platform-engagement/", {
        method: "POST",
        body,
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

      const { id, name, message, issueType, fileName, submittedAt } = payload.data;

      setIssues((current) => [
        {
          id,
          name,
          issueType:
            issueType === "Community exclusion" ||
            issueType === "Procurement"
              ? issueType
              : "Employment",
          description: message,
          fileName,
          submittedAt,
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

      const { id, name, message, submittedAt } = payload.data;

      setComments((current) => [
        {
          id,
          name,
          message,
          submittedAt,
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

  const handleLibrarySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!libraryForm.title.trim()) {
      return;
    }

    try {
      const body = new FormData();
      body.set("title", libraryForm.title.trim());
      body.set("category", libraryForm.category);
      body.set(
        "description",
        libraryForm.description.trim() || "Resident-uploaded document",
      );
      body.set("source", "Local resident upload");
      if (libraryForm.file) {
        body.set("file", libraryForm.file);
      }

      const response = await fetch("/api/platform-documents/", {
        method: "POST",
        body,
      });

      if (!response.ok) {
        throw new Error("Failed to save document");
      }

      const payload = (await response.json()) as {
        success: boolean;
        data?: UploadedDocument;
      };

      if (!payload.success || !payload.data) {
        throw new Error("Invalid document response");
      }

      setUploadedDocuments((current) => [payload.data!, ...current]);
      setSystemSnapshot((current) =>
        current ? { ...current, documents: current.documents + 1 } : current,
      );
    } catch {
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
    }

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
            locale={locale}
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
            locale={locale}
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
            locale={locale}
          />
        );
      case "community":
        return <CommunitySection config={section} locale={locale} />;
      case "opportunities":
        return (
          <OpportunitiesSection
            config={section}
            cards={filteredOpportunities}
            locale={locale}
          />
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
            locale={locale}
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
            locale={locale}
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
            sources={sourceRecords}
            locale={locale}
          />
        );
      case "representation":
        return (
          <RepresentationSection
            config={section}
            nodes={representationNodes}
            locale={locale}
          />
        );
      case "benefits":
        return (
          <BenefitsSection
            config={section}
            slices={benefitSlices}
            locale={locale}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`gm-theme-shell ${theme === "dark" ? "gm-theme-dark" : "gm-theme-light"}`}
    >
      <AnimatePresence>{introVisible ? <IntroOverlay /> : null}</AnimatePresence>

      {/* Full-width background with Gallery image overlay */}
      <div 
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: 'url("/Images/Gallery/Ga Mawela Debrochen Proj 2 Rivers.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
        }}
      />
      
      {/* Gradient overlays */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,74,40,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.18),transparent_30%),linear-gradient(180deg,var(--gm-background),var(--gm-background-strong))] -z-10" />
      <div className="pointer-events-none fixed inset-0 gm-grid-overlay opacity-40 -z-10" />
      <div className="pointer-events-none fixed inset-0 gm-noise-overlay opacity-20 -z-10" />

      {/* 80% Viewport Container - Government PaaS Style */}
      <div className="min-h-screen w-full flex items-start justify-center px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-2">
        <div className="w-full max-w-[98%] sm:max-w-[96%] lg:max-w-[94%] xl:max-w-[90%] 2xl:max-w-[1400px]">

          <div className="relative min-h-screen">
            {/* Enhanced Professional Header with Stacked Layout */}
            <header className="sticky top-0 z-40">
              {/* Top Navigation Bar */}
              <div className="border-b border-white/[0.06] bg-[var(--gm-panel-header)] backdrop-blur-xl">
                <div className="mx-auto max-w-[1600px] px-3 py-2 sm:px-4 md:px-6 lg:px-8">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    {/* Logo & Brand - Left */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] flex-shrink-0 shadow-lg">
                        <video 
                          src="/Images/Gallery/Ga Mawela Logo.mp4"
                          autoPlay 
                          muted 
                          loop 
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="hidden xs:block">
                        <h1 className="text-sm sm:text-base md:text-lg font-semibold text-[var(--gm-foreground)] tracking-tight leading-none">Ga-Mawela</h1>
                        <p className="text-[9px] sm:text-[10px] text-[var(--gm-subtle)] tracking-wider uppercase mt-0.5">{copy.appTitle}</p>
                      </div>
                    </Link>

                    {/* Desktop Navigation - Center */}
                    <nav className="hidden lg:flex items-center gap-0.5">
                      {localizedSectionConfigs.map((section) => (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => handleSectionChange(section.id)}
                          className={`relative px-3 py-2 text-xs font-medium transition-all duration-300 rounded-md ${
                            activeSection === section.id
                              ? "text-white bg-white/[0.08]"
                              : "text-[var(--gm-muted)] hover:text-[var(--gm-foreground)] hover:bg-white/[0.04]"
                          }`}
                          style={
                            activeSection === section.id
                              ? { color: section.accent }
                              : undefined
                          }
                        >
                          {section.label}
                          {activeSection === section.id && (
                            <motion.div 
                              layoutId="navIndicator"
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                              style={{ backgroundColor: section.accent }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                        </button>
                      ))}
                    </nav>

                    {/* Right Controls */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {/* Desktop Search Bar */}
                      <div className="hidden md:flex items-center">
                        <div className="relative">
                          <Search size={12} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]" />
                          <input
                            id="main-search-desktop"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            className="gm-input h-8 w-32 lg:w-40 pl-8 pr-3 text-xs rounded-lg"
                            placeholder={copy.searchPlaceholder}
                          />
                        </div>
                      </div>

                      {/* Language Toggle */}
                      <label className="relative flex items-center hidden md:flex">
                        <Languages size={11} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]" />
                        <select
                          value={locale}
                          onChange={(event) => setLocale(event.target.value as PlatformLocale)}
                          className="h-8 pl-8 pr-5 rounded-lg border border-white/10 bg-white/[0.04] text-xs text-[var(--gm-foreground)] transition hover:bg-white/[0.08] cursor-pointer appearance-none"
                          aria-label={copy.languageLabel}
                        >
                          <option value="en">EN</option>
                          <option value="nso">NSO</option>
                        </select>
                        <ChevronDown size={10} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]" />
                      </label>

                      {/* Theme Toggle */}
                      <button
                        type="button"
                        onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                        title={theme === "dark" ? copy.lightMode : copy.darkMode}
                      >
                        {theme === "dark" ? <SunMedium size={14} /> : <MoonStar size={14} />}
                      </button>

                      {/* Mobile Menu Button */}
                      <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                      >
                        {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
                      </button>

                      {/* User Actions */}
                      {viewer ? (
                        <div className="hidden sm:flex items-center gap-1.5">
                          <Link
                            href={viewer.role === "admin" ? "/admin/dashboard" : "/member/dashboard"}
                            className="flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-xs text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                          >
                            <LayoutDashboard size={12} />
                            <span className="hidden md:inline">{copy.dashboard}</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => void handleLogout()}
                            className="flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-xs text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                          >
                            {copy.signOut}
                          </button>
                        </div>
                      ) : (
                        <Link
                          href="/login"
                          className="flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-xs text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                        >
                          <Users size={12} />
                          <span className="hidden sm:inline">{copy.signIn}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu - Fade Animation */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="lg:hidden border-b border-white/[0.06] bg-[var(--gm-panel)] overflow-hidden"
                  >
                    <div className="mx-auto max-w-[1600px] px-4 py-4">
                      <nav className="flex flex-col gap-1">
                        {localizedSectionConfigs.map((section) => (
                          <button
                            key={section.id}
                            type="button"
                            onClick={() => {
                              handleSectionChange(section.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`px-4 py-3 text-sm font-medium text-left transition-all rounded-lg ${
                              activeSection === section.id
                                ? "bg-white/[0.08] text-white"
                                : "text-[var(--gm-muted)] hover:bg-white/[0.04] hover:text-[var(--gm-foreground)]"
                            }`}
                            style={
                              activeSection === section.id
                                ? { color: section.accent }
                                : undefined
                            }
                          >
                            {section.label}
                          </button>
                        ))}
                      </nav>
                      {/* Mobile Search */}
                      <div className="mt-4 relative">
                        <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]" />
                        <input
                          id="main-search-mobile"
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          className="gm-input h-10 w-full pl-9 text-sm"
                          placeholder={copy.searchPlaceholder}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* Main Content Area */}
            <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-2 sm:px-3 md:px-4 lg:px-6 py-3 sm:py-4 md:py-5">
              {/* Live Updates & Quick Actions */}
              <div className="mb-3 sm:mb-4 grid gap-2 sm:gap-3 md:gap-4 xl:grid-cols-[1fr_auto]">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl sm:rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-3 sm:p-4 backdrop-blur-xl"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <BellDot size={16} className="mt-0.5 sm:mt-1 text-[var(--gm-foreground)] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                        {copy.liveUpdate}
                      </p>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-[var(--gm-muted)] line-clamp-2">
                        {latestUpdates[activeUpdateIndex] ?? copy.appSubtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="grid gap-2 sm:gap-3 xs:grid-cols-2 xl:w-[380px] sm:xl:w-[420px]">
                  <motion.button
                    type="button"
                    onClick={() => handleSectionChange("opportunities")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl sm:rounded-[20px] border border-white/10 bg-white/[0.05] px-3 sm:px-4 py-2.5 sm:py-3 text-left transition hover:border-white/18 hover:bg-white/[0.08]"
                  >
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                      {copy.quickAccess}
                    </p>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base font-medium text-[var(--gm-foreground)]">
                      {copy.opportunities}
                    </p>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => handleSectionChange("report")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl sm:rounded-[20px] border border-white/10 bg-white/[0.05] px-3 sm:px-4 py-2.5 sm:py-3 text-left transition hover:border-white/18 hover:bg-white/[0.08]"
                  >
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                      {copy.quickAction}
                    </p>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base font-medium text-[var(--gm-foreground)]">
                      {copy.submitIssue}
                    </p>
                  </motion.button>
                </div>
              </div>

              {/* Section Content with Fade Transitions */}
              <div className="gm-section-stage">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {renderSection(activeConfig)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>

            {/* Professional Footer */}
            <footer className="mx-auto w-full max-w-[1600px] border-t border-white/[0.08] px-3 py-3 sm:px-4 md:px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] flex-shrink-0 overflow-hidden shadow-lg">
                    <video 
                      src="/Images/Gallery/Ga Mawela Logo.mp4"
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-[var(--gm-foreground)] truncate">{locale === "nso" ? "Polatifomo ya Ga-Mawela" : "Ga-Mawela Platform"}</p>
                    <p className="text-[10px] sm:text-xs text-[var(--gm-subtle)] truncate">{locale === "nso" ? "Mokgwa wa tshedimosetso ya setshaba" : "Community Intelligence System"}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--gm-subtle)] text-center sm:text-left">
                  {copy.footer}
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-xs text-[var(--gm-subtle)]">© {new Date().getFullYear()} Ga-Mawela</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
