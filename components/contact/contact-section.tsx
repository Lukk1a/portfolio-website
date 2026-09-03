"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { GithubIcon, GitlabIcon, DiscordIcon } from "@/components/ui/icons";

interface ContactSectionProps {
  onToast: (msg: string) => void;
}

export function ContactSection({ onToast }: ContactSectionProps) {
  const copyValue = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    onToast(`Copied ${label} to clipboard`);
  };

  return (
    <section id="contact" className="py-24 sm:py-36 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
      <SectionMarker number="04" label="COMMUNICATION &amp; COLLABORATION" />

      <div className="space-y-12 sm:space-y-16">
        {/* Main CTA Typography with blur-to-focus reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="font-mono text-xs text-zinc-500 font-medium tracking-wider">
            {"// INITIATE COMMUNICATION"}
          </div>
          <h2 className="text-4xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white leading-none select-none">
            LET&apos;S BUILD <br />
            SOMETHING SOLID.
          </h2>
          <p className="text-base sm:text-xl font-light text-zinc-400 max-w-xl leading-relaxed">
            Have a technical problem, an architecture to discuss, or looking to collaborate? Reach out directly.
          </p>
        </motion.div>

        {/* Minimal High-Impact Contact Links Grid (4-up on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {/* Email Action */}
          <Magnetic strength={0.15}>
            <div className="group p-6 rounded-xl bg-zinc-950/70 hover:bg-zinc-900 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full shadow-card">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>DIRECT EMAIL</span>
                </div>
                <button
                  onClick={() => copyValue(portfolioConfig.social.email, "Email")}
                  className="p-1.5 rounded hover:bg-white/10 text-zinc-500 hover:text-white transition-colors cursor-pointer interactive-press"
                  title="Copy email"
                  aria-label="Copy email address"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <a
                href={`mailto:${portfolioConfig.social.email}`}
                className="flex items-center justify-between group-hover:text-white transition-colors pt-4"
              >
                <span className="text-xl font-semibold tracking-tight text-zinc-200">
                  EMAIL
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </Magnetic>

          {/* GitLab Action */}
          <Magnetic strength={0.15}>
            <a
              href={portfolioConfig.social.gitlab}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-xl bg-zinc-950/70 hover:bg-zinc-900 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full block shadow-card"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <GitlabIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>GITLAB CI/CD</span>
                </div>
              </div>

              <div className="flex items-center justify-between group-hover:text-white transition-colors pt-4">
                <span className="text-xl font-semibold tracking-tight text-zinc-200">
                  GITLAB
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </Magnetic>

          {/* GitHub Action */}
          <Magnetic strength={0.15}>
            <a
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-xl bg-zinc-950/70 hover:bg-zinc-900 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full block shadow-card"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>REPOSITORIES</span>
                </div>
              </div>

              <div className="flex items-center justify-between group-hover:text-white transition-colors pt-4">
                <span className="text-xl font-semibold tracking-tight text-zinc-200">
                  GITHUB
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </Magnetic>

          {/* Discord Action */}
          <Magnetic strength={0.15}>
            <button
              onClick={() => copyValue(portfolioConfig.social.discord, "Discord handle")}
              className="group p-6 rounded-xl bg-zinc-950/70 hover:bg-zinc-900 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-150 flex flex-col justify-between min-h-[160px] h-full text-left cursor-pointer w-full interactive-press shadow-card"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <DiscordIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>DIRECT CHAT</span>
                </div>
                <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400">
                  [COPY]
                </span>
              </div>

              <div className="flex items-center justify-between group-hover:text-white transition-colors pt-4">
                <span className="text-xl font-semibold tracking-tight text-zinc-200">
                  DISCORD
                </span>
                <Copy className="w-4 h-4 text-zinc-400 group-hover:scale-105 transition-transform" />
              </div>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
