/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: {
          50: "#18181b",
          100: "#121214",
          200: "#0e0e10",
          300: "#09090b",
          DEFAULT: "#000000",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          muted: "rgba(255, 255, 255, 0.14)",
          focus: "rgba(255, 255, 255, 0.28)",
        },
        content: {
          primary: "#ededed",
          secondary: "#a1a1aa",
          muted: "#71717a",
          subtle: "#52525b",
        },
        accent: {
          DEFAULT: "#ededed",
          pure: "#ffffff",
          glow: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.15em",
        mega: "0.25em",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
