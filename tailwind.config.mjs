/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        terciary: "var(--color-terciary)",
        ice: "var(--color-twitch-ice)",
        primary_disabled: "var(--color-primary-disabled)",
      },
      animation: {
        rubberband: "rubberband 2s ease-in-out",
      },
      keyframes: {
        rubberband: {
          "0%": {
            transform: "scale(1)",
          },
          "30%": {
            transform: "scale(1.20)",
          },
          "40%": {
            transform: "scale(0.75)",
          },
          "50%": {
            transform: "scale(1.15)",
          },
          "65%": {
            transform: "scale(0.95)",
          },
          "75%": {
            transform: "scale(1.05)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      screens: {
        xs: "360px",
        "3xl": "1650px",
      },
    },
  },
  plugins: [],
};
