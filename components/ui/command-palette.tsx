"use client";

import * as React from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Compass,
  User,
  Mail,
  BookOpen,
  Send,
  Terminal,
  ExternalLink,
  Copy,
  Layers,
} from "lucide-react";
import { GithubIcon, GitlabIcon, DiscordIcon } from "@/components/ui/icons";
import { portfolioConfig } from "@/config/portfolio";
import { scrollToSection } from "@/lib/utils";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function CommandPalette({ isOpen, onClose, onToast }: CommandPaletteProps) {
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, onClose]);

  const handleSelect = (callback: () => void) => {
    callback();
    onClose();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onToast(`Copied ${label} to clipboard`);
    onClose();
  };

  // Flatten all skills for quick lookup
  const allTech = React.useMemo(() => {
    return portfolioConfig.skillCategories.flatMap((cat) =>
      cat.items.map((item) => ({
        ...item,
        categoryName: cat.title,
      }))
    );
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 px-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-white/[0.12] bg-zinc-950 text-white shadow-card z-50"
          >
            <Command className="w-full flex flex-col focus:outline-none font-sans">
              {/* Search Bar */}
              <div className="flex items-center px-4 border-b border-white/[0.08] gap-3">
                <Terminal className="w-4 h-4 text-zinc-400" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command, jump to section, or search tech..."
                  className="w-full bg-transparent py-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none font-sans"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-white/[0.05] border border-white/[0.08] rounded">
                  ESC
                </kbd>
              </div>

              {/* Results List */}
              <Command.List className="max-h-[340px] overflow-y-auto p-2 text-sm scroll-py-2">
                <Command.Empty className="py-8 text-center text-xs text-zinc-500 font-mono">
                  No matching commands, systems, or technologies found.
                </Command.Empty>

                {/* Navigation Group */}
                <Command.Group
                  heading="Navigation"
                  className="px-2 py-1.5 text-[10px] font-mono tracking-widest text-zinc-500 uppercase select-none"
                >
                  <Command.Item
                    onSelect={() => handleSelect(() => scrollToSection("hero"))}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                  >
                    <Compass className="w-4 h-4 text-zinc-400" />
                    <span>Home / Overview</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => handleSelect(() => scrollToSection("projects"))}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                  >
                    <Layers className="w-4 h-4 text-zinc-400" />
                    <span>Featured Architectures &amp; Projects</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => handleSelect(() => scrollToSection("skills"))}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                  >
                    <Code className="w-4 h-4 text-zinc-400" />
                    <span>Technical Stack &amp; Capabilities</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => handleSelect(() => scrollToSection("about"))}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                  >
                    <User className="w-4 h-4 text-zinc-400" />
                    <span>Engineering Principles</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => handleSelect(() => scrollToSection("learning"))}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                  >
                    <BookOpen className="w-4 h-4 text-zinc-400" />
                    <span>Research Radar</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => handleSelect(() => scrollToSection("contact"))}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                  >
                    <Send className="w-4 h-4 text-zinc-400" />
                    <span>Contact / Direct Channels</span>
                  </Command.Item>
                </Command.Group>

                {/* Actions Group */}
                <Command.Group
                  heading="Actions &amp; Social"
                  className="px-2 py-1.5 mt-2 text-[10px] font-mono tracking-widest text-zinc-500 uppercase select-none"
                >
                  <Command.Item
                    onSelect={() => copyToClipboard(portfolioConfig.social.email, "Email")}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-zinc-400" />
                      <span>Copy Email ({portfolioConfig.social.email})</span>
                    </div>
                    <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  </Command.Item>
                  <Command.Item
                    onSelect={() => handleSelect(() => window.open(portfolioConfig.social.gitlab, "_blank"))}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                  >
                    <div className="flex items-center gap-3">
                      <GitlabIcon className="w-4 h-4 text-zinc-400" />
                      <span>Open GitLab Repository</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </Command.Item>
                  <Command.Item
                    onSelect={() => handleSelect(() => window.open(portfolioConfig.social.github, "_blank"))}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                  >
                    <div className="flex items-center gap-3">
                      <GithubIcon className="w-4 h-4 text-zinc-400" />
                      <span>Open GitHub Profile</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </Command.Item>
                  <Command.Item
                    onSelect={() => copyToClipboard(portfolioConfig.social.discord, "Discord")}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                  >
                    <div className="flex items-center gap-3">
                      <DiscordIcon className="w-4 h-4 text-zinc-400" />
                      <span>Copy Discord Handle ({portfolioConfig.social.discord})</span>
                    </div>
                    <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  </Command.Item>
                </Command.Group>

                {/* Tech Stack Search */}
                <Command.Group
                  heading="Technologies"
                  className="px-2 py-1.5 mt-2 text-[10px] font-mono tracking-widest text-zinc-500 uppercase select-none"
                >
                  {allTech.map((item) => (
                    <Command.Item
                      key={item.name}
                      onSelect={() => handleSelect(() => scrollToSection("skills"))}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-white/[0.06] cursor-pointer transition-colors aria-selected:bg-white/[0.08]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">{item.categoryName}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>

              {/* Footer status */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08] bg-black/70 text-[11px] font-mono text-zinc-500">
                <span>Navigation &amp; Systems</span>
                <span className="hidden sm:inline">Use ↑↓ to navigate, ↵ to select</span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
