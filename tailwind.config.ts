import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D92525",
        gold: "#C8A100",
        ink: "#1A1A1A",
        paper: "#FDFCF9"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
        serif: ["Playfair Display", "Georgia", "ui-serif"]
      }
    }
  },
  plugins: []
};
export default config;