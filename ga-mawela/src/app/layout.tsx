import type { Metadata } from "next";
import Providers from "../components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ga Mawela - Mining & Community Intelligence Platform",
  description:
    "Ga Mawela platform provides mining transparency, community intelligence, SLP tracking, and land governance for Ga-Mawela and St George 2 JT in Limpopo, South Africa.",
  keywords: [
    "Ga Mawela",
    "Ga-Mawela",
    "St George 2 JT",
    "mining South Africa",
    "SLP tracker",
    "community intelligence",
    "mining transparency",
    "Limpopo mining",
    "land governance",
    "mining corridor",
    "mining operations",
    "community platform",
  ],
  authors: [{ name: "Ga Mawela" }],
  creator: "Ga Mawela",
  publisher: "Ga Mawela",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.gamawela.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ga Mawela - Mining & Community Intelligence Platform",
    description:
      "Track mining operations, SLP commitments, land governance, opportunities, and transparency signals around Ga-Mawela in Limpopo, South Africa.",
    url: "https://www.gamawela.com",
    siteName: "Ga Mawela",
    images: [
      {
        url: "https://www.gamawela.com/api/og",
        width: 1200,
        height: 630,
        alt: "Ga Mawela Mining & Community Intelligence Platform",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ga Mawela - Mining & Community Intelligence Platform",
    description:
      "Track mining operations, SLP commitments, land governance, opportunities, and transparency signals around Ga-Mawela.",
    images: ["https://www.gamawela.com/api/og"],
    creator: "@gamawela",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ga Mawela",
    "url": "https://www.gamawela.com",
    "logo": "https://www.gamawela.com/logo.png",
    "description": "Community intelligence, transparency, and opportunity platform focused on Ga-Mawela and the wider mining corridor in Limpopo, South Africa.",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/gamawela"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://www.gamawela.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ZA",
      "addressRegion": "Limpopo",
      "addressLocality": "Ga-Mawela"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script defer data-domain={process.env.PLAUSIBLE_DOMAIN || "www.gamawela.com"} src="https://plausible.io/js/script.js"></script>
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
