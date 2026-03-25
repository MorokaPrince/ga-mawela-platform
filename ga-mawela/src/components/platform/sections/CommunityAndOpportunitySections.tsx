"use client";

import {
  GlassPanel,
  LinearMeter,
  RingMeter,
  SectionShell,
  StatusBadge,
} from "@/components/platform/PlatformPrimitives";
import type {
  OpportunityCard,
  SectionConfig,
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
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
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
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
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
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 md:grid-cols-2">
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

        <div className="grid gap-5">
          <GlassPanel>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              Application checklist
            </p>
            <div className="mt-5 space-y-3">
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
        </div>
      </div>
    </SectionShell>
  );
}

export function TransparencySection({
  config,
  signals,
}: {
  config: SectionConfig;
  signals: TransparencySignal[];
}) {
  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title="Transparency & accountability"
      description="The tone stays professional: community concerns, transparency gaps, and engagement challenges are framed as governance and disclosure issues rather than accusations."
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassPanel>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
            Signals
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

        <div className="grid gap-5">
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

          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <RingMeter
              label="Current disclosure maturity"
              value={46}
              accent="#d14a28"
              summary="A working score showing that the platform can already structure issues even where source records are incomplete."
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
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
