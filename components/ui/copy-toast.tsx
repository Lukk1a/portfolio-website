"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface CopyToastProps {
  message: string | null;
}

export function CopyToast({ message }: CopyToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-950/95 border border-white/[0.15] text-xs text-white shadow-2xl backdrop-blur-md font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <Check className="w-3.5 h-3.5 text-zinc-300" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
