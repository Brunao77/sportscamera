import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  integrations: [
    preact({
      compat: true,
    }),
    tailwind(),
  ],
  output: "server",
  adapter: vercel(),
  /*vite: {
    build: {
      rollupOptions: { 
        external: ['@ffmpeg-installer/ffmpeg'],
      },
    },
  }*/
});
