"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import { GithubIcon, GitlabIcon, DiscordIcon } from "@/components/ui/icons";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";

import * as React from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function MobileMenu({ isOpen, onClose, onToast }: MobileMenuProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNav = (sectionId: string) => {
    scrollToSection(sectionId);
    onClose();
  };

  const copyItem = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onToast(`Copied ${label} to clipboard`);
    onClose();
  };

  const menuItems = [
    { label: "Overview", id: "hero", index: "00" },
    { label: "Technologies & Stack", id: "skills", index: "01" },
    { label: "Engineering Principles", id: "about", index: "02" },
    { label: "Research Radar", id: "learning", index: "03" },
    { label: "Contact", id: "contact", index: "04" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
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
              className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-400 hover:text-white cursor-pointer interactive-press"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-5 my-auto py-6">
            {menuItems.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.2 }}
                onClick={() => handleNav(item.id)}
                className="flex items-center justify-between text-left group py-1.5 cursor-pointer"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-zinc-500">[{item.index}]</span>
                  <span className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-300 group-hover:text-white group-hover:translate-x-2 transition-transform">
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  →
                </span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Footer / Quick Socials */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
            <a
              href={portfolioConfig.social.gitlab}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <GitlabIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitLab</span>
            </a>
            <a
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub</span>
            </a>
            <button
              onClick={() => copyItem(portfolioConfig.social.email, "Email")}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>Email</span>
            </button>
            <button
              onClick={() => copyItem(portfolioConfig.social.discord, "Discord")}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
            >
              <DiscordIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>Discord</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
