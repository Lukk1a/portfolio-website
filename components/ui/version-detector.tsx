"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

export function VersionDetector() {
  const [newVersionAvailable, setNewVersionAvailable] = React.useState(false);
  const currentBuildTime = process.env.NEXT_PUBLIC_BUILD_TIME;

  React.useEffect(() => {
    if (!currentBuildTime) return;

    let isMounted = true;

    const checkVersion = async () => {
      try {
        const res = await fetch(`/api/version?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.buildTime && data.buildTime !== currentBuildTime && isMounted) {
          setNewVersionAvailable(true);
        }
      } catch {
        // Silently catch network errors
      }
    };

    // Check periodically every 2 minutes
    const interval = setInterval(checkVersion, 2 * 60 * 1000);

    // Also check when tab becomes active again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkVersion();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentBuildTime]);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {newVersionAvailable && (
        <motion.aside
          aria-label="New version available notification"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-950/95 border border-white/20 text-xs text-white shadow-2xl backdrop-blur-md font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span className="text-zinc-300">New version deployed</span>
          <button
            onClick={handleReload}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white text-black text-[11px] font-semibold hover:bg-zinc-200 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <RefreshCw className="w-3 h-3" />
            <span>RELOAD</span>
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

