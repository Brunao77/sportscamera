import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { nodeExternals } from "rollup-plugin-node-externals";
import nodePolyfills from "rollup-plugin-node-polyfills";

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact({
      compat: true,
    }),
    tailwind(),
  ],
  output: "server",
  adapter: cloudflare(),
  vite: {
    ssr: {
      noExternal: false,
    },
  },
});
