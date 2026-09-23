"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { InteractiveMatrix } from "./interactive-matrix";
import { SkillCategoryRow } from "./skill-category-row";

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-border-subtle scroll-mt-16 sm:scroll-mt-20"
    >
      <SectionMarker number="01" label="TECHNICAL STACK & CAPABILITIES" tag="// STACK" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 space-y-3"
      >
        <h2 id="skills-heading" className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white">
          Technologies & Architecture
        </h2>
        <p className="text-sm sm:text-base text-content-secondary max-w-2xl font-light leading-relaxed">
          A disciplined set of systems level languages, asynchronous pipelines, and modern web frameworks used to engineer resilient digital systems.
        </p>
      </motion.div>

      {/* Signature Interactive Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        <InteractiveMatrix />
      </motion.div>

      {/* Editorial Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xl border border-border-subtle bg-surface-100 px-6 sm:px-10 divide-y divide-white/[0.06] backdrop-blur-sm"
      >
        {portfolioConfig.skillCategories.map((cat) => (
          <SkillCategoryRow key={cat.id} category={cat} />
        ))}
      </motion.div>
    </section>
  );
}
