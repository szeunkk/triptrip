import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Gray Scale
        gray: {
          white: "var(--color-gray-white)",
          "05": "var(--color-gray-05)",
          "10": "var(--color-gray-10)",
          "20": "var(--color-gray-20)",
          "30": "var(--color-gray-30)",
          "40": "var(--color-gray-40)",
          "50": "var(--color-gray-50)",
          "60": "var(--color-gray-60)",
          "70": "var(--color-gray-70)",
          "80": "var(--color-gray-80)",
          "90": "var(--color-gray-90)",
          black: "var(--color-gray-black)",
        },

        // Brand Colors
        brand: {
          blue: "var(--color-brand-blue)",
          red: "var(--color-brand-red)",
        },

        // Semantic Colors
        primary: "var(--color-primary)",
        error: "var(--color-error)",
        disabled: "var(--color-disabled)",
      },

      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        tertiary: "var(--color-bg-tertiary)",
      },

      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        tertiary: "var(--color-text-tertiary)",
        disabled: "var(--color-text-disabled)",
        inverse: "var(--color-text-inverse)",
      },

      borderColor: {
        primary: "var(--color-border-primary)",
        secondary: "var(--color-border-secondary)",
      },
    },
  },
  plugins: [],
};
export default config;
