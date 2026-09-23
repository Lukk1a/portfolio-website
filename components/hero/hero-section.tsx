"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[90dvh] flex flex-col justify-between pt-24 pb-16 sm:pt-28 sm:pb-20 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Main Hero Body */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="my-auto py-8 sm:py-12 space-y-8 max-w-3xl"
      >
        <motion.div variants={itemVariants} className="space-y-3">
          <span className="font-mono text-xs tracking-widest text-content-muted uppercase">
            {"// SYSTEMS & WEB ARCHITECTURE"}
          </span>
          <h1
            id="hero-heading"
            className="text-5xl sm:text-7xl md:text-8xl font-serif font-medium tracking-tight text-content-primary leading-[1.05] text-balance"
          >
            {portfolioConfig.personal.fullName}
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <p className="text-xl sm:text-2xl font-serif italic text-content-secondary tracking-wide leading-snug">
            {portfolioConfig.personal.role}
          </p>
          <p className="text-base sm:text-lg text-content-muted font-light leading-relaxed max-w-2xl text-pretty">
            {portfolioConfig.personal.bio} {portfolioConfig.personal.statement}
          </p>
        </motion.div>

        {/* Engineering Specializations */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-2 pt-1"
        >
          {portfolioConfig.personal.coreHighlights.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-surface-100 border border-border-subtle text-xs font-mono text-content-secondary"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Action Buttons with Semantic Anchors and WCAG Touch Targets */}
        <motion.div
          variants={itemVariants}
          className="pt-4 flex flex-wrap items-center gap-4"
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
      </motion.div>
    </section>
  );
}
