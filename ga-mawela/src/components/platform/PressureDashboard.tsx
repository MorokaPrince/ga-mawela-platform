"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";
import type { PressureMetric } from "@/data/platformData";

interface PressureDashboardProps {
  metrics: PressureMetric[];
}

export function PressureDashboard({ metrics }: PressureDashboardProps) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-emerald-400";
    if (score >= 50) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return "bg-emerald-500/20";
    if (score >= 50) return "bg-amber-500/20";
    return "bg-red-500/20";
  };

  const getGapColor = (gap: number) => {
    if (gap <= 30) return "text-emerald-400";
    if (gap <= 50) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--gm-foreground)]">
          Pressure Dashboard
        </h2>
        <p className="text-sm text-[var(--gm-muted)]">
          Visualizing mining company impact, benefit gaps, and community leverage points
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.companyId}
            className={`gm-pressure-card cursor-pointer transition-all hover:scale-[1.02] ${selectedCompany === metric.companyId ? "ring-2 ring-[var(--gm-primary)]" : ""}`}
            onClick={() => setSelectedCompany(
              selectedCompany === metric.companyId ? null : metric.companyId
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--gm-foreground)]">
                  {metric.companyName}
                </h3>
                <p className="text-sm text-[var(--gm-muted)]">
                  {metric.affectedFarms} farms affected
                </p>
              </div>
              <div className={`gm-score-circle ${getScoreBg(metric.transparencyScore)}`}>
                {metric.transparencyScore}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--gm-muted)]">Benefit Gap</span>
                <span className={`text-lg font-bold ${getGapColor(metric.communityBenefitGap)}`}>
                  {metric.communityBenefitGap}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-[var(--gm-earth-dark)]">
                <div
                  className="h-full rounded-full transition-all bg-gradient-to-r from-[var(--gm-primary)] to-[var(--gm-gold-light)]"
                  style={{ width: `${metric.communityBenefitGap}%` }}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="gm-row p-2">
                <span className="text-xs text-[var(--gm-muted)]">Unresolved Claims</span>
                <p className="text-lg font-bold text-[var(--gm-foreground)]">
                  {metric.unresolvedClaims}
                </p>
              </div>
              <div className="gm-row p-2">
                <span className="text-xs text-[var(--gm-muted)]">SLP Delivered</span>
                <p className="text-lg font-bold text-[var(--gm-primary)]">
                  {metric.slpDelivered}
                </p>
              </div>
            </div>

            {metric.unresolvedClaims > 0 && (
              <div className="mt-3 flex items-center gap-2 text-sm text-amber-400">
                <AlertCircle className="h-4 w-4" />
                <span>{metric.unresolvedClaims} active disputes</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detailed View */}
      {selectedCompany && (
        <div className="gm-row">
          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.filter((m) => m.companyId === selectedCompany).map((metric) => (
              <div key={metric.companyId}>
                <h3 className="mb-4 text-xl font-bold text-[var(--gm-primary)]">
                  {metric.companyName} - Detailed Analysis
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-[var(--gm-border)] bg-[var(--gm-earth-dark)] p-4">
                      <p className="text-sm text-[var(--gm-muted)]">Farms Affected</p>
                      <p className="text-3xl font-bold text-[var(--gm-foreground)]">
                        {metric.affectedFarms}
                      </p>
                    </div>
                    <div className="rounded-lg border border-[var(--gm-border)] bg-[var(--gm-earth-dark)] p-4">
                      <p className="text-sm text-[var(--gm-muted)]">Disputed Areas</p>
                      <p className="text-3xl font-bold text-red-400">
                        {metric.disputedAreas}
                      </p>
                    </div>
                    <div className="rounded-lg border border-[var(--gm-border)] bg-[var(--gm-earth-dark)] p-4">
                      <p className="text-sm text-[var(--gm-muted)]">SLP Outstanding</p>
                      <p className="text-3xl font-bold text-amber-400">
                        {metric.slpOutstanding}
                      </p>
                    </div>
                    <div className="rounded-lg border border-[var(--gm-border)] bg-[var(--gm-earth-dark)] p-4">
                      <p className="text-sm text-[var(--gm-muted)]">Transparency Score</p>
                      <p className="text-3xl font-bold text-[var(--gm-primary)]">
                        {metric.transparencyScore}/100
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[var(--gm-border)] bg-[var(--gm-earth-dark)] p-4">
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--gm-muted)]">
                      Community Benefit Gap Analysis
                    </h4>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <div className="h-32 rounded bg-[var(--gm-primary)]/20">
                          <div
                            className="h-full rounded bg-gradient-to-t from-[var(--gm-primary)] to-[var(--gm-gold-light)] transition-all"
                            style={{ height: `${100 - metric.communityBenefitGap}%` }}
                          />
                        </div>
                        <p className="mt-2 text-center text-xs text-[var(--gm-muted)]">
                          Benefits Delivered
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="h-32 rounded bg-[var(--gm-earth-dark)]">
                          <div
                            className="h-full rounded bg-gradient-to-t from-red-500 to-red-700 transition-all"
                            style={{ height: `${metric.communityBenefitGap}%` }}
                          />
                        </div>
                        <p className="mt-2 text-center text-xs text-[var(--gm-muted)]">
                          Gap to Close
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[var(--gm-border)] bg-[var(--gm-earth-dark)] p-4">
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--gm-muted)]">
                      Strategic Position
                    </h4>
                    <div className="space-y-2 text-sm">
                      {metric.unresolvedClaims > 0 && (
                        <div className="flex items-center gap-2 text-amber-400">
                          <AlertCircle className="h-4 w-4" />
                          <span>{metric.unresolvedClaims} unresolved claims create negotiation leverage</span>
                        </div>
                      )}
                      {metric.slpOutstanding > 0 && (
                        <div className="flex items-center gap-2 text-[var(--gm-primary)]">
                          <TrendingUp className="h-4 w-4" />
                          <span>{metric.slpOutstanding} outstanding SLP commitments provide accountability mechanism</span>
                        </div>
                      )}
                      {metric.transparencyScore < 50 && (
                        <div className="flex items-center gap-2 text-red-400">
                          <TrendingDown className="h-4 w-4" />
                          <span>Low transparency score indicates information asymmetry - opportunity for disclosure demands</span>
                        </div>
                      )}
                      {metric.disputedAreas > 0 && (
                        <div className="flex items-center gap-2 text-amber-400">
                          <AlertCircle className="h-4 w-4" />
                          <span>{metric.disputedAreas} disputed areas require boundary clarification</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}