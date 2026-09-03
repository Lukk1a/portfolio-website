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
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#141414]/90 border border-white/15 text-xs text-white shadow-2xl backdrop-blur-md font-mono"
        >
          <Check className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
