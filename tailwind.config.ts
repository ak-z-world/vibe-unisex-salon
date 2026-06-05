// tailwind.config.ts — ADDITIONS for Vibe Salon
// Merge these into your existing tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Used as `font-display` in components
        display: ["Cormorant Garamond", "Georgia", "serif"],
        // Used as `font-body` in LandingPage wrapper
        body: ["Jost", "system-ui", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E7D8B1",
          dark: "#A8863A",
        },
        salon: {
          dark: "#1A1410",
          bg: "#FAF8F5",
          muted: "#6B5F55",
          accent: "#E7D8B1",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#6B5F55",
            "--tw-prose-headings": "#1A1410",
            "--tw-prose-bold": "#1A1410",
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // needed for CitySEOContent prose classes
  ],
};

export default config;