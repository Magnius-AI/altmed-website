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
        primary: "#117C7A",
        "primary-dark": "#0C6160",
        "primary-light": "#E6F5F3",
        accent: "#FF7A45",
        "accent-dark": "#E45E31",
        secondary: "#7B61C9",
        neutral: {
          50: "#F7FAFC",
          100: "#EDF2F7",
          400: "#8794A4",
          700: "#5C6B7B",
          900: "#17324A"
        },
        success: "#38A169",
        danger: "#E53E3E",
        warning: "#D69E2E"
      }
    }
  },
  plugins: []
};

export default config;
