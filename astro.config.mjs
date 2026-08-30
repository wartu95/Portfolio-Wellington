import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Production uses the stable Netlify URL. Previews use their own canonical URL.
  site:
    (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL) ??
    process.env.URL ??
    "http://localhost:4321",
  integrations: [sitemap()],
  devToolbar: {
    enabled: false,
  },
});
