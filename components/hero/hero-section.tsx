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
      className="relative min-h-[90vh] flex flex-col justify-between pt-36 pb-16 sm:pt-44 sm:pb-20 px-6 sm:px-8 max-w-6xl mx-auto"
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
            {"// SOFTWARE & SYSTEMS DEVELOPER"}
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
            {portfolioConfig.personal.bio}
          </p>
          <p className="text-xs sm:text-sm text-zinc-500 font-mono leading-relaxed max-w-2xl">
            {portfolioConfig.personal.statement}
          </p>
        </motion.div>

        {/* Core Tech Pills */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 pt-2">
          {portfolioConfig.personal.coreHighlights.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="pt-4 flex items-center gap-4">
          <button
            onClick={() => scrollToSection("projects")}
            className="px-5 py-2.5 rounded-lg bg-white text-black font-medium text-xs font-mono tracking-wider hover:bg-zinc-200 transition-colors interactive-press cursor-pointer flex items-center gap-2"
          >
            <span>EXPLORE CODEBASES</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-5 py-2.5 rounded-lg bg-transparent border border-white/[0.12] hover:border-white/[0.25] text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-colors interactive-press cursor-pointer"
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
        className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.08] font-mono text-xs text-zinc-500 tracking-wider uppercase"
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-zinc-400" />
          <span>ZERO-OVERHEAD ABSTRACTIONS</span>
        </div>

        <Magnetic strength={0.2}>
          <button
            onClick={() => scrollToSection("projects")}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>SCROLL TO SYSTEMS</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </Magnetic>
      </motion.div>
    </section>
  );
}
