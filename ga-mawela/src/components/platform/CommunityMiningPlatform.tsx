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
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Shield,
  ShieldCheck,
  Users,
  Briefcase,
  Globe,
  ChevronDown,
  Activity,
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
} from "@/components/platform/sections/HomeAndMinesSections";
import { HistoryLineageSection } from "@/components/platform/sections/HistoryLineageSections";
import {
  ProfilesSection,
  SlpLiveTracker,
} from "@/components/platform/sections/ProfileSections";
import {
  baseDocuments,
  benefitSlices,
  companyFilters,
  cpaProfiles,
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
import { platformCopy, type PlatformLocale } from "@/lib/platform-i18n";

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
            Restoring Land. Rebuilding Unity. Empowering Ga-Mawela.
          </h1>
          <p className="mt-4 text-base leading-8 text-white/70">
            A dedicated transparency platform for Ga-Mawela. Track corridor activity, follow SLP commitments, and keep evidence in one place.
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
  const homeStats: HomeStat[] = [
    {
      label: locale === "nso" ? "Dinode tse di mapilwego" : "Mapped corridor nodes",
      value: `${mineRecords.length}`,
      note:
        locale === "nso"
          ? "Naga, meepo, diporojeke le dihub di bewa lefelong le tee."
          : "Land parcels, mines, projects, and shared industrial hubs are kept in one spatial view.",
    },
    {
      label: locale === "nso" ? "Boitlamo bjo bo latelwago" : "Tracked commitments",
      value: `${commitmentRecords.length}`,
      note:
        locale === "nso"
          ? "Mesomo, ditsela, dikolo le tlwaetso di bewa leihlo ka sesupo sa maemo."
          : "Jobs, roads, schools, and training commitments now sit in one delivery view.",
    },
    {
      label: locale === "nso" ? "Dikanale tsa semmuso" : "Official access channels",
      value: `${opportunityRecords.length}`,
      note:
        locale === "nso"
          ? "Menyetla e supa diphihlelelo tsa semmuso tsa mesomo, dithuto le bareki."
          : "Opportunity cards point to official jobs, training, funding, and supplier routes.",
    },
    {
      label: locale === "nso" ? "Bohlatse le methopo" : "Evidence and sources",
      value: `${uploadedDocuments.length + sourceRecords.length}`,
      note:
        locale === "nso"
          ? "Ditokomane tsa laeborari le methopo ya nyakisisso di kopantswe."
          : "Library documents and research references are combined into one evidence layer.",
    },
  ];

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
            updates={updateRecords}
            stats={homeStats}
            locale={locale}
          />
        );
      case "history":
        return (
          <HistoryLineageSection
            config={section}
            locale={locale}
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
            locale={locale}
          />
        );
      case "slp":
        return (
          <SlpLiveTracker
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
      case "profiles":
        return (
          <ProfilesSection
            config={section}
            profiles={cpaProfiles}
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
      <div className="fixed inset-0 -z-20 bg-gallery-overlay" />
      
      {/* Professional gradient overlays */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(209,74,40,0.18),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.08),transparent_30%),linear-gradient(180deg,var(--gm-background)_0%,var(--gm-background-strong)_100%)] -z-10" />
      <div className="pointer-events-none fixed inset-0 gm-grid-overlay opacity-50 -z-10" />
      <div className="pointer-events-none fixed inset-0 gm-noise-overlay opacity-25 -z-10" />
      {/* Top fade for seamless header */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--gm-background)] to-transparent opacity-60 -z-5" />

      {/* 80% Viewport Container - Full Width for Proper Device Fit */}
      <div className="min-h-screen w-full flex items-start justify-center px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3">
        <div className="w-full max-w-[1920px]">

          <div className="relative min-h-screen">
            {/* Enhanced Professional Header with Stacked Layout */}
            <header className="sticky top-0 z-40 overflow-hidden rounded-[30px] border border-white/[0.06] bg-[var(--gm-panel-header)]/90 shadow-[0_18px_48px_rgba(4,7,18,0.28)] backdrop-blur-2xl">
              <div className="mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-6">
                <div className="flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4">
                  <Link href="/" className="group flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-lg sm:h-14 sm:w-14">
                      <video
                        src="/Images/Gallery/Ga Mawela Logo.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h1 className="truncate text-sm font-bold tracking-tight text-[var(--gm-foreground)] sm:text-lg md:text-xl">
                        Ga-Mawela
                      </h1>
                      <p className="mt-1 hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[var(--gm-subtle)] sm:flex">
                        <Shield size={10} className="opacity-60" />
                        <span className="truncate">{copy.appTitle}</span>
                      </p>
                    </div>
                  </Link>

                  <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-2.5">
                    <label className="relative flex h-9 items-center">
                      <Languages
                        size={12}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]"
                      />
                      <select
                        value={locale}
                        onChange={(event) => setLocale(event.target.value as PlatformLocale)}
                        className="h-9 w-[76px] rounded-xl border border-white/10 bg-white/[0.05] pl-8 pr-6 text-[11px] font-medium text-[var(--gm-foreground)] transition hover:bg-white/[0.08] sm:w-[82px] sm:text-xs"
                        aria-label={copy.languageLabel}
                      >
                        <option value="en">EN</option>
                        <option value="nso">NSO</option>
                      </select>
                      <ChevronDown
                        size={10}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                      title={theme === "dark" ? copy.lightMode : copy.darkMode}
                    >
                      {theme === "dark" ? <SunMedium size={14} /> : <MoonStar size={14} />}
                    </button>

                    {viewer ? (
                      <div className="flex items-center gap-2">
                        <Link
                          href={viewer.role === "admin" ? "/admin/dashboard" : "/member/dashboard"}
                          className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 text-xs font-medium text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                        >
                          <LayoutDashboard size={13} />
                          <span className="hidden lg:inline">{copy.dashboard}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => void handleLogout()}
                          className="hidden h-9 items-center rounded-xl border border-white/10 bg-white/[0.05] px-3 text-xs font-medium text-[var(--gm-foreground)] transition hover:bg-white/[0.08] sm:flex"
                        >
                          {copy.signOut}
                        </button>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 text-xs font-medium text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
                      >
                        <Users size={13} />
                        <span className="hidden sm:inline">{copy.signIn}</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[var(--gm-foreground)] transition hover:bg-white/[0.08] md:hidden"
                    >
                      {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
                    </button>
                  </div>
                </div>

                <div className="hidden border-t border-white/[0.06] py-2.5 md:flex md:items-center md:gap-3">
                  <nav className="gm-top-tabs flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1">
                    {localizedSectionConfigs.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => handleSectionChange(section.id)}
                        className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium transition sm:px-4 sm:text-xs ${
                          activeSection === section.id
                            ? "bg-white/[0.12] text-white section-nav-accent"
                            : "text-[var(--gm-muted)] hover:bg-white/[0.06] hover:text-[var(--gm-foreground)]"
                        }`}
                        style={
                          activeSection === section.id
                            ? ({ "--section-accent": section.accent } as React.CSSProperties)
                            : undefined
                        }
                      >
                        {section.label}
                      </button>
                    ))}
                  </nav>
                  <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[11px] text-[var(--gm-subtle)] xl:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 status-pulse" />
                    {copy.liveUpdate}
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
                    className="overflow-hidden border-t border-white/[0.06] bg-[var(--gm-panel)] md:hidden"
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
                                ? "bg-white/[0.08] text-white section-nav-accent"
                                : "text-[var(--gm-muted)] hover:bg-white/[0.04] hover:text-[var(--gm-foreground)]"
                            }`}
                            style={activeSection === section.id ? { '--section-accent': section.accent } as React.CSSProperties : undefined}
                          >
                            {section.label}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* Main Content Area */}
            <main className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8">

              {/* Quick Status Info */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-4 rounded-[24px] border border-white/[0.06] bg-[var(--gm-panel)]/78 p-3 shadow-[0_10px_32px_rgba(5,8,20,0.18)] backdrop-blur-xl sm:mb-6 sm:p-4"
              >
                <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] xl:items-center">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--gm-subtle)]">
                      {activeConfig.eyebrow}
                    </span>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--gm-subtle)]">{copy.moduleLabel}</span>
                      <span className="text-xs font-medium text-[var(--gm-foreground)]">{activeConfig.label}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--gm-subtle)]">{copy.filterLabel}</span>
                      <span className="text-xs font-medium text-[var(--gm-foreground)]">{companyFilter}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[10px] text-[var(--gm-subtle)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 status-pulse" />
                      {copy.liveUpdate}
                    </div>
                    {systemSnapshot ? (
                      <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[10px] text-[var(--gm-subtle)]">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="status-badge success text-[10px]">SQL</span>
                          {systemSnapshot.sql.configured
                            ? systemSnapshot.sql.serverTarget.split("\\").pop()
                            : "Local"}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users size={10} />
                          {systemSnapshot.users}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FileText size={10} />
                          {systemSnapshot.documents}
                        </span>
                      </div>
                    ) : null}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[10px] text-[var(--gm-subtle)]">
                      <BellDot size={10} />
                      {latestUpdates.length} updates
                    </div>
                  </div>

                  <div className="relative">
                    <Search
                      size={14}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]"
                    />
                    <input
                      id="main-search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="gm-input h-11 rounded-[18px] pl-9 pr-4 text-sm"
                      placeholder={copy.searchPlaceholder}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Live Updates & Quick Actions */}
              <div className="mb-4 grid gap-3 sm:mb-6 sm:gap-4 md:gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-[26px] border border-white/[0.06] bg-[linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.035))] p-4 shadow-[0_12px_36px_rgba(5,8,20,0.16)] backdrop-blur-xl sm:p-5"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <BellDot size={18} className="text-[var(--gm-foreground)]" />
                        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 status-pulse" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[var(--gm-subtle)] flex items-center gap-2">
                        <Activity size={10} className="opacity-60" />
                        {copy.liveUpdate}
                      </p>
                      <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 text-[var(--gm-muted)] line-clamp-2">
                        {latestUpdates[activeUpdateIndex] ?? copy.appSubtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 md:gap-4 xl:grid-cols-1 2xl:grid-cols-2">
                  <motion.button
                    type="button"
                    onClick={() => handleSectionChange("opportunities")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group rounded-[24px] border border-white/[0.06] bg-white/[0.05] px-4 py-3 text-left transition hover:border-white/16 hover:bg-white/[0.08] sm:px-5 sm:py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[var(--gm-subtle)] flex items-center gap-1.5">
                          <Briefcase size={10} className="opacity-60" />
                          {copy.quickAccess}
                        </p>
                        <p className="mt-2 sm:mt-3 text-sm sm:text-base font-medium text-[var(--gm-foreground)]">
                          {copy.opportunities}
                        </p>
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.1] transition">
                        <Sparkles size={14} className="text-[var(--gm-accent)]" />
                      </div>
                    </div>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => handleSectionChange("report")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group rounded-[24px] border border-white/[0.06] bg-white/[0.05] px-4 py-3 text-left transition hover:border-white/16 hover:bg-white/[0.08] sm:px-5 sm:py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[var(--gm-subtle)] flex items-center gap-1.5">
                          <ShieldCheck size={10} className="opacity-60" />
                          {copy.quickAction}
                        </p>
                        <p className="mt-2 sm:mt-3 text-sm sm:text-base font-medium text-[var(--gm-foreground)]">
                          {copy.submitIssue}
                        </p>
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.1] transition">
                        <Globe size={14} className="text-amber-400" />
                      </div>
                    </div>
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
            <footer className="mx-auto w-full max-w-[1920px] border-t border-white/[0.08] px-2 py-3 sm:px-3 md:px-5">
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
