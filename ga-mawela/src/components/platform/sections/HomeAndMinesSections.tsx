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
import type { PlatformLocale } from "@/lib/platform-i18n";
import { platformUiCopy } from "@/lib/platform-ui-copy";

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
    return "border-green-400 bg-green-500 shadow-[0_0_0_10px_rgba(74,222,128,0.15)]";
  }

  if (point.companyFilter === "Anglo American Platinum") {
    return "border-blue-400 bg-blue-600 shadow-[0_0_0_10px_rgba(96,165,250,0.15)]";
  }

  return "border-emerald-300 bg-emerald-200 shadow-[0_0_0_10px_rgba(110,231,183,0.08)]";
}

function getMineLogoUrl(point: MinePoint): string {
  if (point.companyFilter === "Glencore") {
    return "/assets/logos/glencore-logo.png";
  }
  if (point.companyFilter === "Anglo American Platinum") {
    return "/assets/logos/amplats.png";
  }
  return "/assets/logos/anglo.png";
}

function getMineColor(point: MinePoint): string {
  if (point.type === "land parcel") return "#f59e0b";
  if (point.companyFilter === "Glencore") return "#078037";
  if (point.companyFilter === "Anglo American Platinum") return "#0066b3";
  return "#6b7280";
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

function LandingFilmstrip({ cards, locale }: { cards: VisualCard[]; locale: PlatformLocale }) {
  const reel = [...cards, ...cards];

  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
            {locale === "nso" ? "Reele ya go tsena" : "Landing reel"}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--gm-foreground)]">
            {locale === "nso" ? "Difreime tša khoridoro" : "Cinematic corridor frames"}
          </h3>
        </div>
        <p className="text-sm leading-7 text-[var(--gm-muted)]">
          {locale === "nso" 
            ? "Reele ye e tsweletšego e boloka tiragalo ya go tsena e phela ka tsela ya RESN mola e nna le maferefere ao a lekanego bakeng sa app ya bjale."
            : "A moving filmstrip keeps the landing experience alive in the RESN direction while staying lightweight enough for the current app."
          }
        </p>
      </div>

      <div className="mt-6 gm-filmstrip">
        <div className="gm-filmstrip-track gap-4">
          {reel.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="w-[280px] shrink-0 overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.05]"
            >
              <div className="relative h-52">
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
          <div className="relative h-52 md:h-56">
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
  locale,
}: {
  selectedMine: MinePoint;
  onSectionChange: (id: SectionId) => void;
  locale: PlatformLocale;
}) {
  const copy = platformUiCopy[locale].hero;
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
      <div className="relative min-h-[620px] overflow-hidden rounded-[30px] xl:min-h-[680px]">
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

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,74,40,0.28),transparent_35%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_24%),linear-gradient(120deg,rgba(6,9,19,0.08),rgba(6,9,19,0.68))]" />
        <div className="absolute inset-0 gm-noise-overlay opacity-35" />
        <div className="absolute inset-x-0 top-0 h-px gm-accent-line" />

        {/* REAL FOUNDATION - Exposure Content */}
        <div className="pointer-events-none absolute right-6 top-6 hidden max-w-xs lg:block">
          <GlassPanel className="gm-float-slow bg-slate-950/28">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
              {copy.floatingEyebrow}
            </p>
            <p className="mt-3 text-xl font-medium tracking-[-0.03em] text-white">
              {selectedMine.name}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/72">
              {selectedMine.communityImpact}
            </p>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                {copy.floatingSignal}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">
                {activeFrame.metric}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/68">
                {activeFrame.detail}
              </p>
            </div>
          </GlassPanel>
        </div>

        <div className="relative z-10 flex min-h-[620px] flex-col justify-between gap-8 p-5 md:p-6 xl:min-h-[680px] xl:p-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-white/70">
              <span className="h-2 w-2 rounded-full bg-[var(--gm-accent)]" />
              {copy.badge}
            </div>
            <h3 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-6xl xl:text-[4.9rem] xl:leading-[0.94]">
              {copy.title}
            </h3>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              {copy.description}
            </p>

            {/* EXPOSURE CONTENT - Key Truths */}
            <div className="mt-6 max-w-3xl rounded-[28px] border border-white/10 bg-slate-950/28 p-4 backdrop-blur-xl md:p-5">
              <p className="text-[11px] uppercase tracking-[0.28em] text-amber-400 font-semibold">
                ⚡ THE REAL FOUNDATION
              </p>
              <div className="mt-3 space-y-3">
                <p className="text-lg font-semibold tracking-[-0.04em] text-white md:text-xl">
                  St George 2 JT = LAND, NOT a mine
                </p>
                <p className="text-sm leading-6 text-white/72">
                  Located in Sekhukhune District along Dwars River / Steelpoort mining belt. This area sits on one of the richest mineral zones globally — the Bushveld Complex. The land itself is extremely valuable due to platinum + chrome deposits.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
                    🔴 Der Brochen Mine
                  </span>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    🔵 Mototolo Project
                  </span>
                  <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-400">
                    ⚪ Twickenham
                  </span>
                </div>
              </div>
            </div>

            {/* Platform Promise */}
            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-xs font-medium text-emerald-400">
                🎯 THIS PLATFORM = FIRST REAL TRANSPARENCY SYSTEM FOR GA-MAWELA
              </p>
              <p className="mt-2 text-xs leading-5 text-emerald-200/80">
                Track SLP commitments • Monitor delivery • Report issues • Document representation • Access documents • Expose truth
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onSectionChange("mines")}
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
              >
                {copy.primaryAction}
              </button>
              <button
                type="button"
                onClick={() => onSectionChange("slp")}
                className="rounded-full border border-white/15 bg-white/[0.08] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.12]"
              >
                {copy.secondaryAction}
              </button>
              <button
                type="button"
                onClick={() => onSectionChange("documents")}
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
              >
                {copy.tertiaryAction}
              </button>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
            <div className="grid gap-4 md:grid-cols-3">
              <GlassPanel className="bg-slate-950/24">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  {copy.clarification}
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  {copy.clarificationDetail}
                </p>
              </GlassPanel>
              <GlassPanel className="bg-slate-950/24">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  {copy.experience}
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  {copy.experienceDetail}
                </p>
              </GlassPanel>
              <GlassPanel className="bg-slate-950/24">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  {copy.priorities}
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  {copy.prioritiesDetail}
                </p>
              </GlassPanel>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {heroMediaFrames.map((frame, index) => (
                <button
                  key={frame.id}
                  type="button"
                  onClick={() => setActiveFrameIndex(index)}
                  className={`group relative h-32 min-w-[170px] overflow-hidden rounded-[24px] border transition ${
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
  locale,
}: {
  points: MinePoint[];
  selectedMineId: string;
  onSelectMine: (id: string) => void;
  locale: PlatformLocale;
}) {
  return (
    <GlassPanel className="relative min-h-[420px] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_40%),linear-gradient(180deg,rgba(16,23,46,0.18),rgba(16,23,46,0.5))]" />
      <div className="absolute inset-0 gm-noise-overlay opacity-20" />
      
      {/* Interactive Map with Rich Labels */}
      <div className="relative h-[420px] rounded-[22px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(8,12,28,0.2),rgba(8,12,28,0.68))]">
        {/* Real Map Labels Layer */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          <span className="rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-medium text-amber-400 border border-amber-500/30">
            🗺️ Sekhukhune District
          </span>
          <span className="rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-medium text-blue-400 border border-blue-500/30">
            📍 Dwars River Belt
          </span>
        </div>
        
        {/* Map Grid Lines */}
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
          {/* Main corridor path */}
          <path
            d="M10 55 C18 48, 24 50, 31 46 S46 28, 57 35 S74 56, 91 31"
            fill="none"
            stroke="url(#corridor-line)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="1.2 2.6"
          />
          {/* Secondary path */}
          <path
            d="M17 70 C29 74, 46 77, 63 73 S84 64, 90 38"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Grid overlay */}
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#smallGrid)" />
        </svg>

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/[0.55] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[var(--gm-subtle)] ml-24">
          {locale === "nso" ? "Mokgwa wa khoridoro" : "Corridor Map View"}
        </div>
        <div className="absolute right-4 top-4 hidden rounded-full border border-white/10 bg-slate-950/[0.55] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[var(--gm-subtle)] md:block">
          {locale === "nso" ? "Kgetha node" : "Select a node"}
        </div>

        {/* Compass Rose */}
        <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/50">
          <span className="text-lg">🧭</span>
        </div>

        {/* Legend */}
        <div className="absolute left-4 bottom-4 flex gap-3 text-[9px]">
          <span className="flex items-center gap-1 rounded bg-slate-950/70 px-2 py-1 text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> Land
          </span>
          <span className="flex items-center gap-1 rounded bg-slate-950/70 px-2 py-1 text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-500" /> Glencore
          </span>
          <span className="flex items-center gap-1 rounded bg-slate-950/70 px-2 py-1 text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-600" /> Amplats
          </span>
        </div>

        {points.map((point) => {
          const isSelected = selectedMineId === point.id;
          const mineColor = getMineColor(point);
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => onSelectMine(point.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isSelected 
                    ? "border-white ring-4 ring-white/30 scale-110" 
                    : "border-white/60 hover:border-white"
                }`}
                style={{ 
                  backgroundColor: mineColor,
                  width: point.type === "land parcel" ? 48 : 40,
                  height: point.type === "land parcel" ? 48 : 40,
                  boxShadow: `0 4px 20px ${mineColor}60`
                }}
              >
                {/* Mine/Company Logo Display */}
                <div className="flex items-center justify-center">
                  {point.type === "land parcel" ? (
                    <span className="text-white text-lg font-bold">🏡</span>
                  ) : point.companyFilter === "Glencore" ? (
                    <span className="text-white text-xs font-bold">G</span>
                  ) : point.companyFilter === "Anglo American Platinum" ? (
                    <span className="text-white text-xs font-bold">A</span>
                  ) : (
                    <span className="text-white text-xs font-bold">R</span>
                  )}
                </div>
                {/* Pulsing indicator */}
                <span className="absolute h-full w-full animate-ping rounded-full bg-white/30" />
              </motion.div>
              <span
                className={`mt-2 inline-flex max-w-[12rem] rounded-full border px-3 py-1.5 text-xs font-medium ring-1 backdrop-blur ${
                  isSelected
                    ? "border-white/30 bg-white/90 text-slate-900 ring-white/30 shadow-lg"
                    : "border-white/15 bg-slate-950/80 text-white/90 ring-white/10"
                }`}
              >
                <span className="truncate">{point.name}</span>
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
  locale,
}: {
  config: SectionConfig;
  points: MinePoint[];
  selectedMine: MinePoint;
  onSelectMine: (id: string) => void;
  onSectionChange: (id: SectionId) => void;
  locale: PlatformLocale;
}) {
  const copy = platformUiCopy[locale].home;

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title={copy.title}
      description={copy.description}
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
        <div className="grid gap-5">
          <HeroShowcase
            selectedMine={selectedMine}
            onSectionChange={onSectionChange}
            locale={locale}
          />

        <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
          <GlassPanel className="overflow-hidden">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  {copy.mapEyebrow}
                </p>
                <h3 className="mt-3 text-[1.9rem] font-semibold tracking-[-0.04em] text-[var(--gm-foreground)]">
                  {copy.mapTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onSectionChange("mines")}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
              >
                {copy.openMap}
              </button>
            </div>

            <div className="mt-5">
              <CorridorMap
                points={points}
                selectedMineId={selectedMine.id}
                onSelectMine={onSelectMine}
                locale={locale}
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <p className="text-sm leading-7 text-[var(--gm-muted)]">
                {copy.mapSummary}
              </p>
              <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[var(--gm-foreground)]">
                {copy.currentNode}: {selectedMine.name}
              </div>
            </div>
          </GlassPanel>

          <div className="grid gap-5">
            <GlassPanel>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                {copy.updatesEyebrow}
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

        <LandingFilmstrip cards={landingVisualCards} locale={locale} />

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
  locale,
}: {
  config: SectionConfig;
  filteredPoints: MinePoint[];
  selectedMine: MinePoint;
  selectedMineId: string;
  onSelectMine: (id: string) => void;
  companyFilter: CompanyFilter;
  onCompanyFilterChange: (filter: CompanyFilter) => void;
  filters: CompanyFilter[];
  locale: PlatformLocale;
}) {
  const copy = platformUiCopy[locale].mines;
  const selectedVisual = resolveMineVisual(selectedMine);

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title={copy.title}
      description={copy.description}
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
          locale={locale}
        />

        <div className="grid gap-5">
          <GlassPanel>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  {copy.selectedLocation}
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
                  {copy.company}
                </p>
                <p className="mt-2 text-base text-[var(--gm-foreground)]">{selectedMine.company}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                  {copy.commodityRole}
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
              <span className="font-medium text-[var(--gm-foreground)]">{copy.communityImpact}:</span>{" "}
              {selectedMine.communityImpact}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <StatusBadge status={selectedMine.slpStatus} />
              <span className="text-sm text-[var(--gm-muted)]">
                {selectedMine.slpStatus === "Linked" ? copy.linkedSlp : copy.placeholderSlp}
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
              {copy.readingTitle}
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-sm font-medium text-[var(--gm-foreground)]">{copy.primaryLayer}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                  {copy.primaryLayerDetail}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-sm font-medium text-[var(--gm-foreground)]">{copy.secondaryLayer}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                  {copy.secondaryLayerDetail}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-sm font-medium text-[var(--gm-foreground)]">{copy.regionalLayer}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                  {copy.regionalLayerDetail}
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      <div className="mt-4">
        <VisualStoryCards cards={operationalVisualCards} columns="md:grid-cols-3" />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
  locale,
}: {
  config: SectionConfig;
  commitments: SlpCommitment[];
  expandedId: string | null;
  onToggleCommitment: (id: string) => void;
  locale: PlatformLocale;
}) {
  const copy = platformUiCopy[locale].slp;
  const completed = commitments.filter((item) => item.status === "Completed").length;
  const inProgress = commitments.filter((item) => item.status === "In Progress").length;
  const notDelivered = commitments.filter((item) => item.status === "Not Delivered").length;

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title={copy.title}
      description={copy.description}
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label={copy.completed}
          value={String(completed)}
          note={copy.completedNote}
        />
        <StatCard
          label={copy.inProgress}
          value={String(inProgress)}
          note={copy.inProgressNote}
        />
        <StatCard
          label={copy.notDelivered}
          value={String(notDelivered)}
          note={copy.notDeliveredNote}
        />
      </div>

      <div className="mt-5">
        {commitments.length === 0 ? (
          <EmptyMessage
            title={copy.emptyTitle}
            detail={copy.emptyDetail}
          />
        ) : (
          <GlassPanel className="overflow-hidden p-0">
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_1.8fr] gap-3 border-b border-white/10 bg-white/[0.08] px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)] md:grid">
              <span>{copy.mineName}</span>
              <span>{copy.commitmentType}</span>
              <span>{copy.status}</span>
              <span>{copy.notes}</span>
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
                              {copy.detailView}
                            </p>
                            <p className="mt-3 text-sm leading-7 text-[var(--gm-muted)]">
                              {item.detail}
                            </p>
                          </div>
                          <GlassPanel className="rounded-[24px] bg-white/[0.06]">
                            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                              {copy.backendFields}
                            </p>
                            <div className="mt-3 space-y-2 text-sm text-[var(--gm-muted)]">
                              <p>Mine: {item.mineName}</p>
                              <p>Commitment type: {item.type}</p>
                              <p>Status: {item.status}</p>
                              <p>{copy.evidenceSlot}</p>
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
