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

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/[0.08] py-3.5"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Name */}
        <div className="flex items-center gap-4">
          <Magnetic strength={0.2}>
            <button
              onClick={() => scrollToSection("hero")}
              className="group flex items-center gap-2 text-left focus:outline-none cursor-pointer py-1"
              aria-label="Scroll to top"
            >
              <span className="font-mono text-sm tracking-wider text-white font-semibold group-hover:text-zinc-300 transition-colors">
                {portfolioConfig.personal.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
            </button>
          </Magnetic>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-zinc-400 tracking-wider uppercase">
          <button
            onClick={() => scrollToSection("projects")}
            className="hover:text-white transition-colors cursor-pointer interactive-press"
          >
            PROJECTS
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="hover:text-white transition-colors cursor-pointer interactive-press"
          >
            STACK
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-white transition-colors cursor-pointer interactive-press"
          >
            PRINCIPLES
          </button>
          <button
            onClick={() => scrollToSection("learning")}
            className="hover:text-white transition-colors cursor-pointer interactive-press"
          >
            RADAR
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-white transition-colors cursor-pointer interactive-press"
          >
            CONTACT
          </button>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white interactive-press"
            aria-label="Open mobile menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
