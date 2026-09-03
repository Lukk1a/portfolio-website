"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { Activity } from "lucide-react";

export function LearningSection() {
  return (
    <section id="learning" className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
      <SectionMarker number="03" label="ACTIVE RESEARCH RADAR &amp; SPECIALIZATION" tag="// RADAR" />

      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 space-y-3"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Active Engineering Radar
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Focused exploration tracks pushing deeper into low-latency concurrency, graphics shaders, and distributed consensus models.
        </p>
      </motion.div>

      {/* Grid of Research Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {portfolioConfig.currentlyLearning.map((item, idx) => {
          const isInProgress = item.status === "In Progress";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              className="group relative p-6 sm:p-7 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-150 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-zinc-400 font-medium">{item.area}</span>
                  <div className="flex items-center gap-1.5">
                    {isInProgress && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    <span className={`px-2.5 py-0.5 rounded-full border font-mono text-[10px] ${
                      isInProgress
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                        : "bg-white/[0.04] border-white/[0.08] text-zinc-400"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
                  {item.topic}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-light font-sans">
                  {item.note}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors font-mono">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-zinc-500" />
                  <span>EXPLORATION TRACK</span>
                </div>
                <span className="text-[10px] tracking-wider text-zinc-600 group-hover:text-zinc-400">
                  0{idx + 1}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
