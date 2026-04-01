"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  GitBranch,
  Images,
  Landmark,
  MapPinned,
  Mountain,
  ScrollText,
  ShieldAlert,
  Trees,
  UsersRound,
} from "lucide-react";
import { GlassPanel, SectionShell } from "@/components/platform/PlatformPrimitives";
import type { SectionConfig, SectionId } from "@/data/platformData";
import type { PlatformLocale } from "@/lib/platform-i18n";

const historyLayers = [
  {
    id: "public-record",
    icon: ScrollText,
    title: "Public record",
    summary:
      "The South African History Online archive places St George 2 JT within the wider Ga-Mawela area in Greater Sekhukhune and links it to the Dwars River / Tubatse landscape, sacred places, and dispossession history.",
  },
  {
    id: "oral-lineage",
    icon: GitBranch,
    title: "Oral lineage lane",
    summary:
      "Platform-submitted family material can still trace Masetu, Lesedi, Moroka, and related branches, but it is framed here as community oral history until fuller documentary support is attached.",
  },
  {
    id: "verification",
    icon: UsersRound,
    title: "Verification lane",
    summary:
      "Family records, photographs, affidavits, clan spellings, and burial-memory notes can be compared rather than flattened into a single untested lineage diagram.",
  },
  {
    id: "accountability",
    icon: ShieldAlert,
    title: "Accountability thread",
    summary:
      "Land history, mining exposure, representation, and current non-delivery concerns are connected so the platform behaves like one system instead of several disconnected pages.",
  },
];

const lineageNodes = [
  {
    id: "masetu",
    label: "Masetu",
    badge: "Community oral archive",
    detail:
      "Family narratives already shaping this platform place Masetu at the root of an important leadership and settlement memory that deserves a dedicated evidence trail.",
  },
  {
    id: "lesedi",
    label: "Lesedi",
    badge: "Succession branch",
    detail:
      "Presented in oral submissions as a major branch through which present-day descendants continue to interpret leadership, land memory, and belonging.",
  },
  {
    id: "moroka",
    label: "Moroka",
    badge: "Succession branch",
    detail:
      "Also presented in oral submissions as a key family line whose descendants remain visible across Sekhukhune, Tubatse, and Jane Furse-linked networks.",
  },
  {
    id: "descendants",
    label: "Living descendants",
    badge: "Open lineage map",
    detail:
      "The tree remains intentionally open so families can extend it with records tied to Masetu, Lesedi, Moroka, Mankge, Lerutla, Magane / Makgane, and related households.",
  },
];

const publicTimeline = [
  {
    period: "Early 1800s",
    title: "Settlement memory enters the archival record",
    detail:
      "The SAHO history situates Ga-Mawela in the Dwars River valley and records oral history about earlier settlement and leadership in the area.",
  },
  {
    period: "1830s",
    title: "Claimant ancestry is tied to the St George area",
    detail:
      "The same archive timeline references claimant ancestors occupying what became St George 2 JT, establishing why land identity and family memory remain central today.",
  },
  {
    period: "1950s to 1970s",
    title: "Forced removals scatter households",
    detail:
      "Families are described as being dispersed across multiple settlements and tribal authorities, including Jane Furse and wider Greater Sekhukhune communities.",
  },
  {
    period: "1998",
    title: "Land-claim discussions compile a shared timeline",
    detail:
      "Community discussions used in the land-claim process produced a formal dispossession timeline, giving the platform a bridge between oral testimony and archive work.",
  },
  {
    period: "2025",
    title: "Current research shows the claim is still socially unfinished",
    detail:
      "The Noyam study argues that delayed restoration continues to reinforce landlessness, poverty, and unresolved governance pressure around the Ga-Mawela claim.",
  },
];

const culturalBoard = [
  {
    id: "oral-circles",
    title: "Oral history circles",
    status: "Programming lane",
    detail:
      "Record elder testimony, family narratives, and place-memory before they disappear, then route them into the document library and lineage map.",
  },
  {
    id: "dikoma",
    title: "Dikoma and mphato memory days",
    status: "Seasonal heritage",
    detail:
      "The archive notes initiation remains and intergenerational learning on the land, making Dikoma-linked programming a legitimate part of the cultural interface.",
  },
  {
    id: "knowledge-park",
    title: "Youth knowledge park and social club",
    status: "Community activation",
    detail:
      "A practical meeting space for descendants to learn history, compare family records, build digital skills, and connect heritage to present-day opportunity access.",
  },
  {
    id: "heritage-walks",
    title: "Heritage walks and river mapping",
    status: "Field route",
    detail:
      "Walks can connect sacred pools, caves, grazing routes, initiation sites, and ridgelines to the same digital map used for mining and governance accountability.",
  },
];

const territoryMarkers = [
  "St George 2 JT remains the anchor land parcel in the story.",
  "Dwars River / Steelpoort / Tubatse geography ties land memory to current extraction pressure.",
  "Families remain spread across Sekhukhune settlements, Tubatse routes, and Jane Furse-linked households.",
  "Sacred places, initiation sites, furrows, and kraals make heritage a land-use issue, not just a museum topic.",
];

const sourceLinks = [
  {
    id: "saho",
    tag: "Public archive",
    title: "History of the Ga Mawela Community",
    publisher: "South African History Online",
    href: "https://www.sahistory.org.za/sites/default/files/History%20of%20the%20Gamawela%20Community.pdf",
    summary:
      "Best single public source for St George 2 JT, the Dwars River / Tubatse setting, sacred sites, initiation remains, and the scattering of households.",
  },
  {
    id: "noyam",
    tag: "Current research",
    title: "The Trapped 'Promised Land'",
    publisher: "Noyam Journals, 22 August 2025",
    href: "https://noyam.org/ehass20256913/",
    summary:
      "Recent peer-reviewed context on delayed restoration, landlessness, poverty, and the unfinished community impact of the claim.",
  },
];

const galleryFrames = [
  {
    id: "gallery-river",
    title: "River and ridge frame",
    image: "/Images/Gallery/Ga Mawela Debrochen Proj 2 Rivers.png",
  },
  {
    id: "gallery-ground",
    title: "Ground memory",
    image: "/Images/Gallery/Ga Mawela Debrochen Proj 7.png",
  },
  {
    id: "gallery-territory",
    title: "Territory observation",
    image: "/Images/Gallery/Ga Mawela Debrochen Proj 8.png",
  },
  {
    id: "gallery-site",
    title: "Field documentation",
    image: "/Images/Gallery/Ga Mawela Debrochen Proj 10.png",
  },
];

export function HistoryLineageSection({
  config,
  locale,
  onSectionChange,
}: {
  config: SectionConfig;
  locale: PlatformLocale;
  onSectionChange: (id: SectionId) => void;
}) {
  const copy =
    locale === "nso"
      ? {
          title: "Histori, lineage, le kgopolo ya setshaba e phelago",
          description:
            "Karolo ye e kopanya public archive, lane ya oral-lineage, dibaka tsa bohwa, le programming ya setshaba gore histori ya Ga-Mawela e se ke ya sala e aroganne le boikarabelo bja meepo.",
          overview: "Archive and community review",
          tree: "Legacy tree",
          timeline: "Public record timeline",
          culture: "Culture and activity board",
          gallery: "Field gallery",
          documents: "Open documents",
          report: "Log a history gap",
          community: "Open community tab",
          sources: "Source links",
          protocol: "Verification protocol",
        }
      : {
          title: "History, lineage, and living cultural memory",
          description:
            "This tab brings public archive, oral-lineage review, heritage sites, and community programming together so Ga-Mawela history does not sit apart from mining accountability.",
          overview: "Archive and community review",
          tree: "Legacy tree",
          timeline: "Public record timeline",
          culture: "Culture and activity board",
          gallery: "Field gallery",
          documents: "Open documents",
          report: "Log a history gap",
          community: "Open community tab",
          sources: "Source links",
          protocol: "Verification protocol",
        };

  return (
    <SectionShell
      eyebrow={config.eyebrow}
      title={copy.title}
      description={copy.description}
      accent={config.accent}
      backgroundImage={config.backgroundImage}
    >
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <GlassPanel>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                {copy.overview}
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--gm-foreground)]">
                {locale === "nso"
                  ? "Public record le oral archive di bolokwa ka thoko eupsa di bala mmogo."
                  : "Public record and oral archive stay separate, but they read together."}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-200">
              <Landmark size={14} />
              {locale === "nso" ? "Legacy review" : "Legacy review"}
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--gm-muted)]">
            {locale === "nso"
              ? "Seo se dira gore histori ya setshaba, dipelaelo tsa boetapele, le boikarabelo bja meepo di se ke tsa lwantshana ka layout. Sebakeng sa moo, polatifomo e bontsha gore ke eng se tswang public archive, ke eng se tswang oral submission, le gore bohlatse bo ka tsenywa kae."
              : "This keeps community history, leadership questions, and mining-accountability work from fighting each other in the layout. Instead, the platform shows what comes from public archive, what comes from oral submission, and where more evidence can still be added."}
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {historyLayers.map((layer) => {
              const Icon = layer.icon;

              return (
                <div
                  key={layer.id}
                  className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-[var(--gm-foreground)]">
                    <Icon size={18} />
                  </div>
                  <p className="mt-4 text-base font-medium text-[var(--gm-foreground)]">
                    {layer.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                    {layer.summary}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onSectionChange("documents")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
            >
              {copy.documents}
              <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => onSectionChange("report")}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
            >
              {copy.report}
            </button>
            <button
              type="button"
              onClick={() => onSectionChange("community")}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-[var(--gm-foreground)] transition hover:bg-white/[0.08]"
            >
              {copy.community}
            </button>
          </div>
        </GlassPanel>

        <div className="grid gap-5">
          <GlassPanel>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              {copy.sources}
            </p>
            <div className="mt-5 grid gap-3">
              {sourceLinks.map((source) => (
                <a
                  key={source.id}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4 transition hover:bg-white/[0.08]"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gm-subtle)]">
                    {source.tag}
                  </p>
                  <p className="mt-3 text-lg font-medium text-[var(--gm-foreground)]">
                    {source.title}
                  </p>
                  <p className="mt-2 text-sm text-[var(--gm-foreground)]/78">{source.publisher}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">
                    {source.summary}
                  </p>
                </a>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              {copy.protocol}
            </p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                <p className="text-sm font-medium text-[var(--gm-foreground)]">
                  Family records and spellings
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                  Use this lane to compare family trees, affidavits, place names, and spellings such
                  as Magane / Makgane, Mankge, Lerutla, and related households.
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                <p className="text-sm font-medium text-[var(--gm-foreground)]">
                  Site memory and cultural evidence
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">
                  Pools, caves, initiation sites, old furrows, kraals, and burial memory can all be
                  logged as part of land-use and heritage verification.
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.03fr_0.97fr]">
        <GlassPanel>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
            {copy.tree}
          </p>
          <div className="mt-6 grid gap-3 lg:grid-cols-4">
            {lineageNodes.map((node, index) => (
              <div
                key={node.id}
                className="relative rounded-[24px] border border-white/10 bg-white/[0.05] p-4"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-sm font-semibold text-[var(--gm-foreground)]">
                  {index + 1}
                </div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gm-subtle)]">
                  {node.badge}
                </p>
                <p className="mt-3 text-xl font-semibold text-[var(--gm-foreground)]">
                  {node.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">{node.detail}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
            {copy.timeline}
          </p>
          <div className="mt-6 space-y-4">
            {publicTimeline.map((item, index) => (
              <div key={item.title} className="grid gap-4 md:grid-cols-[130px_1fr]">
                <div className="relative">
                  <div className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
                    {item.period}
                  </div>
                  {index < publicTimeline.length - 1 ? (
                    <div className="absolute left-5 top-10 h-[calc(100%+18px)] w-px bg-white/10" />
                  ) : null}
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-base font-medium text-[var(--gm-foreground)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.96fr_1.04fr]">
        <GlassPanel>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                {copy.culture}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--gm-foreground)]">
                Heritage can be active, social, and youth-facing.
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-[var(--gm-foreground)]">
              <CalendarDays size={18} />
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {culturalBoard.map((item) => (
              <div
                key={item.id}
                className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-base font-medium text-[var(--gm-foreground)]">{item.title}</p>
                  <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs text-[var(--gm-subtle)]">
                    {item.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[26px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
              Territory markers
            </p>
            <div className="mt-4 grid gap-3">
              {territoryMarkers.map((marker, index) => (
                <div key={marker} className="flex items-start gap-3">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-xs text-[var(--gm-foreground)]">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-[var(--gm-muted)]">{marker}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="overflow-hidden">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                {copy.gallery}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--gm-foreground)]">
                More real images, less generic framing.
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-[var(--gm-foreground)]">
              <Images size={18} />
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1.04fr_0.96fr]">
            <div className="grid gap-3">
              <div className="relative h-72 overflow-hidden rounded-[26px] border border-white/10">
                <Image
                  src={galleryFrames[0].image}
                  alt={galleryFrames[0].title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,28,0.06),rgba(8,12,28,0.84))]" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-slate-950/45 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
                    <Mountain size={12} />
                    Field frame
                  </div>
                  <p className="mt-3 text-xl font-medium text-white">{galleryFrames[0].title}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {galleryFrames.slice(1, 3).map((frame) => (
                  <div key={frame.id} className="relative h-40 overflow-hidden rounded-[24px] border border-white/10">
                    <Image
                      src={frame.image}
                      alt={frame.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,28,0.12),rgba(8,12,28,0.82))]" />
                    <p className="absolute bottom-0 left-0 right-0 p-4 text-sm font-medium text-white">
                      {frame.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <div className="relative h-[19rem] overflow-hidden rounded-[26px] border border-white/10">
                <Image
                  src={galleryFrames[3].image}
                  alt={galleryFrames[3].title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 28vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,28,0.12),rgba(8,12,28,0.84))]" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-lg font-medium text-white">{galleryFrames[3].title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    These gallery frames help the site feel local, evidence-led, and visually grounded.
                  </p>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-center gap-3">
                    <MapPinned size={18} className="text-[var(--gm-foreground)]" />
                    <p className="text-base font-medium text-[var(--gm-foreground)]">
                      Land and mining in one map language
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">
                    The history tab is designed to sit beside the mine map, not outside it, so land
                    identity, lineage review, and current extraction pressure remain linked.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-center gap-3">
                    <Trees size={18} className="text-[var(--gm-foreground)]" />
                    <p className="text-base font-medium text-[var(--gm-foreground)]">
                      Heritage stays active
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">
                    Sacred landscapes, rainmaking memory, gathering places, and youth learning spaces
                    are treated as living community infrastructure rather than decorative side content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </SectionShell>
  );
}
