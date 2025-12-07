import dbConnect from '../../../../lib/db';
import Investigation, { Investigation } from '../../../../lib/models/Investigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  // For static deployment without database, return empty array
  // This will be updated when database is connected
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  await dbConnect();
  const investigation = await Investigation.findById(id);

  if (!investigation) {
    return {
      title: "Investigation Not Found | Ga Mawela Truth Platform",
    };
  }

  return {
    title: `${investigation.title} | Ga Mawela Truth Platform`,
    description: investigation.description,
    openGraph: {
      title: `${investigation.title} | Ga Mawela Truth Platform`,
      description: investigation.description,
      url: `https://truth.gamawela.org/investigations/${id}`,
      siteName: "Ga Mawela",
      images: [
        {
          url: `https://truth.gamawela.org/api/og?title=${encodeURIComponent(investigation.title)}%20%7C%20Ga%20Mawela%20Truth%20Platform&description=${encodeURIComponent(investigation.description)}`,
          width: 1200,
          height: 630,
          alt: investigation.title,
        },
      ],
      locale: "en_ZA",
      type: "article",
      publishedTime: investigation.createdAt.toISOString(),
      modifiedTime: investigation.createdAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${investigation.title} | Ga Mawela Truth Platform`,
      description: investigation.description,
      images: [`https://truth.gamawela.org/api/og?title=${encodeURIComponent(investigation.title)}%20%7C%20Ga%20Mawela%20Truth%20Platform&description=${encodeURIComponent(investigation.description)}`],
      creator: "@gamawela",
    },
  };
}

export default async function InvestigationDetailPage({ params }: PageProps) {
  const { id } = await params;

  await dbConnect();

  const investigation = await Investigation.findById(id);

  if (!investigation) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": investigation.title,
    "description": investigation.description,
    "datePublished": investigation.createdAt.toISOString(),
    "dateModified": investigation.createdAt.toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Ga Mawela",
      "url": "https://truth.gamawela.org"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ga Mawela",
      "url": "https://truth.gamawela.org",
      "logo": {
        "@type": "ImageObject",
        "url": "https://truth.gamawela.org/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://truth.gamawela.org/investigations/${id}`
    },
    "articleSection": "Investigative Journalism",
    "keywords": ["investigative journalism", "South Africa", "truth", "accountability", "corruption"]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Link
        href="/investigations"
        className="inline-flex items-center text-gm-600 hover:text-gm-700 font-semibold mb-6"
      >
        ← Back to Investigations
      </Link>

      <div className="bg-white rounded-xl shadow-soft p-8 border border-gm-200">
        <h1 className="text-4xl font-bold text-gm-900 mb-4">{investigation.title}</h1>
        <p className="text-gm-700 mb-6">{investigation.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gm-900 mb-2">Status</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              investigation.status === 'open' ? 'bg-green-100 text-green-800' :
              investigation.status === 'closed' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {investigation.status}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gm-900 mb-2">Created</h3>
            <p className="text-gm-700">{new Date(investigation.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gm-900 mb-4">Evidence</h3>
          {investigation.evidence.length > 0 ? (
            <ul className="space-y-2">
              {investigation.evidence.map((evidence: string, index: number) => (
                <li key={index} className="flex items-center text-gm-700">
                  <span className="w-2 h-2 bg-gm-500 rounded-full mr-3"></span>
                  {evidence}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gm-500">No evidence available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}