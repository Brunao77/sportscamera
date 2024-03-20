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
        white: "var(--color-white)",
        twitch: "var(--color-twitch)",
        ice: "var(--color-twitch-ice)",
      },
      screens: {
        xs: "360px",
        "3xl": "1650px",
      },
    },
  },
  plugins: [],
};
