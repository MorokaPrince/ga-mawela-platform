"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  VisualCard,
} from "@/data/platformData";
import {
  heroMediaFrames,
  landingVisualCards,
  operationalVisualCards,
  quickStats,
  updates,
} from "@/data/platformData";

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

function resolveMineVisual(point: MinePoint): VisualCard {
  if (point.type === "land parcel") {
    return {
      id: "land-context",
      tag: "Land context",
      title: "Land parcel focus",
      summary:
        "The visuals still need to return to open land, road edges, and mountain context so St George 2 JT is not mistaken for a mine.",
      image: "/platform/media/ridge-road.png",
    };
  }

  if (point.type === "processing hub") {
    return operationalVisualCards[2];
  }

  if (point.type === "project") {
    return operationalVisualCards[1];
  }

  if (point.companyFilter === "Glencore") {
    return operationalVisualCards[0];
  }

  if (point.companyFilter === "Anglo American Platinum") {
    return operationalVisualCards[2];
  }

  return landingVisualCards[1];
}

function LandingFilmstrip({ cards }: { cards: VisualCard[] }) {
  const reel = [...cards, ...cards];

  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
            Landing reel
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--gm-foreground)]">
            Cinematic corridor frames
          </h3>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--gm-muted)]">
          A moving filmstrip keeps the landing experience alive in the RESN direction while staying lightweight enough for the current app.
        </p>
      </div>

      <div className="mt-6 gm-filmstrip">
        <div className="gm-filmstrip-track gap-4">
          {reel.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="w-[280px] shrink-0 overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.05]"
            >
              <div className="relative h-56">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,28,0.02),rgba(8,12,28,0.78))]" />
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/50 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70">
                  {card.tag}
                </div>
              </div>
              <div className="p-4">
                <p className="text-lg font-medium tracking-[-0.03em] text-[var(--gm-foreground)]">
                  {card.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                  {card.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}

function VisualStoryCards({
  cards,
  columns = "md:grid-cols-2",
}: {
  cards: VisualCard[];
  columns?: string;
}) {
  return (
    <div className={`grid gap-4 ${columns}`}>
      {cards.map((card) => (
        <GlassPanel key={card.id} className="overflow-hidden p-0">
          <div className="relative h-60">
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,28,0.08),rgba(8,12,28,0.82))]" />
            <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/55 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70">
              {card.tag}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                {card.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/75">{card.summary}</p>
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}

function HeroShowcase({
  selectedMine,
  onSectionChange,
}: {
  selectedMine: MinePoint;
  onSectionChange: (id: SectionId) => void;
}) {
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const activeFrame = heroMediaFrames[activeFrameIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveFrameIndex((current) => (current + 1) % heroMediaFrames.length);
    }, 6800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <GlassPanel className="relative overflow-hidden p-0">
      <div className="relative min-h-[720px] overflow-hidden rounded-[30px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFrame.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {activeFrame.video ? (
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={activeFrame.poster}
              >
                <source src={activeFrame.video} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={activeFrame.image}
                alt={activeFrame.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,74,40,0.42),transparent_35%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_24%),linear-gradient(120deg,rgba(6,9,19,0.2),rgba(6,9,19,0.84))]" />
        <div className="absolute inset-0 gm-noise-overlay opacity-35" />
        <div className="absolute inset-x-0 top-0 h-px gm-accent-line" />

        <div className="pointer-events-none absolute right-6 top-6 hidden max-w-xs lg:block">
          <GlassPanel className="gm-float-slow bg-slate-950/45">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
              Current geographic focus
            </p>
            <p className="mt-3 text-xl font-medium tracking-[-0.03em] text-white">
              {selectedMine.name}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              {selectedMine.communityImpact}
            </p>
          </GlassPanel>
        </div>

        <div className="pointer-events-none absolute right-10 top-52 hidden max-w-[18rem] lg:block">
          <GlassPanel className="gm-float-delay bg-white/[0.08]">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
              Active frame metric
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">
              {activeFrame.metric}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              {activeFrame.detail}
            </p>
          </GlassPanel>
        </div>

        <div className="relative z-10 flex min-h-[720px] flex-col justify-between gap-10 p-5 md:p-7 xl:p-9">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-white/70">
              <span className="h-2 w-2 rounded-full bg-[var(--gm-accent)]" />
              Immersive landing sequence
            </div>
            <h3 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl xl:text-[5.5rem] xl:leading-[0.94]">
              Ga-Mawela Mining & Community Platform
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
              A premium, data-driven transparency interface for land awareness, corridor intelligence, SLP tracking, and youth-centered opportunity access.
            </p>

            <div className="mt-6 max-w-3xl rounded-[28px] border border-white/10 bg-slate-950/45 p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">
                {activeFrame.eyebrow}
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
                {activeFrame.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/70">{activeFrame.detail}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onSectionChange("mines")}
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
              >
                Explore Mines
              </button>
              <button
                type="button"
                onClick={() => onSectionChange("slp")}
                className="rounded-full border border-white/15 bg-white/[0.08] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.12]"
              >
                Open SLP Tracker
              </button>
              <button
                type="button"
                onClick={() => onSectionChange("documents")}
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
              >
                View Evidence
              </button>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4 md:grid-cols-3">
              <GlassPanel className="bg-slate-950/45">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  Clarification
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  St George 2 JT is land, not a mine.
                </p>
              </GlassPanel>
              <GlassPanel className="bg-slate-950/45">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  Experience
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  Editorial portal blended with a live dashboard.
                </p>
              </GlassPanel>
              <GlassPanel className="bg-slate-950/45">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  Priorities
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  Transparency, governance, youth access, and land awareness.
                </p>
              </GlassPanel>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {heroMediaFrames.map((frame, index) => (
                <button
                  key={frame.id}
                  type="button"
                  onClick={() => setActiveFrameIndex(index)}
                  className={`group relative h-36 min-w-[180px] overflow-hidden rounded-[24px] border transition ${
                    activeFrameIndex === index
                      ? "border-white/25 shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
                      : "border-white/10 opacity-85 hover:border-white/20 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={frame.image}
                    alt={frame.title}
                    fill
                    sizes="180px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,28,0.14),rgba(8,12,28,0.82))]" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                      {frame.eyebrow}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm font-medium text-white">
                      {frame.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
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
    <GlassPanel className="relative min-h-[460px] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_40%),linear-gradient(180deg,rgba(16,23,46,0.18),rgba(16,23,46,0.5))]" />
      <div className="absolute inset-0 gm-noise-overlay opacity-20" />
      <div className="relative h-[460px] rounded-[22px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(8,12,28,0.2),rgba(8,12,28,0.68))]">
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
        <div className="absolute right-4 top-4 hidden rounded-full border border-white/10 bg-slate-950/[0.55] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[var(--gm-subtle)] md:block">
          Select a node
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
      description="A higher-end community intelligence system shaped by immersive media, clear hierarchy, and live corridor context instead of flat brochure sections."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-5">
        <HeroShowcase selectedMine={selectedMine} onSectionChange={onSectionChange} />

        <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <GlassPanel className="overflow-hidden">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  Interactive map preview
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--gm-foreground)]">
                  Understand the corridor at a glance
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onSectionChange("mines")}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
              >
                Open full map
              </button>
            </div>

            <div className="mt-5">
              <CorridorMap
                points={points}
                selectedMineId={selectedMine.id}
                onSelectMine={onSelectMine}
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <p className="text-sm leading-7 text-[var(--gm-muted)]">
                The preview map keeps the land parcel visible alongside mines, projects, and a processing hub so the spatial story stays accurate.
              </p>
              <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--gm-foreground)]">
                Current node: {selectedMine.name}
              </div>
            </div>
          </GlassPanel>

          <div className="grid gap-5">
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

            <VisualStoryCards cards={landingVisualCards.slice(0, 2)} />
          </div>
        </div>

        <LandingFilmstrip cards={landingVisualCards} />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              note={stat.note}
            />
          ))}
        </div>
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
  const selectedVisual = resolveMineVisual(selectedMine);

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Mines & operations in the Ga-Mawela corridor"
      description="Pins cover ECM mines, Anglo American Platinum assets, regional mines, and the Lion Smelter. St George 2 JT remains visually separate so the land parcel is not collapsed into extraction imagery."
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
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
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

            <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
              <div className="relative h-52">
                <Image
                  src={selectedVisual.image}
                  alt={selectedVisual.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,28,0.06),rgba(8,12,28,0.78))]" />
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/55 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70">
                  {selectedVisual.tag}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-lg font-medium text-white">{selectedVisual.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">{selectedVisual.summary}</p>
                </div>
              </div>
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

      <div className="mt-5">
        <VisualStoryCards cards={operationalVisualCards} columns="md:grid-cols-3" />
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

            <div className="divide-y divide-white/[0.08]">
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
                          {item.company} | {item.year}
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
