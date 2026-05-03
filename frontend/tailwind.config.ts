import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14594A",
        "primary-dark": "#0F4438",
        "primary-light": "#FFFFFF",
        "primary-soft": "#EDF3F1",
        accent: "#D97B3A",
        "accent-dark": "#C06828",
        "accent-hover": "#C06828",
        bg: "#F6F4F1",
        surface: "#FFFFFF",
        "surface-alt": "#EDF3F1",
        border: "#D5E2DE",
        "text-primary": "#1A2926",
        "text-secondary": "#556560",
        neutral: {
          50: "#F6F4F1",
          100: "#EDF3F1",
          400: "#8A9A95",
          700: "#556560",
          900: "#1A2926"
        },
        success: "#38A169",
        danger: "#E53E3E",
        warning: "#D69E2E"
      },
      fontFamily: {
        heading: ["Instrument Serif", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
