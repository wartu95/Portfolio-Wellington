import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const isProduction = process.env.CONTEXT ? process.env.CONTEXT === "production" : true;
  const sitemapUrl = new URL("sitemap-index.xml", site ?? "http://localhost:4321");
  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`
    : "User-agent: *\nDisallow: /\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
