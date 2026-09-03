"use client";

interface SectionMarkerProps {
  label: string;
  number?: string;
  className?: string;
}

export function SectionMarker({ label, number, className = "" }: SectionMarkerProps) {
  return (
    <div className={`flex items-center gap-3 font-mono text-xs text-zinc-500 tracking-wider select-none mb-10 ${className}`}>
      {number && (
        <span className="text-zinc-400 font-semibold font-mono">[{number}]</span>
      )}
      <span className="text-zinc-300 font-semibold uppercase tracking-widest">{label}</span>
      <div className="h-[1px] flex-1 bg-white/[0.08] ml-2" />
      <span className="text-zinc-600 text-[10px] hidden sm:inline-block font-mono">{"// ARCHITECTURE"}</span>
    </div>
  );
}
