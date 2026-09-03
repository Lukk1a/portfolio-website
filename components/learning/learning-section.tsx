"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { BookOpen, ArrowUpRight } from "lucide-react";

export function LearningSection() {
  return (
    <section id="learning" className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      <SectionMarker label="CURRENTLY EXPLORING & STUDYING" />

      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 space-y-2"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f5f5f7]">
          Currently Learning
        </h2>
        <p className="text-xs sm:text-sm text-[#71717a] font-mono">
          [ Actively expanding knowledge in systems, graphics, and distributed architectures ]
        </p>
      </motion.div>

      {/* Grid of Learning Topics with blur-to-focus and hover physics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {portfolioConfig.currentlyLearning.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: idx * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="group relative p-6 rounded-2xl bg-[#0c0c0c]/60 border border-white/[0.08] hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#71717a]">
                <span className="text-[#38bdf8]">{item.area}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/70">
                  {item.status}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-[#f5f5f7] tracking-tight group-hover:text-white transition-colors">
                {item.topic}
              </h3>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#52525b] group-hover:text-[#a1a1aa] transition-colors font-mono">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Active Track</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#71717a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
