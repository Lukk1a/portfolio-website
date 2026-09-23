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
      className="py-24 sm:py-36 px-6 sm:px-8 max-w-6xl mx-auto border-t border-border-subtle scroll-mt-16 sm:scroll-mt-20"
    >
      <SectionMarker
        number="04"
        label="COMMUNICATION & COLLABORATION"
        tag="// DIRECT"
      />

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
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tighter text-content-primary leading-none select-none"
          >
            LET&apos;S ENGINEER <br />
            SOMETHING RESILIENT.
          </h2>
          <p className="text-base sm:text-xl font-light text-content-secondary max-w-xl leading-relaxed">
            Have a low latency systems challenge, a web architecture to discuss,
            or looking to collaborate? Reach out directly.
          </p>
        </motion.div>

        {/* Contact Links Grid (4 up on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {/* Email Action */}
          <Magnetic strength={0.15}>
            <div className="group p-6 rounded-2xl bg-surface-100 hover:bg-surface-50 border border-border-subtle hover:border-border-subtle transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full relative shadow-card">
              <div className="flex items-center justify-between text-xs font-mono text-content-secondary w-full">
                <div className="flex items-center gap-2">
                  <Mail
                    className="w-3.5 h-3.5 text-content-secondary"
                    aria-hidden="true"
                  />
                  <span>DIRECT EMAIL</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded bg-white/[0.05] hover:bg-white/[0.15] text-content-secondary hover:text-content-primary transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 min-h-[28px] min-w-[28px] flex items-center justify-center relative z-10"
                  title="Copy email address to clipboard"
                  aria-label="Copy email address to clipboard"
                >
                  {copiedEmail ? (
                    <Check
                      className="w-3 h-3 text-emerald-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy className="w-3 h-3" aria-hidden="true" />
                  )}
                </button>
              </div>

              <a
                href={`mailto:${portfolioConfig.social.email}`}
                className="flex items-center justify-between group-hover:text-content-primary transition-colors pt-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 rounded-lg after:absolute after:inset-0 after:rounded-2xl"
              >
                <div>
                  <span className="text-xl font-semibold tracking-tight text-zinc-200 block">
                    EMAIL
                  </span>
                  <span className="text-[11px] font-mono text-content-secondary group-hover:text-content-primary transition-colors">
                    SEND MESSAGE ↗
                  </span>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-content-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Magnetic>

          {/* GitHub Repo Action */}
          <Magnetic strength={0.15}>
            <a
              href={portfolioConfig.social.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-surface-100 hover:bg-surface-50 border border-border-subtle hover:border-border-subtle transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              <div className="flex items-center justify-between text-xs font-mono text-content-secondary">
                <div className="flex items-center gap-2">
                  <GithubIcon
                    className="w-3.5 h-3.5 text-content-secondary"
                    aria-hidden="true"
                  />
                  <span>PORTFOLIO REPO</span>
                </div>
                <span className="text-[10px] text-content-secondary group-hover:text-content-primary transition-colors">
                  [SOURCE]
                </span>
              </div>

              <div className="flex items-center justify-between group-hover:text-content-primary transition-colors pt-4">
                <span className="text-xl font-semibold tracking-tight text-zinc-200">
                  REPOSITORY
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-content-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  aria-hidden="true"
                />
              </div>
            </a>
          </Magnetic>

          {/* GitHub Action */}
          <Magnetic strength={0.15}>
            <a
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-surface-100 hover:bg-surface-50 border border-border-subtle hover:border-border-subtle transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              <div className="flex items-center justify-between text-xs font-mono text-content-secondary">
                <div className="flex items-center gap-2">
                  <GithubIcon
                    className="w-3.5 h-3.5 text-content-secondary"
                    aria-hidden="true"
                  />
                  <span>REPOSITORIES</span>
                </div>
                <span className="text-[10px] text-content-secondary group-hover:text-content-primary transition-colors">
                  [CODE]
                </span>
              </div>

              <div className="flex items-center justify-between group-hover:text-content-primary transition-colors pt-4">
                <span className="text-xl font-semibold tracking-tight text-zinc-200">
                  GITHUB
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-content-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  aria-hidden="true"
                />
              </div>
            </a>
          </Magnetic>

          {/* Discord Action */}
          <Magnetic strength={0.15}>
            <button
              type="button"
              onClick={handleCopyDiscord}
              className="group p-6 rounded-2xl bg-surface-100 hover:bg-surface-50 border border-border-subtle hover:border-border-subtle transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full text-left cursor-pointer w-full interactive-press focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              <div className="flex items-center justify-between text-xs font-mono text-content-secondary">
                <div className="flex items-center gap-2">
                  <DiscordIcon
                    className="w-3.5 h-3.5 text-content-secondary"
                    aria-hidden="true"
                  />
                  <span>DIRECT CHAT</span>
                </div>
                <span className="text-[10px] text-content-secondary group-hover:text-content-primary transition-colors">
                  [HANDLE]
                </span>
              </div>

              <div className="flex items-center justify-between group-hover:text-content-primary transition-colors pt-4">
                <div>
                  <span className="text-xl font-semibold tracking-tight text-zinc-200 block">
                    DISCORD
                  </span>
                  <span className="text-[11px] font-mono text-content-secondary group-hover:text-content-primary transition-colors">
                    @{portfolioConfig.social.discord}
                  </span>
                </div>
                {copiedDiscord ? (
                  <Check
                    className="w-4 h-4 text-emerald-400"
                    aria-hidden="true"
                  />
                ) : (
                  <Copy
                    className="w-4 h-4 text-content-secondary group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                )}
              </div>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
