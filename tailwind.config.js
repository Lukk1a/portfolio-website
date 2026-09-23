/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121110",
        surface: {
          50: "#1d1c1a",
          100: "#1a1917",
          200: "#161615",
          300: "#121110",
          DEFAULT: "#121110",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.1)",
          muted: "rgba(255, 255, 255, 0.15)",
          focus: "rgba(255, 255, 255, 0.3)",
        },
        content: {
          primary: "#f5f5f3",
          secondary: "#a9a9a6",
          muted: "#82817d",
          subtle: "#62615e",
        },
        accent: {
          DEFAULT: "#f5f5f3",
          pure: "#ffffff",
          glow: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
        serif: ["var(--font-newsreader)", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
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
