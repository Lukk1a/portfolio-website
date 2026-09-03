"use client";

import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onToast: (msg: string) => void;
}

export function Footer({ onToast }: FooterProps) {
  const copyValue = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    onToast(`Copied ${label} to clipboard`);
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#050505] py-12 sm:py-16 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 font-mono text-xs text-[#71717a]">
        {/* Left: Name & Copyright */}
        <div className="space-y-1">
          <p className="text-sm font-semibold tracking-wider text-[#f5f5f7]">
            {portfolioConfig.personal.name}
          </p>
          <p className="text-[#52525b]">
            © {new Date().getFullYear()} • Engineered with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={portfolioConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <button
            onClick={() => copyValue(portfolioConfig.social.email, "Email")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Email
          </button>
          <button
            onClick={() => copyValue(portfolioConfig.social.discord, "Discord")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Discord
          </button>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 text-[#71717a] hover:text-white transition-colors cursor-pointer group"
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#38bdf8] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
