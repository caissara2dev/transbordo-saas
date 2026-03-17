import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#1a1a1f",
          900: "#232329",
          800: "#2a2a31",
          700: "#3a3a42",
          600: "#606060",
          500: "#8a8a95",
          400: "#b9b9c0",
          300: "#d8d8dd",
          200: "#ececef"
        },
        sand: {
          50: "#f8f8f9",
          100: "#f1f1f2",
          200: "#e8e8ea",
          300: "#d6d6db",
          400: "#c5c5cc"
        },
        ember: {
          500: "#e87b35",
          600: "#d06a28"
        },
        sage: {
          500: "#5b9a6f"
        },
        gold: {
          500: "#d4a843"
        },
        steel: {
          500: "#6b8fb5"
        },
        danger: {
          500: "#d4183d"
        }
      },
      boxShadow: {
        panel: "0 12px 40px rgba(26, 26, 31, 0.06)",
        float: "0 20px 48px rgba(26, 26, 31, 0.08)"
      },
      borderRadius: {
        "4xl": "1rem"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
