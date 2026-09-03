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
  title: "Luka — Developer",
  description:
    "Personal portfolio of Luka, specializing in C++, Python, JavaScript, TypeScript, and Luau. Focused on systems, web architecture, and game development.",
  keywords: [
    "Luka",
    "Developer",
    "Software Engineer",
    "C++",
    "Python",
    "JavaScript",
    "TypeScript",
    "Luau",
    "React",
    "Next.js",
    "Roblox Development",
  ],
  authors: [{ name: "Luka" }],
  creator: "Luka",
  openGraph: {
    title: "Luka — Developer",
    description: "Developer portfolio. C++ / Python / JavaScript / Luau.",
    url: "https://luka.dev",
    siteName: "Luka — Developer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luka — Developer",
    description: "Developer portfolio. C++ / Python / JavaScript / Luau.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen bg-[#080808] text-[#f5f5f7] font-sans antialiased selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
