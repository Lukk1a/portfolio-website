"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowDown, Code2, Copy, Check, Terminal } from "lucide-react";

interface HeroSectionProps {
  onToast?: (msg: string) => void;
}

export function HeroSection({ onToast }: HeroSectionProps) {
  const [activeSnippetId, setActiveSnippetId] = React.useState("cpp");
  const [copied, setCopied] = React.useState(false);

  const activeSnippet = React.useMemo(() => {
    return (
      portfolioConfig.specSnippets.find((s) => s.id === activeSnippetId) ||
      portfolioConfig.specSnippets[0]
    );
  }, [activeSnippetId]);

  const handleCopy = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    onToast?.(`Copied ${activeSnippet.filename} to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

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
      className="relative min-h-[95vh] flex flex-col justify-between pt-32 pb-16 sm:pt-36 sm:pb-20 px-6 sm:px-8 max-w-6xl mx-auto"
    >

      {/* Main Hero Body */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="my-auto py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full"
      >
        {/* Left Column: Asymmetric Typographic Statement */}
        <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
              {"// SOFTWARE & SYSTEMS DEVELOPER"}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white leading-none">
              {portfolioConfig.personal.fullName}
            </h1>
          </div>

          <div className="space-y-3">
            <p className="text-lg sm:text-xl font-light text-zinc-300 tracking-tight leading-snug">
              {portfolioConfig.personal.role}
            </p>
            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-lg">
              {portfolioConfig.personal.bio}
            </p>
            <p className="text-xs text-zinc-500 font-mono leading-relaxed max-w-lg">
              {portfolioConfig.personal.statement}
            </p>
          </div>

          {/* Core Tech Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {portfolioConfig.personal.coreHighlights.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Direct Jump CTA */}
          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-4 py-2 rounded-lg bg-white text-black font-medium text-xs font-mono tracking-wider hover:bg-zinc-200 transition-colors interactive-press cursor-pointer flex items-center gap-2"
            >
              <span>EXPLORE CODEBASES</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2 rounded-lg bg-transparent border border-white/[0.12] hover:border-white/[0.25] text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-colors interactive-press cursor-pointer"
            >
              CONTACT
            </button>
          </div>
        </motion.div>

        {/* Right Column: Interactive Inline Spec Drawer */}
        <motion.div variants={itemVariants} className="lg:col-span-6 w-full">
          <div className="rounded-xl border border-white/[0.08] bg-zinc-950/90 shadow-card overflow-hidden font-mono">
            {/* Spec Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-black/60">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-xs font-semibold text-zinc-300">
                  {activeSnippet.filename}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer interactive-press"
                  aria-label="Copy code snippet"
                  title="Copy snippet"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Language Tabs */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-white/[0.06] bg-zinc-950 text-xs overflow-x-auto">
              {portfolioConfig.specSnippets.map((snippet) => {
                const isActive = snippet.id === activeSnippetId;
                return (
                  <button
                    key={snippet.id}
                    onClick={() => setActiveSnippetId(snippet.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer interactive-press whitespace-nowrap ${
                      isActive
                        ? "bg-white/[0.1] text-white font-medium border border-white/[0.12]"
                        : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                    }`}
                  >
                    {snippet.name}
                  </button>
                );
              })}
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-5 text-xs font-mono overflow-x-auto min-h-[220px] bg-black/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSnippet.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-3"
                >
                  <pre className="text-zinc-300 whitespace-pre leading-relaxed">
                    {activeSnippet.code}
                  </pre>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Spec Drawer Footer with Domain Summary */}
            <div className="px-4 py-2.5 border-t border-white/[0.06] bg-zinc-950/80 text-[11px] text-zinc-500 flex items-center justify-between gap-2">
              <span className="truncate">{activeSnippet.domain}</span>
              <span className="text-[10px] text-zinc-600 hidden sm:inline font-mono">
                [SYNTAX SIGNATURE]
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom status line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
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
