# Luka Pajkanovic — Developer Portfolio

<div align="center">

[![CI/CD Pipeline](https://github.com/Lukk1a/portfolio-website/actions/workflows/ci.yml/badge.svg)](https://github.com/Lukk1a/portfolio-website/actions/workflows/ci.yml)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.2.1-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.8.2-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Multi--stage-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**High-performance personal engineering portfolio presenting systems programming, low-latency architectures, and modern web applications.**

[Live Site (lukka.dev)](https://lukka.dev) • [GitHub Repository](https://github.com/Lukk1a/portfolio-website)

</div>

---

## Overview & Architectural Philosophy

This portfolio is engineered with a systems-first mindset: **measure first, abstract only what earns its cost, and design interfaces with deterministic precision**.

### Core Tenets
- **Deterministic Engineering**: Emphasizing predictable memory models, compile-time invariants, and deterministic simulation loops over heuristic guessing.
- **Aesthetic Excellence**: Built with a custom dark OLED color system (`#000000` base, subtle `#0c0c0c` and `zinc-950` translucent layers, hairline `border-white/[0.08]` dividers, and vibrant sky-blue `#38bdf8` accent points).
- **Zero-Breakage CI/CD**: Automated GitHub Actions pipeline verifying TypeScript strict types, ESLint rules, and multi-stage Next.js standalone container builds on every commit.
- **Inclusive Accessibility (WCAG 2.2 AA)**: Semantic HTML landmarks, accessible dialog focus traps, high-contrast `:focus-visible` rings, `>=44px` touch targets, and full screen reader compatibility.
- **Hardware-Accelerated Motion**: Physical spring dynamics choreographed with Framer Motion, automatically respecting OS-level reduced-motion preferences without layout thrashing.

---

## Tech Stack & Architecture

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) | App Router, Server Components, Turbopack, and `output: "standalone"` |
| **UI Library** | [React 19](https://react.dev/) | Strict concurrent rendering, zero unhandled hydration mismatches |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict mode, zero `any`, fully typed domain configurations |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Custom design tokens, dark OLED palette, responsive breakpoints |
| **Animation** | [Framer Motion 12](https://motion.dev/) | Spring physics, magnetic pull triggers, layout transitions, `MotionConfig` |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, scalable UI iconography |
| **Containerization** | [Docker](https://www.docker.com/) | Multi-stage Alpine build, unprivileged user security, lean deployment footprint |
| **Orchestration** | [Docker Compose](https://docs.docker.com/compose/) | Self-healing container setup with [Watchtower](https://containrrr.dev/watchtower/) auto-updates |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) | Concurrency-controlled lint, typecheck, build, and automated GHCR publication |

---

## Key Features

1. **Interactive Language Matrix**
   - Double-bezel hardware-inspired interactive component.
   - Magnetic hovering and arrow-key keyboard navigation (`ArrowRight`, `ArrowLeft`) with focus management.
   - Live architectural code snippets with dynamic syntax insights for C++, Python, TypeScript, JavaScript, and Luau.

2. **Systems & Memory Models Visualizer**
   - Contiguous linear arena memory layout interactive model.
   - Cache-conscious fixed-timestep simulation loop explanations.

3. **Accessibility & Usability**
   - Direct skip-to-main-content jump link.
   - Accessible mobile menu drawer with focus trapping (`Tab` / `Shift+Tab`), `Escape` dismissal, and focus restoration.
   - Responsive touch targets meeting WCAG 2.2 AA minimum guidelines (`>=44x44px`).
   - Color contrast exceeding 4.5:1 against dark backgrounds.

4. **SEO & Structured Metadata**
   - Dynamic OpenGraph and Twitter card generation (`app/opengraph-image.tsx`).
   - Validated JSON-LD `ProfilePage` and `Person` schema markup.
   - Dynamic sitemap (`sitemap.ts`) and crawler instructions (`robots.ts`, `llms.txt`).

---

## Project Structure

```
portfolio-website/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated Lint, Typecheck, Build & GHCR Deploy
├── app/
│   ├── globals.css              # Dark theme base, focus rings, scroll behaviors
│   ├── icon.tsx                 # Dynamic SVG/PNG favicon generator
│   ├── layout.tsx               # Root layout, JSON-LD, metadata, skip link
│   ├── opengraph-image.tsx      # Edge-rendered dynamic Open Graph card
│   ├── page.tsx                 # Page entrypoint wrapped in MotionConfig
│   ├── robots.ts                # Search engine crawler policies
│   ├── sitemap.ts               # Dynamic XML sitemap
│   └── llms.txt/route.ts        # LLM agent discovery endpoint
├── components/
│   ├── about/                   # About section & memory arena bento grid
│   ├── contact/                 # Direct email and social collaboration cards
│   ├── footer/                  # Semantic footer with safe copy actions
│   ├── hero/                    # Main headline, bio, and anchor navigation
│   ├── learning/                # Active research radar & milestone tracking
│   ├── navigation/              # Sticky blur navbar, mobile drawer, scroll indicator
│   ├── skills/                  # Interactive matrix and categorized tech stack
│   └── ui/                      # Magnetic effect, section markers, copy toast, icons
├── config/
│   └── portfolio.ts             # Central typed configuration & portfolio data
├── lib/
│   └── utils.ts                 # Smooth scroll, copyToClipboard fallback, class merging
├── Dockerfile                   # Multi-stage production container definition
├── docker-compose.yml           # Compose service definition with Watchtower
├── next.config.mjs              # Standalone Next.js configuration
├── package.json                 # Project scripts and dependencies
├── tailwind.config.js           # Tailwind theme extensions and tokens
└── tsconfig.json                # TypeScript strict compiler configuration
```

---

## Getting Started

### Prerequisites
- **Node.js**: v20.0.0 or later
- **npm**: v10.0.0 or later
- **Docker** *(optional, for containerized local testing)*

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lukk1a/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start development server with Turbopack (`--turbopack`) |
| `npm run typecheck` | Run TypeScript compiler type verification (`tsc --noEmit`) |
| `npm run lint` | Run ESLint to verify code quality and React 19 standards |
| `npm run prebuild` | Clean stale `.next` cache to ensure reliable standalone builds |
| `npm run build` | Compile optimized production build (`next build`) |
| `npm run start` | Run production Next.js server locally |

---

## Docker & Production Deployment

### Building & Running with Docker

1. **Build the production Docker image:**
   ```bash
   docker build -t luka-portfolio:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 3000:3000 --name luka-portfolio luka-portfolio:latest
   ```

### Running with Docker Compose

To deploy both the portfolio and the automated Watchtower image updater:

```bash
docker compose up -d --build
```

The container maps internal port `3000` to host port `3001` (`http://localhost:3001`).

### Automated CI/CD Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`):
1. **Validation**: Executes `typecheck`, `lint`, and `build` on all pull requests and pushes to `main`.
2. **Containerization**: Builds a multi-stage Docker image and publishes it to the GitHub Container Registry (`ghcr.io/lukk1a/portfolio-website:latest`).
3. **Continuous Deployment**: Watchtower on the target server detects new image digests and automatically triggers zero-downtime rolling updates.

---

## Verification & Quality Standards

Before committing, all changes are verified against the local runbook:

```bash
# 1. Typecheck (0 errors)
npm run typecheck

# 2. Lint (0 warnings)
npm run lint

# 3. Production build (standalone artifact)
npm run build
```

---

## Author

**Luka Pajkanovic**  
Systems & Web Developer

- **Website**: [lukka.dev](https://lukka.dev)
- **GitHub**: [@Lukk1a](https://github.com/Lukk1a)
- **Discord**: `lukaxdq`
- **Email**: `pajkanovicluka7@gmail.com`

---

## License

This project is open-source and available under the [MIT License](LICENSE).

