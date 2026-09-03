"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { Magnetic } from "@/components/ui/magnetic";
import { Terminal, Sparkles, Code2 } from "lucide-react";

export function InteractiveMatrix() {
  const [activeLang, setActiveLang] = React.useState<string | null>("C++");

  const selectedData = React.useMemo(() => {
    return portfolioConfig.matrixLanguages.find((l) => l.name === activeLang) || null;
  }, [activeLang]);

  return (
    <div className="relative w-full rounded-2xl border border-white/[0.08] bg-[#0c0c0c]/80 p-6 sm:p-10 mb-16 overflow-hidden">
      {/* Background technical grid accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Top Header of the Matrix */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4 mb-8">
        <div className="flex items-center gap-2.5 font-mono text-xs text-[#71717a] tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>CORE LANGUAGE CONSTELLATION</span>
        </div>
        <span className="font-mono text-[11px] text-[#52525b]">
          [ HOVER OR TAP TO EXPLORE ARCHITECTURE ]
        </span>
      </div>

      {/* Typographic Matrix Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[280px]">
        {/* Typographic Cloud with Magnetic Pull (Left / Center) */}
        <div className="lg:col-span-7 flex flex-wrap items-center justify-around gap-6 sm:gap-8 py-6 select-none">
          {portfolioConfig.matrixLanguages.map((lang) => {
            const isActive = activeLang === lang.name;
            return (
              <Magnetic key={lang.name} strength={0.3}>
                <button
                  onMouseEnter={() => setActiveLang(lang.name)}
                  onFocus={() => setActiveLang(lang.name)}
                  onClick={() => setActiveLang(lang.name)}
                  className={`relative px-4 py-2.5 rounded-xl font-mono text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight transition-all duration-200 cursor-pointer focus:outline-none interactive-press ${
                    isActive
                      ? "text-[#f5f5f7] bg-white/[0.08] border border-white/20 shadow-lg shadow-[#38bdf8]/5"
                      : "text-[#71717a] hover:text-[#f5f5f7] border border-transparent hover:bg-white/[0.03]"
                  }`}
                  aria-label={`Inspect ${lang.name} details`}
                >
                  <span>{lang.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-language-indicator"
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#38bdf8]"
                      transition={{ type: "spring", stiffness: 380, damping: 25 }}
                    />
                  )}
                </button>
              </Magnetic>
            );
          })}
        </div>

        {/* Morphing Context Detail Drawer with layoutId (Right) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {selectedData ? (
              <motion.div
                key={selectedData.name}
                layoutId="matrix-detail-card"
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.12] space-y-3.5 font-mono shadow-2xl relative overflow-hidden backdrop-blur-sm"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span className="text-[#38bdf8] font-semibold">{selectedData.name}</span>
                  </div>
                  <span className="text-[11px] text-[#71717a]">{selectedData.domain}</span>
                </div>

                <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans font-light">
                  {selectedData.detail}
                </p>

                <div className="flex items-center gap-2 pt-1 text-[11px] text-[#52525b] border-t border-white/[0.04]">
                  <Terminal className="w-3 h-3 text-[#38bdf8]" />
                  <code className="text-[#71717a] font-mono">{selectedData.levelSnippet}</code>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
