import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = "https://samarthelectronics.in";
  const { initialProducts, initialCategories } = await import("@/lib/seed-data");

  const staticRoutes = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/about", priority: "0.8", changefreq: "monthly" },
    { loc: "/products", priority: "0.9", changefreq: "weekly" },
    { loc: "/services", priority: "0.8", changefreq: "monthly" },
    { loc: "/contact", priority: "0.7", changefreq: "monthly" },
  ];

  const categoryRoutes = initialCategories.map((cat) => ({
    loc: `/products?category=${cat.slug}`,
    priority: "0.7",
    changefreq: "weekly",
  }));

  const productRoutes = initialProducts
    .filter((p) => p.status === "PUBLISHED")
    .map((p) => ({
      loc: `/products/${p.slug}`,
      priority: "0.8",
      changefreq: "monthly",
    }));

  const allRoutes = [...staticRoutes, ...categoryRoutes, ...productRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((r) => `  <url>
    <loc>${baseUrl}${r.loc}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
