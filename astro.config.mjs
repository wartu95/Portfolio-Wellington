import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Netlify provides URL automatically during the production build.
  site: process.env.URL ?? "http://localhost:4321",
  integrations: [sitemap()],
  devToolbar: {
    enabled: false,
  },
});
