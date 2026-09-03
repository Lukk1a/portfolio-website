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
    <footer className="border-t border-white/[0.08] bg-black py-12 sm:py-16 px-6 sm:px-8 font-mono">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 text-xs text-zinc-500">
        {/* Left: Name & Copyright */}
        <div className="space-y-1">
          <p className="text-sm font-semibold tracking-wider text-white">
            {portfolioConfig.personal.fullName}
          </p>
          <p className="text-zinc-500 text-[11px]">
            © {new Date().getFullYear()} • Standalone Next.js 15 &amp; Docker • GitLab CI/CD Verified
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={portfolioConfig.social.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitLab
          </a>
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
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer group interactive-press"
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-zinc-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
