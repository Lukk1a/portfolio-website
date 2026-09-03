"use client";

import * as React from "react";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { Menu } from "lucide-react";

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: portfolioConfig.personal.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTime(formatter.format(new Date()));
      } catch {
        setTime("CET");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080808]/85 backdrop-blur-md border-b border-white/[0.06] py-3.5"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Name & Status */}
        <div className="flex items-center gap-4">
          <Magnetic strength={0.25}>
            <button
              onClick={() => scrollToSection("hero")}
              className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer py-1"
              aria-label="Scroll to top"
            >
              <span className="font-mono text-sm tracking-widest text-[#f5f5f7] font-semibold group-hover:text-[#38bdf8] transition-colors">
                {portfolioConfig.personal.name}
              </span>
            </button>
          </Magnetic>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/10 font-mono text-[11px] text-[#71717a]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#38bdf8]"></span>
            </span>
            <span>{time ? `${time} CET` : "CET"}</span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-[#a1a1aa] tracking-widest uppercase">
          <button
            onClick={() => scrollToSection("skills")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            SKILLS
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection("learning")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            LEARNING
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            CONTACT
          </button>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#a1a1aa] hover:text-white interactive-press"
            aria-label="Open mobile menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
