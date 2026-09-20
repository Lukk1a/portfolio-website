# AI Agent Guidelines & Engineering Rules

> **Project:** Luka Pajkanovic | Developer Portfolio  
> **Repository:** `https://github.com/Lukk1a/portfolio-website`  
> **Environment:** Next.js 15 (App Router) • React 19 • TypeScript • Tailwind CSS • Docker • GitHub Actions

---

## 1. Core Principles & Philosophy

1. **Aesthetic Excellence**: This is a high-end personal engineering portfolio. Every view, transition, and micro-interaction must feel deliberate, refined, and state-of-the-art. No generic templates or basic HTML styling.
2. **Zero-Breakage CI/CD**: All code pushed to `main` triggers automated GitHub Actions pipelines. Every change must pass `npm run lint` and `npm run build` locally before committing.
3. **Performance First**: Prioritize fast First Contentful Paint (FCP), low Cumulative Layout Shift (CLS), and smooth 60fps animations.

---

## 2. Tech Stack & Architecture

- **Framework**: Next.js 15 with App Router (`app/`), Turbopack (`--turbopack`), and `output: "standalone"` in [next.config.mjs](file:///d:/projects/porfolio/next.config.mjs).
- **Runtime & Language**: Node.js 20+ (Alpine in Docker) & TypeScript 5 (Strict Mode).
- **Styling**: Tailwind CSS with custom theme extensions and dark-mode tokens.
- **Motion & Interaction**: Framer Motion 12, Lucide React icons, and custom magnetic/cursor interactions.
- **Containerization**: Multi-stage production [Dockerfile](file:///d:/projects/porfolio/Dockerfile) and [docker-compose.yml](file:///d:/projects/porfolio/docker-compose.yml).
- **CI/CD**: GitHub Actions ([.github/workflows/ci.yml](file:///d:/projects/porfolio/.github/workflows/ci.yml)) with cached dependencies, automated linting, and build checks.

---

## 3. Code & TypeScript Standards

- **Strict Type Safety**: Never use `any`. Explicitly type component props, event handlers, and data structures. Define domain types in `types/` or alongside configurations in `config/`.
- **Component Architecture**:
  - Keep Server Components by default; only add `'use client'` when state, effects, or browser event listeners are required.
  - Keep components modular, self-contained, and reusable in `components/`.
  - Co-locate subcomponents with their feature section (e.g. `components/hero/`, `components/skills/`, `components/contact/`).
- **JSX & React 19 Rules**:
  - Always escape special characters in JSX (e.g., use `&apos;` or `{"'"}` instead of naked apostrophes in text).
  - Ensure all list iterations provide a stable, unique `key` prop (avoid array index where possible).
  - Use proper hooks dependency arrays; do not disable `react-hooks/exhaustive-deps` without verified reason.

---

## 4. UI, Design System & Animation Guidelines

- **Color Palette & Contrast**:
  - Background base: Dark OLED/zinc (`#09090b` / `bg-black` / `bg-zinc-950`).
  - Surfaces: Subtle dark translucent layers (`bg-zinc-900/60`, `bg-white/[0.03]`, `backdrop-blur-md`).
  - Borders: Crisp hairline borders (`border-white/[0.08]` or `border-zinc-800`).
  - Text Hierarchy: Primary `#f5f5f7`, Secondary `#a1a1aa`, Muted `#71717a`.
  - Accent: Vibrant cyan/sky `#38bdf8` or indigo gradients.
- **Motion & Micro-interactions**:
  - Favor spring easing curves like `[0.16, 1, 0.3, 1]` for smooth, physical motion.
  - Keep transition durations between `0.2s` and `0.6s` to keep UI feeling snappy and responsive.
  - Respect `prefers-reduced-motion` for accessibility.
  - Avoid layout-triggering properties (`width`, `height`, `top`, `left`) in animations; use GPU-accelerated `transform` (`x`, `y`, `scale`) and `opacity`.
- **Accessibility (WCAG 2.2 AA)**:
  - All interactive elements must have clear focus rings (`focus-visible:ring-2 focus-visible:ring-sky-500/50`).
  - Icon-only buttons must supply an `aria-label`.
  - Maintain semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).

---

## 5. Build, Test & Verification Runbook

Always verify before finalizing changes:

```bash
# 1. Check for lint or syntax issues
npm run lint

# 2. Verify full production build & standalone trace
npm run build

# 3. Verify Docker container build (when Dockerfile or compose is touched)
docker compose build
```

---

## 6. Git & Collaboration Workflow

- **Commit Message Convention**: Follow Conventional Commits:
  - `feat:` New features or UI components
  - `fix:` Bug fixes or styling corrections
  - `chore:` Dependency, build, or tooling adjustments
  - `perf:` Performance optimizations
  - `style:` Formatting or aesthetic touch-ups
  - `docs:` Documentation or README updates
- **Protected Files**:
  - Do NOT modify `.gitignore` to allow `node_modules`, `.next`, or local `.env` files.
  - Keep [skills-lock.json](file:///d:/projects/porfolio/skills-lock.json) in sync when installing new agent skills via `npx skills add`.
