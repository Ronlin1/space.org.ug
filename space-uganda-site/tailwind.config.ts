import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#050816",
          900: "#08111f",
          800: "#102033",
          700: "#17334d",
          100: "#e7eef8"
        },
        orbit: "#7c3aed",
        ugandaGold: "#f7c948",
        ugandaGreen: "#16a34a",
        ugandaRed: "#d92d20",
        paper: "#f6f7f9",
        ink: "#15171c"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
