import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "../components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ga Mawela Truth Platform",
  description: "Investigative journalism platform uncovering truth and accountability in South Africa.",
  keywords: ["investigative journalism", "South Africa", "truth", "accountability", "corruption"],
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
    title: "Ga Mawela Truth Platform",
    description: "Investigative journalism platform uncovering truth and accountability in South Africa.",
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
    title: "Ga Mawela Truth Platform",
    description: "Investigative journalism platform uncovering truth and accountability in South Africa.",
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
    "description": "Investigative journalism platform uncovering truth and accountability in South Africa.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
