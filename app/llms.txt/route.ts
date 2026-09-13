import { portfolioConfig } from "@/config/portfolio";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ${portfolioConfig.personal.fullName}
> ${portfolioConfig.personal.role}
> Official Website: ${portfolioConfig.siteUrl}

## Profile Overview
${portfolioConfig.personal.fullName} is a systems and web developer focused on low-level memory architectures, asynchronous pipelines, deterministic game simulations, and resilient web platforms.

## Core Technical Proficiencies
- **Systems & Languages**: C++20 (Linear arena allocators, deterministic game loops, cache-friendly SIMD layouts), Python (Distributed task workers, async queues, scraping pipelines), Luau (Delta compression, netcode, authoritative state machines), JavaScript & TypeScript (Strict type contracts, modern web runtimes).
- **Web & Runtimes**: Next.js 15 (App Router, Server Components), React 19, Node.js, Tailwind CSS, Framer Motion.
- **DevOps & Infrastructure**: Docker (Multi-stage containers), GitHub Actions (Automated testing & build verification), Linux / POSIX, Git, CMake.

## Contact & Online Profiles
- **Website**: ${portfolioConfig.siteUrl}
- **GitHub**: ${portfolioConfig.social.github}
- **Portfolio Repository**: ${portfolioConfig.social.repo}
- **Email**: ${portfolioConfig.social.email}
- **Discord**: ${portfolioConfig.social.discord}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

