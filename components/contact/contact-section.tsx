"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { Magnetic } from "@/components/ui/magnetic";
import { copyToClipboard } from "@/lib/utils";
import { ArrowUpRight, Copy, Mail, Check } from "lucide-react";
import { GithubIcon, DiscordIcon } from "@/components/ui/icons";

interface ContactSectionProps {
  onToast: (msg: string) => void;
}

export function ContactSection({ onToast }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedDiscord, setCopiedDiscord] = React.useState(false);

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(portfolioConfig.social.email);
    if (success) {
      setCopiedEmail(true);
      onToast("Copied email address to clipboard");
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyDiscord = async () => {
    const success = await copyToClipboard(portfolioConfig.social.discord);
    if (success) {
      setCopiedDiscord(true);
      onToast("Copied Discord handle to clipboard");
      setTimeout(() => setCopiedDiscord(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 sm:py-36 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.08] scroll-mt-16 sm:scroll-mt-20"
    >
      <SectionMarker number="04" label="COMMUNICATION & COLLABORATION" tag="// DIRECT" />

      <div className="space-y-12 sm:space-y-16">
        {/* Main CTA Typography */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-none select-none"
          >
            LET&apos;S ENGINEER <br />
            SOMETHING RESILIENT.
          </h2>
          <p className="text-base sm:text-xl font-light text-zinc-400 max-w-xl leading-relaxed">
            Have a low-latency systems challenge, a web architecture to discuss, or looking to collaborate? Reach out directly.
          </p>
        </motion.div>

        {/* High-Impact Contact Links Grid (4-up on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {/* Email Action */}
          <Magnetic strength={0.15}>
            <a
              href={`mailto:${portfolioConfig.social.email}`}
              className="group p-6 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full relative shadow-card block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label={`Send direct email to ${portfolioConfig.social.email}`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 w-full">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                  <span>DIRECT EMAIL</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCopyEmail();
                  }}
                  className="p-1.5 rounded bg-white/[0.05] hover:bg-white/[0.15] text-zinc-400 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 min-h-[28px] min-w-[28px] flex items-center justify-center"
                  title="Copy email address to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <Copy className="w-3 h-3" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between group-hover:text-white transition-colors pt-4">
                <div>
                  <span className="text-xl font-semibold tracking-tight text-zinc-200 block">
                    EMAIL
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    SEND MESSAGE ↗
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </div>
            </a>
          </Magnetic>

          {/* GitHub Repo Action */}
          <Magnetic strength={0.15}>
            <a
              href={portfolioConfig.social.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Open portfolio source code repository on GitHub"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                  <span>PORTFOLIO REPO</span>
                </div>
                <span className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  [SOURCE]
                </span>
              </div>

              <div className="flex items-center justify-between group-hover:text-white transition-colors pt-4">
                <span className="text-xl font-semibold tracking-tight text-zinc-200">
                  REPOSITORY
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </div>
            </a>
          </Magnetic>

          {/* GitHub Action */}
          <Magnetic strength={0.15}>
            <a
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Open GitHub profile and repositories in new tab"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                  <span>REPOSITORIES</span>
                </div>
                <span className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  [CODE]
                </span>
              </div>

              <div className="flex items-center justify-between group-hover:text-white transition-colors pt-4">
                <span className="text-xl font-semibold tracking-tight text-zinc-200">
                  GITHUB
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </div>
            </a>
          </Magnetic>

          {/* Discord Action */}
          <Magnetic strength={0.15}>
            <button
              onClick={handleCopyDiscord}
              className="group p-6 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full text-left cursor-pointer w-full interactive-press focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Copy Discord handle to clipboard"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <DiscordIcon className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                  <span>DIRECT CHAT</span>
                </div>
                <span className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  [HANDLE]
                </span>
              </div>

              <div className="flex items-center justify-between group-hover:text-white transition-colors pt-4">
                <div>
                  <span className="text-xl font-semibold tracking-tight text-zinc-200 block">
                    DISCORD
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    @{portfolioConfig.social.discord}
                  </span>
                </div>
                {copiedDiscord ? (
                  <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4 text-zinc-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                )}
              </div>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
