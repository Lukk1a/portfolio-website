"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { Magnetic } from "@/components/ui/magnetic";
import { Terminal, Code2, Cpu } from "lucide-react";

export function InteractiveMatrix() {
  const [activeLang, setActiveLang] = React.useState<string | null>("C++");

  const selectedData = React.useMemo(() => {
    return portfolioConfig.matrixLanguages.find((l) => l.name === activeLang) || null;
  }, [activeLang]);

  return (
    <div className="relative w-full rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-2 sm:p-2.5 mb-16 overflow-hidden">
      {/* Inner Core Container (Double-Bezel Architecture) */}
      <div className="relative rounded-xl border border-white/[0.06] bg-[#0c0c0c]/90 p-6 sm:p-8 overflow-hidden backdrop-blur-md">
        {/* Top Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4 mb-8">
          <div className="flex items-center gap-2.5 font-mono text-xs text-zinc-400 tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Core Language Constellation</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-500">
            [ HOVER OR FOCUS TO INSPECT SPEC ]
          </span>
        </div>

        {/* Typographic Matrix Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[260px]">
          {/* Typographic Cloud with Magnetic Pull (Left) */}
          <div className="lg:col-span-7 flex flex-wrap items-center gap-4 sm:gap-6 py-4 select-none">
            {portfolioConfig.matrixLanguages.map((lang) => {
              const isActive = activeLang === lang.name;
              return (
                <Magnetic key={lang.name} strength={0.25}>
                  <button
                    onMouseEnter={() => setActiveLang(lang.name)}
                    onFocus={() => setActiveLang(lang.name)}
                    onClick={() => setActiveLang(lang.name)}
                    className={`relative px-4 py-2.5 rounded-xl font-mono text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 interactive-press ${
                      isActive
                        ? "text-white bg-white/[0.08] border border-white/20 shadow-lg shadow-sky-500/5"
                        : "text-zinc-500 hover:text-white border border-transparent hover:bg-white/[0.03]"
                    }`}
                    aria-label={`Inspect ${lang.name} specifications`}
                  >
                    <span>{lang.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-language-indicator"
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                        transition={{ type: "spring", stiffness: 400, damping: 26 }}
                      />
                    )}
                  </button>
                </Magnetic>
              );
            })}
          </div>

          {/* Context Detail Drawer (Right) */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {selectedData ? (
                <motion.div
                  key={selectedData.name}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="p-5 sm:p-6 rounded-xl bg-white/[0.03] border border-white/[0.12] space-y-3 font-mono shadow-2xl relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-sky-400" />
                      <span className="text-sky-400 font-semibold">{selectedData.name}</span>
                    </div>
                    <span className="text-[11px] text-zinc-400">{selectedData.domain}</span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-sans font-light">
                    {selectedData.detail}
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-500 border-t border-white/[0.04]">
                    <Terminal className="w-3 h-3 text-sky-400" />
                    <code className="text-zinc-400 font-mono">{selectedData.levelSnippet}</code>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
