"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { Cpu, Globe, Gamepad2, Wrench } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      icon: Cpu,
      title: "Systems & Performance",
      desc: "Low-level architectures, clean memory handling, and deterministic logic.",
    },
    {
      icon: Globe,
      title: "Web Architecture",
      desc: "Type-safe full-stack platforms, modern frameworks, and responsive design.",
    },
    {
      icon: Gamepad2,
      title: "Game & Engine Mechanics",
      desc: "Real-time client/server synchronization, state simulation, and gameplay scripting.",
    },
    {
      icon: Wrench,
      title: "Tooling & Automation",
      desc: "Scripting, CI pipelines, and developer tooling built from the ground up.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      <SectionMarker label="PHILOSOPHY & INTERESTS" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Core Statement (Left) */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f5f5f7] leading-tight">
            Building software with intention and precision.
          </h2>

          <p className="text-lg sm:text-xl text-[#a1a1aa] font-light leading-relaxed">
            {portfolioConfig.personal.bio}
          </p>

          <p className="text-sm text-[#71717a] font-light leading-relaxed">
            I prioritize clarity over unnecessary complexity, favoring deep technical understanding, clean abstractions, and software that feels fast and reliable.
          </p>
        </motion.div>

        {/* Pillars / Areas of Interest (Right) */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2 }}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <Icon className="w-4 h-4 text-[#38bdf8]" />
                  <h3 className="text-sm font-semibold text-[#f5f5f7] tracking-tight">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs text-[#71717a] leading-relaxed pl-7">
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
