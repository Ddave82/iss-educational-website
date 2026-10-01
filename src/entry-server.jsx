import { prerenderToNodeStream } from "react-dom/static";
import { Root } from "./Root";

export { languages, localizePath, parseLocalizedPath } from "./lib/i18n.jsx";
export { sitemapRoutes, alternateUrls, canonicalUrl, getRouteMetadata, createWebsiteSchema, createRouteSchema, OG_IMAGE_URL, SITE_URL } from "./lib/seo.js";
export { languageMap, translations } from "./lib/i18n.jsx";

export async function renderPage(pathname) {
  let failure;
  const { prelude, postponed } = await prerenderToNodeStream(<Root initialPath={pathname} />, {
    // Keep completed Suspense content inline; static pages must not need reveal scripts.
    progressiveChunkSize: Number.MAX_SAFE_INTEGER,
    signal: AbortSignal.timeout(15000),
    onError(error) { failure = error; }
  });
  let html = "";
  prelude.setEncoding("utf8");
  for await (const chunk of prelude) html += chunk;
  if (failure) throw failure;
  if (postponed) throw new Error(`Incomplete prerender: ${pathname}`);
  return html;
}
