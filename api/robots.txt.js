export default function handler(req, res) {
  const robotsContent = `User-agent: *
Allow: /

Sitemap: https://www.sec8fmr.com/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(robotsContent);
}
