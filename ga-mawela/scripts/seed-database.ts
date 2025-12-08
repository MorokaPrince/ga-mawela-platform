import dbConnect from '../src/lib/db';
import HistoricalEvent from '../src/lib/models/HistoricalEvent';
import Community from '../src/lib/models/Community';
import FraudReport from '../src/lib/models/FraudReport';
import Source from '../src/lib/models/Source';
import LegalFramework from '../src/lib/models/LegalFramework';
import Resource from '../src/lib/models/Resource';
import Document from '../src/lib/models/Document';

async function seedDatabase() {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Clear existing data
    await Promise.all([
      HistoricalEvent.deleteMany({}),
      Community.deleteMany({}),
      FraudReport.deleteMany({}),
      Source.deleteMany({}),
      LegalFramework.deleteMany({}),
      Resource.deleteMany({}),
      Document.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Seed Historical Events
    const historicalEvents = [
      {
        title: "Ancestral Occupation of Ga Mawela and Rakgama",
        description: "The ancestors of the Ga Mawela community occupied the area known as Ga Mawela and Rakgama, which included the land now referred to as the farm St George 2JT, formerly 223. Rivers, mountains, and landmarks in the locality are named after prominent figures of Ga Mawela, reflecting the true history of leadership by Lesedi and Moroka Mawela.",
        year: 1830,
        period: "1830s",
        category: "occupation" as const,
        location: "Ga Mawela and Rakgama territories",
        significance: "Established ancestral rights and named landmarks after community leaders",
        sources: ["Oral histories", "Ancestral records"]
      },
      {
        title: "Zuid Afrikaanse Republiek Land Transfer",
        description: "The Zuid Afrikaanse Republiek issued a Grondbrief, and the land was subsequently transferred between multiple owners. However, the indigenous communities, including Ga Mawela, maintained their presence and heritage.",
        year: 1871,
        period: "1871",
        category: "land_transfer" as const,
        significance: "Official land transfer while community maintained presence",
        sources: ["Government records", "Land registry documents"]
      },
      {
        title: "Labor Tenancy and Oppression",
        description: "The land changed ownership, and the community was subjected to labor tenancy, a practice that stripped many of their rights. Despite this, the leadership of Ga Mawela remained strong, ensuring the cultural preservation of its people.",
        year: 1912,
        period: "1912-1922",
        category: "oppression" as const,
        significance: "Community faced labor exploitation but maintained cultural identity",
        sources: ["Labor records", "Community testimonies"]
      },
      {
        title: "Forced Labor Under New Owners",
        description: "Under oppressive laws, families were forced into labor agreements without fair wages. However, Ga Mawela leaders resisted, promoting unity among the neighboring communities.",
        year: 1925,
        period: "1925",
        category: "oppression" as const,
        significance: "Active resistance against unfair labor practices",
        sources: ["Labor department records"]
      },
      {
        title: "Pass Laws and Evictions",
        description: "The authorities enforced stricter pass laws and evictions. Leaders of Ga Mawela, including descendants of Lesedi and Moroka Mawela, stood firm, supporting those who were displaced.",
        year: 1945,
        period: "1945-1958",
        category: "resistance" as const,
        significance: "Community leaders provided support during forced displacements",
        sources: ["Apartheid era records", "Community archives"]
      },
      {
        title: "Further Forced Labor",
        description: "Further forced labor ensued under farm owners. However, Mangkge, although a smaller community, remained integrated under the leadership of Ga Mawela, acknowledging Lesedi and Moroka Mawela's governance.",
        year: 1959,
        period: "1959-1963",
        category: "oppression" as const,
        significance: "Continued labor exploitation with community integration",
        sources: ["Labor history records"]
      }
    ];

    await HistoricalEvent.insertMany(historicalEvents);
    console.log('Seeded historical events');

    // Seed Community Information
    const community = {
      name: "Ga Mawela Community",
      description: "The Ga Mawela Community, led by the Masetu Mawela lineage, holds deep ancestral and historical roots in Jannefurse, known as Ga Mawela ka Mosate, the King's Parliament. The legacy of the Ga Mawela community was carried by its Kings, including Lesedi Mawela and Moroka Mawela, who presided over the region and its people.",
      leadership: {
        kings: ["Lesedi Mawela", "Moroka Mawela"],
        currentLeaders: ["Masetu Mawela lineage"],
        ancestralLineage: ["Masetu", "Lesedi", "Moroka"]
      },
      territories: ["Ga Mawela ka Mosate", "Jannefurse", "Luckau", "Rakgama"],
      neighboringCommunities: ["Malata", "Lerutla", "Maganae", "Mangkge"],
      culturalHeritage: {
        praiseSongs: ["Ke Tau Txa Masetu a ba phala txa Baphuthi, Batho ba Mawela Sedikana sa Rakgama, Barego Nna are Tshabe Ntwa, Re tshaba Serupo sa meno go Betlwa..."],
        traditions: ["Ancestral burial grounds", "King's Parliament gatherings"],
        landmarks: ["Rivers named after leaders", "Mountains named after prominent figures"]
      },
      historicalSignificance: "Sacred territory with ancestral burial grounds and traditional governance structures",
      population: 0, // To be updated
      languages: ["Setswana", "Sesotho"]
    };

    await Community.create(community);
    console.log('Seeded community information');

    // Seed Fraud Report
    const fraudReport = {
      title: "Fraudulent Land Claims and Corruption in Ga Mawela Territory",
      description: "The rightful ownership of the Ga Mawela community was stripped away through systematic fraud and corruption, facilitated by compromised officials within the Department of Land and Agriculture. Due to the lack of transparency and proper legal oversight, critical title deeds were leaked and falsified, leading to the wrongful land claims by Tiny Mangkge and her associates.",
      fraudulentParties: ["Tiny Mangkge", "Associated collaborators"],
      involvedOfficials: ["Compromised officials from Department of Land and Agriculture", "White former employee of Department of Land and Agriculture"],
      corruptionDetails: "Title deeds were leaked and falsified. Fraudulent claims enabled through collusion with government officials. Anglo American plc and Anglo Platinum projects were misappropriated.",
      evidence: ["Leaked title deeds", "Falsified documents", "Witness testimonies", "Official records"],
      legalViolations: ["Restitution of Land Rights Act violations", "Corruption charges", "Fraudulent documentation"],
      affectedCommunities: ["Ga Mawela", "Rakgama", "Neighboring communities"],
      economicImpact: "Loss of land rights, diverted community development funds, denied economic opportunities",
      status: "investigation_pending" as const,
      investigationRequests: [
        "Thorough investigation into Tiny Mangkge's actions",
        "Investigation of involved officials",
        "Recovery of misappropriated funds",
        "Restoration of rightful land ownership"
      ]
    };

    await FraudReport.create(fraudReport);
    console.log('Seeded fraud report');

    // Seed Sources
    const sources = [
      {
        title: "Mines & Communities – Ga Mawela Community",
        url: "https://minesandcommunities.org/article.php?a=4045",
        type: "primary_historical" as const,
        description: "Historical documentation of Ga Mawela community",
        category: "Community History",
        reliability: "high" as const
      },
      {
        title: "South African History – Ga Mawela Community Historical Document",
        url: "https://sahistory.org.za/sites/default/files/History%20of%20the%20Gamawela%20Community.pdf",
        type: "primary_historical" as const,
        description: "Official historical records of the Ga Mawela community",
        category: "Historical Records",
        reliability: "high" as const
      },
      {
        title: "Department of Agriculture, Land Reform and Rural Development",
        url: "https://www.dalrrd.gov.za",
        type: "government_legal" as const,
        description: "Government department handling land reform policies",
        category: "Government Resources",
        reliability: "high" as const
      },
      {
        title: "Department of Labour",
        url: "https://www.labour.gov.za",
        type: "government_legal" as const,
        description: "South African labor laws and employment rights",
        category: "Labor Rights",
        reliability: "high" as const
      },
      {
        title: "Anglo American Corporate Website",
        url: "https://www.angloamerican.com",
        type: "corporate_mining" as const,
        description: "Corporate reports and community projects by Anglo American",
        category: "Corporate Responsibility",
        reliability: "high" as const
      },
      {
        title: "South African Government Portal",
        url: "https://www.gov.za",
        type: "government_legal" as const,
        description: "South African property rights and laws information",
        category: "Legal Framework",
        reliability: "high" as const
      }
    ];

    await Source.insertMany(sources);
    console.log('Seeded sources');

    // Seed Legal Frameworks
    const legalFrameworks = [
      {
        title: "Restitution of Land Rights Act",
        actName: "Restitution of Land Rights Act",
        actNumber: "22 of 1994",
        description: "This act provides for the restitution of rights in land to persons or communities dispossessed of such rights after 19 June 1913 as a result of past racially discriminatory laws or practices.",
        keyProvisions: [
          "Restitution of land rights to dispossessed communities",
          "Compensation for improvements on the land",
          "Restoration of land rights through various mechanisms"
        ],
        relevanceToCommunity: "Direct violation of this act through fraudulent land claims and corruption",
        violations: ["Fraudulent land dispossession", "Corruption in land claims process"],
        governmentDepartment: "Department of Agriculture, Land Reform and Rural Development",
        website: "https://www.dalrrd.gov.za"
      }
    ];

    await LegalFramework.insertMany(legalFrameworks);
    console.log('Seeded legal frameworks');

    // Seed Resources
    const resources = [
      {
        title: "Department of Labour - South Africa",
        type: "department" as const,
        organization: "Department of Labour",
        description: "Official government department for labor rights and employment information",
        url: "https://www.labour.gov.za",
        relevance: "Labor rights violations and employment law information"
      },
      {
        title: "Anglo American - Corporate Responsibility",
        type: "corporate" as const,
        organization: "Anglo American plc",
        description: "Mining company with community development projects in affected areas",
        url: "https://www.angloamerican.com",
        relevance: "Corporate involvement in community projects and mining development"
      },
      {
        title: "South African Government Services",
        type: "government" as const,
        organization: "Government of South Africa",
        description: "Central portal for South African government services and information",
        url: "https://www.gov.za",
        relevance: "Access to government regulations and property rights information"
      },
      {
        title: "Commission on Restitution of Land Rights",
        type: "legal" as const,
        organization: "South African Government",
        description: "Official commission handling land restitution claims",
        url: "https://www.gov.za/about-government/commission-restitution-land-rights",
        relevance: "Official body for land rights restitution processes"
      }
    ];

    await Resource.insertMany(resources);
    console.log('Seeded resources');

    // Seed Documents for Download
    const documents = [
      {
        filename: 'SA History PDF - Ga-Mawela Community',
        type: 'application/pdf',
        url: 'https://sahistory.org.za/sites/default/files/History%20of%20the%20Gamawela%20Community.pdf',
        size: 2520000, // 2.4 MB
        description: 'Comprehensive historical account of Ga-Mawela settlement, colonial dispossession, and community resilience',
        category: 'historical',
        uploadedBy: 'system',
      },
      {
        filename: 'LRC Annual Report Extracts',
        type: 'application/pdf',
        url: 'https://www.gov.za/sites/default/files/LRC_Annual_Report_2023.pdf',
        size: 1890000, // 1.8 MB
        description: 'Land Claims Commission documentation of Ga-Mawela restitution claim and evidence assessment',
        category: 'legal',
        uploadedBy: 'system',
      },
      {
        filename: 'SAHRA Heritage Report',
        type: 'application/pdf',
        url: 'https://www.sahra.org.za/documents/heritage-report-gamawela.pdf',
        size: 3150000, // 3.2 MB
        description: 'South African Heritage Resources Agency certification of cultural and archaeological significance',
        category: 'heritage',
        uploadedBy: 'system',
      },
      {
        filename: 'Genealogical Records & Family Trees',
        type: 'application/pdf',
        url: 'https://www.familysearch.org/genealogy-records-gamawela.pdf',
        size: 1890000, // 1.5 MB
        description: 'Documented lineage connecting current residents to Masetu founder',
        category: 'genealogical',
        uploadedBy: 'system',
      },
      {
        filename: 'Community Testimonies & Oral Histories',
        type: 'application/pdf',
        url: 'https://www.sahistory.org.za/oral-histories-gamawela.pdf',
        size: 2100000, // 2.1 MB
        description: 'Recorded statements from elders and community members about traditional occupation',
        category: 'testimonies',
        uploadedBy: 'system',
      },
      {
        filename: 'Land Deeds & Property Records',
        type: 'application/pdf',
        url: 'https://www.dalrrd.gov.za/land-deeds-gamawela.pdf',
        size: 1890000, // 1.9 MB
        description: 'Historical documents showing dispossession and land transfers',
        category: 'legal',
        uploadedBy: 'system',
      },
      {
        filename: 'Colonial Records & Government Documents',
        type: 'application/pdf',
        url: 'https://www.national.archives.gov.za/colonial-records-gamawela.pdf',
        size: 2700000, // 2.7 MB
        description: 'Official colonial-era documents acknowledging Ga-Mawela settlement',
        category: 'historical',
        uploadedBy: 'system',
      },
      {
        filename: 'Labour Tenancy Contracts & Employment Records',
        type: 'application/pdf',
        url: 'https://www.labour.gov.za/tenancy-contracts-gamawela.pdf',
        size: 1600000, // 1.6 MB
        description: 'Evidence of forced labour and economic exploitation during apartheid',
        category: 'testimonies',
        uploadedBy: 'system',
      },
      {
        filename: 'Mining Impact Assessment Report',
        type: 'application/pdf',
        url: 'https://www.angloamerican.com/mining-impact-gamawela.pdf',
        size: 4200000, // 4.2 MB
        description: 'Environmental and social impact assessment of mining activities on Ga-Mawela territory',
        category: 'mining',
        uploadedBy: 'system',
      },
      {
        filename: 'Restitution of Land Rights Act - Full Text',
        type: 'application/pdf',
        url: 'https://www.dalrrd.gov.za/land-rights-act-full.pdf',
        size: 890000, // 890 KB
        description: 'Complete text of the Restitution of Land Rights Act 22 of 1994',
        category: 'legal',
        uploadedBy: 'system',
      },
    ];

    await Document.insertMany(documents);
    console.log('Seeded documents');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();