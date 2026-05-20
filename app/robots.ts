export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/login", "/api"] },
    sitemap: "https://jamilmendez.dev/sitemap.xml",
  };
}
