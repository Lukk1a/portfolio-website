"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { InteractiveMatrix } from "./interactive-matrix";
import { SkillCategoryRow } from "./skill-category-row";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto">
      <SectionMarker label="TECHNICAL ARCHITECTURE & TECHNOLOGIES" />

      {/* Section Title with blur-to-focus reveal */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 space-y-3"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f5f5f7]">
          Technologies & Stack
        </h2>
        <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-light leading-relaxed">
          A disciplined set of languages, frameworks, and infrastructure tools I use to build robust software systems, interactive engines, and web architectures.
        </p>
      </motion.div>

      {/* Signature Interactive Matrix */}
      <InteractiveMatrix />

      {/* Editorial Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c]/40 px-6 sm:px-10 divide-y divide-white/[0.06]"
      >
        {portfolioConfig.skillCategories.map((cat) => (
          <SkillCategoryRow key={cat.id} category={cat} />
        ))}
      </motion.div>
    </section>
  );
}
