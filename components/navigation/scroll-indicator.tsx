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
  { id: "projects", label: "Showcase" },
  { id: "learning", label: "Radar" },
  { id: "contact", label: "Contact" },
];

interface ScrollIndicatorProps {
  activeSection?: string;
  onActiveSectionChange?: (section: string) => void;
}

export function ScrollIndicator({ activeSection: controlledActive, onActiveSectionChange }: ScrollIndicatorProps) {
  const [internalActive, setInternalActive] = React.useState<string>("hero");
  const activeSection = controlledActive ?? internalActive;
  const [hoveredSection, setHoveredSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    // High performance IntersectionObserver instead of layout thrashing offsetTop queries
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry that has the highest intersection ratio or is currently intersecting
      const intersecting = entries.filter((e) => e.isIntersecting);
      if (intersecting.length > 0) {
        // Sort by greatest intersection ratio
        intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topId = intersecting[0].target.id;
        setInternalActive(topId);
        onActiveSectionChange?.(topId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: [0.1, 0.3, 0.5, 0.8],
    });

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onActiveSectionChange]);

  return (
    <nav
      aria-label="Section radar navigation"
      className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center justify-center select-none"
    >
      <div className="relative flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl bg-surface-100 backdrop-blur-md border border-border-subtle shadow-card w-12">
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
                    className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-surface-100 border border-border-subtle text-[11px] font-mono text-white whitespace-nowrap shadow-xl pointer-events-none backdrop-blur-md flex items-center gap-1"
                  >
                    <span>{label}</span>
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-surface-50 border-r border-t border-border-subtle" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Indicator Button (28px touch target for WCAG 2.2 AA) */}
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
                onMouseEnter={() => setHoveredSection(id)}
                onMouseLeave={() => setHoveredSection(null)}
                onFocus={() => setHoveredSection(id)}
                onBlur={() => setHoveredSection(null)}
                aria-label={`Jump to ${label} section`}
                aria-current={isActive ? "location" : undefined}
                className="relative flex items-center justify-center w-8 min-h-[28px] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 rounded-full cursor-pointer group"
              >
                {/* GPU composited scaleX transform instead of reflow triggering width animation */}
                <motion.div
                  animate={{
                    scaleX: isActive ? 1 : isHovered ? 0.65 : 0.32,
                    scaleY: isActive ? 1.2 : 1,
                    backgroundColor: isActive
                      ? "#ffffff"
                      : isHovered
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(255, 255, 255, 0.25)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 26,
                  }}
                  className="w-6 h-[2.5px] rounded-full origin-center"
                />
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
