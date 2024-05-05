import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

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
      external: [
        "node:crypto",
        "events",
        "util",
        "url",
        "net",
        "dns",
        "crypto",
        "fs",
        "os",
        "child_process",
        "http",
        "https",
        "zlib",
        "stream",
        "tls",
        "path",
      ],
    },
  },
});
