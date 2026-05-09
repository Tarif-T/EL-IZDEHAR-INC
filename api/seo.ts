import type { IncomingMessage, ServerResponse } from "node:http";
import { generateRobotsTxt, generateSitemap } from "../client/src/utils/sitemap";

function getBaseUrl(req: IncomingMessage): string {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const protocol = Array.isArray(forwardedProto)
    ? forwardedProto[0]
    : forwardedProto?.split(",")[0] || "https";
  const host = req.headers.host || "elizdehar.com";

  return `${protocol}://${host}`;
}

function getType(req: IncomingMessage): string | null {
  const url = new URL(req.url || "", "https://elizdehar.com");
  return url.searchParams.get("type");
}

function send(res: ServerResponse, statusCode: number, contentType: string, body: string): void {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.end(body);
}

function generateOpenSearch(baseUrl: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
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
}

export default function handler(req: IncomingMessage, res: ServerResponse): void {
  const baseUrl = getBaseUrl(req);

  switch (getType(req)) {
    case "sitemap":
      send(res, 200, "application/xml", generateSitemap(baseUrl));
      return;
    case "robots":
      send(res, 200, "text/plain", generateRobotsTxt(baseUrl));
      return;
    case "opensearch":
      send(res, 200, "application/opensearchdescription+xml", generateOpenSearch(baseUrl));
      return;
    default:
      send(res, 404, "text/plain", "Not found");
  }
}
