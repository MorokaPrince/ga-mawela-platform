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
  farmsData,
  pressureMetrics,
  royalLineage,
  type CompanyFilter,
  type DocumentCategory,
  type ResearchSource,
  type SectionId,
} from "@/data/platformData";
import { platformCopy, type PlatformLocale } from "@/lib/platform-i18n";
import { GaMawelaMap } from "./MapComponent";
import { EvidenceLibrary } from "./EvidenceLibrary";
import { PressureDashboard } from "./PressureDashboard";
import { RoyalAuthorityRegistry } from "./RoyalAuthorityRegistry";

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
          <h1 className="gm-display mt-5 text-4xl font-semibold text-white md:text-6xl">
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
              className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,transparent,#c7a56d,#ffffff)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FarmDetailPanel({
  farm,
  onClose,
}: {
  farm: any;
  onClose: () => void;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-[var(--gm-foreground)]">
              {farm.name}
            </h3>
            <span
              className={`gm-badge ${
                farm.community_status === "Confirmed"
                  ? "gm-badge-success"
                  : farm.community_status === "Disputed"
                  ? "gm-badge-warning"
                  : "gm-badge-critical"
              }`}
            >
              {farm.community_status}
            </span>
          </div>
          <p className="text-sm text-[var(--gm-muted)]">{farm.code}</p>
        </div>
        <button
          onClick={onClose}
          className="gm-btn-secondary p-2"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[var(--gm-muted)]">
        {farm.description}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="gm-row">
          <p className="text-xs uppercase tracking-wider text-[var(--gm-muted)]">
            Ownership
          </p>
          <p className="mt-1 font-medium text-[var(--gm-foreground)]">
            {farm.ownership_type}
          </p>
        </div>
        <div className="gm-row">
          <p className="text-xs uppercase tracking-wider text-[var(--gm-muted)]">
            Portions
          </p>
          <p className="mt-1 font-medium text-[var(--gm-foreground)]">
            {farm.portions.length}
          </p>
        </div>
      </div>

      {farm.mining_rights.length > 0 && (
        <div className="mt-4">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gm-muted)]">
            <Database size={14} />
            Mining Rights
          </h4>
          <div className="space-y-2">
            {farm.mining_rights.map((mr: any) => (
              <div
                key={mr.id}
                className="rounded-lg border border-[var(--gm-border)] bg-[var(--gm-earth-dark)] p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[var(--gm-foreground)]">
                    {mr.company}
                  </span>
                  <span
                    className={`gm-badge ${
                      mr.status === "Active"
                        ? "gm-badge-warning"
                        : "gm-badge-critical"
                    }`}
                  >
                    {mr.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--gm-muted)]">
                  {mr.type} - {mr.commodity}
                  {mr.slpLinked && (
                    <span className="ml-2 text-amber-400">• SLP Linked</span>
                  )}
                </p>
                {mr.environmentalImpact && (
                  <p className="mt-1 text-xs text-red-400">
                    Impact: {mr.environmentalImpact}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {farm.sgDiagramUrl && (
        <div className="mt-4">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gm-muted)]">
            <FileSignature size={14} />
            Surveyor General Diagram
          </h4>
          <a
            href={farm.sgDiagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gm-btn-secondary inline-flex items-center gap-2"
          >
            <FileText size={14} />
            View SG Diagram
          </a>
        </div>
      )}
    </div>
  );
}

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
      case "evidence":
        return (
          <EvidenceLibrary
            documents={[...uploadedDocuments, ...baseDocuments.map(d => ({ ...d, farmIds: [], miningCompanyIds: [], legalRelevance: "Medium", tags: [], uploadedBy: "system", uploadDate: d.date, category: d.category as any }))]}
            onViewDocument={(doc) => {
              window.open(doc.href, "_blank");
            }}
            onDownloadDocument={(doc) => {
              window.open(doc.href, "_blank");
            }}
          />
        );
      case "claims":
        return (
          <div className="space-y-6">
            <div className="gm-panel rounded-[28px] p-5 sm:p-6">
              <h3 className="text-xl font-bold tracking-tight text-[var(--gm-foreground)]">
                Interactive Land Claim Map
              </h3>
              <p className="mt-2 text-sm text-[var(--gm-muted)]">
                Visualize Ga-Mawela farm boundaries, mining overlays, and community claims. Click farms to view details.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={mapLayers.farms}
                    onChange={() => toggleMapLayer("farms")}
                    className="accent-[var(--gm-primary)]"
                  />
                  <span className="text-sm">Farm Boundaries</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={mapLayers.mining}
                    onChange={() => toggleMapLayer("mining")}
                    className="accent-[var(--gm-primary)]"
                  />
                  <span className="text-sm">Mining Operations</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={mapLayers.claims}
                    onChange={() => toggleMapLayer("claims")}
                    className="accent-[var(--gm-primary)]"
                  />
                  <span className="text-sm">Community Claims</span>
                </label>
              </div>
            </div>
            <GaMawelaMap
              farms={farmsData}
              claims={communityClaims}
              miningRights={farmsData.flatMap(f => f.mining_rights)}
              selectedFarmId={selectedFarmId}
              onFarmSelect={setSelectedFarmId}
              visibleLayers={mapLayers}
              onLayerToggle={toggleMapLayer}
            />
            {selectedFarmId && (
              <div className="gm-panel rounded-[28px] p-5 sm:p-6">
                <FarmDetailPanel
                  farm={farmsData.find(f => f.id === selectedFarmId)!}
                  onClose={() => setSelectedFarmId(null)}
                />
              </div>
            )}
          </div>
        );
      case "lineage":
        return (
          <RoyalAuthorityRegistry lineage={royalLineage} />
        );
      case "pressure":
        return (
          <PressureDashboard metrics={pressureMetrics} />
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
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(199,165,109,0.14),transparent_32%),radial-gradient(circle_at_82%_26%,rgba(123,147,163,0.12),transparent_28%),linear-gradient(180deg,var(--gm-background)_0%,var(--gm-background-strong)_100%)]" />
      <div className="pointer-events-none fixed inset-0 gm-grid-overlay opacity-35 -z-10" />
      <div className="pointer-events-none fixed inset-0 gm-noise-overlay opacity-20 -z-10" />
      {/* Top fade for seamless header */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--gm-background)] to-transparent opacity-60 -z-5" />

      {/* 80% Viewport Container - Full Width for Proper Device Fit */}
      <div className="min-h-screen w-full flex items-start justify-center px-2 py-2 sm:px-3 sm:py-3 md:px-4 lg:px-6">
        <div className="w-full max-w-[1920px]">

          <div className="relative min-h-screen">
            {/* Enhanced Professional Header with Stacked Layout */}
            <header className="gm-shell-card sticky top-0 z-40 overflow-hidden rounded-[34px] bg-[var(--gm-panel-header)]/90">
              <div className="mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-6">
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 sm:py-5">
                  <Link href="/" className="group flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_16px_30px_rgba(2,8,14,0.18)] sm:h-14 sm:w-14">
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
                      <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--gm-subtle)]">
                        Limpopo, South Africa
                      </p>
                      <h1 className="gm-display truncate pt-1 text-sm font-semibold text-[var(--gm-foreground)] sm:text-[1.1rem] md:text-[1.35rem]">
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
                        className="gm-toolbar-btn h-9 w-[76px] appearance-none pl-8 pr-6 text-[11px] font-semibold sm:w-[82px] sm:text-xs"
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
                      className="gm-toolbar-btn h-9 w-9"
                      title={theme === "dark" ? copy.lightMode : copy.darkMode}
                    >
                      {theme === "dark" ? <SunMedium size={14} /> : <MoonStar size={14} />}
                    </button>

                    {viewer ? (
                      <div className="flex items-center gap-2">
                        <Link
                          href={viewer.role === "admin" ? "/admin/dashboard" : "/member/dashboard"}
                          className="gm-toolbar-btn h-9 px-3 text-xs font-semibold"
                        >
                          <LayoutDashboard size={13} />
                          <span className="hidden lg:inline">{copy.dashboard}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => void handleLogout()}
                          className="gm-toolbar-btn hidden h-9 px-3 text-xs font-semibold sm:flex"
                        >
                          {copy.signOut}
                        </button>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className="gm-toolbar-btn h-9 px-3 text-xs font-semibold"
                      >
                        <Users size={13} />
                        <span className="hidden sm:inline">{copy.signIn}</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className="gm-toolbar-btn h-9 w-9 md:hidden"
                    >
                      {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
                    </button>
                  </div>
                </div>

                <div className="hidden border-t border-white/[0.06] py-3 md:flex md:items-center md:gap-3">
                  <nav className="gm-top-tabs flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1">
                    {localizedSectionConfigs.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => handleSectionChange(section.id)}
                        className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition sm:px-4 sm:text-xs ${
                          activeSection === section.id
                            ? "border border-white/10 bg-white/[0.08] text-[var(--gm-accent)]"
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
                  <div className="gm-data-pill hidden text-[11px] text-[var(--gm-subtle)] xl:flex">
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
                            className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                              activeSection === section.id
                                ? "border border-white/10 bg-white/[0.08] text-[var(--gm-accent)]"
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
            <main className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8">

              {/* Quick Status Info */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="gm-panel mb-5 rounded-[28px] p-4 sm:mb-6 sm:p-5"
              >
                <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] xl:items-center">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="gm-data-pill text-[10px] uppercase tracking-[0.18em] text-[var(--gm-subtle)]">
                      {activeConfig.eyebrow}
                    </span>
                    <div className="gm-data-pill">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--gm-subtle)]">{copy.moduleLabel}</span>
                      <span className="text-xs font-medium text-[var(--gm-foreground)]">{activeConfig.label}</span>
                    </div>
                    <div className="gm-data-pill">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--gm-subtle)]">{copy.filterLabel}</span>
                      <span className="text-xs font-medium text-[var(--gm-foreground)]">{companyFilter}</span>
                    </div>
                    <div className="gm-data-pill text-[10px] text-[var(--gm-subtle)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 status-pulse" />
                      {copy.liveUpdate}
                    </div>
                    {systemSnapshot ? (
                      <div className="gm-data-pill text-[10px] text-[var(--gm-subtle)]">
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
                    <div className="gm-data-pill text-[10px] text-[var(--gm-subtle)]">
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
                  className="gm-panel rounded-[28px] p-4 sm:p-5"
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
                    className="gm-panel group rounded-[24px] px-4 py-3 text-left sm:px-5 sm:py-4"
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
                    className="gm-panel group rounded-[24px] px-4 py-3 text-left sm:px-5 sm:py-4"
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
            <footer className="mx-auto mt-2 w-full max-w-[1920px] border-t border-white/[0.08] px-2 py-4 sm:px-3 md:px-5">
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_16px_28px_rgba(2,8,14,0.16)] sm:h-12 sm:w-12">
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
                  <span className="text-xs text-[var(--gm-subtle)]">Copyright {new Date().getFullYear()} Ga-Mawela</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
