import type { Metadata } from "next";
import Providers from "../components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ga-Mawela Mining & Community Intelligence Platform",
  description:
    "A high-end transparency, opportunity, and mining corridor intelligence platform for Ga-Mawela and St George 2 JT.",
  keywords: [
    "Ga-Mawela",
    "St George 2 JT",
    "mining transparency",
    "community intelligence",
    "SLP tracker",
    "Limpopo mining corridor",
  ],
  authors: [{ name: "Ga Mawela" }],
  creator: "Ga Mawela",
  publisher: "Ga Mawela",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://truth.gamawela.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ga-Mawela Mining & Community Intelligence Platform",
    description:
      "Track mining operations, SLP commitments, land governance, opportunities, and transparency signals around Ga-Mawela.",
    url: "https://truth.gamawela.org",
    siteName: "Ga Mawela",
    images: [
      {
        url: "https://truth.gamawela.org/api/og",
        width: 1200,
        height: 630,
        alt: "Ga Mawela Truth Platform",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ga-Mawela Mining & Community Intelligence Platform",
    description:
      "Track mining operations, SLP commitments, land governance, opportunities, and transparency signals around Ga-Mawela.",
    images: ["https://truth.gamawela.org/api/og"],
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
    "url": "https://truth.gamawela.org",
    "logo": "https://truth.gamawela.org/logo.png",
    "description": "Community intelligence, transparency, and opportunity platform focused on Ga-Mawela and the wider mining corridor.",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/gamawela"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://truth.gamawela.org"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ZA"
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
        <script defer data-domain={process.env.PLAUSIBLE_DOMAIN || "truth.gamawela.org"} src="https://plausible.io/js/script.js"></script>
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
