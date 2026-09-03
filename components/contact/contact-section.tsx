"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { GithubIcon, DiscordIcon } from "@/components/ui/icons";

interface ContactSectionProps {
  onToast: (msg: string) => void;
}

export function ContactSection({ onToast }: ContactSectionProps) {
  const copyValue = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    onToast(`Copied ${label} to clipboard`);
  };

  return (
    <section id="contact" className="py-24 sm:py-36 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      <SectionMarker label="CONNECT / COLLABORATE" />

      <div className="space-y-12 sm:space-y-16">
        {/* Main CTA Typography with blur-to-focus reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <h2 className="text-4xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-[#f5f5f7] leading-none select-none">
            LET&apos;S BUILD <br />
            SOMETHING.
          </h2>
          <p className="text-lg sm:text-2xl font-light text-[#a1a1aa] max-w-xl leading-relaxed">
            Have an idea, an engineering question, or interested in collaborating? Reach out anytime.
          </p>
        </motion.div>

        {/* Minimal High-Impact Contact Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          {/* Email Action */}
          <Magnetic strength={0.15}>
            <div className="group p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-all duration-200 flex flex-col justify-between min-h-[160px] h-full">
              <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>DIRECT EMAIL</span>
                </div>
                <button
                  onClick={() => copyValue(portfolioConfig.social.email, "Email")}
                  className="p-1.5 rounded hover:bg-white/10 text-[#71717a] hover:text-white transition-colors cursor-pointer interactive-press"
                  title="Copy email"
                  aria-label="Copy email address"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <a
                href={`mailto:${portfolioConfig.social.email}`}
                className="flex items-center justify-between group-hover:text-white transition-colors"
              >
                <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f5f5f7]">
                  EMAIL
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#38bdf8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </Magnetic>

          {/* GitHub Action */}
          <Magnetic strength={0.15}>
            <a
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-all duration-200 flex flex-col justify-between min-h-[160px] h-full block"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>CODE REPOSITORY</span>
                </div>
              </div>

              <div className="flex items-center justify-between group-hover:text-white transition-colors">
                <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f5f5f7]">
                  GITHUB
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#38bdf8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>
          </Magnetic>

          {/* Discord Action */}
          <Magnetic strength={0.15}>
            <button
              onClick={() => copyValue(portfolioConfig.social.discord, "Discord handle")}
              className="group p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-all duration-200 flex flex-col justify-between min-h-[160px] h-full text-left cursor-pointer w-full interactive-press"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#71717a]">
                <div className="flex items-center gap-2">
                  <DiscordIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>CHAT / COMMUNITY</span>
                </div>
                <span className="text-[10px] text-[#52525b] group-hover:text-[#71717a]">
                  [CLICK TO COPY]
                </span>
              </div>

              <div className="flex items-center justify-between group-hover:text-white transition-colors">
                <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f5f5f7]">
                  DISCORD
                </span>
                <Copy className="w-5 h-5 text-[#38bdf8] group-hover:scale-110 transition-transform" />
              </div>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
