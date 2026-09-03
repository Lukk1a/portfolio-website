"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "about", label: "Principles" },
  { id: "learning", label: "Radar" },
  { id: "contact", label: "Contact" },
];

export function ScrollIndicator() {
  const [activeSection, setActiveSection] = React.useState<string>("hero");
  const [hoveredSection, setHoveredSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Section indicators"
      className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center justify-center select-none"
    >
      <div className="flex flex-col items-center justify-center gap-2.5 p-2 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/[0.08] shadow-card w-11">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          const isHovered = hoveredSection === id;

          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              onMouseEnter={() => setHoveredSection(id)}
              onMouseLeave={() => setHoveredSection(null)}
              aria-label={`Jump to ${label}`}
              className="relative flex items-center justify-center w-8 h-4 focus:outline-none cursor-pointer group"
            >
              <motion.div
                animate={{
                  width: isActive ? 24 : isHovered ? 16 : 8,
                  height: isActive ? 3 : 2,
                  backgroundColor: isActive
                    ? "#ffffff"
                    : isHovered
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(255, 255, 255, 0.2)",
                  boxShadow: isActive
                    ? "0 0 10px rgba(255, 255, 255, 0.6), 0 0 2px rgba(255, 255, 255, 0.3)"
                    : "none",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="rounded-full origin-center"
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
