"use client";

import * as React from "react";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";
import { Menu } from "lucide-react";

interface NavbarProps {
  activeSection?: string;
  onOpenMobileMenu: () => void;
}

export function Navbar({ activeSection = "hero", onOpenMobileMenu }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b transition-[background-color,border-color,padding] duration-200 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-white/[0.08] py-3.5"
          : "bg-black/0 border-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Name */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-md px-1 py-0.5 cursor-pointer"
            aria-label="Scroll to top"
          >
            <span className="font-mono text-sm tracking-wider text-white font-semibold group-hover:text-zinc-300 transition-colors">
              {portfolioConfig.personal.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
          </button>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-2 sm:gap-3 font-mono text-xs tracking-wider uppercase">
          {[
            { id: "skills", label: "STACK" },
            { id: "about", label: "PRINCIPLES" },
            { id: "learning", label: "RADAR" },
            { id: "contact", label: "CONTACT" },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-1 rounded-md transition-all duration-150 cursor-pointer interactive-press focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 ${
                  isActive
                    ? "text-white bg-white/[0.08] font-medium"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white interactive-press focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
            aria-label="Open mobile menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
