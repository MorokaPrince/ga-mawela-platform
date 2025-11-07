import InvestigationCard from '../../components/InvestigationCard';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investigations | Ga Mawela Truth Platform",
  description: "Browse our collection of investigative journalism pieces uncovering truth and accountability in South Africa.",
  openGraph: {
    title: "Investigations | Ga Mawela Truth Platform",
    description: "Browse our collection of investigative journalism pieces uncovering truth and accountability in South Africa.",
    url: "https://truth.gamawela.org/investigations",
    siteName: "Ga Mawela",
    images: [
      {
        url: "https://truth.gamawela.org/api/og?title=Investigations%20%7C%20Ga%20Mawela%20Truth%20Platform&description=Browse%20our%20collection%20of%20investigative%20journalism%20pieces%20uncovering%20truth%20and%20accountability%20in%20South%20Africa.",
        width: 1200,
        height: 630,
        alt: "Ga Mawela Investigations",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investigations | Ga Mawela Truth Platform",
    description: "Browse our collection of investigative journalism pieces uncovering truth and accountability in South Africa.",
    images: ["https://truth.gamawela.org/api/og?title=Investigations%20%7C%20Ga%20Mawela%20Truth%20Platform&description=Browse%20our%20collection%20of%20investigative%20journalism%20pieces%20uncovering%20truth%20and%20accountability%20in%20South%20Africa."],
    creator: "@gamawela",
  },
};

// Mock investigations data - replace with database queries when MongoDB is configured
const mockInvestigations = [
  {
    _id: "1",
    title: "Mankge Narrative vs Masetu–Lesedi–Moroka Lineage",
    description: "This investigation collects deeds, CRLR/DRDLR files, and court papers to verify competing accounts. Allegations remain blocked from public release until legal sign-off.",
    link: "/investigations/mankge-vs-masetu"
  },
  {
    _id: "2",
    title: "Anglo American Der Brochen / Mototolo Project",
    description: "Examining Anglo American's mining operations on Ga-Mawela land, including SLP commitments and community benefit analysis.",
    link: "/investigations/anglo-der-brochen"
  },
  {
    _id: "3",
    title: "Two Rivers Platinum Mine - ARM & Implats Joint Venture",
    description: "Investigating the Two Rivers mining operation, its SLP obligations, and impact on Ga-Mawela descendants.",
    link: "/investigations/two-rivers-platinum"
  }
];

export default function InvestigationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Investigations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInvestigations.map((investigation) => (
          <InvestigationCard
            key={investigation._id}
            title={investigation.title}
            description={investigation.description}
            link={investigation.link}
          />
        ))}
      </div>
    </div>
  );
}