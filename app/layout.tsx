import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { portfolioConfig } from "@/config/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolioConfig.siteUrl),
  title: {
    default: "Luka Pajkanovic — Systems & Web Developer",
    template: "%s | Luka Pajkanovic",
  },
  description:
    "Official portfolio and engineering systems work of Luka Pajkanovic. Focused on C++, Python, TypeScript, and Luau. Low-level memory architectures, asynchronous pipelines, game simulation, and web platforms.",
  keywords: [
    "Luka Pajkanovic",
    "Luka Pajkanovic Developer",
    "Luka Pajkanovic Software Engineer",
    "Luka Pajkanovic Systems",
    "Luka Pajkanovic Portfolio",
    "Systems Engineer",
    "Software Engineer",
    "C++20",
    "Python",
    "TypeScript",
    "JavaScript",
    "Luau",
    "Next.js",
    "Docker",
    "GitLab CI/CD",
    "GitHub Actions",
    "GitHub",
  ],
  authors: [{ name: "Luka Pajkanovic", url: portfolioConfig.siteUrl }],
  creator: "Luka Pajkanovic",
  publisher: "Luka Pajkanovic",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Luka Pajkanovic — Systems & Web Developer",
    description: "Systems, Web Architecture & Game Engineering. C++ / Python / TypeScript / Luau.",
    url: portfolioConfig.siteUrl,
    siteName: "Luka Pajkanovic Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Luka Pajkanovic — Systems & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luka Pajkanovic — Systems & Web Developer",
    description: "Systems, Web Architecture & Game Engineering. C++ / Python / TypeScript / Luau.",
    images: ["/opengraph-image"],
    creator: "@Lukk1a",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${portfolioConfig.siteUrl}/#person`,
      name: portfolioConfig.personal.fullName,
      givenName: portfolioConfig.personal.firstName,
      familyName: portfolioConfig.personal.lastName,
      alternateName: portfolioConfig.personal.alternateNames,
      jobTitle: portfolioConfig.personal.role,
      url: portfolioConfig.siteUrl,
      image: `${portfolioConfig.siteUrl}/opengraph-image`,
      email: `mailto:${portfolioConfig.social.email}`,
      sameAs: [
        portfolioConfig.social.github,
        portfolioConfig.social.repo,
      ],
      knowsAbout: [
        "Systems Architecture",
        "C++20",
        "Memory Allocators",
        "Python",
        "TypeScript",
        "Next.js",
        "Docker",
        "GitHub Actions",
        "Luau",
        "Deterministic Simulation",
        "Low-Latency Concurrency",
        "Game Engineering",
      ],
      description: portfolioConfig.personal.bio,
    },
    {
      "@type": "WebSite",
      "@id": `${portfolioConfig.siteUrl}/#website`,
      url: portfolioConfig.siteUrl,
      name: `${portfolioConfig.personal.fullName} — Systems & Web Developer`,
      description: portfolioConfig.personal.bio,
      inLanguage: "en-US",
      publisher: {
        "@id": `${portfolioConfig.siteUrl}/#person`,
      },
      author: {
        "@id": `${portfolioConfig.siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`} style={{ background: "#000000", colorScheme: "dark" }}>
      <body className="min-h-[100dvh] bg-black text-[#ededed] font-sans antialiased" style={{ background: "#000000" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
