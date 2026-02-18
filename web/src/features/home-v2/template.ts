import path from "node:path";
import { readFile } from "node:fs/promises";

const TEMPLATE_PATH = path.join(process.cwd(), "public", "home-v2", "index.html");
const BADGES_MARKER = '<div><div data-w-id="50010901-76e8-25d7-8452-b24fcc8bd9b9" class="brix-badges-wrapper"';

function normalizeTemplateAssets(markup: string): string {
  return markup
    .replaceAll(
      './Home V2 - Commerce X - Webflow Ecommerce website template_files/',
      '/home-v2/Home V2 - Commerce X - Webflow Ecommerce website template_files/'
    )
    .replace(/(src|href)=\"\.\//g, '$1="/home-v2/')
    .replace(/url\(\.\//g, "url(/home-v2/");
}

function stripInlineScripts(markup: string): string {
  return markup.replace(/<script[\s\S]*?<\/script>/gi, "");
}

function stripWebflowBadges(markup: string): string {
  const badgesStart = markup.indexOf(BADGES_MARKER);
  if (badgesStart >= 0) {
    return markup.slice(0, badgesStart);
  }

  return markup.replace(/<a[^>]*class=\"[^\"]*w-webflow-badge[^\"]*\"[\s\S]*?<\/a>/gi, "");
}

function extractBody(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match?.[1] ?? "";
}

function applyBranding(markup: string): string {
  return markup
    .replace(/Home V2(?! - Commerce X - Webflow Ecommerce website template_files)/g, "KultureX")
    .replace(/Commerce X(?! - Webflow Ecommerce website template_files)/g, "KultureX");
}

export async function getHomeV2Markup(): Promise<string> {
  const html = await readFile(TEMPLATE_PATH, "utf8");
  const bodyHtml = extractBody(html);

  const sanitizedHtml = stripInlineScripts(bodyHtml);
  const deBadgedHtml = stripWebflowBadges(sanitizedHtml);
  const brandedHtml = applyBranding(deBadgedHtml);

  return normalizeTemplateAssets(brandedHtml);
}
