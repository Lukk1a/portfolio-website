# Implementation Plan: Editorial Engineering Redesign

## Overview
This redesign fuses Anthropic's refined, literary "Editorial Engineering" aesthetic with Vercel's precise, high-performance design system. The goal is a world-class, premium portfolio that feels like a highly polished technical research paper.

## Visual Changes
- **Typography**: 
  - Headings will use elegant, humanistic Serif fonts (e.g., `Newsreader`, `Instrument Serif`, or `Playfair Display`).
  - Body text, UI elements, and technical details will strictly use Vercel's `Geist` and `Geist Mono` fonts.
- **Color Palette**: 
  - Base background shifts from `#000` to a deep warm Anthropic slate (`#121110` or `#161615`).
  - Text shifts to a soft off-white/cream for comfortable long-form reading.
  - Retain Vercel's ultra-crisp hairline borders (`border-white/10`) and subtle glow effects for interactions.

## Architectural Changes
- **Clean Code**: Remove "AI slop", redundant Tailwind classes, and unnecessary abstractions. Ensure high code quality and strict type safety.
- **Next.js & Tailwind integration**: Update Tailwind configuration to include the new serif font families and colors.
- **Layout & Sections**: Streamline components (Hero, About, Projects, etc.) to rely on typography and spacing rather than heavy graphical elements.

## Execution Steps
1. Create a new git branch for the redesign (`redesign-anthropic-vercel`).
2. Update global styles and Tailwind config for colors and fonts.
3. Apply the Serif fonts to headings and Geist/Geist Mono to body/UI.
4. Refactor main sections to simplify the UI and introduce the "technical research paper" vibe.
5. Use Playwright (chrome-devtools) to visually verify layouts and responsiveness.
6. Commit changes.
7. Deploy to Vercel as a preview deployment.
