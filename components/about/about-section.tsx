"use client";

import { motion } from "framer-motion";
import { SectionMarker } from "@/components/ui/section-marker";
import { Cpu, Globe, Gamepad2, Wrench } from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-border-subtle scroll-mt-16 sm:scroll-mt-20"
    >
      <SectionMarker
        number="02"
        label="ENGINEERING PRINCIPLES & SYSTEMS DISCIPLINE"
        tag="// PHILOSOPHY"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Core Statement (Left) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <h2
            id="about-heading"
            className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-content-primary leading-tight"
          >
            Building software with intention, deterministic logic, and
            precision.
          </h2>

          <p className="text-base text-content-secondary font-light leading-relaxed">
            As a systems and web developer, I favor clean memory models, compile
            time type safety, and architectures that feel instant and unyielding
            under heavy load. From native engines to async web pipelines, the
            discipline stays the same: measure first, abstract only what earns
            its cost.
          </p>

          <div className="space-y-3 pt-2">
            {[
              "Deterministic simulation over heuristic guessing",
              "Linear arena memory allocation preventing fragmentation",
              "Sub 100ms interaction feedback across web surfaces",
              "Zero dependency core logic where latency is critical",
            ].map((rule, idx) => (
              <div
                key={rule}
                className="flex items-start gap-3 text-xs text-content-secondary font-mono"
              >
                <span className="text-content-secondary font-semibold flex-shrink-0">
                  {`0${idx + 1} //`}
                </span>
                <span className="leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Asymmetrical Bento Grid (Right) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hero Bento Tile: Systems & Memory Models (Full width top) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            className="sm:col-span-2 p-6 rounded-2xl bg-surface-100 border border-border-subtle hover:border-border-subtle transition-all duration-150 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/[0.08] text-content-primary border border-border-subtle">
                  <Cpu className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="text-base font-medium text-content-primary tracking-tight">
                  Systems & Memory Models
                </h3>
              </div>
              <span className="font-mono text-[10px] text-content-primary bg-white/[0.06] px-2.5 py-1 rounded-md border border-border-subtle">
                C++20 / SIMD
              </span>
            </div>
            <p className="text-xs text-content-secondary leading-relaxed font-light mb-2">
              Data oriented architectures designed around CPU cache lines,
              deterministic fixed timestep simulation loops, and custom
              contiguous memory arenas preventing heap churn.
            </p>

            {/* Contiguous Memory Arena Visualizer */}
            <div className="my-3 p-3 rounded-xl bg-black/80 border border-border-subtle font-mono text-[10px] space-y-2">
              <div className="flex items-center justify-between text-content-secondary text-[9px]">
                <span>LINEAR_ARENA_LAYOUT</span>
                <span className="text-emerald-400">HEAP_FRAGMENTATION: 0%</span>
              </div>
              <div className="grid grid-cols-12 gap-1 h-2 rounded bg-surface-100 overflow-hidden p-0.5 border border-border-subtle">
                <div className="col-span-4 bg-sky-400/80 rounded-sm" />
                <div className="col-span-3 bg-indigo-400/80 rounded-sm" />
                <div className="col-span-2 bg-emerald-400/80 rounded-sm" />
                <div className="col-span-3 bg-surface-200 rounded-sm opacity-40" />
              </div>
              <div className="flex flex-wrap items-center justify-between text-[9px] text-content-secondary pt-0.5 gap-x-2 gap-y-1">
                <span>[0x0000] SIMULATION</span>
                <span>[0x4000] NETCODE</span>
                <span>[0x8000] LINEAR HEADROOM</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-subtle text-[11px] font-mono text-content-secondary">
              <span className="px-2 py-0.5 rounded bg-black/60 border border-border-subtle">
                CACHE CONSCIOUS
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-border-subtle">
                ARENA POOLS
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 border border-border-subtle">
                &lt; 0.4ms TICK
              </span>
            </div>
          </motion.div>

          {/* Bento Tile 2: Web Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: 0.06,
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -2 }}
            className="p-5 rounded-2xl bg-surface-100 border border-border-subtle hover:border-border-subtle transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-white/[0.05] text-content-primary border border-border-subtle">
                  <Globe className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="font-mono text-[10px] text-content-secondary bg-black/60 px-2 py-0.5 rounded border border-border-subtle">
                  NEXT.JS 15
                </span>
              </div>
              <h3 className="text-sm font-medium text-content-primary tracking-tight mb-1.5">
                Web Architecture
              </h3>
              <p className="text-xs text-content-secondary leading-relaxed font-light">
                Strict type contracts, Next.js standalone container runtimes,
                and sub 100ms response cycles.
              </p>
            </div>
          </motion.div>

          {/* Bento Tile 3: Game Simulation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: 0.12,
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -2 }}
            className="p-5 rounded-2xl bg-surface-100 border border-border-subtle hover:border-border-subtle transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-white/[0.05] text-content-primary border border-border-subtle">
                  <Gamepad2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="font-mono text-[10px] text-content-secondary bg-black/60 px-2 py-0.5 rounded border border-border-subtle">
                  LUAU
                </span>
              </div>
              <h3 className="text-sm font-medium text-content-primary tracking-tight mb-1.5">
                Game Netcode & Replication
              </h3>
              <p className="text-xs text-content-secondary leading-relaxed font-light">
                Delta compression packets, client side extrapolation, and
                authoritative state loops.
              </p>
            </div>
          </motion.div>

          {/* Bento Tile 4: Automation & CI/CD (Full width base) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: 0.18,
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -2 }}
            className="sm:col-span-2 p-5 rounded-2xl bg-surface-100 border border-border-subtle hover:border-border-subtle transition-all duration-150 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/[0.05] text-content-primary border border-border-subtle">
                <Wrench className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-content-primary tracking-tight">
                  Automated Verification & CI/CD
                </h3>
                <p className="text-xs text-content-secondary leading-relaxed font-light">
                  Multi stage Docker containers, cached build runners, and
                  automated GitHub Actions pipelines.
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block font-mono text-[10px] text-content-secondary bg-black/60 px-2.5 py-1 rounded-md border border-border-subtle flex-shrink-0">
              DOCKER / CI/CD
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
