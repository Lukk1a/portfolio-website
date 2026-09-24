"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glow?: boolean;
  doubleBezel?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export function BentoCard({
  children,
  className,
  innerClassName,
  glow = false,
  doubleBezel = false,
  interactive = false,
  onClick,
  onKeyDown,
  role,
  tabIndex,
  ...props
}: BentoCardProps) {
  const isClickable = Boolean(onClick);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.();
    }
    onKeyDown?.(e);
  };

  const interactiveStyles = (interactive || isClickable)
    ? "interactive-press cursor-pointer hover:border-white/20 transition-all duration-200"
    : "";

  const glowStyles = glow ? "border-glow shadow-glow-sky" : "";

  if (doubleBezel) {
    return (
      <div
        className={cn(
          "rounded-2xl p-1.5 sm:p-2 bg-surface-100 border border-border-subtle shadow-card",
          glowStyles,
          interactiveStyles,
          className
        )}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role={role ?? (isClickable ? "button" : undefined)}
        tabIndex={tabIndex ?? (isClickable ? 0 : undefined)}
        {...props}
      >
        <div
          className={cn(
            "rounded-xl p-5 sm:p-6 bg-surface-inner/90 border border-white/[0.06] backdrop-blur-md h-full w-full",
            innerClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl p-5 sm:p-6 bg-surface-100 border border-border-subtle shadow-card",
        glowStyles,
        interactiveStyles,
        className
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={role ?? (isClickable ? "button" : undefined)}
      tabIndex={tabIndex ?? (isClickable ? 0 : undefined)}
      {...props}
    >
      {children}
    </div>
  );
}
