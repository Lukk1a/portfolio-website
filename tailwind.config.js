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
        background: "#080808",
        surface: {
          50: "#171717",
          100: "#141414",
          200: "#101010",
          300: "#0c0c0c",
          DEFAULT: "#080808",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          muted: "rgba(255, 255, 255, 0.14)",
          focus: "rgba(255, 255, 255, 0.28)",
        },
        content: {
          primary: "#f5f5f7",
          secondary: "#a1a1aa",
          muted: "#71717a",
          subtle: "#52525b",
        },
        accent: {
          DEFAULT: "#38bdf8",
          glow: "rgba(56, 189, 248, 0.15)",
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
    },
  },
  plugins: [],
};
