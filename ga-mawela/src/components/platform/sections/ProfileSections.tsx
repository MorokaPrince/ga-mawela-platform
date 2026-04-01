"use client";

import { motion } from "framer-motion";
import {
  GlassPanel,
  SectionShell,
  StatusBadge,
} from "@/components/platform/PlatformPrimitives";
import type { SectionConfig, CpaProfile, SlpCommitment } from "@/data/platformData";
import type { PlatformLocale } from "@/lib/platform-i18n";

interface ProfilesSectionProps {
  config: SectionConfig;
  profiles: CpaProfile[];
  locale: PlatformLocale;
}

interface SlpLiveTrackerProps {
  config: SectionConfig;
  commitments: SlpCommitment[];
  expandedId: string | null;
  onToggleCommitment: (id: string) => void;
  locale: PlatformLocale;
}

function ProfileCard({
  profile,
  index,
}: {
  profile: CpaProfile;
  index: number;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Disputed":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar Placeholder */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-slate-700 to-slate-800">
            <span className="text-2xl font-semibold text-white/80">
              {profile.name.charAt(0)}
            </span>
            {/* Status indicator */}
            <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 ${
              profile.status === "Active" ? "bg-emerald-500" : 
              profile.status === "Disputed" ? "bg-amber-500" : "bg-slate-500"
            }`} />
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-[var(--gm-foreground)] truncate">
                {profile.name}
              </h3>
            </div>
            <p className="mt-1 text-sm text-[var(--gm-muted)]">
              {profile.role}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium border ${getStatusColor(profile.status)}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  profile.status === "Active" ? "bg-emerald-400" : 
                  profile.status === "Disputed" ? "bg-amber-400" : "bg-slate-400"
                }`} />
                {profile.status}
              </span>
              <span className="text-[10px] text-[var(--gm-subtle)]">
                {profile.term}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/[0.08]">
          <p className="text-xs leading-5 text-[var(--gm-muted)]">
            {profile.notes}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
            Contact:
          </span>
          <span className="text-xs text-[var(--gm-muted)]">
            {profile.contact}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function ProfilesSection({
  config,
  profiles,
  locale,
}: ProfilesSectionProps) {
  const activeProfiles = profiles.filter(p => p.status === "Active");
  const disputedProfiles = profiles.filter(p => p.status === "Disputed");
  const unknownProfiles = profiles.filter(p => p.status === "Unknown");

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title={locale === "nso" ? "BAkgwiši ba setšaba" : "Community Profiles"}
      description={config.description}
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      {/* Important Notice Banner */}
      <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="text-sm font-semibold text-amber-400">
              {locale === "nso" ? "Tšhemo ye important" : "Important Notice"}
            </h4>
            <p className="mt-1 text-xs leading-5 text-amber-200/80">
              {locale === "nso" 
                ? "Bakgwiši ba setšaba ba bodišwa goba gore ba šetše goba ba gapeletšwe. Sepedi se se bone goba goba se se sego se tshwanele. Ikemišetše goba goba goba le ka gare ga ga-Mawela."
                : "This section helps residents review the current representation picture. If a role is outdated, unclear, or missing youth visibility, record it here so the platform stays accurate."}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <GlassPanel className="text-center">
          <p className="text-3xl font-bold text-emerald-400">{activeProfiles.length}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
            {locale === "nso" ? "Ba šomišago" : "Active"}
          </p>
        </GlassPanel>
        <GlassPanel className="text-center">
          <p className="text-3xl font-bold text-amber-400">{disputedProfiles.length}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
            {locale === "nso" ? "Ba na le mathata" : "Disputed"}
          </p>
        </GlassPanel>
        <GlassPanel className="text-center">
          <p className="text-3xl font-bold text-slate-400">{unknownProfiles.length}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
            {locale === "nso" ? "Ba sa tshwanelego" : "Unclear"}
          </p>
        </GlassPanel>
      </div>

      {/* Profile Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {profiles.map((profile, index) => (
          <ProfileCard key={profile.id} profile={profile} index={index} />
        ))}
      </div>

      {/* Add New Profile CTA */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium text-[var(--gm-foreground)]">
              {locale === "nso" ? "O ka oketša morekoto?" : "Know someone missing?"}
            </h4>
            <p className="mt-1 text-sm text-[var(--gm-muted)]">
              {locale === "nso" 
                ? "Etela karolo ya Report an Issue go oketša morekoto wa ba kgwadišanago."
                : "Use the Report an Issue section to document missing or incorrect representation."}
            </p>
          </div>
          <div className="hidden rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-[var(--gm-foreground)] sm:block">
            → Report Issue
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function SlpLiveTracker({
  config,
  commitments,
  expandedId,
  onToggleCommitment,
  locale,
}: SlpLiveTrackerProps) {
  const completed = commitments.filter((item) => item.status === "Completed").length;
  const inProgress = commitments.filter((item) => item.status === "In Progress").length;
  const notDelivered = commitments.filter((item) => item.status === "Not Delivered").length;
  const total = commitments.length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title={locale === "nso" ? "TLhabollo ya SLP" : "SLP delivery tracker"}
      description={config.description}
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      {/* LIVE Tracker Dashboard */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <GlassPanel className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-emerald-500/20" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-400">
            {locale === "nso" ? "E fedile" : "Completed"}
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">{completed}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="progress-bar-emerald" style={{ '--progress-width': `${total > 0 ? (completed/total)*100 : 0}%` } as React.CSSProperties} />
          </div>
        </GlassPanel>
        
        <GlassPanel className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-blue-500/20" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-blue-400">
            {locale === "nso" ? "E sepela" : "In Progress"}
          </p>
          <p className="mt-2 text-3xl font-bold text-blue-400">{inProgress}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="progress-bar-blue" style={{ '--progress-width': `${total > 0 ? (inProgress/total)*100 : 0}%` } as React.CSSProperties} />
          </div>
        </GlassPanel>
        
        <GlassPanel className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-red-500/20" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-red-400">
            {locale === "nso" ? "Ga e fiše" : "Not Delivered"}
          </p>
          <p className="mt-2 text-3xl font-bold text-red-400">{notDelivered}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="progress-bar-red" style={{ '--progress-width': `${total > 0 ? (notDelivered/total)*100 : 0}%` } as React.CSSProperties} />
          </div>
        </GlassPanel>
        
        <GlassPanel className="relative overflow-hidden bg-gradient-to-br from-violet-500/10 to-blue-500/10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400">
            {locale === "nso" ? "Sekelelo sa go fediša" : "Completion Rate"}
          </p>
          <p className="mt-2 text-3xl font-bold text-white">{completionRate}%</p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="flex h-2 w-2">
              <span className="h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            </span>
            <span className="text-[10px] text-violet-300/70">
              {locale === "nso" ? "E updatego ka nako ya moširo" : "Live updating"}
            </span>
          </div>
        </GlassPanel>
      </div>

      {/* Commitments Table */}
      <div className="mt-5">
        {commitments.length === 0 ? (
          <GlassPanel className="py-12 text-center">
            <p className="text-lg text-[var(--gm-muted)]">No commitments tracked yet.</p>
          </GlassPanel>
        ) : (
          <GlassPanel className="overflow-hidden p-0">
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_1.8fr] gap-3 border-b border-white/10 bg-white/[0.08] px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)] md:grid">
              <span>{locale === "nso" ? "Mokgwa" : "Mine Name"}</span>
              <span>{locale === "nso" ? "Mohlaka" : "Type"}</span>
              <span>{locale === "nso" ? "Maemo" : "Status"}</span>
              <span>{locale === "nso" ? "Dintlha" : "Notes"}</span>
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
                              {locale === "nso" ? "Dintlha tše di ntšhafatšwago" : "Detailed View"}
                            </p>
                            <p className="mt-3 text-sm leading-7 text-[var(--gm-muted)]">
                              {item.detail}
                            </p>
                          </div>
                          <GlassPanel className="rounded-[24px] bg-white/[0.06]">
                            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                              {locale === "nso" ? "Meriana ya database" : "Backend Fields"}
                            </p>
                            <div className="mt-3 space-y-2 text-sm text-[var(--gm-muted)]">
                              <p>Mine: {item.mineName}</p>
                              <p>Commitment type: {item.type}</p>
                              <p>Status: {item.status}</p>
                              <p>{locale === "nso" ? "Slot ya evidence" : "Evidence slot available"}</p>
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
