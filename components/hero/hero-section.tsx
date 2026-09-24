"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon, DiscordIcon } from "@/components/ui/icons";
import { ArrowDown, Mail } from "lucide-react";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[90dvh] flex flex-col pt-24 pb-8 sm:pt-28 sm:pb-10 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-16 sm:scroll-mt-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-1 flex-col justify-center gap-10 sm:gap-14 py-8"
      >
        {/* Index row: sequence marker + availability status */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-widest text-content-muted uppercase"
        >
          <span className="text-content-muted font-medium tracking-tight">
            [<span className="text-content-primary font-semibold">00</span>]
          </span>
          <span className="text-content-primary font-semibold tracking-widest">
            PORTFOLIO_INDEX
          </span>
          <div className="h-[1px] flex-1 bg-white/[0.08]" />
          <span className="flex items-center gap-2 text-content-secondary">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent-emerald indicator-glow-emerald"
              aria-hidden="true"
            />
            AVAILABLE FOR WORK
          </span>
        </motion.div>

        {/* Primary grid: headline + spec panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left: headline, role, bio, actions */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="font-mono text-xs tracking-widest text-content-muted uppercase">
                {"// SYSTEMS & WEB ARCHITECTURE"}
              </span>
              <h1
                id="hero-heading"
                className="text-5xl sm:text-7xl lg:text-[5.5rem] font-serif font-medium tracking-tight text-content-primary leading-[1.03] text-balance"
              >
                {portfolioConfig.personal.fullName}
              </h1>
              <p className="text-xl sm:text-2xl font-serif italic text-content-secondary tracking-wide leading-snug">
                {portfolioConfig.personal.role}
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-content-muted font-light leading-relaxed max-w-xl text-pretty"
            >
              {portfolioConfig.personal.bio} {portfolioConfig.personal.statement}
            </motion.p>

            {/* Action Buttons with Semantic Anchors and WCAG Touch Targets */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.2}>
                <a
                  href="#skills"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("skills");
                  }}
                  aria-label="View architecture and technical skills"
                  className="group pl-5 pr-3 py-2.5 min-h-[44px] rounded-full bg-accent text-background font-medium text-xs font-mono tracking-wider hover:bg-white transition-all duration-150 interactive-press cursor-pointer inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span>VIEW ARCHITECTURE</span>
                  <div className="w-6 h-6 rounded-full bg-background/10 flex items-center justify-center group-hover:translate-y-0.5 transition-transform duration-150">
                    <ArrowDown
                      className="w-3 h-3 text-background"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              </Magnetic>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                aria-label="Navigate to contact section"
                className="px-5 py-2.5 min-h-[44px] rounded-full bg-transparent border border-border-muted hover:border-border-focus text-content-secondary hover:text-content-primary text-xs font-mono tracking-wider transition-colors interactive-press cursor-pointer inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                CONTACT
              </a>
            </motion.div>
          </div>

          {/* Right: spec panel */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 lg:pt-2"
          >
            <div className="rounded-2xl p-1.5 bg-surface-100 border border-border-subtle shadow-card">
              <div className="rounded-xl bg-surface-inner/90 border border-white/[0.06] backdrop-blur-md p-5 sm:p-6 space-y-5 font-mono">
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-content-muted">
                  <span>SPEC_SHEET</span>
                  <span>REV.02</span>
                </div>

                <dl className="divide-y divide-white/[0.06]">
                  <div className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-[11px] tracking-widest uppercase text-content-muted">
                      ROLE
                    </dt>
                    <dd className="text-xs text-content-primary text-right">
                      {portfolioConfig.personal.role}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-[11px] tracking-widest uppercase text-content-muted">
                      HANDLE
                    </dt>
                    <dd className="text-xs text-content-primary text-right">
                      {portfolioConfig.personal.alternateNames[0]}
                    </dd>
                  </div>
                  <div className="py-2.5 space-y-2">
                    <dt className="text-[11px] tracking-widest uppercase text-content-muted">
                      FOCUS
                    </dt>
                    <dd>
                      <ul className="space-y-1.5">
                        {portfolioConfig.personal.coreHighlights.map((tech) => (
                          <li
                            key={tech}
                            className="flex items-center gap-2 text-xs text-content-secondary"
                          >
                            <span
                              className="h-1 w-1 rounded-full bg-content-muted shrink-0"
                              aria-hidden="true"
                            />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="py-2.5 space-y-2">
                    <dt className="text-[11px] tracking-widest uppercase text-content-muted">
                      STACK
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {portfolioConfig.matrixLanguages.map((lang) => (
                        <span
                          key={lang.name}
                          className="px-2 py-1 rounded-md bg-surface-100 border border-border-subtle text-[11px] text-content-secondary"
                        >
                          {lang.name}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                {/* Social links */}
                <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
                  <a
                    href={portfolioConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit GitHub profile"
                    className="p-2 min-h-[36px] min-w-[36px] rounded-lg bg-surface-100 border border-border-subtle text-content-secondary hover:text-content-primary hover:border-border-focus transition-colors interactive-press cursor-pointer inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${portfolioConfig.social.email}`}
                    aria-label="Send an email"
                    className="p-2 min-h-[36px] min-w-[36px] rounded-lg bg-surface-100 border border-border-subtle text-content-secondary hover:text-content-primary hover:border-border-focus transition-colors interactive-press cursor-pointer inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <span className="pl-1 text-[11px] text-content-muted tracking-wide">
                    {portfolioConfig.social.discord}
                  </span>
                  <DiscordIcon
                    className="w-4 h-4 text-content-muted ml-auto"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar: scroll cue + build tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hidden sm:flex items-center justify-between pt-6 border-t border-white/[0.08] font-mono text-[11px] tracking-widest uppercase text-content-muted"
      >
        <span className="flex items-center gap-2">
          <ArrowDown className="w-3 h-3 animate-bounce" aria-hidden="true" />
          SCROLL TO EXPLORE
        </span>
        <span>NEXT.JS 15 // TYPESCRIPT // TAILWIND</span>
      </motion.div>
    </section>
  );
}
