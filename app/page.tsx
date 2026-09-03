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
  const [activeSection, setActiveSection] = React.useState<string>("hero");
  const toastTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const showToast = React.useCallback((msg: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 2800);
  }, []);

  React.useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-black text-[#ededed] selection:bg-white/20 selection:text-white">
      {/* Global Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onToast={showToast}
      />

      {/* Ephemeral Toast Notification */}
      <CopyToast message={toastMessage} />

      {/* Sticky Blur Navbar with Synchronized Active State */}
      <Navbar
        activeSection={activeSection}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Right-Side Floating Section Scroll Indicator */}
      <ScrollIndicator
        activeSection={activeSection}
        onActiveSectionChange={setActiveSection}
      />

      {/* Main Senior Engineering Page Layout */}
      <main className="relative z-10">
        <HeroSection />
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
