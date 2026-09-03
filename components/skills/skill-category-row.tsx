"use client";

import { motion } from "framer-motion";
import { SkillCategory } from "@/config/portfolio";

interface SkillCategoryRowProps {
  category: SkillCategory;
}

export function SkillCategoryRow({ category }: SkillCategoryRowProps) {
  return (
    <div className="py-8 border-b border-white/[0.06] last:border-b-0">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Category Header (Left column) */}
        <div className="md:col-span-4 space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 tracking-wider uppercase">
            <span className="text-white font-semibold font-mono">[{category.index}]</span>
            <span className="text-white font-medium">{category.title}</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xs font-light">
            {category.description}
          </p>
        </div>

        {/* Tech Items List (Right column) */}
        <div className="md:col-span-8 flex flex-wrap gap-2 sm:gap-2.5">
          {category.items.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.025, duration: 0.25 }}
              whileHover={{ y: -1 }}
              className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.2] transition-all duration-150 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
              <span className="text-xs sm:text-sm font-medium text-zinc-200 tracking-tight group-hover:text-white transition-colors">
                {item.name}
              </span>
              {item.domain && (
                <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors border-l border-white/10 pl-2">
                  {item.domain}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
