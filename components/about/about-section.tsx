"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { Cpu, Globe, Gamepad2, Wrench } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      icon: Cpu,
      title: "Systems & Memory Models",
      desc: "Low-level memory layouts, linear arena allocators, cache-friendly data structures, and deterministic logic.",
      badge: "C++ / SIMD",
      accent: false,
    },
    {
      icon: Globe,
      title: "Web Platforms & Runtimes",
      desc: "Strict type-safe full-stack platforms, modern Next.js 15 Server Components, and sub-100ms interactions.",
      badge: "NEXT.JS / TS",
      accent: false,
    },
    {
      icon: Gamepad2,
      title: "Game Simulation & Netcode",
      desc: "Real-time client/server state synchronization, delta compression packets, and deterministic event loops.",
      badge: "LUAU / ENGINES",
      accent: true,
    },
    {
      icon: Wrench,
      title: "Automation & CI/CD",
      desc: "Asynchronous task workers, multi-stage Docker packaging, and automated GitLab CI/CD verification pipelines.",
      badge: "PYTHON / DOCKER",
      accent: false,
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
      <SectionMarker number="02" label="ENGINEERING PRINCIPLES &amp; SYSTEMS DISCIPLINE" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Core Statement (Left) */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Building software with intention, deterministic logic, and precision.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-xl">
            I favor clean memory models, compile-time type safety, and systems
            that feel instant and unyielding under heavy load. From native engines
            to async web pipelines, the discipline stays the same: measure first,
            abstract only what earns it.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {["Deterministic", "Zero Overhead", "Type-Safe", "Cache-Conscious"].map((trait) => (
              <span
                key={trait}
                className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400"
              >
                {trait}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Pillars (Right) */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2 }}
                className={`group p-5 rounded-xl border transition-all duration-150 ${
                  pillar.accent
                    ? "bg-white/[0.04] border-white/[0.16] hover:border-white/[0.3]"
                    : "bg-zinc-950/70 border-white/[0.08] hover:border-white/[0.2]"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg border ${pillar.accent ? "bg-white/[0.08] border-white/[0.15] text-white" : "bg-white/[0.05] border-white/[0.08] text-zinc-400"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 bg-black/60 px-2 py-0.5 rounded border border-white/[0.06]">
                    {pillar.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pl-9 font-light">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
