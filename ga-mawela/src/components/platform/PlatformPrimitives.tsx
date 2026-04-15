"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  backgroundImage: string;
  children: ReactNode;
  actions?: ReactNode;
  showHeader?: boolean;
};

type StatCardProps = {
  label: string;
  value: string;
  note: string;
};

type StatusBadgeProps = {
  status: "Completed" | "In Progress" | "Not Delivered" | "Linked" | "Monitoring";
};

type FilterChipProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

type LinearMeterProps = {
  label: string;
  value: number;
  summary: string;
  accent?: string;
};

type RingMeterProps = {
  label: string;
  value: number;
  accent: string;
  summary: string;
};

type GaugeMeterProps = {
  label: string;
  value: number;
  accent: string;
  summary: string;
};

type DonutSlice = {
  label: string;
  value: number;
  accent: string;
};

type DonutChartProps = {
  label: string;
  summary: string;
  centerLabel: string;
  slices: DonutSlice[];
};

export function SectionShell({
  eyebrow,
  title,
  description,
  accent,
  backgroundImage,
  children,
  actions,
  showHeader = true,
}: SectionShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="gm-shell-card relative overflow-hidden rounded-[34px]"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.22] saturate-[0.72] contrast-[1.02] mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(199,165,109,0.14),transparent_30%),linear-gradient(140deg,rgba(6,11,16,0.28),rgba(6,11,16,0.7))]" />
        <div className="absolute inset-0 gm-noise-overlay opacity-15" />
        <div
          className="absolute -right-10 top-0 h-56 w-56 rounded-full blur-3xl"
          style={{ background: `${accent}22` }}
        />
        <div className="absolute inset-x-0 top-0 h-px gm-accent-line opacity-70" />
      </div>

      <div className="relative z-10 p-4 sm:p-6 xl:p-7">
        {showHeader ? (
          <div className="mb-6 flex flex-col gap-5 border-b border-white/6 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="gm-kicker">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                {eyebrow}
              </div>
              <h2 className="gm-display mt-5 max-w-4xl text-[2.3rem] font-semibold text-[var(--gm-foreground)] md:text-[2.9rem] xl:text-[3.5rem]">
                {title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--gm-muted)] md:text-base">
                {description}
              </p>
            </div>
            {actions ? <div className="flex flex-wrap gap-2.5">{actions}</div> : null}
          </div>
        ) : null}

        {children}
      </div>
    </motion.section>
  );
}

export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`gm-panel rounded-[28px] p-4 md:p-5 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, note }: StatCardProps) {
  return (
    <GlassPanel className="min-h-full">
      <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--gm-subtle)]">
        {label}
      </p>
      <p className="gm-display mt-4 text-4xl font-semibold text-[var(--gm-foreground)]">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">{note}</p>
    </GlassPanel>
  );
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colorMap: Record<StatusBadgeProps["status"], string> = {
    Completed: "border-emerald-300/16 bg-emerald-400/10 text-emerald-100",
    "In Progress": "border-sky-300/16 bg-sky-400/10 text-sky-100",
    "Not Delivered": "border-rose-300/16 bg-rose-400/10 text-rose-100",
    Linked: "border-emerald-300/16 bg-emerald-400/10 text-emerald-100",
    Monitoring: "border-amber-300/16 bg-amber-400/10 text-amber-100",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${colorMap[status]}`}
    >
      {status}
    </span>
  );
}

export function FilterChip({ active, label, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-300 ${
        active
          ? "border-[var(--gm-accent)] bg-[color:var(--gm-accent)] text-[#101820] shadow-[0_12px_24px_rgba(199,165,109,0.14)]"
          : "border-white/10 bg-white/[0.04] text-[var(--gm-muted)] hover:border-white/16 hover:bg-white/[0.08] hover:text-[var(--gm-foreground)]"
      }`}
    >
      {label}
    </button>
  );
}

export function LinearMeter({
  label,
  value,
  summary,
  accent = "#c7a56d",
}: LinearMeterProps) {
  return (
    <GlassPanel>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-[var(--gm-foreground)]">{label}</p>
        <span className="text-sm text-[var(--gm-muted)]">{value}%</span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${accent}, rgba(255,255,255,0.88))`,
          }}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">{summary}</p>
    </GlassPanel>
  );
}

export function RingMeter({ label, value, accent, summary }: RingMeterProps) {
  return (
    <GlassPanel className="flex flex-col items-start gap-4 md:flex-row md:items-center">
      <div
        className="relative grid h-24 w-24 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${accent} 0 ${value * 3.6}deg, rgba(255,255,255,0.08) ${value * 3.6}deg 360deg)`,
        }}
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--gm-panel-strong)] text-sm font-semibold text-[var(--gm-foreground)]">
          {value}%
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-[var(--gm-foreground)]">{label}</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--gm-muted)]">
          {summary}
        </p>
      </div>
    </GlassPanel>
  );
}

export function GaugeMeter({ label, value, accent, summary }: GaugeMeterProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const rotation = -90 + clampedValue * 1.8;

  return (
    <GlassPanel>
      <p className="text-sm font-semibold text-[var(--gm-foreground)]">{label}</p>
      <div className="mt-5 flex items-center gap-5">
        <div className="relative h-28 w-56 overflow-hidden">
          <div
            className="absolute left-1/2 top-full h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: `conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.08) 0deg, ${accent} ${clampedValue * 1.8}deg, rgba(255,255,255,0.06) ${clampedValue * 1.8}deg 180deg, transparent 180deg 360deg)`,
            }}
          />
          <div className="absolute inset-x-6 bottom-0 top-6 rounded-t-full bg-[var(--gm-panel-strong)]" />
          <div
            className="absolute bottom-1 left-1/2 h-[4.5rem] w-px origin-bottom"
            style={{
              transform: `translateX(-50%) rotate(${rotation}deg)`,
            }}
          >
            <div
              className="absolute bottom-0 left-1/2 h-16 w-1 -translate-x-1/2 rounded-full"
              style={{ backgroundColor: accent }}
            />
          </div>
          <div className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.18)]" />
          <div className="absolute inset-x-0 bottom-2 text-center">
            <p className="gm-display text-3xl font-semibold text-[var(--gm-foreground)]">
              {clampedValue}%
            </p>
          </div>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[var(--gm-muted)]">{summary}</p>
      </div>
    </GlassPanel>
  );
}

export function DonutChart({
  label,
  summary,
  centerLabel,
  slices,
}: DonutChartProps) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  let cursor = 0;
  const stops = slices.map((slice) => {
    const start = total === 0 ? 0 : (cursor / total) * 360;
    cursor += slice.value;
    const end = total === 0 ? 360 : (cursor / total) * 360;
    return `${slice.accent} ${start}deg ${end}deg`;
  });

  return (
    <GlassPanel>
      <p className="text-sm font-semibold text-[var(--gm-foreground)]">{label}</p>
      <div className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-center">
        <div
          className="grid h-44 w-44 shrink-0 place-items-center rounded-full"
          style={{ background: `conic-gradient(${stops.join(",")})` }}
        >
          <div className="grid h-28 w-28 place-items-center rounded-full bg-[var(--gm-panel-strong)] text-center">
            <div>
              <p className="gm-display text-2xl font-semibold text-[var(--gm-foreground)]">
                {centerLabel}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
                overview
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-6 text-[var(--gm-muted)]">{summary}</p>
          <div className="mt-4 grid gap-3">
            {slices.map((slice) => (
              <div
                key={slice.label}
                className="gm-panel-muted flex items-center justify-between gap-4 rounded-[18px] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: slice.accent }}
                  />
                  <span className="text-sm text-[var(--gm-foreground)]">{slice.label}</span>
                </div>
                <span className="text-sm text-[var(--gm-muted)]">{slice.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

export function EmptyMessage({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <GlassPanel className="border-dashed text-center">
      <p className="text-base font-semibold text-[var(--gm-foreground)]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">{detail}</p>
    </GlassPanel>
  );
}
