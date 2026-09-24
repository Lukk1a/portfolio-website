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
        background: "#121110",
        surface: {
          50: "#1d1c1a",
          100: "#1a1917",
          200: "#161615",
          300: "#121110",
          inner: "#0c0c0c",
          DEFAULT: "#121110",
        },
        border: {
          hairline: "rgba(255, 255, 255, 0.08)",
          subtle: "rgba(255, 255, 255, 0.08)",
          muted: "rgba(255, 255, 255, 0.15)",
          focus: "rgba(255, 255, 255, 0.30)",
          glow: "rgba(56, 189, 248, 0.35)",
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
          sky: "#38bdf8",
          emerald: "#34d399",
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
        "glow-sky": "0 0 16px -2px rgba(56, 189, 248, 0.35)",
        "glow-emerald": "0 0 16px -2px rgba(52, 211, 153, 0.35)",
        "glow-subtle": "0 0 24px -4px rgba(56, 189, 248, 0.15)",
        "inner-bezel": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.06)",
      },
      backgroundImage: {
        "radial-hero": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 255, 255, 0.05), transparent)",
        "radial-card": "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.06), transparent 80%)",
      },
    },
  },
  plugins: [],
};
