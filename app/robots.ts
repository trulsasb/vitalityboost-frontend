import type { MetadataRoute } from "next";

// Cart/checkout/auth/admin are per-session or credential-gated — no SEO
// value, and crawling them just wastes crawl budget (admin/auth are also
// client components, so a per-page noindex meta tag isn't an option here;
// blocking them in robots.txt is the standard equivalent).
export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://vitalityboost-frontend.onrender.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/auth", "/cart", "/checkout"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
