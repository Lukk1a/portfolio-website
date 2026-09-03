"use client";

import * as React from "react";
import { Navbar } from "@/components/navigation/navbar";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { ScrollIndicator } from "@/components/navigation/scroll-indicator";
import { CopyToast } from "@/components/ui/copy-toast";
import { HeroSection } from "@/components/hero/hero-section";
import { SkillsSection } from "@/components/skills/skills-section";
import { AboutSection } from "@/components/about/about-section";
import { LearningSection } from "@/components/learning/learning-section";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = React.useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f5f5f7] selection:bg-white/20 selection:text-white">
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
      />

      {/* Right-Side Floating Section Scroll Indicator */}
      <ScrollIndicator />

      {/* Main Page Layout */}
      <main className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <AboutSection />
        <LearningSection />
        <ContactSection onToast={showToast} />
      </main>

      {/* Footer */}
      <Footer onToast={showToast} />
    </div>
  );
}
