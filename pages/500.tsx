import React from "react";
import Link from "next/link";
import Head from "next/head";

export default function Custom500(): React.ReactElement {
  return (
    <>
      <Head>
        <title>500 — System Interruption | Luka Pajkanovic</title>
        <meta
          name="description"
          content="System interruption encountered. Internal server runtime exception."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="min-h-screen w-full bg-[#121110] text-[#f5f5f3] flex items-center justify-center p-6 selection:bg-white/20 selection:text-white">
        <div className="w-full max-w-lg">
          {/* Double-Bezel Bento Card Container */}
          <div className="rounded-2xl p-1.5 sm:p-2 bg-[#1a1917] border border-white/[0.08] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.7)]">
            <div className="rounded-xl p-8 sm:p-10 bg-[#0c0c0c]/90 border border-white/[0.06] backdrop-blur-md flex flex-col items-start gap-6">
              
              {/* Header Marker */}
              <div className="flex items-center gap-3 font-mono text-xs tracking-wider w-full select-none">
                <span className="text-white/60 font-semibold font-mono">[500]</span>
                <span className="text-[#f5f5f3] font-semibold uppercase tracking-widest text-[11px]">
                  SYSTEM EXCEPTION
                </span>
                <div className="h-[1px] flex-1 bg-white/[0.08] ml-2" />
                <span className="text-[#38bdf8] text-[10px] font-mono tracking-widest uppercase">
                  {"// HALT"}
                </span>
              </div>

              {/* Main Typography */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-[#f5f5f3] leading-tight">
                  Internal Server Pipeline Interrupted
                </h1>
                <p className="text-sm font-sans font-light text-[#a9a9a6] leading-relaxed">
                  An unexpected execution fault occurred within the system runtime. 
                  The state machine has safely isolated the process to prevent memory corruption.
                </p>
              </div>

              {/* Diagnostics Box */}
              <div className="w-full rounded-lg bg-[#161615] border border-white/[0.06] p-3.5 font-mono text-xs text-[#82817d] space-y-1">
                <div className="flex justify-between items-center text-[10px] text-white/40 tracking-wider uppercase">
                  <span>RUNTIME DIAGNOSTIC</span>
                  <span className="text-emerald-400">STATUS: RECOVERABLE</span>
                </div>
                <p className="text-[#f5f5f3] text-[11px] truncate">
                  <span className="text-[#38bdf8]">&gt;_</span> Error: 500_INTERNAL_SERVER_ERROR
                </p>
              </div>

              {/* Recovery Action CTA */}
              <div className="pt-2 w-full flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#f5f5f3] text-[#121110] font-mono text-xs font-medium tracking-wider uppercase transition-all duration-150 hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
                >
                  Return to System Overview &rarr;
                </Link>
              </div>

            </div>
          </div>

          {/* Sub-footer metadata */}
          <div className="mt-4 text-center">
            <span className="font-mono text-[10px] text-[#62615e] tracking-widest uppercase">
              Luka Pajkanovic &bull; Systems &amp; Web Developer
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
