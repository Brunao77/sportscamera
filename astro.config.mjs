import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import nodeExternals from "rollup-plugin-node-externals";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default defineConfig({
  integrations: [
    preact({
      compat: true,
    }),
    tailwind(),
  ],
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  vite: {
    ssr: {
      external: ["oslo", "nodemailer", "pg", "astro"], // Añadir 'astro'
    },
    resolve: {
      alias: {
        events: "rollup-plugin-node-polyfills/polyfills/events",
        stream: "rollup-plugin-node-polyfills/polyfills/stream",
        util: "rollup-plugin-node-polyfills/polyfills/util",
      },
    },
    plugins: [
      nodeResolve({
        browser: true,
        preferBuiltins: true,
      }),
      nodePolyfills(),
      nodeExternals(),
    ],
  },
});
