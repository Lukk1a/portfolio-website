"use client";

import * as React from "react";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection, copyToClipboard } from "@/lib/utils";
import { ArrowUp, Mail, Check } from "lucide-react";
import { GithubIcon, DiscordIcon } from "@/components/ui/icons";

interface FooterProps {
  onToast: (msg: string) => void;
}

export function Footer({ onToast }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedDiscord, setCopiedDiscord] = React.useState(false);

  const handleCopy = async (val: string, label: string, type: "email" | "discord") => {
    const success = await copyToClipboard(val);
    if (success) {
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedDiscord(true);
        setTimeout(() => setCopiedDiscord(false), 2000);
      }
      onToast(`Copied ${label} to clipboard`);
    }
  };

  return (
    <footer className="border-t border-border-subtle bg-black py-12 sm:py-16 px-6 sm:px-8 font-mono">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 text-xs text-content-secondary">
        {/* Left: Name & Copyright */}
        <div className="space-y-1">
          <p className="text-sm font-semibold tracking-wider text-white">
            {portfolioConfig.personal.fullName}
          </p>
          <p className="text-content-secondary text-[11px]">
            © {new Date().getFullYear()} Luka Pajkanovic. All rights reserved.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href={portfolioConfig.social.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open portfolio source code repository on GitHub"
            className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded px-2.5 py-1.5 min-h-[36px]"
          >
            <GithubIcon className="w-3.5 h-3.5 text-content-secondary" aria-hidden="true" />
            <span>Repository</span>
          </a>
          <a
            href={portfolioConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
            className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded px-2.5 py-1.5 min-h-[36px]"
          >
            <GithubIcon className="w-3.5 h-3.5 text-content-secondary" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <button
            type="button"
            onClick={() => handleCopy(portfolioConfig.social.email, "email address", "email")}
            aria-label="Copy email address to clipboard"
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded px-2.5 py-1.5 min-h-[36px]"
          >
            {copiedEmail ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            ) : (
              <Mail className="w-3.5 h-3.5 text-content-secondary" aria-hidden="true" />
            )}
            <span>Email</span>
          </button>
          <button
            type="button"
            onClick={() => handleCopy(portfolioConfig.social.discord, "Discord handle", "discord")}
            aria-label="Copy Discord handle to clipboard"
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded px-2.5 py-1.5 min-h-[36px]"
          >
            {copiedDiscord ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            ) : (
              <DiscordIcon className="w-3.5 h-3.5 text-content-secondary" aria-hidden="true" />
            )}
            <span>Discord</span>
          </button>
        </div>

        {/* Right: Back to Top */}
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 text-content-secondary hover:text-white transition-colors cursor-pointer group interactive-press focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded px-3 py-1.5 min-h-[36px]"
          aria-label="Back to top of page"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-content-secondary group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
