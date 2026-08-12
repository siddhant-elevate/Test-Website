import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FBFAF8",
          100: "#F3F1EC",
          200: "#E9E6DE",
        },
        ink: {
          DEFAULT: "#12141C",
          700: "#2B2F3A",
          500: "#5B6070",
          400: "#868C9C",
        },
        night: {
          DEFAULT: "#0A0D14",
          800: "#0F131D",
          700: "#151A26",
          600: "#1D2330",
          border: "#252C3B",
        },
        brand: {
          DEFAULT: "#1E3E82",
          50: "#EEF2FA",
          100: "#DCE5F5",
          400: "#3D63B8",
          500: "#1E3E82",
          600: "#173268",
          glow: "#5B8CFF",
        },
        brass: {
          DEFAULT: "#A9863E",
          light: "#C9A968",
          dark: "#8A6E32",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(18, 20, 28, 0.04), 0 8px 24px -8px rgba(18, 20, 28, 0.08)",
        card: "0 1px 1px rgba(18, 20, 28, 0.03), 0 12px 32px -12px rgba(18, 20, 28, 0.12)",
        "card-dark": "0 1px 1px rgba(0, 0, 0, 0.3), 0 16px 40px -12px rgba(0, 0, 0, 0.55)",
        glow: "0 0 0 1px rgba(91, 140, 255, 0.15), 0 8px 30px -8px rgba(91, 140, 255, 0.35)",
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "draw-line": "draw-line 2.4s cubic-bezier(0.65,0,0.35,1) forwards",
      },
      transitionTimingFunction: {
        elevate: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
