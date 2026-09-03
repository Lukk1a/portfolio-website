import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Luka Pajkanovic — Systems & Web Developer",
  description:
    "Engineering portfolio of Luka Pajkanovic. Focused on C++, Python, TypeScript, and Luau. Low-level memory architectures, asynchronous pipelines, game simulation, and web platforms.",
  keywords: [
    "Luka Pajkanovic",
    "Developer",
    "Systems Engineer",
    "Software Engineer",
    "C++",
    "Python",
    "TypeScript",
    "JavaScript",
    "Luau",
    "Next.js",
    "Docker",
    "GitLab CI/CD",
  ],
  authors: [{ name: "Luka Pajkanovic" }],
  creator: "Luka Pajkanovic",
  openGraph: {
    title: "Luka Pajkanovic — Systems & Web Developer",
    description: "Systems, Web Architecture & Game Engineering. C++ / Python / TypeScript / Luau.",
    url: "https://gitlab.com/Lukk1a/portfolio",
    siteName: "Luka Pajkanovic Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luka Pajkanovic — Systems & Web Developer",
    description: "Systems, Web Architecture & Game Engineering. C++ / Python / TypeScript / Luau.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`} style={{ background: "#000000", colorScheme: "dark" }}>
      <body className="min-h-screen bg-black text-[#ededed] font-sans antialiased" style={{ background: "#000000" }}>
        {children}
      </body>
    </html>
  );
}
