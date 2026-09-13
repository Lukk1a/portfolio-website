# Gemini / Antigravity Agent Guidelines

> **Refer to [AGENTS.md](file:///d:/projects/porfolio/AGENTS.md) for the complete engineering and design rules.**

### Quick Directives for this Repository:

1. **Verify Before Push**: Always run `npm run lint` and `npm run build` to guarantee GitHub Actions CI/CD pipeline succeeds.
2. **Next.js 15 & React 19**: Strictly follow App Router paradigms, output standalone build, and escape JSX characters.
3. **Design Standard**: Premium dark aesthetic (`#09090b`), hairline borders (`border-white/[0.08]`), and physical spring animations with Framer Motion.
4. **Clean Git Tree**: Never commit `node_modules`, `.next`, or `.env*` files. Maintain clean Conventional Commits.
