"use client";

import * as React from "react";
import { Navbar } from "@/components/navigation/navbar";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { ScrollIndicator } from "@/components/navigation/scroll-indicator";
import { CopyToast } from "@/components/ui/copy-toast";
import { CommandPalette } from "@/components/ui/command-palette";
import { HeroSection } from "@/components/hero/hero-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { SkillsSection } from "@/components/skills/skills-section";
import { AboutSection } from "@/components/about/about-section";
import { LearningSection } from "@/components/learning/learning-section";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = React.useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // Global Cmd+K keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-[#ededed] selection:bg-white/20 selection:text-white">
      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToast={showToast}
      />

      {/* Global Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onToast={showToast}
      />

      {/* Ephemeral Toast Notification */}
      <CopyToast message={toastMessage} />

      {/* Sticky Blur Navbar */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Right-Side Floating Section Scroll Indicator */}
      <ScrollIndicator />

      {/* Main Senior Engineering Page Layout */}
      <main className="relative z-10">
        <HeroSection onToast={showToast} />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <LearningSection />
        <ContactSection onToast={showToast} />
      </main>

      {/* Footer with Verified Badges */}
      <Footer onToast={showToast} />
    </div>
  );
}
