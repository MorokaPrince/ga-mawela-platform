"use client";

import type { FormEvent } from "react";
import {
  DonutChart,
  EmptyMessage,
  GaugeMeter,
  GlassPanel,
  LinearMeter,
  RingMeter,
  SectionShell,
  StatusBadge,
} from "@/components/platform/PlatformPrimitives";
import type {
  OpportunityCard,
  SectionConfig,
  TransparencyMatrixRow,
  TransparencySignal,
} from "@/data/platformData";
import {
  applicationSteps,
  communityVoices,
  concernCards,
  governanceCards,
  legalReferences,
  timelineEvents,
} from "@/data/platformData";

export function CommunitySection({ config }: { config: SectionConfig }) {
  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Community, land, and governance"
      description="This page explains the land parcel, the CPA governance frame, the youth exclusion concern, and the legal references needed to keep the conversation grounded."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.05fr_0.95fr]">
        <GlassPanel>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                Core context
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--gm-foreground)]">
                Land first, mining corridor second
              </h3>
            </div>
            <StatusBadge status="Placeholder" />
          </div>

          <p className="mt-5 text-sm leading-7 text-[var(--gm-muted)]">
            The platform distinguishes between land identity and mining operations. St George 2 JT should be read as
            a land parcel tied to governance, family history, and representation, while nearby mines and projects sit
            within a broader corridor that affects the community.
          </p>

          <div className="mt-6 grid gap-3">
            {governanceCards.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5"
              >
                <p className="text-base font-medium text-[var(--gm-foreground)]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
            Timeline
          </p>
          <div className="mt-6 space-y-5">
            {timelineEvents.map((item, index) => (
              <div key={item.title} className="grid gap-4 md:grid-cols-[120px_1fr]">
                <div className="relative">
                  <div className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
                    {item.year}
                  </div>
                  {index < timelineEvents.length - 1 ? (
                    <div className="absolute left-5 top-10 h-[calc(100%+20px)] w-px bg-white/10" />
                  ) : null}
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-base font-medium text-[var(--gm-foreground)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="grid gap-5">
          {legalReferences.map((item) => (
            <GlassPanel key={item.title}>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                Legal reference
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--gm-foreground)]">
                {item.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--gm-muted)]">{item.description}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--gm-muted)]">
                <span className="font-medium text-[var(--gm-foreground)]">Why it matters:</span>{" "}
                {item.focus}
              </p>
            </GlassPanel>
          ))}

          <GlassPanel>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              Reading guide
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--gm-muted)]">
              Keep the narrative ordered like this: land parcel first, governance structures second, mining corridor third, then legal and engagement questions.
            </p>
          </GlassPanel>
        </div>
      </div>
    </SectionShell>
  );
}

export function OpportunitiesSection({
  config,
  cards,
}: {
  config: SectionConfig;
  cards: OpportunityCard[];
}) {
  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Opportunities hub"
      description="Jobs, learnerships, bursaries, and supplier registration are packaged in one place with practical guidance on how to apply."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((item) => (
            <GlassPanel key={item.id} className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                    {item.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--gm-foreground)]">
                    {item.title}
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs text-[var(--gm-subtle)]">
                  {item.status}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--gm-foreground)]">{item.owner}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--gm-muted)]">{item.summary}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--gm-muted)]">
                <span className="font-medium text-[var(--gm-foreground)]">How to apply:</span>{" "}
                {item.howToApply}
              </p>
              <div className="mt-auto pt-5">
                <a
                  href={item.href}
                  className="inline-flex rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/[0.12]"
                >
                  Open guide
                </a>
              </div>
            </GlassPanel>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <GlassPanel>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              Application checklist
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {applicationSteps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4"
                >
                  <p className="text-sm font-medium text-[var(--gm-foreground)]">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">{step}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
            <GlassPanel>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                CV upload placeholder
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--gm-muted)]">
                Backend integration can later turn this card into a resident CV bank or profile intake. The front-end is
                already structured for that future handoff.
              </p>
              <div className="mt-5 rounded-[22px] border border-dashed border-white/15 bg-white/[0.04] p-5 text-sm text-[var(--gm-muted)]">
                CV intake module placeholder
              </div>
            </GlassPanel>

            <GlassPanel>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                Access principle
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--gm-muted)]">
                Opportunity notices should be easy to find, easy to understand, and visible before deadlines close.
              </p>
            </GlassPanel>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function TransparencySection({
  config,
  signals,
  matrixRows,
  comments,
  commentForm,
  onCommentFieldChange,
  onCommentSubmit,
  copy,
}: {
  config: SectionConfig;
  signals: TransparencySignal[];
  matrixRows: TransparencyMatrixRow[];
  comments: Array<{
    id: string;
    name: string;
    message: string;
    submittedAt: string;
  }>;
  commentForm: {
    name: string;
    message: string;
  };
  onCommentFieldChange: (field: "name" | "message", value: string) => void;
  onCommentSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  copy: {
    title: string;
    description: string;
    matrixTitle: string;
    matrixDescription: string;
    chartOverview: string;
    commentTitle: string;
    commentPrompt: string;
    commentName: string;
    commentMessage: string;
    commentButton: string;
    commentEmptyTitle: string;
    commentEmptyDetail: string;
  };
}) {
  const disclosureAverage = Math.round(
    matrixRows.reduce((sum, row) => sum + row.disclosure, 0) / matrixRows.length,
  );
  const deliveryAverage = Math.round(
    matrixRows.reduce((sum, row) => sum + row.delivery, 0) / matrixRows.length,
  );
  const youthAverage = Math.round(
    matrixRows.reduce((sum, row) => sum + row.youthAccess, 0) / matrixRows.length,
  );

  const statusSlices = [
    {
      label: "Visible",
      value: matrixRows.filter((row) => row.status === "Visible").length,
      accent: "#34d399",
    },
    {
      label: "Partial",
      value: matrixRows.filter((row) => row.status === "Partial").length,
      accent: "#f59e0b",
    },
    {
      label: "Weak",
      value: matrixRows.filter((row) => row.status === "Weak").length,
      accent: "#f43f5e",
    },
  ];

  const riskSlices = [
    {
      label: "Low risk",
      value: matrixRows.filter((row) => row.risk === "Low").length,
      accent: "#34d399",
    },
    {
      label: "Medium risk",
      value: matrixRows.filter((row) => row.risk === "Medium").length,
      accent: "#38bdf8",
    },
    {
      label: "High risk",
      value: matrixRows.filter((row) => row.risk === "High").length,
      accent: "#f97316",
    },
  ];

  const riskTone: Record<TransparencyMatrixRow["risk"], string> = {
    Low: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
    Medium: "border-sky-300/20 bg-sky-400/10 text-sky-100",
    High: "border-orange-300/20 bg-orange-400/10 text-orange-100",
  };

  const statusTone: Record<TransparencyMatrixRow["status"], string> = {
    Visible: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
    Partial: "border-amber-300/20 bg-amber-400/10 text-amber-100",
    Weak: "border-rose-300/20 bg-rose-400/10 text-rose-100",
  };

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title={copy.title}
      description={copy.description}
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-5">
        <GlassPanel>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                {copy.matrixTitle}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--gm-muted)]">
                {copy.matrixDescription}
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-[var(--gm-muted)]">
              {matrixRows.length} monitored rows
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-[24px] border border-white/10">
            <div className="hidden grid-cols-[1.2fr_1.1fr_120px_120px_120px_120px_120px] gap-3 border-b border-white/10 bg-white/[0.08] px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)] xl:grid">
              <span>Theme</span>
              <span>Owner</span>
              <span>Disclosure</span>
              <span>Delivery</span>
              <span>Youth</span>
              <span>Risk</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-white/[0.08]">
              {matrixRows.map((row) => (
                <div
                  key={row.id}
                  className="grid gap-4 bg-white/[0.02] px-5 py-4 xl:grid-cols-[1.2fr_1.1fr_120px_120px_120px_120px_120px]"
                >
                  <div>
                    <p className="text-base font-medium text-[var(--gm-foreground)]">
                      {row.theme}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                      {row.note}
                    </p>
                  </div>
                  <div className="text-sm leading-6 text-[var(--gm-muted)]">{row.owner}</div>
                  <div className="rounded-[18px] border border-white/10 bg-white/[0.05] px-3 py-3 text-sm text-[var(--gm-foreground)]">
                    {row.disclosure}%
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-white/[0.05] px-3 py-3 text-sm text-[var(--gm-foreground)]">
                    {row.delivery}%
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-white/[0.05] px-3 py-3 text-sm text-[var(--gm-foreground)]">
                    {row.youthAccess}%
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs ${riskTone[row.risk]}`}>
                      {row.risk}
                    </span>
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs ${statusTone[row.status]}`}>
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-5">
            <GlassPanel>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                {copy.chartOverview}
              </p>
              <div className="mt-5 space-y-4">
                {signals.map((signal, index) => (
                  <LinearMeter
                    key={signal.title}
                    label={signal.title}
                    value={signal.value}
                    summary={signal.summary}
                    accent={index === 0 ? "#d14a28" : index === 1 ? "#f97316" : "#38bdf8"}
                  />
                ))}
              </div>
            </GlassPanel>

            <div className="grid gap-5 lg:grid-cols-2">
              <GaugeMeter
                label="Disclosure maturity"
                value={Math.round((disclosureAverage + deliveryAverage) / 2)}
                accent="#d14a28"
                summary="Composite reading of disclosure quality and visible delivery across the monitored categories."
              />
              <GaugeMeter
                label="Youth access visibility"
                value={youthAverage}
                accent="#38bdf8"
                summary="How legible the corridor currently is for youth looking for jobs, training, procurement, and representation entry points."
              />
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <DonutChart
                label="Status mix"
                centerLabel={`${statusSlices[0].value}/${matrixRows.length}`}
                summary="A quick read of how many monitored areas are currently visible, partial, or weak."
                slices={statusSlices}
              />
              <DonutChart
                label="Risk distribution"
                centerLabel={`${riskSlices[2].value}`}
                summary="Risk signals point to where disclosure gaps and delivery uncertainty create the strongest community pressure."
                slices={riskSlices}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {concernCards.map((card) => (
                <GlassPanel key={card.title}>
                  <p className="text-base font-medium text-[var(--gm-foreground)]">
                    {card.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">
                    {card.summary}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <RingMeter
              label="Current disclosure maturity"
              value={Math.round((disclosureAverage + deliveryAverage) / 2)}
              accent="#d14a28"
              summary="A working score showing that the platform can structure accountability even where records and source trails are still incomplete."
            />

            <GlassPanel>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                Community voice summaries
              </p>
              <div className="mt-5 space-y-3">
                {communityVoices.map((voice) => (
                  <div
                    key={voice}
                    className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-[var(--gm-muted)]"
                  >
                    {voice}
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                    {copy.commentTitle}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                    {copy.commentPrompt}
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--gm-muted)]">
                  {comments.length} comments
                </div>
              </div>

              <form className="mt-5 grid gap-4" onSubmit={onCommentSubmit}>
                <label className="space-y-2">
                  <span className="text-sm text-[var(--gm-muted)]">{copy.commentName}</span>
                  <input
                    value={commentForm.name}
                    onChange={(event) => onCommentFieldChange("name", event.target.value)}
                    className="gm-input"
                    placeholder="Anonymous is fine"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm text-[var(--gm-muted)]">{copy.commentMessage}</span>
                  <textarea
                    value={commentForm.message}
                    onChange={(event) => onCommentFieldChange("message", event.target.value)}
                    className="gm-input min-h-[120px]"
                    placeholder="Share an observation on transparency, access, notices, roads, or participation."
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
                >
                  {copy.commentButton}
                </button>
              </form>

              <div className="mt-5 grid gap-3">
                {comments.length === 0 ? (
                  <EmptyMessage
                    title={copy.commentEmptyTitle}
                    detail={copy.commentEmptyDetail}
                  />
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-base font-medium text-[var(--gm-foreground)]">
                          {comment.name || "Anonymous"}
                        </p>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--gm-subtle)]">
                          {comment.submittedAt}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">
                        {comment.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
