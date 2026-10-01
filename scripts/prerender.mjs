import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import react from "@vitejs/plugin-react";
import { load } from "cheerio";

const output = resolve("dist");
const serverOutput = resolve(".prerender");
const template = await readFile(resolve(output, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("Prerender needs a fresh Vite build. Run npm run build.");
const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[char]));

try {
  await build({
    configFile: false,
    plugins: [react()],
    logLevel: "warn",
    build: { ssr: "src/entry-server.jsx", outDir: serverOutput, emptyOutDir: true }
  });
  const seo = await import(pathToFileURL(resolve(serverOutput, "entry-server.js")));
  const entries = seo.sitemapRoutes.flatMap(({ path }) => seo.languages.map(language => ({ path, language: language.code, pathname: seo.localizePath(path, language.code) })));

  for (const { path, language, pathname } of [...entries, { path: "/404", language: "en", pathname: "/404" }]) {
    const metadata = seo.getRouteMetadata(path, language);
    const languageInfo = seo.languageMap[language];
    const url = seo.canonicalUrl(path, language);
    const $ = load(template);
    $("html").attr("lang", languageInfo.htmlLang);
    $("title").text(metadata.title);
    const meta = (key, value, attribute = "name") => {
      const selector = `meta[${attribute}="${key}"]`;
      if (!$(selector).length) $("<meta>").attr(attribute, key).appendTo("head");
      $(selector).attr("content", value);
    };
    meta("description", metadata.description);
    meta("robots", metadata.noindex ? "noindex,follow" : "index,follow,max-image-preview:large");
    for (const [key, value] of Object.entries({ title: metadata.title, description: metadata.description, url, locale: languageInfo.locale, image: seo.OG_IMAGE_URL, "image:alt": seo.translations[language].seo.ogImageAlt })) meta(`og:${key}`, value, "property");
    for (const [key, value] of Object.entries({ title: metadata.title, description: metadata.description, image: seo.OG_IMAGE_URL, "image:alt": seo.translations[language].seo.ogImageAlt })) meta(`twitter:${key}`, value);
    $('link[rel="canonical"], link[rel="alternate"][hreflang]').remove();
    if (!metadata.noindex) {
      $("<link>").attr({ rel: "canonical", href: url }).appendTo("head");
      for (const alternate of [...seo.alternateUrls(path), { language: "x-default", href: seo.canonicalUrl(path, "en") }]) {
        $("<link>").attr({ rel: "alternate", hreflang: alternate.language, href: alternate.href }).appendTo("head");
      }
    }
    const json = value => JSON.stringify(value).replace(/</g, "\\u003c");
    $("#website-structured-data").text(json(seo.createWebsiteSchema(language)));
    $("#route-structured-data").text(json(seo.createRouteSchema(path, language)));
    const markup = await seo.renderPage(pathname);
    if (!markup.includes("<h1")) throw new Error(`Missing page content: ${pathname}`);
    const html = $.html().replace('<div id="root"></div>', () => `<div id="root" data-prerendered-path="${escape(pathname)}">${markup}</div>`);
    const file = resolve(output, pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
  }

  // Generate from the actual routes. Omit lastmod rather than inventing freshness.
  const urls = entries.map(({ path, language }) => `  <url>\n    <loc>${escape(seo.canonicalUrl(path, language))}</loc>\n${[...seo.alternateUrls(path), { language: "x-default", href: seo.canonicalUrl(path, "en") }].map(item => `    <xhtml:link rel="alternate" hreflang="${item.language}" href="${escape(item.href)}" />`).join("\n")}\n  </url>`);
  await writeFile(resolve(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
  console.log(`Prerendered ${entries.length} localized pages, a 404 page and the sitemap.`);
} finally {
  await rm(serverOutput, { recursive: true, force: true });
}
