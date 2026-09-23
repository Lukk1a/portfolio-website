import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
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

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolioConfig.siteUrl),
  title: {
    default: "Luka Pajkanovic | Systems & Web Developer",
    template: "%s | Luka Pajkanovic",
  },
  description:
    "Official portfolio and engineering systems work of Luka Pajkanovic. Focused on C++, Python, TypeScript, and Luau. Low level memory architectures, asynchronous pipelines, game simulation, and web platforms.",
  authors: [{ name: "Luka Pajkanovic", url: portfolioConfig.siteUrl }],
  creator: "Luka Pajkanovic",
  publisher: "Luka Pajkanovic",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Luka Pajkanovic | Systems & Web Developer",
    description: "Systems, Web Architecture & Game Engineering. C++ / Python / TypeScript / Luau.",
    url: portfolioConfig.siteUrl,
    siteName: "Luka Pajkanovic Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luka Pajkanovic | Systems & Web Developer",
    description: "Systems, Web Architecture & Game Engineering. C++ / Python / TypeScript / Luau.",
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
  themeColor: "#121110",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
        "Low Latency Concurrency",
        "Game Engineering",
      ],
      description: portfolioConfig.personal.bio,
    },
    {
      "@type": "WebSite",
      "@id": `${portfolioConfig.siteUrl}/#website`,
      url: portfolioConfig.siteUrl,
      name: `${portfolioConfig.personal.fullName} | Systems & Web Developer`,
      description: portfolioConfig.personal.bio,
      inLanguage: "en-US",
      publisher: {
        "@id": `${portfolioConfig.siteUrl}/#person`,
      },
      author: {
        "@id": `${portfolioConfig.siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${portfolioConfig.siteUrl}/#profile`,
      url: portfolioConfig.siteUrl,
      name: `${portfolioConfig.personal.fullName} Portfolio`,
      mainEntity: {
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} dark`} style={{ background: "#121110", colorScheme: "dark" }}>
      <body className="min-h-[100dvh] bg-background text-content-primary font-sans antialiased" style={{ background: "#121110" }}>
        {/* Skip to Main Content Link for WCAG 2.4.1 Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:font-bold focus:rounded-md focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
