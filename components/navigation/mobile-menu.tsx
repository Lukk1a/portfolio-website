"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import { GithubIcon, DiscordIcon } from "@/components/ui/icons";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function MobileMenu({ isOpen, onClose, onToast }: MobileMenuProps) {
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
    { label: "Overview", id: "hero" },
    { label: "Skills & Stack", id: "skills" },
    { label: "About", id: "about" },
    { label: "Currently Learning", id: "learning" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
            <span className="font-mono text-xs tracking-widest text-[#f5f5f7] font-semibold">
              {portfolioConfig.personal.name}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white hover:bg-white/10 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-6 my-auto py-8">
            {menuItems.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.2 }}
                onClick={() => handleNav(item.id)}
                className="flex items-center justify-between text-left group py-2 cursor-pointer"
              >
                <span className="text-3xl sm:text-4xl font-light tracking-tight text-[#f5f5f7] group-hover:text-white group-hover:translate-x-2 transition-transform">
                  {item.label}
                </span>
                <span className="font-mono text-xs text-[#71717a] group-hover:text-white transition-colors">
                  →
                </span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Footer / Quick Socials */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#a1a1aa]">
            <button
              onClick={() => copyItem(portfolioConfig.social.email, "Email")}
              className="flex items-center gap-2 hover:text-white cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Email</span>
            </button>
            <a
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <GithubIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>GitHub</span>
            </a>
            <button
              onClick={() => copyItem(portfolioConfig.social.discord, "Discord")}
              className="flex items-center gap-2 hover:text-white cursor-pointer"
            >
              <DiscordIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Discord</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
