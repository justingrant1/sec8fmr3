export default function handler(req, res) {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Main Calculator Page -->
  <url>
    <loc>https://sec8fmr.com/</loc>
    <lastmod>2025-01-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Cleveland-specific Calculator -->
  <url>
    <loc>https://sec8fmr.com/cleveland.html</loc>
    <lastmod>2025-01-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Montgomery-specific Calculator -->
  <url>
    <loc>https://sec8fmr.com/montgomery.html</loc>
    <lastmod>2025-01-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- State/County Landing Pages (Virtual URLs for SEO) -->
  <url>
    <loc>https://sec8fmr.com/?state=OH</loc>
    <lastmod>2025-01-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://sec8fmr.com/?state=AL</loc>
    <lastmod>2025-01-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://sec8fmr.com/?state=MI</loc>
    <lastmod>2025-01-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://sec8fmr.com/?state=AR</loc>
    <lastmod>2025-01-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://sec8fmr.com/?state=NC</loc>
    <lastmod>2025-01-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(sitemapContent);
}
