"use client";

interface SectionMarkerProps {
  label: string;
  number?: string;
  className?: string;
}

export function SectionMarker({ label, className = "" }: SectionMarkerProps) {
  return (
    <div className={`flex items-center gap-3 font-mono text-xs text-[#71717a] tracking-widest uppercase select-none mb-6 ${className}`}>
      <span className="text-[#38bdf8] font-medium">•</span>
      <span>{label}</span>
      <div className="h-[1px] flex-1 bg-white/[0.06] ml-2" />
    </div>
  );
}
