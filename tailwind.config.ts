import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b1617",
          900: "#102325",
          800: "#183336",
          700: "#245154",
          600: "#3d7175",
          500: "#6d9598",
          400: "#a0c0c3",
          300: "#cee0e2",
          200: "#edf4f5"
        },
        sand: {
          50: "#f7f4ef",
          100: "#efe7da",
          200: "#e4d5c0",
          300: "#d1b48f",
          400: "#bb8d57"
        },
        ember: {
          500: "#d6692d",
          600: "#bc4f12"
        }
      },
      boxShadow: {
        panel: "0 24px 80px rgba(11, 22, 23, 0.08)",
        float: "0 18px 48px rgba(16, 35, 37, 0.16)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(16,35,37,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,35,37,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
