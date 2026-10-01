import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { load } from "cheerio";

const origin = "https://iss-education.online";
const routes = ["/", "/tracker", "/station", "/learn", "/see-the-iss", "/gallery", "/about-data"];
const languages = ["en", "de", "da"];
const localized = (path, language) => (language === "en" ? "" : `/${language}`) + (path === "/" ? "" : path) || "/";
const pathnameSet = new Set(routes.flatMap(path => languages.map(language => localized(path, language))));
const titles = new Set();

for (const path of routes) for (const language of languages) {
  const pathname = localized(path, language);
  test(`initial HTML is indexable, localized and complete: ${pathname}`, async () => {
    const html = await readFile(`dist/${pathname === "/" ? "index" : pathname.slice(1)}.html`, "utf8");
    const $ = load(html);
    assert.equal($("html").attr("lang"), language);
    assert.equal($("#root").attr("data-prerendered-path"), pathname);
    assert.equal($("h1").length, 1);
    assert.ok($("main").text().trim().length > 200, "actual page content is available without JavaScript");
    assert.equal($(".route-loading").length, 0, "lazy routes finished rendering");
    assert.equal($('link[rel="canonical"]').length, 1);
    assert.equal($('link[rel="canonical"]').attr("href"), origin + pathname);
    assert.ok($('meta[name="robots"]').attr("content").startsWith("index,follow"));
    const title = $("title").text();
    assert.ok(title.length > 15 && title.length < 90);
    assert.ok(!titles.has(title), "page titles are unique across all routes and languages");
    titles.add(title);
    assert.ok($('meta[name="description"]').attr("content").length > 50);
    assert.equal($('meta[property="og:title"]').attr("content"), title);
    assert.equal($('meta[name="twitter:title"]').attr("content"), title);
    assert.equal($('meta[property="og:url"]').attr("content"), origin + pathname);
    for (const alternate of languages) {
      assert.equal($(`link[hreflang="${alternate}"]`).attr("href"), origin + localized(path, alternate));
    }
    assert.equal($('link[hreflang="x-default"]').attr("href"), origin + localized(path, "en"));
    const schema = JSON.parse($("#route-structured-data").text());
    const webpage = Array.isArray(schema) ? schema[0] : schema;
    assert.equal(webpage.url, origin + pathname);
    assert.equal(webpage.inLanguage, language);
    assert.equal(webpage.name, title);
    assert.ok(!html.includes('"dateModified"'), "no invented freshness timestamps");
    for (const link of $("a[href]").toArray()) {
      const url = new URL($(link).attr("href"), origin + pathname);
      if (url.origin === origin) assert.ok(pathnameSet.has(url.pathname), `broken internal page link: ${url.pathname}`);
    }
  });
}

test("sitemap lists every canonical route once with reciprocal language alternates", async () => {
  const $ = load(await readFile("dist/sitemap.xml", "utf8"), { xml: true });
  const urls = $("url").toArray();
  assert.equal(urls.length, 21);
  assert.deepEqual(new Set(urls.map(item => $(item).find("loc").text())), new Set([...pathnameSet].map(path => origin + path)));
  for (const item of urls) {
    const alternates = $(item).find("xhtml\\:link");
    assert.equal(alternates.length, 4);
    assert.ok(alternates.toArray().some(link => $(link).attr("href") === $(item).find("loc").text()));
  }
  assert.equal($("lastmod").length, 0);
});

test("unknown pages are noindex and are not rewritten to an indexable homepage", async () => {
  const $ = load(await readFile("dist/404.html", "utf8"));
  assert.equal($('meta[name="robots"]').attr("content"), "noindex,follow");
  assert.equal($('link[rel="canonical"], link[rel="alternate"]').length, 0);
  assert.equal($("h1").length, 1);
  const config = JSON.parse(await readFile("vercel.json", "utf8"));
  assert.equal(config.cleanUrls, true);
  assert.equal(config.trailingSlash, false);
  assert.equal(config.rewrites, undefined);
});

test("crawl configuration and social image are included", async () => {
  const robots = await readFile("dist/robots.txt", "utf8");
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(!/^Disallow: \/\s*$/m.test(robots));
  assert.ok((await readFile("dist/og-image.png")).length > 1000);
});
