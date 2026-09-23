"use client";

interface SectionMarkerProps {
  label: string;
  number?: string;
  tag?: string;
  className?: string;
}

export function SectionMarker({ label, number, tag, className = "" }: SectionMarkerProps) {
  return (
    <div className={`flex items-center gap-3 font-mono text-xs text-content-secondary tracking-wider select-none mb-10 ${className}`}>
      {number && (
        <span className="text-content-secondary font-semibold font-mono">[{number}]</span>
      )}
      <span className="text-content-primary font-semibold uppercase tracking-widest">{label}</span>
      <div className="h-[1px] flex-1 bg-white/[0.08] ml-2" />
      {tag && (
        <span className="text-content-secondary text-[10px] hidden sm:inline-block font-mono tracking-widest uppercase">
          {tag}
        </span>
      )}
    </div>
  );
}
