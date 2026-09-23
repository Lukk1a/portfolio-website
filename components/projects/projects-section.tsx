"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio";
import { SectionMarker } from "@/components/ui/section-marker";
import { ExternalLink, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import Link from "next/link";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 sm:py-32 px-6 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.08] scroll-mt-16 sm:scroll-mt-20"
    >
      <SectionMarker number="04" label="SHOWCASE PROJECTS" tag="// ARCHITECTURE" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 space-y-3"
      >
        <h2 id="projects-heading" className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Selected Works
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          A showcase of recent systems, web architectures, and high-performance applications built from the ground up.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {portfolioConfig.projects.map((project, idx) => {
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-150 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-zinc-400 font-medium">PROJECT</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed font-light font-sans">
                  {project.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] font-mono text-[10px] text-zinc-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-4">
                  {project.link && (
                    <Link href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span>LIVE</span>
                    </Link>
                  )}
                  {project.github && (
                    <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono hover:text-white transition-colors">
                      <GithubIcon className="w-4 h-4" />
                      <span>SOURCE</span>
                    </Link>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <Layers className="w-4 h-4" />
                  <span>0{idx + 1}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
