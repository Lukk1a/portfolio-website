"use client";

import { motion } from "framer-motion";
import { SkillCategory } from "@/config/portfolio";

interface SkillCategoryRowProps {
  category: SkillCategory;
}

export function SkillCategoryRow({ category }: SkillCategoryRowProps) {
  return (
    <div className="py-8 border-b border-white/[0.08] last:border-b-0">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Category Header (Left column) */}
        <div className="md:col-span-4 space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-[#71717a] tracking-widest uppercase">
            <span className="text-[#38bdf8]">•</span>
            <span className="text-[#f5f5f7] font-medium">{category.title}</span>
          </div>
          <p className="text-xs text-[#71717a] leading-relaxed max-w-xs font-sans">
            {category.description}
          </p>
        </div>

        {/* Tech Items List (Right column) */}
        <div className="md:col-span-8 flex flex-wrap gap-2.5 sm:gap-3">
          {category.items.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03, duration: 0.3 }}
              whileHover={{ y: -2 }}
              className="group relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/20 transition-all duration-200 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#38bdf8] transition-colors" />
              <span className="text-sm sm:text-base font-medium text-[#f5f5f7] tracking-tight group-hover:text-white transition-colors">
                {item.name}
              </span>
              {item.domain && (
                <span className="hidden sm:inline-block font-mono text-[10px] text-[#52525b] group-hover:text-[#71717a] transition-colors border-l border-white/10 pl-2">
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
