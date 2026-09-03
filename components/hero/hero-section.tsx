"use client";

import { motion, type Variants } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowDown, MapPin } from "lucide-react";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 sm:pt-40 sm:pb-16 px-6 sm:px-8 max-w-6xl mx-auto"
    >
      {/* Top subtle eyebrow metadata */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#71717a] tracking-widest uppercase border-b border-white/[0.06] pb-4"
      >
        <div className="flex items-center gap-2 text-[#a1a1aa]">
          <span>SOFTWARE & SYSTEMS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>AVAILABLE FOR COLLABORATION</span>
        </div>
      </motion.div>

      {/* Main Typographic Hero Body */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="my-auto py-12 sm:py-20 flex flex-col items-start"
      >
        {/* Name in bold high-contrast typography */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-[#f5f5f7] leading-none mb-4 select-none"
        >
          {portfolioConfig.personal.name}
        </motion.h1>

        {/* Role & Core Focus statement */}
        <motion.div variants={itemVariants} className="space-y-1 mb-8">
          <p className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#f5f5f7]">
            {portfolioConfig.personal.role}
          </p>
          <p className="text-xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#a1a1aa]">
            Building software, web & game technologies.
          </p>
        </motion.div>

        {/* Core highlight languages row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs sm:text-sm text-[#71717a] tracking-widest uppercase py-3 px-4 rounded-lg bg-white/[0.02] border border-white/[0.06]"
        >
          {portfolioConfig.personal.coreHighlights.map((tech, idx) => (
            <span key={tech} className="flex items-center gap-3">
              <Magnetic strength={0.2}>
                <span className="text-[#f5f5f7] hover:text-[#38bdf8] transition-colors cursor-default inline-block py-0.5">
                  {tech}
                </span>
              </Magnetic>
              {idx < portfolioConfig.personal.coreHighlights.length - 1 && (
                <span className="text-white/20">/</span>
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom explore prompt with smooth scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex items-center justify-between pt-6 border-t border-white/[0.06] font-mono text-xs text-[#71717a] tracking-widest uppercase"
      >
        <Magnetic strength={0.2}>
          <button
            onClick={() => scrollToSection("skills")}
            className="group flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer focus:outline-none py-1"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#38bdf8] group-hover:translate-y-1 transition-transform" />
          </button>
        </Magnetic>
      </motion.div>
    </section>
  );
}
