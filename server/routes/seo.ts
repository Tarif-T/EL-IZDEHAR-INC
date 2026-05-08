/**
 * SEO-related server routes
 */
import { Request, Response } from "express";
import { generateSitemap, generateRobotsTxt } from "../../client/src/utils/sitemap";

/**
 * Generate and serve sitemap.xml
 */
export function serveSitemap(req: Request, res: Response) {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const sitemap = generateSitemap(baseUrl);
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}

/**
 * Generate and serve robots.txt
 */
export function serveRobotsTxt(req: Request, res: Response) {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const robotsTxt = generateRobotsTxt(baseUrl);
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(robotsTxt);
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    res.status(500).send('Error generating robots.txt');
  }
}

/**
 * Serve manifest.json for PWA
 */
export function serveManifest(req: Request, res: Response) {
  const manifest = {
    name: "ELIZDEHAR Inc. - Manufacturing & Export Excellence",
    short_name: "ELIZDEHAR",
    description: "Leading Sudanese manufacturer and global exporter since 1990. Premium footwear, agriculture, and international trade.",
    start_url: "/",
    display: "standalone",
    background_color: "#111814",
    theme_color: "#6dbb45",
    orientation: "portrait-primary",
    categories: ["business", "manufacturing", "trade"],
    lang: "en",
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any"
      }
    ],
    screenshots: []
  };

  res.setHeader('Content-Type', 'application/manifest+json');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.json(manifest);
}

/**
 * Serve OpenSearch description
 */
export function serveOpenSearch(req: Request, res: Response) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  const openSearch = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>ELIZDEHAR Inc.</ShortName>
  <Description>Search ELIZDEHAR Inc. products and services</Description>
  <Tags>manufacturing footwear agriculture trade Sudan</Tags>
  <Contact>info@elizdehar.com</Contact>
  <Url type="text/html" template="${baseUrl}/search?q={searchTerms}"/>
  <Url type="application/x-suggestions+json" template="${baseUrl}/api/search/suggestions?q={searchTerms}"/>
  <Image height="64" width="64" type="image/png">${baseUrl}/icons/icon-64x64.png</Image>
  <Image height="16" width="16" type="image/vnd.microsoft.icon">${baseUrl}/favicon.ico</Image>
  <Developer>ELIZDEHAR Inc. Development Team</Developer>
  <Attribution>Copyright 2026 ELIZDEHAR Inc. All rights reserved.</Attribution>
  <SyndicationRight>open</SyndicationRight>
  <AdultContent>false</AdultContent>
  <Language>en-us</Language>
  <Language>ar-sd</Language>
  <OutputEncoding>UTF-8</OutputEncoding>
  <InputEncoding>UTF-8</InputEncoding>
</OpenSearchDescription>`;

  res.setHeader('Content-Type', 'application/opensearchdescription+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(openSearch);
}

/**
 * Handle search functionality for OpenSearch
 */
export function handleSearch(req: Request, res: Response) {
  const query = req.query.q as string;
  
  if (!query) {
    return res.redirect('/');
  }

  // In a real implementation, you would search your content
  // For now, redirect to a search results page or home
  res.redirect(`/?search=${encodeURIComponent(query)}`);
}

/**
 * Provide search suggestions for OpenSearch
 */
export function searchSuggestions(req: Request, res: Response) {
  const query = req.query.q as string;
  
  const suggestions = [
    "footwear manufacturing",
    "agriculture services",
    "import export",
    "plastic shoes",
    "sustainable farming",
    "international trade",
    "Tag Elsir Abd Elrahman",
    "Sudan manufacturing",
    "Khartoum exports"
  ].filter(suggestion => 
    suggestion.toLowerCase().includes(query?.toLowerCase() || '')
  );

  // OpenSearch suggestions format: [query, [suggestions]]
  res.json([query, suggestions.slice(0, 10)]);
}
