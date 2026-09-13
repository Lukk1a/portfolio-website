"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import { GithubIcon, DiscordIcon } from "@/components/ui/icons";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection, copyToClipboard } from "@/lib/utils";
import * as React from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

const MENU_ITEMS = [
  { label: "Overview", id: "hero", index: "00" },
  { label: "Technologies & Stack", id: "skills", index: "01" },
  { label: "Engineering Principles", id: "about", index: "02" },
  { label: "Research Radar", id: "learning", index: "03" },
  { label: "Contact", id: "contact", index: "04" },
] as const;

export function MobileMenu({ isOpen, onClose, onToast }: MobileMenuProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";

      // Focus first focusable element inside the modal
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusables?.[0]?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
          return;
        }

        // Trap focus inside dialog
        if (e.key === "Tab") {
          const currentFocusables = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!currentFocusables || currentFocusables.length === 0) return;

          const first = currentFocusables[0];
          const last = currentFocusables[currentFocusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }
  }, [isOpen, onClose]);

  const handleNav = (sectionId: string) => {
    scrollToSection(sectionId);
    onClose();
  };

  const copyItem = async (text: string, label: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      onToast(`Copied ${label} to clipboard`);
    } else {
      onToast(`Failed to copy ${label}`);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          id="mobile-menu"
          aria-label="Navigation Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 select-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-white font-semibold">
              <span>{portfolioConfig.personal.fullName}</span>
            </div>
            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer interactive-press focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Links */}
          <nav aria-label="Mobile primary navigation" className="my-auto py-6">
            <ul role="list" className="flex flex-col gap-4">
              {MENU_ITEMS.map((item, idx) => (
                <li key={item.id}>
                  <motion.a
                    href={`#${item.id}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.2 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item.id);
                    }}
                    className="flex items-center justify-between text-left group py-2.5 cursor-pointer interactive-press focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 rounded-lg"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-zinc-400 font-semibold">[{item.index}]</span>
                      <span className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-200 group-hover:text-white group-hover:translate-x-2 transition-transform">
                        {item.label}
                      </span>
                    </div>
                    <span aria-hidden="true" className="font-mono text-xs text-zinc-400 group-hover:text-white transition-colors">
                      →
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Footer / Quick Socials (44px Minimum Touch Targets) */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-zinc-300">
            <a
              href={portfolioConfig.social.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-white/20 flex items-center gap-2 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              <GithubIcon className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
              <span>Repository</span>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-white/20 flex items-center gap-2 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              <GithubIcon className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
              <span>GitHub</span>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <button
              onClick={() => copyItem(portfolioConfig.social.email, "Email")}
              aria-label="Copy email address to clipboard"
              className="min-h-[44px] px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-white/20 flex items-center gap-2 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
              <span>Email</span>
            </button>
            <button
              onClick={() => copyItem(portfolioConfig.social.discord, "Discord handle")}
              aria-label="Copy Discord handle to clipboard"
              className="min-h-[44px] px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-white/20 flex items-center gap-2 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              <DiscordIcon className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
              <span>Discord</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
