"use client";

import { useState, type FormEvent } from "react";
import {
  EmptyMessage,
  FilterChip,
  GlassPanel,
  LinearMeter,
  RingMeter,
  SectionShell,
} from "@/components/platform/PlatformPrimitives";
import type {
  BenefitSlice,
  DocumentCategory,
  LibraryDocument,
  RepresentationNode,
  SectionConfig,
} from "@/data/platformData";
import { libraryCategories } from "@/data/platformData";

export type StoredIssue = {
  id: string;
  name: string;
  issueType: "Employment" | "Community exclusion" | "Procurement";
  description: string;
  fileName?: string;
  submittedAt: string;
};

export type UploadedDocument = LibraryDocument & {
  previewUrl?: string;
};

type ReportFormState = {
  name: string;
  issueType: "Employment" | "Community exclusion" | "Procurement";
  description: string;
  file: File | null;
};

type LibraryFormState = {
  title: string;
  category: DocumentCategory;
  description: string;
  file: File | null;
};

export function ReportSection({
  config,
  reportForm,
  onReportFieldChange,
  onReportFileChange,
  onReportSubmit,
  issues,
}: {
  config: SectionConfig;
  reportForm: ReportFormState;
  onReportFieldChange: (
    field: "name" | "issueType" | "description",
    value: string,
  ) => void;
  onReportFileChange: (file: File | null) => void;
  onReportSubmit: (event: FormEvent<HTMLFormElement>) => void;
  issues: StoredIssue[];
}) {
  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Report an issue"
      description="A neutral intake point for concerns around employment, exclusion, procurement, or related community experience. Records are kept locally for now and can later move into a backend workflow."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
            Submission form
          </p>
          <form className="mt-5 space-y-4" onSubmit={onReportSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm text-[var(--gm-muted)]">Name (optional)</span>
                <input
                  value={reportForm.name}
                  onChange={(event) => onReportFieldChange("name", event.target.value)}
                  className="gm-input"
                  placeholder="Anonymous is fine"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-[var(--gm-muted)]">Issue type</span>
                <select
                  value={reportForm.issueType}
                  onChange={(event) =>
                    onReportFieldChange("issueType", event.target.value)
                  }
                  className="gm-input"
                >
                  <option>Employment</option>
                  <option>Community exclusion</option>
                  <option>Procurement</option>
                </select>
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm text-[var(--gm-muted)]">Description</span>
              <textarea
                value={reportForm.description}
                onChange={(event) =>
                  onReportFieldChange("description", event.target.value)
                }
                className="gm-input min-h-[150px]"
                placeholder="Describe the issue, what happened, and what kind of follow-up would help."
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm text-[var(--gm-muted)]">Upload file</span>
              <input
                type="file"
                onChange={(event) =>
                  onReportFileChange(event.target.files?.[0] ?? null)
                }
                className="gm-input cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950"
              />
              <p className="text-xs text-[var(--gm-subtle)]">
                Local mock storage only at this stage.
              </p>
            </label>

            <button
              type="submit"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
            >
              Save report locally
            </button>
          </form>
        </GlassPanel>

        <div className="grid gap-5">
          <GlassPanel>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              Reporting standard
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-[var(--gm-muted)]">
                Keep descriptions factual and time-bound.
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-[var(--gm-muted)]">
                Upload supporting files where possible.
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-[var(--gm-muted)]">
                Records stay local for now and can later move into a formal review flow.
              </div>
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              Recent local submissions
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {issues.length === 0 ? (
                <div className="md:col-span-2">
                  <EmptyMessage
                    title="No issues saved yet."
                    detail="Once a report is submitted, it will appear here as a local record."
                  />
                </div>
              ) : (
                issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-base font-medium text-[var(--gm-foreground)]">
                        {issue.issueType}
                      </p>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--gm-subtle)]">
                        {issue.submittedAt}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--gm-muted)]">
                      {issue.name || "Anonymous"}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">
                      {issue.description}
                    </p>
                    {issue.fileName ? (
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
                        Attachment: {issue.fileName}
                      </p>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </GlassPanel>
        </div>
      </div>
    </SectionShell>
  );
}

export function DocumentsSection({
  config,
  documents,
  libraryForm,
  onLibraryFieldChange,
  onLibraryFileChange,
  onLibrarySubmit,
}: {
  config: SectionConfig;
  documents: UploadedDocument[];
  libraryForm: LibraryFormState;
  onLibraryFieldChange: (
    field: "title" | "category" | "description",
    value: string,
  ) => void;
  onLibraryFileChange: (file: File | null) => void;
  onLibrarySubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | "All">("All");

  const visibleDocuments =
    activeCategory === "All"
      ? documents
      : documents.filter((item) => item.category === activeCategory);

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Document library"
      description="The library is categorized for PAIA requests, mining records, SLP documents, and community letters. Upload support is ready and local preview links work for the current session."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
      actions={
        <>
          <FilterChip
            active={activeCategory === "All"}
            label="All"
            onClick={() => setActiveCategory("All")}
          />
          {libraryCategories.map((category) => (
            <FilterChip
              key={category}
              active={activeCategory === category}
              label={category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {visibleDocuments.length === 0 ? (
            <div className="md:col-span-2 2xl:col-span-3">
              <EmptyMessage
                title="No documents match this category."
                detail="Switch categories or upload a file into the library."
              />
            </div>
          ) : (
            visibleDocuments.map((document) => (
              <GlassPanel key={document.id} className="flex h-full flex-col">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  {document.category}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--gm-foreground)]">
                  {document.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--gm-muted)]">
                  {document.description}
                </p>
                <div className="mt-5 grid gap-2 text-sm text-[var(--gm-muted)]">
                  <p>Date: {document.date}</p>
                  <p>Source: {document.source}</p>
                </div>
                <div className="mt-auto flex gap-3 pt-5">
                  {document.previewUrl || document.href ? (
                    <a
                      href={document.previewUrl ?? document.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
                    >
                      Preview
                    </a>
                  ) : null}
                  {document.previewUrl || document.href ? (
                    <a
                      href={document.previewUrl ?? document.href}
                      download
                      className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--gm-subtle)]">
                      Awaiting file
                    </span>
                  )}
                </div>
              </GlassPanel>
            ))
          )}
        </div>

        <GlassPanel>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
            Upload to library
          </p>
          <form className="mt-5 space-y-4" onSubmit={onLibrarySubmit}>
            <label className="space-y-2">
              <span className="text-sm text-[var(--gm-muted)]">Title</span>
              <input
                value={libraryForm.title}
                onChange={(event) =>
                  onLibraryFieldChange("title", event.target.value)
                }
                className="gm-input"
                placeholder="Document title"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-[var(--gm-muted)]">Category</span>
              <select
                value={libraryForm.category}
                onChange={(event) =>
                  onLibraryFieldChange("category", event.target.value)
                }
                className="gm-input"
              >
                {libraryCategories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm text-[var(--gm-muted)]">Description</span>
              <textarea
                value={libraryForm.description}
                onChange={(event) =>
                  onLibraryFieldChange("description", event.target.value)
                }
                className="gm-input min-h-[140px]"
                placeholder="What is this file and why does it matter?"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-[var(--gm-muted)]">File</span>
              <input
                type="file"
                onChange={(event) =>
                  onLibraryFileChange(event.target.files?.[0] ?? null)
                }
                className="gm-input cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
            >
              Add document locally
            </button>
          </form>
        </GlassPanel>
      </div>
    </SectionShell>
  );
}

export function RepresentationSection({
  config,
  nodes,
}: {
  config: SectionConfig;
  nodes: RepresentationNode[];
}) {
  const toneMap: Record<RepresentationNode["type"], string> = {
    known: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
    engagement: "border-sky-300/20 bg-sky-400/10 text-sky-100",
    gap: "border-amber-300/20 bg-amber-400/10 text-amber-100",
  };

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Community representation tracker"
      description="This module highlights the known structure, the engagement layer where mines and stakeholders meet the community, and the youth representation gap that still needs attention."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
            Organizational view
          </p>
          <div className="mt-6 grid gap-4">
            {nodes.map((node, index) => (
              <div key={node.id} className="relative">
                {index < nodes.length - 1 ? (
                  <div className="absolute left-7 top-16 h-10 w-px bg-white/10" />
                ) : null}
                <div
                  className={`rounded-[24px] border p-5 ${toneMap[node.type]}`}
                >
                  <p className="text-lg font-medium tracking-[-0.03em]">
                    {node.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 opacity-80">{node.note}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="grid gap-5">
          <RingMeter
            label="Visible youth representation"
            value={32}
            accent="#f59e0b"
            summary="A deliberate low score to reflect that youth inclusion remains a strategic concern across land, jobs, and governance discussions."
          />
          <GlassPanel>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              Why this tracker matters
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-[var(--gm-muted)]">
                Representation affects how community consent, engagement, and benefit discussions are understood.
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-[var(--gm-muted)]">
                Youth visibility is not a cosmetic issue; it shapes trust, opportunity flow, and future leadership.
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-[var(--gm-muted)]">
                A structured tracker can later add meeting records, stakeholder names, and election or nomination evidence.
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </SectionShell>
  );
}

export function BenefitsSection({
  config,
  slices,
}: {
  config: SectionConfig;
  slices: BenefitSlice[];
}) {
  const total = slices.reduce((sum, item) => sum + item.value, 0);
  const stops: string[] = [];
  let cursor = 0;
  const colors = ["#d14a28", "#38bdf8", "#34d399", "#f59e0b"];

  slices.forEach((slice, index) => {
    const start = (cursor / total) * 360;
    cursor += slice.value;
    const end = (cursor / total) * 360;
    stops.push(`${colors[index]} ${start}deg ${end}deg`);
  });

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Who benefits?"
      description="This strategic view shows how value may be distributed across companies, government, community, and still-unclear channels. It is meant to drive questions, not overclaim precision."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
        <GlassPanel className="flex flex-col items-center justify-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
            Distribution view
          </p>
          <div
            className="mt-6 grid h-64 w-64 place-items-center rounded-full"
            style={{ background: `conic-gradient(${stops.join(",")})` }}
          >
            <div className="grid h-40 w-40 place-items-center rounded-full bg-[var(--gm-panel-strong)] text-center">
              <div>
                <p className="text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">
                  {total}%
                </p>
                <p className="mt-2 text-sm text-[var(--gm-muted)]">
                  strategic view
                </p>
              </div>
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
          {slices.map((slice, index) => (
            <LinearMeter
              key={slice.label}
              label={slice.label}
              value={slice.value}
              summary={slice.summary}
              accent={colors[index]}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
