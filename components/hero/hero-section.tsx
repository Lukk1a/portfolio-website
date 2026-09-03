"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowDown, Code2 } from "lucide-react";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-between pt-24 pb-16 sm:pt-28 sm:pb-20 px-6 sm:px-8 max-w-6xl mx-auto"
    >
      {/* Main Hero Body */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="my-auto py-8 sm:py-12 space-y-8 max-w-3xl"
      >
        <motion.div variants={itemVariants} className="space-y-3">
          <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
            {"// SYSTEMS & WEB ARCHITECTURE"}
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white leading-none">
            {portfolioConfig.personal.fullName}
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <p className="text-xl sm:text-2xl font-light text-zinc-300 tracking-tight leading-snug">
            {portfolioConfig.personal.role}
          </p>
          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl">
            {portfolioConfig.personal.bio} {portfolioConfig.personal.statement}
          </p>
        </motion.div>

        {/* Engineering Specializations */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 pt-1">
          {portfolioConfig.personal.coreHighlights.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-white/[0.08] text-xs font-mono text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Action Buttons with Button-in-Button Architecture */}
        <motion.div variants={itemVariants} className="pt-4 flex items-center gap-4">
          <Magnetic strength={0.2}>
            <button
              onClick={() => scrollToSection("skills")}
              className="group pl-5 pr-3 py-2 rounded-full bg-white text-black font-medium text-xs font-mono tracking-wider hover:bg-zinc-200 transition-all duration-150 interactive-press cursor-pointer flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>VIEW ARCHITECTURE</span>
              <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-y-0.5 transition-transform duration-150">
                <ArrowDown className="w-3 h-3 text-black" />
              </div>
            </button>
          </Magnetic>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-5 py-2.5 rounded-full bg-transparent border border-white/[0.12] hover:border-white/[0.25] text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-colors interactive-press cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            CONTACT
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Status Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.08] font-mono text-xs text-zinc-600 tracking-wider uppercase"
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5" />
          <span>ZERO-OVERHEAD ABSTRACTIONS</span>
        </div>
        <span>{new Date().getFullYear()} — STANDALONE DOCKER &amp; CI/CD</span>
      </motion.div>
    </section>
  );
}
