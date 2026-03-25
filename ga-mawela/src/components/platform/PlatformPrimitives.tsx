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
};

type StatCardProps = {
  label: string;
  value: string;
  note: string;
};

type StatusBadgeProps = {
  status: "Completed" | "In Progress" | "Not Delivered" | "Linked" | "Placeholder";
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

export function SectionShell({
  eyebrow,
  title,
  description,
  accent,
  backgroundImage,
  children,
  actions,
}: SectionShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[var(--gm-panel)] shadow-[0_24px_120px_rgba(7,10,24,0.35)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_40%),linear-gradient(135deg,rgba(9,14,32,0.92),rgba(9,14,32,0.72))]" />
        <div
          className="absolute -right-12 -top-12 h-64 w-64 rounded-full blur-3xl"
          style={{ background: `${accent}30` }}
        />
      </div>

      <div className="relative z-10 p-5 md:p-8 xl:p-10">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-[var(--gm-muted)]">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {eyebrow}
            </div>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-[var(--gm-foreground)] md:text-5xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--gm-muted)] md:text-base">
              {description}
            </p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>

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
    <div
      className={`rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({ label, value, note }: StatCardProps) {
  return (
    <GlassPanel className="min-h-full">
      <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
        {label}
      </p>
      <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">{note}</p>
    </GlassPanel>
  );
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colorMap: Record<StatusBadgeProps["status"], string> = {
    Completed: "bg-emerald-400/15 text-emerald-200 ring-emerald-400/20",
    "In Progress": "bg-sky-400/15 text-sky-200 ring-sky-400/20",
    "Not Delivered": "bg-rose-400/15 text-rose-200 ring-rose-400/20",
    Linked: "bg-emerald-400/15 text-emerald-200 ring-emerald-400/20",
    Placeholder: "bg-amber-400/15 text-amber-200 ring-amber-400/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ${colorMap[status]}`}
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
      className={`rounded-full border px-4 py-2 text-sm transition duration-300 ${
        active
          ? "border-white/20 bg-white text-slate-950 shadow-lg"
          : "border-white/10 bg-white/[0.05] text-[var(--gm-muted)] hover:border-white/20 hover:bg-white/10 hover:text-[var(--gm-foreground)]"
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
  accent = "#d14a28",
}: LinearMeterProps) {
  return (
    <GlassPanel>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-[var(--gm-foreground)]">{label}</p>
        <span className="text-sm text-[var(--gm-muted)]">{value}%</span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${accent}, rgba(255,255,255,0.92))`,
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
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--gm-panel-strong)] text-sm font-medium text-[var(--gm-foreground)]">
          {value}%
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--gm-foreground)]">{label}</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--gm-muted)]">
          {summary}
        </p>
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
      <p className="text-base font-medium text-[var(--gm-foreground)]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">{detail}</p>
    </GlassPanel>
  );
}
