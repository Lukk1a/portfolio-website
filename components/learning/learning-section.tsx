"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { Activity } from "lucide-react";

export function LearningSection() {
  return (
    <section
      id="learning"
      aria-labelledby="learning-heading"
      className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-border-subtle scroll-mt-16 sm:scroll-mt-20"
    >
      <SectionMarker number="03" label="ACTIVE RESEARCH RADAR & SPECIALIZATION" tag="// RADAR" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 space-y-3"
      >
        <h2 id="learning-heading" className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white">
          Active Engineering Radar
        </h2>
        <p className="text-sm sm:text-base text-content-secondary font-light max-w-2xl leading-relaxed">
          Focused exploration tracks pushing deeper into low latency concurrency, graphics shaders, and distributed consensus models.
        </p>
      </motion.div>

      {/* Grid of Research Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {portfolioConfig.currentlyLearning.map((item, idx) => {
          const isInProgress = item.status === "In Progress";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              className="group relative p-6 sm:p-7 rounded-2xl bg-surface-100 border border-border-subtle hover:border-border-subtle transition-all duration-150 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-content-secondary font-medium">{item.area}</span>
                  <div className="flex items-center gap-1.5">
                    {isInProgress && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    <span className={`px-2.5 py-0.5 rounded-full border font-mono text-[10px] ${
                      isInProgress
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                        : "bg-white/[0.04] border-border-subtle text-content-secondary"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-medium text-white tracking-tight leading-snug">
                  {item.topic}
                </h3>

                <p className="text-xs text-content-secondary leading-relaxed font-light font-sans">
                  {item.note}
                </p>

                {/* Live Milestone Progress */}
                <div className="pt-1">
                  <div className="px-2.5 py-1.5 rounded-lg bg-black/60 border border-border-subtle font-mono text-[10px] text-content-primary flex items-center gap-2">
                    <span className="text-content-secondary">&gt;_</span>
                    <span className="truncate">{item.milestone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs text-content-secondary group-hover:text-content-primary transition-colors font-mono">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-content-secondary" aria-hidden="true" />
                  <span>EXPLORATION TRACK</span>
                </div>
                <span className="text-[10px] tracking-wider text-content-secondary group-hover:text-content-primary">
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
