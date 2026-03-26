export type SectionId =
  | "home"
  | "mines"
  | "slp"
  | "community"
  | "opportunities"
  | "transparency"
  | "report"
  | "documents"
  | "representation"
  | "benefits";

export type CompanyFilter =
  | "All"
  | "Glencore"
  | "Anglo American Platinum"
  | "Regional";

export type SectionConfig = {
  id: SectionId;
  label: string;
  eyebrow: string;
  description: string;
  accent: string;
  backgroundImage: string;
};

export type MinePoint = {
  id: string;
  name: string;
  company: string;
  companyFilter: CompanyFilter;
  commodity: string;
  type: "land parcel" | "mine" | "project" | "processing hub";
  corridor: "Ga-Mawela" | "Primary" | "Secondary" | "Regional";
  description: string;
  communityImpact: string;
  slpStatus: "Linked" | "Placeholder";
  x: number;
  y: number;
};

export type SlpCommitment = {
  id: string;
  mineId: string;
  mineName: string;
  company: string;
  type: "Jobs" | "Schools" | "Roads" | "Training";
  status: "Completed" | "In Progress" | "Not Delivered";
  year: string;
  notes: string;
  detail: string;
};

export type TimelineEvent = {
  year: string;
  title: string;
  detail: string;
};

export type LegalReference = {
  title: string;
  description: string;
  focus: string;
};

export type OpportunityCard = {
  id: string;
  category: "Jobs" | "Learnerships" | "Bursaries" | "Supplier Registration";
  title: string;
  owner: string;
  status: "Open channel" | "Rolling intake" | "Placeholder watch";
  summary: string;
  howToApply: string;
  href: string;
};

export type TransparencySignal = {
  title: string;
  value: number;
  summary: string;
};

export type TransparencyMatrixRow = {
  id: string;
  theme: string;
  owner: string;
  disclosure: number;
  delivery: number;
  youthAccess: number;
  status: "Visible" | "Partial" | "Weak";
  risk: "Low" | "Medium" | "High";
  note: string;
};

export type DocumentCategory =
  | "PAIA Requests"
  | "Mining Records"
  | "SLP Documents"
  | "Community Letters";

export type LibraryDocument = {
  id: string;
  title: string;
  category: DocumentCategory;
  description: string;
  date: string;
  source: string;
  href?: string;
};

export type ResearchSource = {
  id: string;
  title: string;
  publisher: string;
  category: "Community history" | "Academic research" | "Government planning" | "Community advocacy";
  date: string;
  href: string;
  summary: string;
};

export type RepresentationNode = {
  id: string;
  label: string;
  type: "known" | "engagement" | "gap";
  note: string;
};

export type BenefitSlice = {
  label: string;
  value: number;
  summary: string;
};

export type MediaFrame = {
  id: string;
  eyebrow: string;
  title: string;
  detail: string;
  image: string;
  video?: string;
  poster?: string;
  metric: string;
};

export type VisualCard = {
  id: string;
  tag: string;
  title: string;
  summary: string;
  image: string;
};

export const sectionConfigs: SectionConfig[] = [
  {
    id: "home",
    label: "Home",
    eyebrow: "Mission control",
    description:
      "A living intelligence layer for Ga-Mawela, St George 2 JT, and the mining corridor around it.",
    accent: "#d14a28",
    backgroundImage: "/platform/media/corridor-panorama.png",
  },
  {
    id: "mines",
    label: "Mines & Operations",
    eyebrow: "Spatial view",
    description:
      "Track the corridor: ECM assets, Anglo American Platinum operations, regional mines, and the land parcel at the center.",
    accent: "#0f766e",
    backgroundImage: "/platform/media/conveyor-road.png",
  },
  {
    id: "slp",
    label: "SLP Tracker",
    eyebrow: "Commitment dashboard",
    description:
      "Monitor jobs, roads, schools, and training commitments across mines touching the wider corridor.",
    accent: "#2563eb",
    backgroundImage: "/platform/media/truck-road.png",
  },
  {
    id: "community",
    label: "Community & Land",
    eyebrow: "Land and governance",
    description:
      "Explain St George 2 JT, CPA governance, youth exclusion concerns, and the land history around Ga-Mawela.",
    accent: "#854d0e",
    backgroundImage: "/platform/media/ridge-road.png",
  },
  {
    id: "opportunities",
    label: "Opportunities",
    eyebrow: "Access hub",
    description:
      "Aggregate jobs, learnerships, bursaries, and supplier registration channels in one place.",
    accent: "#0369a1",
    backgroundImage: "/platform/media/hero-gate.png",
  },
  {
    id: "transparency",
    label: "Transparency",
    eyebrow: "Accountability lens",
    description:
      "Frame community concerns, transparency gaps, and engagement challenges in professional, evidence-led language.",
    accent: "#be123c",
    backgroundImage: "/platform/media/truck-road.png",
  },
  {
    id: "report",
    label: "Report an Issue",
    eyebrow: "Interactive intake",
    description:
      "Provide a safe channel for reporting employment, exclusion, procurement, and community issues.",
    accent: "#ca8a04",
    backgroundImage: "/platform/media/ridge-road.png",
  },
  {
    id: "documents",
    label: "Document Library",
    eyebrow: "Evidence store",
    description:
      "Centralize PAIA requests, mining records, SLP files, and community letters for future backend integration.",
    accent: "#0f766e",
    backgroundImage: "/platform/media/hero-gate.png",
  },
  {
    id: "representation",
    label: "Representation",
    eyebrow: "Stakeholder map",
    description:
      "Surface who is visible in community structures, where engagement happens, and where youth representation gaps remain.",
    accent: "#ea580c",
    backgroundImage: "/platform/media/corridor-panorama.png",
  },
  {
    id: "benefits",
    label: "Who Benefits",
    eyebrow: "Value distribution",
    description:
      "Visualize how gains may flow across companies, government, community, and still-unclear channels.",
    accent: "#047857",
    backgroundImage: "/platform/media/conveyor-road.png",
  },
];

export const heroMediaFrames: MediaFrame[] = [
  {
    id: "corridor-reel",
    eyebrow: "Live field reel",
    title: "The corridor feels active, layered, and contested.",
    detail:
      "Video, road edges, and mountain silhouettes frame the platform as a living territory rather than a static archive.",
    image: "/platform/media/hero-gate.png",
    video: "/platform/media/hero-de-brochen.mp4",
    poster: "/platform/media/two-rivers-entry.png",
    metric: "30 MB local reel integrated",
  },
  {
    id: "gate-threshold",
    eyebrow: "Thresholds",
    title: "Gates, access roads, and fencing mark who sees what.",
    detail:
      "Operational infrastructure should be read alongside community movement, land questions, and who gets access to information.",
    image: "/platform/media/hero-gate.png",
    metric: "Access points surfaced",
  },
  {
    id: "processing-road",
    eyebrow: "Industrial movement",
    title: "Conveyors and haul routes extend the story beyond a single pit.",
    detail:
      "Processing, transport, and visible logistics matter because they shape road pressure, dust, and perceptions of benefit.",
    image: "/platform/media/conveyor-road.png",
    metric: "Processing footprint visible",
  },
  {
    id: "truck-pressure",
    eyebrow: "Road impact",
    title: "Heavy movement is part of the community interface.",
    detail:
      "Trucks, plant traffic, and corridor wear make roads a practical accountability issue, not a cosmetic one.",
    image: "/platform/media/truck-road.png",
    metric: "Road pressure in view",
  },
  {
    id: "ridge-memory",
    eyebrow: "Land memory",
    title: "Ridgelines and open land keep the land parcel central.",
    detail:
      "The visual language must still return to St George 2 JT as land, identity, and governance context.",
    image: "/platform/media/ridge-road.png",
    metric: "Land first, mine second",
  },
];

export const landingVisualCards: VisualCard[] = [
  {
    id: "corridor-atlas",
    tag: "Atlas",
    title: "Corridor atlas",
    summary:
      "Large-format imagery gives the platform the same sense of place that premium editorial sites use to anchor serious stories.",
    image: "/platform/media/corridor-panorama.png",
  },
  {
    id: "gates-access",
    tag: "Access",
    title: "Entry and visibility",
    summary:
      "Who sees notices, who reaches sites, and how visible operations feel to nearby communities shape the transparency story.",
    image: "/platform/media/hero-gate.png",
  },
  {
    id: "roads-pressure",
    tag: "Movement",
    title: "Road pressure",
    summary:
      "Roads are a recurring point where community experience and extractive industry intersect most visibly.",
    image: "/platform/media/truck-road.png",
  },
  {
    id: "processing-chain",
    tag: "Industry",
    title: "Processing chain",
    summary:
      "Conveyors and plant imagery help connect extraction, processing, and the question of where value ends up.",
    image: "/platform/media/conveyor-road.png",
  },
];

export const operationalVisualCards: VisualCard[] = [
  {
    id: "haulage",
    tag: "Field note",
    title: "Haulage and surface movement",
    summary:
      "Operational traffic creates a visible interface with households, roads, and public expectations of maintenance.",
    image: "/platform/media/truck-road.png",
  },
  {
    id: "thresholds",
    tag: "Field note",
    title: "Thresholds and checkpoints",
    summary:
      "Gates and fenced access points reinforce how industry can feel physically close yet informationally distant.",
    image: "/platform/media/hero-gate.png",
  },
  {
    id: "industrial-span",
    tag: "Field note",
    title: "Industrial span",
    summary:
      "Visible plant infrastructure helps explain that the corridor is an ecosystem of linked operations, not isolated sites.",
    image: "/platform/media/conveyor-road.png",
  },
];

export const quickStats = [
  {
    label: "Operations & hubs",
    value: "8",
    note: "Mapped across primary, secondary, and regional layers.",
  },
  {
    label: "Tracked commitments",
    value: "12",
    note: "SLP items structured for backend-ready status monitoring.",
  },
  {
    label: "Opportunity channels",
    value: "4",
    note: "Jobs, learnerships, bursaries, and supplier access.",
  },
  {
    label: "Land parcel focus",
    value: "1",
    note: "St George 2 JT is land, not a mine.",
  },
];

export const updates = [
  {
    title: "St George 2 JT context clarified",
    detail:
      "The platform now visually separates the land parcel from operating mines and regional processing assets.",
  },
  {
    title: "SLP monitoring structure prepared",
    detail:
      "Status logic is in place for commitments even where source documents remain pending or partial.",
  },
  {
    title: "Youth access elevated",
    detail:
      "Opportunity and representation modules foreground the youth participation gap without drifting into accusation.",
  },
];

export const companyFilters: CompanyFilter[] = [
  "All",
  "Glencore",
  "Anglo American Platinum",
  "Regional",
];

export const minePoints: MinePoint[] = [
  {
    id: "st-george-2jt",
    name: "St George 2 JT",
    company: "Ga-Mawela land parcel",
    companyFilter: "Regional",
    commodity: "Land parcel",
    type: "land parcel",
    corridor: "Ga-Mawela",
    description:
      "St George 2 JT is a land parcel within the broader mining corridor. It should not be presented as a mine.",
    communityImpact:
      "This parcel anchors land, governance, restitution, and representation questions affecting nearby households and youth.",
    slpStatus: "Placeholder",
    x: 24,
    y: 52,
  },
  {
    id: "thorncliffe",
    name: "Thorncliffe Mine",
    company: "Glencore Eastern Chrome Mines",
    companyFilter: "Glencore",
    commodity: "Chrome",
    type: "mine",
    corridor: "Primary",
    description:
      "An ECM chrome operation in the primary corridor that influences local labour demand, logistics movement, and community expectations.",
    communityImpact:
      "Employment interest, contractor access, road use, and service pressure are recurring community interface themes.",
    slpStatus: "Linked",
    x: 40,
    y: 35,
  },
  {
    id: "helena",
    name: "Helena Mine",
    company: "Glencore Eastern Chrome Mines",
    companyFilter: "Glencore",
    commodity: "Chrome",
    type: "mine",
    corridor: "Primary",
    description:
      "Part of the ECM footprint in the corridor and a relevant node for SLP and procurement visibility.",
    communityImpact:
      "Residents often link Helena to local expectations around jobs, schools, and the fairness of information sharing.",
    slpStatus: "Linked",
    x: 51,
    y: 29,
  },
  {
    id: "magareng",
    name: "Magareng Mine",
    company: "Glencore Eastern Chrome Mines",
    companyFilter: "Glencore",
    commodity: "Chrome",
    type: "mine",
    corridor: "Primary",
    description:
      "Another ECM operation in the primary layer with direct relevance to corridor-wide monitoring.",
    communityImpact:
      "Road maintenance expectations and supplier visibility remain practical concerns around the ECM cluster.",
    slpStatus: "Linked",
    x: 57,
    y: 39,
  },
  {
    id: "twickenham",
    name: "Twickenham Mine",
    company: "Anglo American Platinum",
    companyFilter: "Anglo American Platinum",
    commodity: "Platinum",
    type: "mine",
    corridor: "Secondary",
    description:
      "A platinum operation in the broader corridor with a different commodity profile but overlapping community relevance.",
    communityImpact:
      "Its footprint influences employment expectations, regional traffic, and stakeholder engagement planning.",
    slpStatus: "Linked",
    x: 64,
    y: 47,
  },
  {
    id: "mototolo",
    name: "Mototolo Mine",
    company: "Anglo American Platinum",
    companyFilter: "Anglo American Platinum",
    commodity: "Platinum",
    type: "mine",
    corridor: "Secondary",
    description:
      "A key platinum operation in the wider mining ecosystem touching Ga-Mawela conversations through regional development debates.",
    communityImpact:
      "Learner pipelines, procurement pathways, and local visibility of commitments are recurring themes around Mototolo.",
    slpStatus: "Linked",
    x: 73,
    y: 42,
  },
  {
    id: "der-brochen",
    name: "Der Brochen Project",
    company: "Anglo American Platinum",
    companyFilter: "Anglo American Platinum",
    commodity: "Platinum",
    type: "project",
    corridor: "Secondary",
    description:
      "A project-stage development that still shapes expectations around future land use, jobs, and infrastructure commitments.",
    communityImpact:
      "Projects create anticipation and uncertainty, especially where youth seek clarity about timelines and access pathways.",
    slpStatus: "Placeholder",
    x: 81,
    y: 55,
  },
  {
    id: "dwarsrivier",
    name: "Dwarsrivier Chrome Mine",
    company: "Regional mining operation",
    companyFilter: "Regional",
    commodity: "Chrome",
    type: "mine",
    corridor: "Regional",
    description:
      "A regional chrome node that helps show the corridor beyond the two major company clusters.",
    communityImpact:
      "Useful for comparing how information, jobs, and road impacts are felt across a larger mining geography.",
    slpStatus: "Placeholder",
    x: 30,
    y: 72,
  },
  {
    id: "two-rivers",
    name: "Two Rivers Mine",
    company: "Regional platinum operation",
    companyFilter: "Regional",
    commodity: "Platinum",
    type: "mine",
    corridor: "Regional",
    description:
      "A regional platinum operation and a useful spatial reference in the Steelpoort corridor.",
    communityImpact:
      "Visible access roads and plant infrastructure make Two Rivers a strong anchor for explaining the corridor to visitors.",
    slpStatus: "Placeholder",
    x: 67,
    y: 73,
  },
  {
    id: "lion-smelter",
    name: "Lion Smelter",
    company: "Regional processing hub",
    companyFilter: "Regional",
    commodity: "Processing hub",
    type: "processing hub",
    corridor: "Regional",
    description:
      "A processing hub that extends the story beyond extraction and into downstream industrial activity.",
    communityImpact:
      "Processing assets reinforce questions about value capture, environmental burden, and who benefits along the chain.",
    slpStatus: "Placeholder",
    x: 87,
    y: 28,
  },
];

export const slpCommitments: SlpCommitment[] = [
  {
    id: "thorncliffe-jobs",
    mineId: "thorncliffe",
    mineName: "Thorncliffe Mine",
    company: "Glencore",
    type: "Jobs",
    status: "In Progress",
    year: "2025",
    notes: "Local hiring pathways need clearer communication to community applicants.",
    detail:
      "The platform treats this as active but still requiring better disclosure on intake criteria, local weighting, and recruitment timing.",
  },
  {
    id: "thorncliffe-roads",
    mineId: "thorncliffe",
    mineName: "Thorncliffe Mine",
    company: "Glencore",
    type: "Roads",
    status: "Not Delivered",
    year: "2025",
    notes: "Road maintenance expectations remain visible in community feedback.",
    detail:
      "This status is set as not delivered pending clearer evidence of corridor-facing road interventions tied to mine commitments.",
  },
  {
    id: "helena-training",
    mineId: "helena",
    mineName: "Helena Mine",
    company: "Glencore",
    type: "Training",
    status: "In Progress",
    year: "2024",
    notes: "Training channels appear active, but pathways for youth need better signposting.",
    detail:
      "Suitable for monitoring learnership notices, training eligibility, and whether completion leads to any work exposure.",
  },
  {
    id: "helena-schools",
    mineId: "helena",
    mineName: "Helena Mine",
    company: "Glencore",
    type: "Schools",
    status: "Completed",
    year: "2024",
    notes: "Education-linked support is recorded as completed in the current placeholder register.",
    detail:
      "This item remains open for document verification and can later connect to scanned evidence in the document library.",
  },
  {
    id: "magareng-jobs",
    mineId: "magareng",
    mineName: "Magareng Mine",
    company: "Glencore",
    type: "Jobs",
    status: "In Progress",
    year: "2025",
    notes: "Community expects stronger visibility on contractor and entry-level opportunities.",
    detail:
      "Suitable for tracking vendor days, employment forums, and monthly updates if disclosed in future.",
  },
  {
    id: "magareng-roads",
    mineId: "magareng",
    mineName: "Magareng Mine",
    company: "Glencore",
    type: "Roads",
    status: "Completed",
    year: "2024",
    notes: "Shown as completed in the working dashboard, subject to evidence upload.",
    detail:
      "A good example of how the platform can flag that completion status still needs linked source material.",
  },
  {
    id: "twickenham-schools",
    mineId: "twickenham",
    mineName: "Twickenham Mine",
    company: "Anglo American Platinum",
    type: "Schools",
    status: "In Progress",
    year: "2025",
    notes: "Education commitments are relevant to household trust and youth outcomes.",
    detail:
      "This row is prepared for future evidence tying project scope, delivery partner, and beneficiary geography together.",
  },
  {
    id: "twickenham-training",
    mineId: "twickenham",
    mineName: "Twickenham Mine",
    company: "Anglo American Platinum",
    type: "Training",
    status: "In Progress",
    year: "2025",
    notes: "Training visibility is present but outcome transparency remains limited.",
    detail:
      "A strong candidate for dashboard metrics such as completions, local intake share, and youth participation.",
  },
  {
    id: "mototolo-jobs",
    mineId: "mototolo",
    mineName: "Mototolo Mine",
    company: "Anglo American Platinum",
    type: "Jobs",
    status: "Completed",
    year: "2024",
    notes: "Recorded as completed in the current placeholder monitor.",
    detail:
      "This can later split into permanent roles, short-term roles, and contractor-linked access once evidence is available.",
  },
  {
    id: "mototolo-roads",
    mineId: "mototolo",
    mineName: "Mototolo Mine",
    company: "Anglo American Platinum",
    type: "Roads",
    status: "Not Delivered",
    year: "2025",
    notes: "Transport pressure remains a visible corridor issue.",
    detail:
      "Useful for documenting road wear, route congestion, and whether a commitment exists but lacks visible completion evidence.",
  },
  {
    id: "derbrochen-training",
    mineId: "der-brochen",
    mineName: "Der Brochen Project",
    company: "Anglo American Platinum",
    type: "Training",
    status: "In Progress",
    year: "Pipeline",
    notes: "Project-stage commitments need later confirmation once disclosures mature.",
    detail:
      "Project records are often less visible early on, so the dashboard treats them as future evidence slots rather than closed facts.",
  },
  {
    id: "tworivers-jobs",
    mineId: "two-rivers",
    mineName: "Two Rivers Mine",
    company: "Regional",
    type: "Jobs",
    status: "In Progress",
    year: "2025",
    notes: "Regional opportunities matter because corridor communities compare access across operators.",
    detail:
      "This placeholder row helps benchmark whether similar opportunity pipelines are easier to understand elsewhere in the region.",
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: "Historic landholding",
    title: "Ga-Mawela lineage and land memory",
    detail:
      "Community understanding locates Ga-Mawela identity within land, lineage, and settlement history in the St George 2 JT area.",
  },
  {
    year: "Mining corridor growth",
    title: "Regional extraction footprint expands",
    detail:
      "Chrome, platinum, and processing operations become a defining force in local roads, labour expectations, and governance pressure.",
  },
  {
    year: "Community structures evolve",
    title: "CPA and representation questions intensify",
    detail:
      "As mining-linked decisions become more consequential, questions about who speaks for the community become more urgent.",
  },
  {
    year: "Current period",
    title: "Youth inclusion and transparency emerge as core demands",
    detail:
      "Residents want accessible information on jobs, suppliers, land matters, and whether commitments are actually being met.",
  },
];

export const legalReferences: LegalReference[] = [
  {
    title: "Mineral and Petroleum Resources Development Act",
    description:
      "Frames how mining rights, social obligations, and engagement duties sit alongside the public interest.",
    focus: "Useful for understanding community participation, mining rights, and SLP expectations.",
  },
  {
    title: "Communal Property Associations Act",
    description:
      "Provides a governance lens for how community-held property structures should operate and remain accountable to members.",
    focus: "Useful for mapping representation, membership visibility, and internal accountability questions.",
  },
];

export const governanceCards = [
  {
    title: "CPA structure",
    summary:
      "Use the platform to map the known executive structure, meeting touchpoints, and where decisions become visible to members.",
  },
  {
    title: "Youth exclusion issue",
    summary:
      "Youth are central to employment and supplier demand, yet their representation in decision pathways can remain limited or unclear.",
  },
  {
    title: "Land claim context",
    summary:
      "Competing narratives, including the Mankge family claim discussion, should be presented carefully as part of an ongoing land and governance context.",
  },
];

export const opportunities: OpportunityCard[] = [
  {
    id: "jobs-watch",
    category: "Jobs",
    title: "Mining corridor jobs watch",
    owner: "Company career portals and local notice channels",
    status: "Rolling intake",
    summary:
      "Monitor mining companies and contractors for local openings, artisan roles, administration, security, and entry-level posts.",
    howToApply:
      "Prepare a current CV, ID copy, proof of residence where requested, and track official recruitment pages rather than informal intermediaries.",
    href: "#jobs-watch",
  },
  {
    id: "learnership-watch",
    category: "Learnerships",
    title: "Technical learnership pipeline",
    owner: "Mining operators and training partners",
    status: "Open channel",
    summary:
      "Use this module to publish learnerships tied to engineering, plant operations, safety, and business administration.",
    howToApply:
      "Check qualification requirements early, gather certified documents, and watch for short application windows.",
    href: "#learnership-watch",
  },
  {
    id: "bursary-watch",
    category: "Bursaries",
    title: "Bursary and study funding tracker",
    owner: "Corporate social investment and education partners",
    status: "Placeholder watch",
    summary:
      "A structured space for tertiary bursaries, TVET support, and bridging programs focused on youth progression.",
    howToApply:
      "Upload academic results, a motivation letter, and community-linked proof where required, then track announced closing dates.",
    href: "#bursary-watch",
  },
  {
    id: "supplier-watch",
    category: "Supplier Registration",
    title: "Supplier registration access point",
    owner: "Procurement portals and vendor onboarding teams",
    status: "Open channel",
    summary:
      "A practical route for local businesses to understand onboarding requirements and bid-readiness basics.",
    howToApply:
      "Prepare CIPC, tax, banking, B-BBEE, safety, and capability documents before registration windows open.",
    href: "#supplier-watch",
  },
];

export const applicationSteps = [
  "Build a document pack: CV, ID, proof of address, qualifications, tax and banking records where relevant.",
  "Track only official channels, noticeboards, and verified company or procurement links.",
  "Record submission dates and reference numbers so follow-ups remain evidence-based.",
];

export const transparencySignals: TransparencySignal[] = [
  {
    title: "Commitments with visible delivery evidence",
    value: 42,
    summary: "Current placeholder estimate showing how much can already be surfaced in a structured way.",
  },
  {
    title: "Commitments needing stronger disclosure",
    value: 58,
    summary: "A signal that transparency work still matters even before final evidence is loaded into the system.",
  },
  {
    title: "Youth-centered opportunity visibility",
    value: 35,
    summary: "Represents the portion of opportunity pathways that are easy to understand today.",
  },
];

export const transparencyMatrixRows: TransparencyMatrixRow[] = [
  {
    id: "jobs-local-access",
    theme: "Local jobs access",
    owner: "Mine HR and contractor channels",
    disclosure: 48,
    delivery: 44,
    youthAccess: 39,
    status: "Partial",
    risk: "High",
    note:
      "Recruitment routes exist, but local weighting, shortlisting visibility, and contractor access still need clearer disclosure.",
  },
  {
    id: "training-pipeline",
    theme: "Training and learnership pipelines",
    owner: "SLP and training partners",
    disclosure: 58,
    delivery: 52,
    youthAccess: 55,
    status: "Partial",
    risk: "Medium",
    note:
      "Learnership pathways are visible in principle, but progression into practical workplace opportunities remains uneven.",
  },
  {
    id: "roads-maintenance",
    theme: "Roads and corridor maintenance",
    owner: "Operators and public infrastructure stakeholders",
    disclosure: 34,
    delivery: 29,
    youthAccess: 22,
    status: "Weak",
    risk: "High",
    note:
      "Road pressure is highly visible to residents, while evidence of sustained corridor-facing maintenance remains inconsistent.",
  },
  {
    id: "procurement-local",
    theme: "Local procurement access",
    owner: "Procurement and supplier onboarding teams",
    disclosure: 41,
    delivery: 37,
    youthAccess: 33,
    status: "Weak",
    risk: "High",
    note:
      "Supplier registration channels exist, but local SMEs still need easier onboarding guidance, timing visibility, and feedback loops.",
  },
  {
    id: "community-notices",
    theme: "Community notice visibility",
    owner: "Mine-community engagement channels",
    disclosure: 63,
    delivery: 57,
    youthAccess: 46,
    status: "Visible",
    risk: "Medium",
    note:
      "Notice flow is more visible than some other categories, but timing, language access, and household reach are still uneven.",
  },
  {
    id: "land-governance",
    theme: "Land and governance communication",
    owner: "CPA and related stakeholders",
    disclosure: 46,
    delivery: 42,
    youthAccess: 28,
    status: "Partial",
    risk: "High",
    note:
      "Land identity is clearer in the platform than in many public discussions, but youth-facing governance visibility remains limited.",
  },
];

export const concernCards = [
  {
    title: "Community concerns",
    summary:
      "Residents seek clearer information on jobs, procurement access, roads, and whether benefits are reaching the intended local audience.",
  },
  {
    title: "Transparency gaps",
    summary:
      "Disclosures are often fragmented across company updates, public documents, and word-of-mouth channels.",
  },
  {
    title: "Engagement challenges",
    summary:
      "Participation quality depends on whether meetings, notices, and representation structures are understandable and inclusive.",
  },
];

export const communityVoices = [
  "Young people want fair access pathways, not only announcements after decisions are already made.",
  "Community members need one place where documents, commitments, and contact points can be checked quickly.",
  "A neutral transparency platform can reduce confusion and support more informed engagement with stakeholders.",
];

export const libraryCategories: DocumentCategory[] = [
  "PAIA Requests",
  "Mining Records",
  "SLP Documents",
  "Community Letters",
];

export const baseDocuments: LibraryDocument[] = [
  {
    id: "doc-gamawela-history",
    title: "History of the Ga Mawela Community",
    category: "Mining Records",
    description:
      "A long-form historical record of Ga Mawela, St George 2 JT, settlement patterns, and the mining geography around the community.",
    date: "Historical archive",
    source: "South African History Online",
    href: "https://www.sahistory.org.za/sites/default/files/History%20of%20the%20Gamawela%20Community.pdf",
  },
  {
    id: "doc-present-struggle",
    title: "History of the Present Struggle",
    category: "PAIA Requests",
    description:
      "Community advocacy material describing the Ga Mawela land claim process, the St George farm claim, and development pressures in Sekhukhune.",
    date: "2001-05-01",
    source: "Mines and Communities",
    href: "https://www.minesandcommunities.org/article.php?a=4044",
  },
  {
    id: "doc-trapped-promised-land",
    title: "The Trapped 'Promised Land'",
    category: "SLP Documents",
    description:
      "Recent academic analysis of the Ga Mawela community land claim and the social pressures around restitution and governance in Limpopo.",
    date: "2025-08-22",
    source: "Noyam Journals",
    href: "https://noyam.org/ehass20256913/",
  },
  {
    id: "doc-ftlm-idp",
    title: "Fetakgomo Tubatse Local Municipality IDP & Budget Executive Summary",
    category: "SLP Documents",
    description:
      "Municipal planning context used to read roads, service delivery, settlements, and the wider mining corridor conditions affecting Ga Mawela.",
    date: "2022-06-21",
    source: "Fetakgomo Tubatse Local Municipality",
    href: "https://www.ftlm.gov.za/sstaff/pages/sites/fgtm/documents/idp/FTLM%202022-23%20IDP%26%20BUDGET%20EXECUTIVE%20SUMMARY220621.pdf",
  },
  {
    id: "doc-local-brief",
    title: "Ga-Mawela supporting development brief",
    category: "Community Letters",
    description:
      "The local project brief already included in the repository for community-facing reference during demos and local reviews.",
    date: "2025-12-06",
    source: "Platform archive",
    href: "/Images/Mining/May%20Rakgama%20S%20Dev.pdf",
  },
];

export const researchSources: ResearchSource[] = [
  {
    id: "source-sahistory",
    title: "History of the Ga Mawela Community",
    publisher: "South African History Online",
    category: "Community history",
    date: "Archive PDF",
    href: "https://www.sahistory.org.za/sites/default/files/History%20of%20the%20Gamawela%20Community.pdf",
    summary:
      "Best single public historical source for the farm St George 2 JT, settlement history, lineage, and regional mineral context.",
  },
  {
    id: "source-mac-struggle",
    title: "History of the Present Struggle",
    publisher: "Mines and Communities",
    category: "Community advocacy",
    date: "2001-05-01",
    href: "https://www.minesandcommunities.org/article.php?a=4044",
    summary:
      "Primary community advocacy text on the land claim, development pressures, and the legal path around Ga Mawela's claim to St George.",
  },
  {
    id: "source-mac-overview",
    title: "Ga Mawela Community archive page",
    publisher: "Mines and Communities",
    category: "Community advocacy",
    date: "Archive page",
    href: "https://www.minesandcommunities.org/article.php?a=122",
    summary:
      "Useful archive entry point for older Ga Mawela material and connected advocacy reporting around the community.",
  },
  {
    id: "source-noyam",
    title: "The Trapped 'Promised Land': An Interrogation of the Ga Mawela Community Land Claim, Polokwane, Limpopo",
    publisher: "Noyam Journals",
    category: "Academic research",
    date: "2025-08-22",
    href: "https://noyam.org/ehass20256913/",
    summary:
      "Recent peer-reviewed analysis that gives the portal a current research reference instead of relying only on older advocacy and archive materials.",
  },
  {
    id: "source-ftlm-idp",
    title: "FTLM 2022-23 IDP & Budget Executive Summary",
    publisher: "Fetakgomo Tubatse Local Municipality",
    category: "Government planning",
    date: "2022-06-21",
    href: "https://www.ftlm.gov.za/sstaff/pages/sites/fgtm/documents/idp/FTLM%202022-23%20IDP%26%20BUDGET%20EXECUTIVE%20SUMMARY220621.pdf",
    summary:
      "Government planning context that helps interpret local roads, services, and development pressure across the wider corridor.",
  },
];

export const representationNodes: RepresentationNode[] = [
  {
    id: "assembly",
    label: "Community assembly",
    type: "known",
    note: "Broader member base that should remain central to legitimacy and accountability.",
  },
  {
    id: "cpa-executive",
    label: "CPA executive / office bearers",
    type: "known",
    note: "Executive structure is the main governance layer to watch for visibility and reporting.",
  },
  {
    id: "stakeholders",
    label: "Mine and stakeholder engagement forum",
    type: "engagement",
    note: "The point where company-community conversations often become formalized.",
  },
  {
    id: "youth-gap",
    label: "Youth representation gap",
    type: "gap",
    note: "A recurring concern where young people seek clearer seats, voice, and decision visibility.",
  },
];

export const benefitSlices: BenefitSlice[] = [
  {
    label: "Mining companies",
    value: 38,
    summary: "Capital returns, production continuity, and supply chain leverage remain concentrated here.",
  },
  {
    label: "Government and public systems",
    value: 24,
    summary: "Revenue, regulation, and infrastructure obligations sit partly in this layer.",
  },
  {
    label: "Community",
    value: 18,
    summary: "Benefits are most visible when jobs, training, roads, and procurement access become tangible.",
  },
  {
    label: "Unknown or unclear channels",
    value: 20,
    summary: "This slice represents the transparency gap the platform is designed to shrink.",
  },
];
