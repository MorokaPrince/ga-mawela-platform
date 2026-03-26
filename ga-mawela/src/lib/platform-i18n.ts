import type { SectionId } from "@/data/platformData";

export type PlatformLocale = "en" | "nso";

type LocalizedSectionMeta = {
  label: string;
  eyebrow: string;
};

type PlatformLanguagePack = {
  languageLabel: string;
  searchPlaceholder: string;
  appTitle: string;
  appSubtitle: string;
  moduleLabel: string;
  filterLabel: string;
  searchLabel: string;
  allRecords: string;
  switching: string;
  liveUpdate: string;
  quickAccess: string;
  quickAction: string;
  opportunities: string;
  submitIssue: string;
  signIn: string;
  signOut: string;
  dashboard: string;
  welcomeBack: string;
  lightMode: string;
  darkMode: string;
  footer: string;
  commentTitle: string;
  commentPrompt: string;
  commentName: string;
  commentMessage: string;
  commentButton: string;
  commentEmptyTitle: string;
  commentEmptyDetail: string;
  matrixTitle: string;
  matrixDescription: string;
  chartOverview: string;
  reportSave: string;
  reportDescription: string;
  sections: Record<SectionId, LocalizedSectionMeta>;
};

export const platformCopy: Record<PlatformLocale, PlatformLanguagePack> = {
  en: {
    languageLabel: "Language",
    searchPlaceholder: "Search mines, commitments, opportunities, and documents",
    appTitle: "Mining & Community Intelligence Platform",
    appSubtitle:
      "A professional landing experience for transparency, land awareness, SLP visibility, and opportunity access around St George 2 JT in Limpopo.",
    moduleLabel: "Module",
    filterLabel: "Filter",
    searchLabel: "Search",
    allRecords: "All records",
    switching: "Switching...",
    liveUpdate: "Live update",
    quickAccess: "Quick access",
    quickAction: "Quick action",
    opportunities: "Opportunities",
    submitIssue: "Submit issue",
    signIn: "Sign in",
    signOut: "Sign out",
    dashboard: "Dashboard",
    welcomeBack: "Welcome",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    footer:
      "World-class transparency interface for Ga-Mawela. Frontend now structured for backend integration, document pipelines, participation workflows, and richer data feeds.",
    commentTitle: "Community comments",
    commentPrompt:
      "Residents, members, and youth participants can add grounded observations to keep the accountability view current.",
    commentName: "Name",
    commentMessage: "Comment",
    commentButton: "Add comment",
    commentEmptyTitle: "No community comments yet.",
    commentEmptyDetail:
      "The first accountability comment submitted by a resident or member will appear here.",
    matrixTitle: "Accountability matrix",
    matrixDescription:
      "A matrix view makes transparency easier to compare across jobs, procurement, roads, notices, and governance.",
    chartOverview: "Dashboard signals",
    reportSave: "Submit report",
    reportDescription:
      "A neutral intake point for concerns around employment, exclusion, procurement, or related community experience. Records are submitted through the backend when available and fall back locally if needed.",
    sections: {
      home: { label: "Home", eyebrow: "Mission control" },
      mines: { label: "Mines & Operations", eyebrow: "Spatial view" },
      slp: { label: "SLP Tracker", eyebrow: "Commitment dashboard" },
      community: { label: "Community & Land", eyebrow: "Land and governance" },
      opportunities: { label: "Opportunities", eyebrow: "Access hub" },
      transparency: { label: "Transparency", eyebrow: "Accountability lens" },
      report: { label: "Report an Issue", eyebrow: "Interactive intake" },
      documents: { label: "Document Library", eyebrow: "Evidence store" },
      representation: { label: "Representation", eyebrow: "Stakeholder map" },
      benefits: { label: "Who Benefits", eyebrow: "Value distribution" },
    },
  },
  nso: {
    languageLabel: "Polelo",
    searchPlaceholder: "Nyaka meepo, boitlamo, menyetla le ditokomane",
    appTitle: "Polatifomo ya Meepo le Setshaba",
    appSubtitle:
      "Portal ya profeshenale ya ponagalo, temoso ya naga, tatelelo ya SLP, le phihlelelo ya menyetla tikologong ya St George 2 JT ka Limpopo.",
    moduleLabel: "Karolo",
    filterLabel: "Sefahlego",
    searchLabel: "Nyako",
    allRecords: "Direkhoto ka moka",
    switching: "Go fetola...",
    liveUpdate: "Tsebiso ya bjale",
    quickAccess: "Phihlelelo ya ka pela",
    quickAction: "Tiro ya ka pela",
    opportunities: "Menyetla",
    submitIssue: "Bega taba",
    signIn: "Tsena",
    signOut: "Tswa",
    dashboard: "Dashboard",
    welcomeBack: "Amogelehile",
    lightMode: "Mokgwa wa seetsa",
    darkMode: "Mokgwa wa leswiswi",
    footer:
      "Segokanyi sa ponagalo sa Ga-Mawela. Frontend bjale e rulagantswe bakeng sa backend, ditokomane, go tsaya karolo, le diphepelo tse dingwe tsa data.",
    commentTitle: "Dikakgelo tsa setshaba",
    commentPrompt:
      "Badudi, maloko le bafsa ba ka tsenya dikakgelo tse di theilwego tabeng gore pono ya boikarabelo e dule e le ya bjale.",
    commentName: "Leina",
    commentMessage: "Kakgelo",
    commentButton: "Tsenya kakgelo",
    commentEmptyTitle: "Ga go na dikakgelo gabjale.",
    commentEmptyDetail:
      "Kakgelo ya pele ya boikarabelo go tswa go modudi goba leloko e tla bonagala mo.",
    matrixTitle: "Matriki ya boikarabelo",
    matrixDescription:
      "Pono ya matriki e dira gore go bapetsa ponagalo go be bonolo godimo ga mesomo, procurement, ditsela, ditsebiso le taolo.",
    chartOverview: "Pono ya dashboard",
    reportSave: "Romela pego",
    reportDescription:
      "Ke tsela ya go amogela dingongorego ntle le kgethollo mabapi le mosomo, go se akaretswe, procurement, goba maitemogelo a mangwe a setshaba. Direkhoto di romelwa ka backend ge e le gona gomme di boela go leveleng ge go hlokega.",
    sections: {
      home: { label: "Gae", eyebrow: "Taolo ya morero" },
      mines: { label: "Meepo le Ditshepetso", eyebrow: "Pono ya lefelo" },
      slp: { label: "Molatedi wa SLP", eyebrow: "Dashboard ya boitlamo" },
      community: { label: "Setshaba le Naga", eyebrow: "Naga le taolo" },
      opportunities: { label: "Menyetla", eyebrow: "Hub ya phihlelelo" },
      transparency: { label: "Ponagalo", eyebrow: "Pono ya boikarabelo" },
      report: { label: "Bega Taba", eyebrow: "Go amogela ka poledisano" },
      documents: { label: "Laeborari ya Ditokomane", eyebrow: "Polokelo ya bohlatse" },
      representation: { label: "Kemedi", eyebrow: "Mmapa wa batshwarakabelo" },
      benefits: { label: "Ke Mang yo a Holegago", eyebrow: "Kabo ya boleng" },
    },
  },
};
