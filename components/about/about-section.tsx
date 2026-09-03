"use client";

import { motion } from "framer-motion";
import { SectionMarker } from "@/components/ui/section-marker";
import { Cpu, Globe, Gamepad2, Wrench, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
      <SectionMarker number="02" label="ENGINEERING PRINCIPLES &amp; SYSTEMS DISCIPLINE" tag="// PHILOSOPHY" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Core Statement (Left) */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Building software with intention, deterministic logic, and precision.
          </h2>

          <p className="text-base text-zinc-400 font-light leading-relaxed">
            I favor clean memory models, compile-time type safety, and systems
            that feel instant and unyielding under heavy load. From native engines
            to async web pipelines, the discipline stays the same: measure first,
            abstract only what earns its cost.
          </p>

          <div className="space-y-3 pt-2">
            {[
              "Deterministic simulation over heuristic guessing",
              "Linear arena memory allocation preventing fragmentation",
              "Sub-100ms interaction feedback across web surfaces",
              "Zero-dependency core logic where latency is critical",
            ].map((rule) => (
              <div key={rule} className="flex items-start gap-2.5 text-xs text-zinc-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Asymmetrical Bento Grid (Right) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hero Bento Tile: Systems & Memory Models (Full-width top) */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            className="sm:col-span-2 p-6 rounded-2xl bg-zinc-950/80 border border-white/[0.14] hover:border-white/[0.25] transition-all duration-150 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/[0.08] text-white border border-white/[0.12]">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Systems &amp; Memory Models
                </h3>
              </div>
              <span className="font-mono text-[10px] text-zinc-300 bg-white/[0.06] px-2.5 py-1 rounded-md border border-white/[0.1]">
                C++20 / SIMD
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
              Data-oriented architectures designed around CPU cache lines, deterministic fixed-timestep simulation loops, and custom contiguous memory arenas preventing heap churn.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
              <span className="px-2 py-0.5 rounded bg-black/60 border border-white/[0.06]">CACHE-CONSCIOUS</span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-white/[0.06]">ARENA POOLS</span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-white/[0.06]">&lt; 0.4ms TICK</span>
            </div>
          </motion.div>

          {/* Bento Tile 2: Web Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 bg-black/60 px-2 py-0.5 rounded border border-white/[0.06]">
                  NEXT.JS 15
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                Web Architecture
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Strict type contracts, Next.js standalone container runtimes, and sub-100ms response cycles.
              </p>
            </div>
          </motion.div>

          {/* Bento Tile 3: Game Simulation */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.12, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            className="p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 bg-black/60 px-2 py-0.5 rounded border border-white/[0.06]">
                  LUAU
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                Game Netcode &amp; Replication
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Delta compression packets, client-side extrapolation, and authoritative state loops.
              </p>
            </div>
          </motion.div>

          {/* Bento Tile 4: Automation & CI/CD (Full-width base) */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.18, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            className="sm:col-span-2 p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-150 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  Automated Verification &amp; CI/CD
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Multi-stage Docker containers, cached build runners, and automated GitLab CI pipelines.
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-400 bg-black/60 px-2.5 py-1 rounded-md border border-white/[0.06] flex-shrink-0">
              DOCKER / CI-CD
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
