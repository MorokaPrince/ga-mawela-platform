"use client";

import { motion } from "framer-motion";
import {
  EmptyMessage,
  FilterChip,
  GlassPanel,
  SectionShell,
  StatCard,
  StatusBadge,
} from "@/components/platform/PlatformPrimitives";
import type {
  CompanyFilter,
  MinePoint,
  SectionConfig,
  SectionId,
  SlpCommitment,
} from "@/data/platformData";
import { quickStats, updates } from "@/data/platformData";

function getTypeTone(type: MinePoint["type"]) {
  switch (type) {
    case "land parcel":
      return "bg-amber-400/15 text-amber-100 ring-amber-300/20";
    case "processing hub":
      return "bg-fuchsia-400/15 text-fuchsia-100 ring-fuchsia-300/20";
    case "project":
      return "bg-sky-400/15 text-sky-100 ring-sky-300/20";
    default:
      return "bg-emerald-400/15 text-emerald-100 ring-emerald-300/20";
  }
}

function getNodePalette(point: MinePoint) {
  if (point.type === "land parcel") {
    return "border-amber-300 bg-amber-200 shadow-[0_0_0_10px_rgba(251,191,36,0.1)]";
  }

  if (point.companyFilter === "Glencore") {
    return "border-sky-300 bg-sky-200 shadow-[0_0_0_10px_rgba(125,211,252,0.08)]";
  }

  if (point.companyFilter === "Anglo American Platinum") {
    return "border-violet-300 bg-violet-200 shadow-[0_0_0_10px_rgba(196,181,253,0.08)]";
  }

  return "border-emerald-300 bg-emerald-200 shadow-[0_0_0_10px_rgba(110,231,183,0.08)]";
}

function CorridorMap({
  points,
  selectedMineId,
  onSelectMine,
}: {
  points: MinePoint[];
  selectedMineId: string;
  onSelectMine: (id: string) => void;
}) {
  return (
    <GlassPanel className="relative min-h-[420px] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_40%),linear-gradient(180deg,rgba(16,23,46,0.18),rgba(16,23,46,0.5))]" />
      <div className="relative h-[420px] rounded-[22px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(8,12,28,0.2),rgba(8,12,28,0.68))]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full opacity-60"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="corridor-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="60%" stopColor="rgba(209,74,40,0.5)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>
          </defs>
          <path
            d="M10 55 C18 48, 24 50, 31 46 S46 28, 57 35 S74 56, 91 31"
            fill="none"
            stroke="url(#corridor-line)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="1.2 2.6"
          />
          <path
            d="M17 70 C29 74, 46 77, 63 73 S84 64, 90 38"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/[0.55] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[var(--gm-subtle)]">
          Corridor schematic
        </div>

        {points.map((point) => {
          const isSelected = selectedMineId === point.id;
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => onSelectMine(point.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <motion.span
                whileHover={{ scale: 1.08 }}
                className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 transition duration-300 ${getNodePalette(
                  point,
                )} ${isSelected ? "scale-125" : ""}`}
              >
                <span className="absolute h-full w-full animate-ping rounded-full bg-white/20" />
              </motion.span>
              <span
                className={`mt-3 inline-flex max-w-[11rem] rounded-full border px-3 py-1 text-xs ring-1 backdrop-blur ${
                  isSelected
                    ? "border-white/20 bg-white text-slate-950 ring-white/20"
                    : "border-white/10 bg-slate-950/70 text-white/80 ring-white/10"
                }`}
              >
                {point.name}
              </span>
            </button>
          );
        })}
      </div>
    </GlassPanel>
  );
}

export function HomeSection({
  config,
  points,
  selectedMine,
  onSelectMine,
  onSectionChange,
}: {
  config: SectionConfig;
  points: MinePoint[];
  selectedMine: MinePoint;
  onSelectMine: (id: string) => void;
  onSectionChange: (id: SectionId) => void;
}) {
  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Ga-Mawela Mining & Community Platform"
      description="A high-end community intelligence system for transparency, land awareness, SLP tracking, and opportunity access around St George 2 JT and the wider Limpopo mining corridor."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
      actions={
        <>
          <button
            type="button"
            onClick={() => onSectionChange("mines")}
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
          >
            Explore Mines
          </button>
          <button
            type="button"
            onClick={() => onSectionChange("opportunities")}
            className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-medium text-[var(--gm-foreground)] transition hover:bg-white/10"
          >
            Opportunities
          </button>
          <button
            type="button"
            onClick={() => onSectionChange("transparency")}
            className="rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-medium text-[var(--gm-foreground)] transition hover:border-white/25 hover:bg-white/10"
          >
            Community Issues
          </button>
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.95fr]">
        <GlassPanel className="relative overflow-hidden p-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(209,74,40,0.35),transparent_36%),linear-gradient(135deg,rgba(7,11,24,0.14),rgba(7,11,24,0.66))]" />
          <div className="relative grid gap-5 p-5 lg:grid-cols-[1.1fr_0.9fr] lg:p-7">
            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
                  Priority clarification
                </div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[var(--gm-foreground)] md:text-5xl">
                  St George 2 JT is land.
                </h3>
                <p className="mt-4 max-w-xl text-base leading-8 text-[var(--gm-muted)]">
                  It sits inside a broader mining corridor and should be explained as a land parcel linked to governance,
                  restitution, representation, and opportunity debates, not as a mine in itself.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <GlassPanel className="rounded-[24px] bg-white/[0.07]">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                    Key focus
                  </p>
                  <p className="mt-3 text-lg font-medium text-[var(--gm-foreground)]">
                    Community intelligence, SLP transparency, and youth access
                  </p>
                </GlassPanel>
                <GlassPanel className="rounded-[24px] bg-white/[0.07]">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                    Design mode
                  </p>
                  <p className="mt-3 text-lg font-medium text-[var(--gm-foreground)]">
                    Editorial portal meets living dashboard
                  </p>
                </GlassPanel>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/40 shadow-[0_30px_80px_rgba(2,6,23,0.4)]">
              <video
                className="h-full min-h-[340px] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/platform/media/two-rivers-entry.png"
              >
                <source src="/platform/media/hero-de-brochen.mp4" type="video/mp4" />
              </video>

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.7))]" />

              <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/[0.55] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/70 backdrop-blur">
                Live corridor reel
              </div>

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-2">
                <GlassPanel className="rounded-[22px] bg-slate-950/50 p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                    Selected node
                  </p>
                  <p className="mt-2 text-lg font-medium text-white">{selectedMine.name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">{selectedMine.description}</p>
                </GlassPanel>
                <GlassPanel className="rounded-[22px] bg-slate-950/50 p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                    Community impact
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{selectedMine.communityImpact}</p>
                </GlassPanel>
              </div>
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-5">
          <GlassPanel className="overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  Intelligence preview
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--gm-foreground)]">
                  Corridor map preview
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onSectionChange("mines")}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
              >
                Full map
              </button>
            </div>
            <div className="mt-5">
              <CorridorMap
                points={points}
                selectedMineId={selectedMine.id}
                onSelectMine={onSelectMine}
              />
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              Current updates
            </p>
            <div className="mt-5 grid gap-4">
              {updates.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4"
                >
                  <p className="text-base font-medium text-[var(--gm-foreground)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            note={stat.note}
          />
        ))}
      </div>
    </SectionShell>
  );
}

export function MinesSection({
  config,
  filteredPoints,
  selectedMine,
  selectedMineId,
  onSelectMine,
  companyFilter,
  onCompanyFilterChange,
  filters,
}: {
  config: SectionConfig;
  filteredPoints: MinePoint[];
  selectedMine: MinePoint;
  selectedMineId: string;
  onSelectMine: (id: string) => void;
  companyFilter: CompanyFilter;
  onCompanyFilterChange: (filter: CompanyFilter) => void;
  filters: CompanyFilter[];
}) {
  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Mines & operations in the Ga-Mawela corridor"
      description="Pins cover ECM mines, Anglo American Platinum assets, regional mines, and the Lion Smelter. St George 2 JT is shown separately so the land parcel remains visually distinct from extraction sites."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
      actions={
        <>
          {filters.map((filter) => (
            <FilterChip
              key={filter}
              active={companyFilter === filter}
              label={filter}
              onClick={() => onCompanyFilterChange(filter)}
            />
          ))}
        </>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <CorridorMap
          points={filteredPoints}
          selectedMineId={selectedMineId}
          onSelectMine={onSelectMine}
        />

        <div className="grid gap-5">
          <GlassPanel>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  Selected location
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--gm-foreground)]">
                  {selectedMine.name}
                </h3>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ${getTypeTone(
                  selectedMine.type,
                )}`}
              >
                {selectedMine.type}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  Company
                </p>
                <p className="mt-2 text-base text-[var(--gm-foreground)]">{selectedMine.company}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  Commodity / role
                </p>
                <p className="mt-2 text-base text-[var(--gm-foreground)]">
                  {selectedMine.commodity}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-[var(--gm-muted)]">
              {selectedMine.description}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--gm-muted)]">
              <span className="font-medium text-[var(--gm-foreground)]">Community impact:</span>{" "}
              {selectedMine.communityImpact}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <StatusBadge status={selectedMine.slpStatus} />
              <span className="text-sm text-[var(--gm-muted)]">
                SLP data {selectedMine.slpStatus === "Linked" ? "can be tracked in the dashboard." : "slot prepared for future evidence."}
              </span>
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              Reading the corridor
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-sm font-medium text-[var(--gm-foreground)]">Primary layer</p>
                <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                  Glencore ECM assets anchor the chrome footprint: Thorncliffe, Helena, and Magareng.
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-sm font-medium text-[var(--gm-foreground)]">Secondary layer</p>
                <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                  Anglo American Platinum brings Twickenham, Mototolo, and the Der Brochen project into the picture.
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-sm font-medium text-[var(--gm-foreground)]">Regional layer</p>
                <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                  Dwarsrivier, Two Rivers, and Lion Smelter extend the story into a wider industrial ecosystem.
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredPoints.map((point) => (
          <button
            key={point.id}
            type="button"
            onClick={() => onSelectMine(point.id)}
            className={`rounded-[26px] border p-5 text-left transition duration-300 ${
              point.id === selectedMineId
                ? "border-white/20 bg-white text-slate-950 shadow-2xl"
                : "border-white/10 bg-white/[0.06] text-[var(--gm-foreground)] hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-lg font-medium tracking-[-0.03em]">{point.name}</p>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs ring-1 ${
                  point.id === selectedMineId
                    ? "bg-slate-900/10 text-slate-900 ring-slate-900/10"
                    : getTypeTone(point.type)
                }`}
              >
                {point.type}
              </span>
            </div>
            <p className={`mt-3 text-sm ${point.id === selectedMineId ? "text-slate-700" : "text-[var(--gm-muted)]"}`}>
              {point.company}
            </p>
            <p className={`mt-4 text-sm leading-6 ${point.id === selectedMineId ? "text-slate-700" : "text-[var(--gm-muted)]"}`}>
              {point.description}
            </p>
          </button>
        ))}
      </div>
    </SectionShell>
  );
}

export function SlpSection({
  config,
  commitments,
  expandedId,
  onToggleCommitment,
}: {
  config: SectionConfig;
  commitments: SlpCommitment[];
  expandedId: string | null;
  onToggleCommitment: (id: string) => void;
}) {
  const completed = commitments.filter((item) => item.status === "Completed").length;
  const inProgress = commitments.filter((item) => item.status === "In Progress").length;
  const notDelivered = commitments.filter((item) => item.status === "Not Delivered").length;

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Social & Labour Plan tracker"
      description="The table is structured to show mine name, commitment type, delivery status, and expandable notes. It is designed for evidence uploads later, but already works as a usable accountability dashboard."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Completed"
          value={String(completed)}
          note="Items presently marked complete in the working tracker."
        />
        <StatCard
          label="In progress"
          value={String(inProgress)}
          note="Commitments that still need ongoing monitoring and clearer disclosure."
        />
        <StatCard
          label="Not delivered"
          value={String(notDelivered)}
          note="Rows requiring follow-up or visible evidence of implementation."
        />
      </div>

      <div className="mt-5">
        {commitments.length === 0 ? (
          <EmptyMessage
            title="No commitments match the current filter."
            detail="Try widening the company or search filter to repopulate the tracker."
          />
        ) : (
          <GlassPanel className="overflow-hidden p-0">
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_1.8fr] gap-3 border-b border-white/10 bg-white/[0.08] px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)] md:grid">
              <span>Mine name</span>
              <span>Commitment type</span>
              <span>Status</span>
              <span>Notes</span>
            </div>

            <div className="divide-y divide-white/8">
              {commitments.map((item) => {
                const open = expandedId === item.id;
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => onToggleCommitment(item.id)}
                      className="grid w-full gap-3 px-5 py-4 text-left transition hover:bg-white/[0.06] md:grid-cols-[1.5fr_1fr_1fr_1.8fr]"
                    >
                      <div>
                        <p className="text-base font-medium text-[var(--gm-foreground)]">
                          {item.mineName}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[var(--gm-subtle)]">
                          {item.company} · {item.year}
                        </p>
                      </div>
                      <div className="text-sm text-[var(--gm-foreground)]">{item.type}</div>
                      <div>
                        <StatusBadge status={item.status} />
                      </div>
                      <div className="text-sm leading-6 text-[var(--gm-muted)]">
                        {item.notes}
                      </div>
                    </button>
                    {open ? (
                      <div className="border-t border-white/[0.08] bg-white/[0.04] px-5 py-5">
                        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                              Detail view
                            </p>
                            <p className="mt-3 text-sm leading-7 text-[var(--gm-muted)]">
                              {item.detail}
                            </p>
                          </div>
                          <GlassPanel className="rounded-[24px] bg-white/[0.06]">
                            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                              Backend-ready fields
                            </p>
                            <div className="mt-3 space-y-2 text-sm text-[var(--gm-muted)]">
                              <p>Mine: {item.mineName}</p>
                              <p>Commitment type: {item.type}</p>
                              <p>Status: {item.status}</p>
                              <p>Evidence slot: pending document attachment</p>
                            </div>
                          </GlassPanel>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        )}
      </div>
    </SectionShell>
  );
}
