import type { PlatformLocale } from "@/lib/platform-i18n";

type SectionUiCopy = {
  home: {
    title: string;
    description: string;
    mapEyebrow: string;
    mapTitle: string;
    openMap: string;
    mapSummary: string;
    currentNode: string;
    updatesEyebrow: string;
  };
  hero: {
    floatingEyebrow: string;
    floatingSignal: string;
    badge: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
    tertiaryAction: string;
    clarification: string;
    clarificationDetail: string;
    experience: string;
    experienceDetail: string;
    priorities: string;
    prioritiesDetail: string;
  };
  mines: {
    title: string;
    description: string;
    selectedLocation: string;
    company: string;
    commodityRole: string;
    communityImpact: string;
    linkedSlp: string;
    placeholderSlp: string;
    readingTitle: string;
    primaryLayer: string;
    primaryLayerDetail: string;
    secondaryLayer: string;
    secondaryLayerDetail: string;
    regionalLayer: string;
    regionalLayerDetail: string;
  };
  slp: {
    title: string;
    description: string;
    completed: string;
    completedNote: string;
    inProgress: string;
    inProgressNote: string;
    notDelivered: string;
    notDeliveredNote: string;
    emptyTitle: string;
    emptyDetail: string;
    mineName: string;
    commitmentType: string;
    status: string;
    notes: string;
    detailView: string;
    backendFields: string;
    evidenceSlot: string;
  };
  community: {
    title: string;
    description: string;
    coreContext: string;
    coreTitle: string;
    coreDetail: string;
    timeline: string;
    legalReference: string;
    whyItMatters: string;
    readingGuide: string;
    readingGuideDetail: string;
  };
  opportunities: {
    title: string;
    description: string;
    howToApply: string;
    openGuide: string;
    checklist: string;
    step: string;
    cvPlaceholder: string;
    cvDetail: string;
    cvBox: string;
    accessPrinciple: string;
    accessDetail: string;
  };
  transparency: {
    monitoredRows: string;
    theme: string;
    owner: string;
    disclosure: string;
    delivery: string;
    youth: string;
    risk: string;
    status: string;
    visible: string;
    partial: string;
    weak: string;
    lowRisk: string;
    mediumRisk: string;
    highRisk: string;
    disclosureMaturity: string;
    disclosureSummary: string;
    youthAccessVisibility: string;
    youthAccessSummary: string;
    statusMix: string;
    statusMixSummary: string;
    riskDistribution: string;
    riskDistributionSummary: string;
    currentMaturity: string;
    currentMaturitySummary: string;
    communityVoices: string;
    comments: string;
    anonymousPlaceholder: string;
    commentPlaceholder: string;
  };
  report: {
    title: string;
    description: string;
    formEyebrow: string;
    name: string;
    issueType: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    uploadFile: string;
    uploadHint: string;
    submit: string;
    standard: string;
    standardOne: string;
    standardTwo: string;
    standardThree: string;
    recent: string;
    emptyTitle: string;
    emptyDetail: string;
    attachment: string;
    anonymousPlaceholder: string;
  };
  documents: {
    title: string;
    description: string;
    all: string;
    emptyTitle: string;
    emptyDetail: string;
    date: string;
    source: string;
    preview: string;
    download: string;
    awaiting: string;
    uploadEyebrow: string;
    uploadTitle: string;
    uploadCategory: string;
    uploadDescription: string;
    uploadDescriptionPlaceholder: string;
    uploadFile: string;
    uploadSubmit: string;
    sourcesEyebrow: string;
    sourcesTitle: string;
  };
  representation: {
    title: string;
    description: string;
    organization: string;
    visibleYouth: string;
    visibleYouthSummary: string;
    why: string;
    whyOne: string;
    whyTwo: string;
    whyThree: string;
  };
  benefits: {
    title: string;
    description: string;
    distributionView: string;
    strategicView: string;
  };
  dashboard: {
    sqlReady: string;
    localFallback: string;
    sources: string;
    documents: string;
    members: string;
  };
};

export const platformUiCopy: Record<PlatformLocale, SectionUiCopy> = {
  en: {
    home: {
      title: "Ga-Mawela Mining & Community Platform",
      description:
        "A unified land, lineage, mining-accountability, and opportunity platform for the Ga-Mawela corridor.",
      mapEyebrow: "Interactive map preview",
      mapTitle: "Understand the corridor at a glance",
      openMap: "Open full map",
      mapSummary:
        "The preview keeps the land parcel visible alongside mines, projects, and a processing hub so the spatial story stays accurate.",
      currentNode: "Current node",
      updatesEyebrow: "Current updates",
    },
    hero: {
      floatingEyebrow: "Current corridor focus",
      floatingSignal: "Live corridor signal",
      badge: "Immersive landing sequence",
      title: "Ga-Mawela Land, Lineage & Mining Accountability",
      description:
        "One landing thread now holds land history, oral memory, mining exposure, compliance watch, source links, and youth-facing access routes for Ga-Mawela.",
      primaryAction: "Explore mines",
      secondaryAction: "Open history tab",
      tertiaryAction: "View evidence",
      clarification: "Land first",
      clarificationDetail: "St George 2 JT stays visible as territory, heritage ground, and governance space.",
      experience: "Digital thread",
      experienceDetail: "History, documents, SLP tracking, and community reporting now move together.",
      priorities: "Must-have lens",
      prioritiesDetail: "Lineage review, mining compliance watch, youth access, and community memory.",
    },
    mines: {
      title: "Mines & operations in the Ga-Mawela corridor",
      description:
        "Pins cover ECM mines, Valterra Platinum assets, regional mines, and Lion Smelter while St George 2 JT stays separate as land.",
      selectedLocation: "Selected location",
      company: "Company",
      commodityRole: "Commodity / role",
      communityImpact: "Community impact",
      linkedSlp: "SLP data can be tracked in the dashboard.",
      placeholderSlp: "Monitoring is open while linked evidence is still being assembled.",
      readingTitle: "Reading the corridor",
      primaryLayer: "Primary layer",
      primaryLayerDetail:
        "Glencore ECM assets anchor the chrome footprint: Thorncliffe, Helena, and Magareng.",
      secondaryLayer: "Secondary layer",
      secondaryLayerDetail:
        "Valterra Platinum brings Twickenham, Mototolo, and the Der Brochen project into view.",
      regionalLayer: "Regional layer",
      regionalLayerDetail:
        "Dwarsrivier, Two Rivers, and Lion Smelter extend the story into a wider industrial ecosystem.",
    },
    slp: {
      title: "Social & Labour Plan tracker",
      description:
        "The tracker shows mine name, commitment type, delivery status, and expandable notes, ready for linked evidence and local accountability workflows.",
      completed: "Completed",
      completedNote: "Items presently marked complete in the working tracker.",
      inProgress: "In progress",
      inProgressNote: "Commitments that still need ongoing monitoring and clearer disclosure.",
      notDelivered: "Not delivered",
      notDeliveredNote: "Rows requiring follow-up or visible evidence of implementation.",
      emptyTitle: "No commitments match the current filter.",
      emptyDetail: "Try widening the company or search filter to repopulate the tracker.",
      mineName: "Mine name",
      commitmentType: "Commitment type",
      status: "Status",
      notes: "Notes",
      detailView: "Detail view",
      backendFields: "Backend-ready fields",
      evidenceSlot: "Evidence slot: pending document attachment",
    },
    community: {
      title: "Community, land, and governance",
      description:
        "This page keeps the land parcel, governance frame, youth exclusion concern, and legal references together in one readable view.",
      coreContext: "Core context",
      coreTitle: "Land first, mining corridor second",
      coreDetail:
        "The platform distinguishes between land identity and mining operations. St George 2 JT should be read as a land parcel tied to governance, family history, and representation.",
      timeline: "Timeline",
      legalReference: "Legal reference",
      whyItMatters: "Why it matters",
      readingGuide: "Reading guide",
      readingGuideDetail:
        "Read the story in this order: land parcel first, governance structures second, mining corridor third, then legal and engagement questions.",
    },
    opportunities: {
      title: "Opportunities hub",
      description:
        "Jobs, learnerships, bursaries, and supplier registration sit in one place with practical guidance on how to apply.",
      howToApply: "How to apply",
      openGuide: "Open guide",
      checklist: "Application checklist",
      step: "Step",
      cvPlaceholder: "Application readiness",
      cvDetail:
        "Use this space to keep a current CV, certified documents, and proof of residence ready for official application windows.",
      cvBox: "Keep CV, ID, qualifications, and proof of residence ready.",
      accessPrinciple: "Access principle",
      accessDetail:
        "Opportunity notices should be easy to find, easy to understand, and visible before deadlines close.",
    },
    transparency: {
      monitoredRows: "monitored rows",
      theme: "Theme",
      owner: "Owner",
      disclosure: "Disclosure",
      delivery: "Delivery",
      youth: "Youth",
      risk: "Risk",
      status: "Status",
      visible: "Visible",
      partial: "Partial",
      weak: "Weak",
      lowRisk: "Low risk",
      mediumRisk: "Medium risk",
      highRisk: "High risk",
      disclosureMaturity: "Disclosure maturity",
      disclosureSummary:
        "Composite reading of disclosure quality and visible delivery across the monitored categories.",
      youthAccessVisibility: "Youth access visibility",
      youthAccessSummary:
        "How legible the corridor currently is for youth looking for jobs, training, procurement, and representation entry points.",
      statusMix: "Status mix",
      statusMixSummary:
        "A quick read of how many monitored areas are currently visible, partial, or weak.",
      riskDistribution: "Risk distribution",
      riskDistributionSummary:
        "Risk signals point to where disclosure gaps and delivery uncertainty create the strongest community pressure.",
      currentMaturity: "Current disclosure maturity",
      currentMaturitySummary:
        "A working score showing how much of the corridor can already be tracked with visible records, current sources, and grounded community reporting.",
      communityVoices: "Community voice summaries",
      comments: "comments",
      anonymousPlaceholder: "Anonymous is fine",
      commentPlaceholder:
        "Share an observation on transparency, access, notices, roads, or participation.",
    },
    report: {
      title: "Report an issue",
      description:
        "A neutral intake point for employment, exclusion, procurement, and community concerns with local capture and backend sync where available.",
      formEyebrow: "Submission form",
      name: "Name (optional)",
      issueType: "Issue type",
      descriptionLabel: "Description",
      descriptionPlaceholder:
        "Describe the issue, what happened, and what kind of follow-up would help.",
      uploadFile: "Upload file",
      uploadHint:
        "Attachments are stored with the local record and linked into the backend record when available.",
      submit: "Submit report",
      standard: "Reporting standard",
      standardOne: "Keep descriptions factual and time-bound.",
      standardTwo: "Upload supporting files where possible.",
      standardThree:
        "Reports can feed a formal review flow and role-based moderation workspace next.",
      recent: "Recent submissions",
      emptyTitle: "No issues saved yet.",
      emptyDetail: "Once a report is submitted, it will appear here as a tracked participation record.",
      attachment: "Attachment",
      anonymousPlaceholder: "Anonymous",
    },
    documents: {
      title: "Document library",
      description:
        "The library combines community history, municipal records, company reporting, local uploads, and research links into one evidence view.",
      all: "All",
      emptyTitle: "No documents match this category.",
      emptyDetail: "Switch categories or upload a file into the library.",
      date: "Date",
      source: "Source",
      preview: "Preview",
      download: "Download",
      awaiting: "Awaiting file",
      uploadEyebrow: "Upload to library",
      uploadTitle: "Title",
      uploadCategory: "Category",
      uploadDescription: "Description",
      uploadDescriptionPlaceholder: "What is this file and why does it matter?",
      uploadFile: "File",
      uploadSubmit: "Upload document",
      sourcesEyebrow: "Research sources",
      sourcesTitle: "Official links and current references",
    },
    representation: {
      title: "Community representation tracker",
      description:
        "This module shows the known structure, the engagement layer where mines and stakeholders meet the community, and the youth representation gap that still needs attention.",
      organization: "Organizational view",
      visibleYouth: "Visible youth representation",
      visibleYouthSummary:
        "A deliberately conservative score reflecting that youth inclusion remains a strategic concern across land, jobs, and governance discussions.",
      why: "Why this tracker matters",
      whyOne:
        "Representation affects how community consent, engagement, and benefit discussions are understood.",
      whyTwo:
        "Youth visibility is not cosmetic; it shapes trust, opportunity flow, and future leadership.",
      whyThree:
        "A structured tracker can later add meeting records, stakeholder names, and election or nomination evidence.",
    },
    benefits: {
      title: "Who benefits?",
      description:
        "This strategic view shows how value may be distributed across companies, government, community, and still-unclear channels.",
      distributionView: "Distribution view",
      strategicView: "strategic view",
    },
    dashboard: {
      sqlReady: "SQL ready",
      localFallback: "Local fallback",
      sources: "Sources",
      documents: "Documents",
      members: "Members",
    },
  },
  nso: {
    home: {
      title: "Naga, Lineage le Boikarabelo bja Meepo ya Ga-Mawela",
      description:
        "Ke sisteme ya lehae ya bohlale le ponagalo e kopanyang media, tatelano ya data, le backend ya sebele bakeng sa khoridoro ya Ga-Mawela.",
      mapEyebrow: "Pono ya mmapa",
      mapTitle: "Lebelela khoridoro ka pono e tee",
      openMap: "Bula mmapa ka botlalo",
      mapSummary:
        "Pono ye e boloka naga, meepo, diporojeke le lefelo la tshekatsheko di bonagala gore kgang ya lefelo e dule e nepahetse.",
      currentNode: "Lefelo la bjale",
      updatesEyebrow: "Dintlafatso tsa bjale",
    },
    hero: {
      floatingEyebrow: "Tsepamo ya khoridoro ya bjale",
      floatingSignal: "Sesupo sa khoridoro ka nako ya nnete",
      badge: "Go tsena ga maemo a godimo",
      title: "Naga, Lineage le Boikarabelo bja Meepo ya Ga-Mawela",
      description:
        "Portal ya demo ya lefelong ya temošo ya naga, tatelelo ya SLP, ditokomane, dilinki tsa methopo, le menyetla ya bafsa.",
      primaryAction: "Lekola meepo",
      secondaryAction: "Bula tab ya histori",
      tertiaryAction: "Bona bohlatse",
      clarification: "Naga pele",
      clarificationDetail: "St George 2 JT ke naga, e sego moepo.",
      experience: "Digital thread",
      experienceDetail: "Portal ya bongwadi e kopane le dashboard ya ka nako ya nnete.",
      priorities: "Tsepamo ye kgolo",
      prioritiesDetail: "Ponagalo, taolo, phihlelelo ya bafsa, le temošo ya naga.",
    },
    mines: {
      title: "Meepo le ditshepetso khoridorong ya Ga-Mawela",
      description:
        "Diphini di bontsha meepo ya ECM, ditiro tsa Valterra Platinum, meepo ya selete, le Lion Smelter mola St George 2 JT e dule e ikgethile bjalo ka naga.",
      selectedLocation: "Lefelo le le kgethilwego",
      company: "Khamphani",
      commodityRole: "Setšweletšwa / karolo",
      communityImpact: "Kamego setšhabeng",
      linkedSlp: "Data ya SLP e ka latelwa dashboarding.",
      placeholderSlp: "Lefelo la SLP le lokeditšwe bohlatse bja nakong e tlago.",
      readingTitle: "Go bala khoridoro",
      primaryLayer: "Lera la mathomo",
      primaryLayerDetail:
        "Dithoto tsa Glencore ECM di tiiša motheo wa chrome: Thorncliffe, Helena, le Magareng.",
      secondaryLayer: "Lera la bobedi",
      secondaryLayerDetail:
        "Valterra Platinum e tliša Twickenham, Mototolo, le porojeke ya Der Brochen ponong.",
      regionalLayer: "Lera la selete",
      regionalLayerDetail:
        "Dwarsrivier, Two Rivers, le Lion Smelter di otlolla kanegelo go ya tikologong e kgolo ya intasteri.",
    },
    slp: {
      title: "Tracker ya Social & Labour Plan",
      description:
        "Tracker e bontsha leina la moepo, mohuta wa boitlamo, maemo a kabo, le dintlha tšeo di ka bulwago, e loketše bohlatse bjo bo tlamilwego.",
      completed: "E phethilwe",
      completedNote: "Dilo tšeo di bontšhitšwego bjalo ka tše di phethilwego mo lenaneong la bjale.",
      inProgress: "E sa tšwela pele",
      inProgressNote: "Dikgato tšeo di sa hlokago tatelelo le ponagalo ye e botse.",
      notDelivered: "Ga se ya fiwa",
      notDeliveredNote: "Mela ye e nyaka tatelelo goba bohlatse bjo bo bonagalago.",
      emptyTitle: "Ga go boitlamo bjo bo sepelelanago le sehlotlo sa bjale.",
      emptyDetail: "Katološa sefahlego sa khamphani goba nyako gore tracker e buše e tlale.",
      mineName: "Leina la moepo",
      commitmentType: "Mohuta wa boitlamo",
      status: "Maemo",
      notes: "Dintlha",
      detailView: "Pono ya dintlha",
      backendFields: "Maseru a backend a loketšego",
      evidenceSlot: "Lefelo la bohlatse: go sa letetšwe tlamelo ya tokomane",
    },
    community: {
      title: "Setshaba, naga, le taolo",
      description:
        "Letlakala le boloka naga, sebopego sa taolo, taba ya go tlogelwa ga bafsa, le ditšhupetšo tša molao di le mmogo.",
      coreContext: "Motheo wa taba",
      coreTitle: "Naga pele, khoridoro ya meepo ka morago",
      coreDetail:
        "Polatifomo e kgetholla boitsebisho bja naga le ditshepetso tša meepo. St George 2 JT e swanetše go balwa bjalo ka naga ye e amanago le taolo, histori ya malapa le kemedi.",
      timeline: "Tatellano ya nako",
      legalReference: "Tšhupetšo ya molao",
      whyItMatters: "Lebaka la bohlokwa",
      readingGuide: "Tlhahlo ya go bala",
      readingGuideDetail:
        "Bala kanegelo ka tatelano ye: naga pele, mekgatlo ya taolo ka morago, khoridoro ya meepo, ke moka dipotšišo tša molao le poledišano.",
    },
    opportunities: {
      title: "Hub ya menyetla",
      description:
        "Mešomo, dithuto tša mošomo, dibasari, le ngwadišo ya bareki di beilwe lefelong le tee ka tlhahlo ya gore o tsenywa bjang.",
      howToApply: "O dira kgopelo bjang",
      openGuide: "Bula tlhahlo",
      checklist: "Lenaneo la kgopelo",
      step: "Kgato",
      cvPlaceholder: "Lefelo la go tsenya CV",
      cvDetail:
        "Karete ye e loketše go amogela CV goba profile ge kgato e latelago ya backend e buletšwe.",
      cvBox: "Lefelo la amogelo ya CV",
      accessPrinciple: "Molao wa phihlelelo",
      accessDetail:
        "Dikitsiso tša menyetla di swanetše go ba bonolo go di hwetša, go di kwešiša, le go di bona pele ga go tswalwa ga nako.",
    },
    transparency: {
      monitoredRows: "mela ye e beilwego leihlo",
      theme: "Sehlogo",
      owner: "Mong",
      disclosure: "Ponagatšo",
      delivery: "Kabo",
      youth: "Bafsa",
      risk: "Kotsi",
      status: "Maemo",
      visible: "Bonagala",
      partial: "Karolo",
      weak: "Fokola",
      lowRisk: "Kotsi ye nnyane",
      mediumRisk: "Kotsi ya magareng",
      highRisk: "Kotsi ye kgolo",
      disclosureMaturity: "Kgolo ya ponagatšo",
      disclosureSummary:
        "Ke pono e kopanego ya boleng bja ponagatšo le kabo ye e bonagalago mafapheng a lebeletšwego.",
      youthAccessVisibility: "Bonagalo bja phihlelelo ya bafsa",
      youthAccessSummary:
        "Go bonagala ga khoridoro go bafsa bao ba nyakago mešomo, tlwaetšo, procurement le phihlelelo ya kemedi.",
      statusMix: "Motswako wa maemo",
      statusMixSummary:
        "Pono ya ka pela ya gore mafelo a makae a bonagala, a sa felelela, goba a fokola.",
      riskDistribution: "Kabo ya kotsi",
      riskDistributionSummary:
        "Ditsupetšo tša kotsi di bontsha moo diphapano tša ponagatšo le go sa tsebje ga kabo di tswelago kgatelelo setšhabeng.",
      currentMaturity: "Kgolo ya bjale ya ponagatšo",
      currentMaturitySummary:
        "Ke sekoro sa mošomo se bontšhago gore polatifomo e ka rulaganya boikarabelo le ge direkhoto di sa felele.",
      communityVoices: "Dikgoboketšo tša mantsu a setšhaba",
      comments: "dikakgelo",
      anonymousPlaceholder: "Leina le ka tlogelwa",
      commentPlaceholder:
        "Abelana pono ka ponagalo, phihlelelo, dikitsiso, ditsela goba go tsenela.",
    },
    report: {
      title: "Bega taba",
      description:
        "Ke lefelo la go amogela ditaba tša mošomo, go se akaretšwe, procurement, le ditaba tša setšhaba ka polokelo ya SQL ge e le gona.",
      formEyebrow: "Foromo ya go romela",
      name: "Leina (ga le gapeletšwe)",
      issueType: "Mohuta wa taba",
      descriptionLabel: "Tlhaloso",
      descriptionPlaceholder:
        "Hlalosa taba, seo se diregilego, le mohuta wa thušo wo o ka thušago.",
      uploadFile: "Tsenya faele",
      uploadHint:
        "Ditlhomathišo bjale di bolokwa ka lefelong bakeng sa demo gomme di tlamaganywa le rekoto ya backend ge go kgonega.",
      submit: "Romela pego",
      standard: "Maemo a pego",
      standardOne: "Boloka ditlhaloso di le tša nnete ebile di na le nako.",
      standardTwo: "Tsenya difaele tše di thekgago ge go kgonega.",
      standardThree:
        "Dipego di ka tsena mokgweng wa semolao wa tekolo le sebaka sa taolo ya maemo a badiriši.",
      recent: "Dipego tša morago bjale",
      emptyTitle: "Ga go ditaba tše di bolokilwego gabjale.",
      emptyDetail: "Ge pego e rometšwe, e tla bonagala mo bjalo ka rekoto ya go tšea karolo.",
      attachment: "Sephuthelwana",
      anonymousPlaceholder: "Ga go leina",
    },
    documents: {
      title: "Laeborari ya ditokomane",
      description:
        "Laeborari bjale e kopanya ditšhupetšo tša Ga-Mawela, di-upload tša lefelong, le dilinki tša methopo ka pono e tee ya bohlatse.",
      all: "Ka moka",
      emptyTitle: "Ga go ditokomane tše di lego ka legorong le.",
      emptyDetail: "Fetola legoro goba tsenya faele ka laeboraring.",
      date: "Letšatšikgwedi",
      source: "Mothopo",
      preview: "Pono",
      download: "Laolla",
      awaiting: "Go sa emetšwe faele",
      uploadEyebrow: "Tsenya ka laeboraring",
      uploadTitle: "Sehlogo",
      uploadCategory: "Legoro",
      uploadDescription: "Tlhaloso",
      uploadDescriptionPlaceholder: "Faele ye ke eng, mme ke ka lebaka lang e le bohlokwa?",
      uploadFile: "Faele",
      uploadSubmit: "Tsenya tokomane",
      sourcesEyebrow: "Methopo ya nyakišišo",
      sourcesTitle: "Dilinki tša methopo le ditšhupetšo tša bjale",
    },
    representation: {
      title: "Tracker ya kemedi ya setšhaba",
      description:
        "Module ye e bontsha sebopego se se tsebjwago, lera la poledišano moo meepo le batshwarakabelo ba kopanago le setšhaba, le sekgoba sa kemedi ya bafsa.",
      organization: "Pono ya mokgatlo",
      visibleYouth: "Kemedi ya bafsa ye e bonagalago",
      visibleYouthSummary:
        "Sekoro se se tlaase ka boomo se bontsha gore go akaretšwa ga bafsa go sa le taba ya bohlokwa.",
      why: "Lebaka la gore tracker ye e bohlokwa",
      whyOne:
        "Kemedi e ama kamoo tumelelo ya setšhaba, poledišano, le dikgang tša mehola di kwešišwago.",
      whyTwo:
        "Ponagalo ya bafsa ga se taba ya botse feela; e ama tshepo, phallo ya menyetla, le boetapele bja nakong e tlago.",
      whyThree:
        "Tracker ye e ka tsenya direkhoto tša diboka, maina a batshwarakabelo, le bohlatse bja dikgetho goba dikgetho tša boemedi nakong e tlago.",
    },
    benefits: {
      title: "Ke mang yo a holegago?",
      description:
        "Pono ye ya maano e bontsha kamoo boleng bo ka abiwago ka gona magareng ga dikhamphani, mmušo, setšhaba, le ditsela tše dingwe tše di sa hlakang.",
      distributionView: "Pono ya kabo",
      strategicView: "pono ya maano",
    },
    dashboard: {
      sqlReady: "SQL e lokile",
      localFallback: "Fallback ya lefelong",
      sources: "Methopo",
      documents: "Ditokomane",
      members: "Maloko",
    },
  },
};
