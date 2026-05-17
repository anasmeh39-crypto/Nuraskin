import type { Config } from "tailwindcss";

/**
 * Nura Skin — official identity tokens (blush, ivory, dusty rose, champagne, deep plum).
 * Legacy keys (brand, rose, ivory, …) stay mapped for gradual migration.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nura: {
          bg: "#FAF7F4",
          cream: "#FFF9F6",
          blush: "#F5E8EC",
          rose: "#C9A4AE",
          roseMid: "#B88996",
          roseDeep: "#8E5A68",
          champagne: "#D4BC9B",
          champagneLight: "#EDE4D7",
          plum: "#3D2C32",
          plumMid: "#6B4E56",
          border: "#EBE0E4",
          muted: "#8D7D82",
          card: "#FFFFFF",
        },
        brand: {
          deep: "#3D2C32",
          mid: "#8E5A68",
          light: "#F5E8EC",
        },
        gold: {
          DEFAULT: "#D4BC9B",
          light: "#EDE4D7",
        },
        rose: {
          DEFAULT: "#C9A4AE",
          deep: "#8E5A68",
          mid: "#B88996",
          soft: "#DEBEC6",
          light: "#F5E8EC",
          blush: "#FCF6F8",
        },
        ivory: {
          DEFAULT: "#FAF7F4",
          warm: "#F3EDE8",
          deep: "#EBE0E4",
        },
        petal: "#F5E8EC",
        cream: "#FFF9F6",
        border: "#EBE0E4",
      },
      fontFamily: {
        arabic: ["var(--font-cairo)", "Noto Naskh Arabic", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "rose-sm": "0 2px 14px rgba(142, 90, 104, 0.08)",
        "rose-md": "0 8px 28px rgba(142, 90, 104, 0.1)",
        "rose-lg": "0 18px 48px rgba(61, 44, 50, 0.08)",
        "ivory-sm": "0 2px 14px rgba(61, 44, 50, 0.05)",
        "ivory-md": "0 10px 36px rgba(61, 44, 50, 0.06)",
        "luxury": "0 20px 50px rgba(61, 44, 50, 0.07)",
      },
      animation: {
        "slide-in-right": "slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-left": "slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-scale": "fadeScale 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 1.6s infinite",
        "pulse-soft": "pulseSoft 2.5s ease-in-out infinite",
      },
      keyframes: {
        slideInRight: {
          from: { transform: "translateX(110%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          from: { transform: "translateX(-110%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeScale: {
          from: { opacity: "0", transform: "scale(0.94)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
