import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/case-studies",
  "/contact",
  "/services",
  "/services/build",
  "/services/grow",
  "/services/automate",
  "/services/website-development",
  "/services/seo",
  "/services/performance-marketing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://adspeek.in${route}`,
    changeFrequency: route.startsWith("/services") ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/services" ? 0.9 : 0.7,
  }));
}
