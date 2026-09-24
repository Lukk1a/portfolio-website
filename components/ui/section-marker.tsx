"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type SectionSequenceNumber = "01" | "02" | "03" | "04" | "05" | string;

export interface SectionMarkerProps {
  number?: SectionSequenceNumber;
  title?: string;
  label?: string;
  tag?: string;
  className?: string;
}

export function SectionMarker({
  number,
  title,
  label,
  tag,
  className = "",
}: SectionMarkerProps) {
  const displayTitle = title ?? label ?? "";

  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-xs text-content-secondary tracking-wider select-none mb-10 sm:mb-12",
        className
      )}
    >
      {number && (
        <span className="text-content-muted font-mono font-medium tracking-tight">
          [<span className="text-content-primary font-semibold">{number}</span>]
        </span>
      )}
      {displayTitle && (
        <span className="text-content-primary font-semibold uppercase tracking-widest text-xs sm:text-[13px]">
          {displayTitle}
        </span>
      )}
      <div className="h-[1px] flex-1 bg-white/[0.08] ml-2 transition-colors duration-200" />
      {tag && (
        <span className="text-content-muted text-[10px] sm:text-xs hidden sm:inline-block font-mono tracking-widest uppercase">
          {tag}
        </span>
      )}
    </div>
  );
}
