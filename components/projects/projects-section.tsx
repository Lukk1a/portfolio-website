"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { ExternalLink, Layers, Activity } from "lucide-react";
import { GithubIcon, GitlabIcon } from "@/components/ui/icons";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
      <SectionMarker number="01" label="FEATURED ARCHITECTURES &amp; CODEBASES" />

      {/* Section Headline */}
      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 space-y-3"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Selected Systems &amp; Codebases
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-light leading-relaxed">
          Production architectures engineered for low-latency memory models, distributed asynchronous pipelines, game network replication, and container infrastructure.
        </p>
      </motion.div>

      {/* Projects 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {portfolioConfig.projects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: idx * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-200 shadow-card"
          >
            {/* Top Bar: Index + Category + Metric Badge */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">[{project.index}]</span>
                  <span className="text-zinc-600">{"//"}</span>
                  <span className="text-zinc-400 font-medium">{project.category}</span>
                </div>

                {project.metrics && (
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-zinc-300 font-mono">
                    <Activity className="w-3 h-3 text-white/60" />
                    {project.metrics}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-zinc-400 mt-1">
                  {project.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                {project.description}
              </p>

              {/* Architecture Spec */}
              <div className="p-3 rounded-lg bg-black/50 border border-white/[0.05] space-y-1 font-mono text-[11px] text-zinc-400">
                <span className="text-zinc-500 block uppercase tracking-wider text-[10px]">
                  ARCHITECTURAL SUMMARY:
                </span>
                <span className="text-zinc-300 leading-normal block">
                  {project.architecture}
                </span>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2 py-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  <Layers className="w-3 h-3 text-zinc-400" />
                  <span>KEY IMPLEMENTATIONS</span>
                </div>
                <ul className="space-y-1.5 pl-3 border-l border-white/[0.08] text-xs text-zinc-300 font-light">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-zinc-500 font-mono mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom: Tech Stack & Repository Links */}
            <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-zinc-400">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {project.gitlab && (
                  <a
                    href={project.gitlab}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors interactive-press"
                    aria-label={`View ${project.title} on GitLab`}
                  >
                    <GitlabIcon className="w-4 h-4" />
                  </a>
                )}
                {project.github && !project.gitlab && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors interactive-press"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-200 transition-colors interactive-press"
                  >
                    <span>SOURCE</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
