"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";

interface Language {
  name: string;
  domain: string;
  description: string;
  snippet: string;
}

const LANGUAGES: Language[] = [
  {
    name: "C++",
    domain: "Native Systems & High-Perf",
    description:
      "Zero-overhead abstractions, deterministic memory management, and cache-conscious data layouts for latency-critical engines.",
    snippet: "LinearArena<T>::allocate(sizeof(T));",
  },
  {
    name: "Python",
    domain: "Automation, CLI & Services",
    description:
      "Async pipelines, event-driven scrapers, CLI tooling, and distributed task queues with structured telemetry.",
    snippet: "async for event in stream.consume():",
  },
  {
    name: "JavaScript",
    domain: "Web Platform & Event Loop",
    description:
      "Non-blocking I/O, event-driven architecture, and runtime DOM manipulation across full-stack web systems.",
    snippet: "await Promise.allSettled(tasks);",
  },
  {
    name: "TypeScript",
    domain: "Type-Safe Architecture",
    description:
      "Strict type systems, robust interfaces, scalable full-stack applications & clean contracts.",
    snippet: "type SystemContract<T> = ...",
  },
  {
    name: "Luau",
    domain: "Roblox Game Engine & Netcode",
    description:
      "Delta-compressed replication, client-side prediction, and server-authoritative state machines for low-latency multiplayer.",
    snippet: "Replicator:delta_sync(state, prev);",
  },
];

// Approximate scatter positions as percentages [left%, top%]
const POSITIONS: { left: string; top: string }[] = [
  { left: "4%", top: "8%" },    // C++
  { left: "28%", top: "8%" },   // Python
  { left: "52%", top: "8%" },   // JavaScript
  { left: "4%", top: "54%" },   // TypeScript
  { left: "34%", top: "54%" },  // Luau
];

export function LanguageConstellation() {
  const [active, setActive] = useState<Language | null>(null);

  return (
    <div className="mb-16">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
          <Code2 className="w-3 h-3 text-sky-400" />
          Core Language Constellation
        </span>
        <span className="font-mono text-[10px] tracking-[0.15em] text-zinc-600 uppercase hidden sm:block">
          [ Hover or tap to explore architecture ]
        </span>
      </div>

      {/* Main interactive area */}
      <div className="relative rounded-xl border border-white/[0.06] bg-zinc-950/40 overflow-hidden">
        <div className="relative h-52 sm:h-64">
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.name}
              style={{ left: POSITIONS[i].left, top: POSITIONS[i].top }}
              className="absolute focus:outline-none cursor-pointer select-none group"
              onMouseEnter={() => setActive(lang)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(lang)}
              onBlur={() => setActive(null)}
              aria-label={`Explore ${lang.name}`}
            >
              <div className="relative">
                {/* Hover pill background */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: active?.name === lang.name ? 1 : 0,
                    scale: active?.name === lang.name ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 -inset-x-3 -inset-y-2 rounded-lg bg-zinc-800/70 border border-white/[0.1]"
                />

                {/* Cyan accent dot */}
                <AnimatePresence>
                  {active?.name === lang.name && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-sky-400 z-10"
                    />
                  )}
                </AnimatePresence>

                {/* Language name */}
                <motion.span
                  animate={{
                    color: active?.name === lang.name
                      ? "#ffffff"
                      : active
                      ? "#3f3f46"
                      : "#71717a",
                  }}
                  transition={{ duration: 0.15 }}
                  className="relative z-10 block text-2xl sm:text-3xl font-bold tracking-tight leading-none px-3 py-2"
                  style={{ fontWeight: 700 }}
                >
                  {lang.name}
                </motion.span>
              </div>
            </button>
          ))}

          {/* Detail panel — right side */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.name}
                initial={{ opacity: 0, x: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 8, filter: "blur(4px)" }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-4 top-4 bottom-4 w-52 sm:w-64 rounded-lg border border-white/[0.08] bg-zinc-900/90 backdrop-blur-md p-4 flex flex-col gap-3 pointer-events-none"
              >
                {/* Name + domain */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                    <span className="text-sm font-bold text-white leading-tight">
                      {active.name}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] tracking-wider text-zinc-500 text-right leading-tight pt-0.5">
                    {active.domain}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {active.description}
                </p>

                {/* Code snippet */}
                <div className="mt-auto">
                  <span className="font-mono text-[11px] text-sky-400/70 tracking-wide">
                    &gt;_ {active.snippet}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Idle hint when nothing hovered */}
          <AnimatePresence>
            {!active && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-52 sm:w-64 rounded-lg border border-dashed border-white/[0.05] p-4 flex items-center justify-center"
              >
                <span className="font-mono text-[10px] text-zinc-700 tracking-widest uppercase text-center">
                  Hover a language
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
