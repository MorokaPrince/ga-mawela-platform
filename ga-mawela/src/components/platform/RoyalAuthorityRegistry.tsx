"use client";

import { useState } from "react";
import { Crown, Users, Scroll, FileText, ChevronDown, ChevronUp } from "lucide-react";
import type { RoyalLineageEntry } from "@/data/platformData";

interface RoyalAuthorityRegistryProps {
  lineage: RoyalLineageEntry[];
}

export function RoyalAuthorityRegistry({ lineage }: RoyalAuthorityRegistryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30">
            <Crown className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--gm-foreground)]">
              Royal Authority Registry
            </h2>
            <p className="text-sm text-[var(--gm-muted)]">
              Documented lineage and governance authority of Ga-Mawela
            </p>
          </div>
        </div>
      </div>

      {/* Authority Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="gm-row flex flex-col items-center text-center">
          <Crown className="mb-2 h-6 w-6 text-amber-400" />
          <p className="text-3xl font-bold text-[var(--gm-primary)]">{lineage.length}</p>
          <p className="text-sm text-[var(--gm-muted)]">Authority Lines</p>
        </div>
        <div className="gm-row flex flex-col items-center text-center">
          <Users className="mb-2 h-6 w-6 text-emerald-400" />
          <p className="text-3xl font-bold text-[var(--gm-foreground)]">11</p>
          <p className="text-sm text-[var(--gm-muted)]">Farms Under Authority</p>
        </div>
        <div className="gm-row flex flex-col items-center text-center">
          <Scroll className="mb-2 h-6 w-6 text-blue-400" />
          <p className="text-3xl font-bold text-[var(--gm-foreground)]">2000+</p>
          <p className="text-sm text-[var(--gm-muted)]">Years Continuous</p>
        </div>
      </div>

      {/* Lineage Entries */}
      <div className="space-y-4">
        {lineage.map((entry) => (
          <div
            key={entry.id}
            className="gm-row"
          >
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30">
                    <Crown className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--gm-foreground)]">
                      {entry.headmanName}
                    </h3>
                    <p className="text-sm text-[var(--gm-primary)]">{entry.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-[var(--gm-muted)]">Period</p>
                    <p className="font-medium text-[var(--gm-foreground)]">{entry.period}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[var(--gm-muted)]">Farm</p>
                    <p className="font-medium text-[var(--gm-primary)]">{entry.farmId}</p>
                  </div>
                  <button
                    onClick={() => toggleExpand(entry.id)}
                    className="gm-btn-secondary p-2"
                    aria-label="Toggle details"
                  >
                    {expandedId === entry.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Genealogy */}
              <p className="text-[var(--gm-muted)]">{entry.genealogy}</p>

              {/* Expanded Details */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedId === entry.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="mt-4 border-t border-[var(--gm-border)] pt-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gm-muted)]">
                    <FileText className="h-4 w-4" />
                    Documentary Evidence
                  </h4>
                  {entry.documentaryEvidence.length > 0 ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {entry.documentaryEvidence.map((doc, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[var(--gm-border)] bg-[var(--gm-earth-dark)] p-3"
                        >
                          <p className="font-medium text-[var(--gm-foreground)]">{doc.title}</p>
                          <p className="text-sm text-[var(--gm-muted)]">{doc.description}</p>
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="text-[var(--gm-muted)]">{doc.date}</span>
                            <span className="text-[var(--gm-primary)]">{doc.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--gm-muted)]">
                      No documentary evidence uploaded. Oral testimony and community records serve as primary sources.
                    </p>
                  )}

                  <div className="mt-4">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gm-muted)]">
                      <Scroll className="h-4 w-4" />
                      Oral Testimony
                    </h4>
                    <div className="rounded-lg border border-[var(--gm-border)] bg-[var(--gm-earth-dark)] p-4">
                      <p className="text-sm leading-relaxed text-[var(--gm-muted)]">
                        {entry.genealogy}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-amber-500/20 px-2 py-1 text-amber-400">
                          Oral History
                        </span>
                        <span className="text-[var(--gm-muted)]">Recorded: {entry.period}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legal Significance */}
      <div className="gm-row">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gm-muted)]">
              <Crown className="h-4 w-4 text-amber-400" />
              Legal Recognition
            </h4>
            <p className="text-sm leading-relaxed text-[var(--gm-muted)]">
              The Royal Authority Registry documents continuous governance from pre-colonial times through present day. This unbroken chain of authority provides crucial evidence for land claim legitimacy under South African land restitution frameworks.
            </p>
          </div>
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gm-muted)]">
              <Users className="h-4 w-4 text-emerald-400" />
              Community Standing
            </h4>
            <p className="text-sm leading-relaxed text-[var(--gm-muted)]">
              Recognition of traditional leadership structures strengthens negotiation position with mining companies and government entities. The registry demonstrates organized, legitimate community representation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}