"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { Cpu, Globe, Gamepad2, Wrench, ShieldCheck, Binary } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      icon: Cpu,
      title: "Systems & Memory Models",
      desc: "Low-level memory layouts, linear arena allocators, cache-friendly data structures, and deterministic logic.",
      badge: "C++ / SIMD",
    },
    {
      icon: Globe,
      title: "Web Platforms & Runtimes",
      desc: "Strict type-safe full-stack platforms, modern Next.js 15 Server Components, and sub-100ms interactions.",
      badge: "NEXT.JS / TS",
    },
    {
      icon: Gamepad2,
      title: "Game Simulation & Netcode",
      desc: "Real-time client/server state synchronization, delta compression packets, and deterministic event loops.",
      badge: "LUAU / ENGINES",
    },
    {
      icon: Wrench,
      title: "Automation & CI/CD",
      desc: "Asynchronous task workers, multi-stage Docker packaging, and automated GitLab CI/CD verification pipelines.",
      badge: "PYTHON / DOCKER",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
      <SectionMarker number="03" label="ENGINEERING PRINCIPLES &amp; SYSTEMS DISCIPLINE" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Core Statement (Left) */}
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <Binary className="w-3.5 h-3.5" />
            <span>ENGINEERING CREED // ARCHITECTURAL INTENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Building software with intention, deterministic logic, and precision.
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            {portfolioConfig.personal.bio}
          </p>

          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            {portfolioConfig.personal.statement} I favor clean memory models, compile-time type safety, and systems that feel instant and unyielding under heavy load.
          </p>

          {/* Callout Box */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] font-mono text-xs text-zinc-400 space-y-1">
            <div className="text-white font-semibold flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-white/80" />
              <span>PRINCIPLES OVER DECORATION</span>
            </div>
            <p className="text-[11px] text-zinc-500 font-sans">
              Code should be as simple as the problem allows, as fast as the hardware permits, and as resilient as production demands.
            </p>
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
                className="group p-5 rounded-xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-150"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-white/[0.05] text-white border border-white/[0.08]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
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
