import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkest: "#5E0006",
        dark: "#9B0F06",
        accent: "#D53E0F",
        cream: "#EED9B9",
        "bg-dark": "#0F0A09",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--color-text-primary)",
            "--tw-prose-headings": "var(--color-text-heading)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
