"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Overview" },
  { id: "skills", label: "Stack" },
  { id: "about", label: "Principles" },
  { id: "learning", label: "Radar" },
  { id: "contact", label: "Contact" },
];

export function ScrollIndicator() {
  const [activeSection, setActiveSection] = React.useState<string>("hero");
  const [hoveredSection, setHoveredSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight * 0.4;

          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i].id);
            if (el) {
              if (scrollPosition >= el.offsetTop) {
                setActiveSection(sections[i].id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Page navigation radar"
      className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center justify-center select-none"
    >
      <div className="relative flex flex-col items-center justify-center gap-3 p-2.5 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/[0.08] shadow-card w-12">
        {/* Subtle Vertical Connector Track */}
        <div className="absolute top-4 bottom-4 w-[1px] bg-white/[0.04] pointer-events-none" />

        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          const isHovered = hoveredSection === id;

          return (
            <div key={id} className="relative flex items-center justify-center z-10">
              {/* Tooltip on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 6, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 4, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-zinc-900/95 border border-white/[0.12] text-[11px] font-mono text-white whitespace-nowrap shadow-xl pointer-events-none backdrop-blur-md flex items-center gap-1"
                  >
                    <span>{label}</span>
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-zinc-900 border-r border-t border-white/[0.12]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Indicator Button */}
              <button
                onClick={() => scrollToSection(id)}
                onMouseEnter={() => setHoveredSection(id)}
                onMouseLeave={() => setHoveredSection(null)}
                onFocus={() => setHoveredSection(id)}
                onBlur={() => setHoveredSection(null)}
                aria-label={`Jump to ${label} section`}
                className="relative flex items-center justify-center w-8 h-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full cursor-pointer group"
              >
                <motion.div
                  animate={{
                    width: isActive ? 22 : isHovered ? 14 : 7,
                    height: isActive ? 3 : 2,
                    backgroundColor: isActive
                      ? "#ffffff"
                      : isHovered
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(255, 255, 255, 0.25)",
                    boxShadow: isActive
                      ? "0 0 10px rgba(255, 255, 255, 0.5)"
                      : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 26,
                  }}
                  className="rounded-full origin-center"
                />
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
