import { load } from "cheerio";
import { experiments } from "../src/lib/experiments.js";

export const SOURCES = {
  news: "https://www.nasa.gov/blogs/spacestation/feed/",
  research: "https://www.nasa.gov/blogs/spacestation/feed/?category_name=iss-research",
  people: "https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json",
  spacecraft: "https://corquaid.github.io/international-space-station-APIs/JSON/iss-docked-spacecraft.json"
};

export function safeUrl(value, domains) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password &&
      domains.some(domain => url.hostname === domain || url.hostname.endsWith(`.${domain}`)) ? url.href : null;
  } catch { return null; }
}
const text = (value) => {
  const $ = load(String(value || ""), {}, false);
  $("script,style").remove();
  return $.text().replace(/\s+/g, " ").trim();
};
const date = value => Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null;
const nameKey = value => String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z]/g, "");

export function parseNasaFeed(xml, researchOnly = false, now = Date.now()) {
  const $ = load(xml, { xml: true });
  if (!$("rss > channel").length) throw new Error("Invalid RSS response");
  const entries = $("item").toArray().map(item => {
    const node = $(item);
    const body = load(node.find("content\\:encoded").text() || node.find("description").text());
    const categories = node.find("category").toArray().map(category => text($(category).text()));
    const title = text(node.find("title").text()).slice(0, 240);
    const url = safeUrl(node.find("link").text().trim(), ["nasa.gov"]);
    const publishedAt = date(node.find("pubDate").text());
    const image = safeUrl(body("img").first().attr("src"), ["nasa.gov"]);
    // Return plain text only. Feed HTML is never rendered in the client.
    const summary = text(node.find("description").text()).slice(0, 330);
    const experimentIds = experiments.filter(item => item.pattern.test(body.text())).map(item => item.id);
    return { title, url, publishedAt, summary, experimentIds, image, imageAlt: text(body("img").first().attr("alt")).slice(0, 180), imageCredit: text(body(".hds-credits").first().text()).slice(0, 160) || "NASA", categories };
  }).filter(item => item.title && item.url && item.publishedAt && Date.parse(item.publishedAt) <= now + 300000 &&
    item.url.includes("/blogs/spacestation/") && (!researchOnly || item.categories.includes("ISS Research")));
  const unique = [...new Map(entries.map(item => [item.url, item])).values()];
  if (!unique.length) throw new Error("No valid station reports");
  return unique.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, 6);
}

export function parseNasaCrew(html, expedition) {
  const $ = load(html);
  if ($("h1").first().text().trim() !== `Expedition ${expedition}` || !$.text().includes("Active Mission")) throw new Error("Expedition is not active");
  const section = $("h2").filter((_, el) => $(el).text().trim() === "At the Station").closest(".hds-meet-the");
  const people = section.find(".hds-meet-the-card").toArray().map(card => {
    const node = $(card);
    const name = text(node.find("h3").first().text());
    const description = text(node.find(".hds-meet-the-content > p").first().text());
    return { name, role: /commander/i.test(description) ? "commander" : /flight engineer/i.test(description) ? "engineer" : "crew", agency: description.match(/^(NASA|ESA|Roscosmos|JAXA|CSA)/)?.[1] || "", image: safeUrl(node.find(".hds-meet-the-image img").first().attr("src"), ["nasa.gov"]), status: "onboard" };
  }).filter(person => person.name && person.name.length < 90);
  if (!people.length || people.length > 16 || new Set(people.map(p => p.name)).size !== people.length) throw new Error("NASA crew layout changed");
  return people;
}

export function buildCrew(official, roster, docked, expedition, now = Date.now()) {
  const profiles = Array.isArray(roster?.people) ? roster.people : [];
  const vehicles = Array.isArray(docked?.spacecraft) ? docked.spacecraft : [];
  const base = official || profiles.filter(person => person.iss === true).map(person => ({ name: person.name, agency: person.agency, role: "crew", status: "reported" }));
  if (!base.length) throw new Error("Crew unavailable");
  const members = base.map(person => {
    const profile = profiles.find(item => nameKey(item.name) === nameKey(person.name));
    const vehicle = vehicles.find(item => item.iss === true && Array.isArray(item.crew) && item.crew.some(name => nameKey(name) === nameKey(person.name)));
    const launched = Number(profile?.launched);
    const dockedAt = Number(vehicle?.docked);
    const validTime = value => Number.isFinite(value) && value > 946684800 && value * 1000 <= now ? new Date(value * 1000).toISOString() : null;
    return { ...person, name: text(person.name).slice(0, 90), agency: text(person.agency).slice(0, 60),
      image: safeUrl(profile?.image, ["wikimedia.org", "nasa.gov", "esa.int"]) || person.image || null,
      profileUrl: safeUrl(profile?.url, ["wikipedia.org", "nasa.gov", "esa.int"]),
      imageCredit: safeUrl(profile?.image, ["wikimedia.org"]) ? "Wikimedia Commons · source / license" : "NASA",
      imageSource: safeUrl(profile?.image, ["wikimedia.org"]) ? commonsPage(profile.image) : person.image,
      spacecraft: text(profile?.spacecraft || vehicle?.name).slice(0, 100),
      launchedAt: validTime(launched), arrivedAt: validTime(dockedAt)
    };
  });
  return { expedition, members, official: Boolean(official), sourceUrl: official ? `https://www.nasa.gov/mission/expedition-${expedition}/` : "https://github.com/corquaid/international-space-station-APIs", supplementalUrl: "https://github.com/corquaid/international-space-station-APIs" };
}

function commonsPage(url) {
  const pathname = new URL(url).pathname;
  const parts = pathname.split("/");
  const filename = pathname.includes("/thumb/") ? parts.at(-2) : parts.at(-1);
  return `https://commons.wikimedia.org/wiki/File:${filename}`;
}

export async function fetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { "User-Agent": "ISS Explorer / public station updates", Accept: "application/json, application/rss+xml, text/html" } });
  if (!response.ok) throw new Error(`Source returned ${response.status}`);
  if (Number(response.headers.get("content-length")) > 3000000) throw new Error("Source too large");
  const content = await response.text();
  if (content.length > 3000000) throw new Error("Source too large");
  return content;
}

export function createCachedSource(loader, ttl = 600000, maxAge = 86400000) {
  let last;
  let pending;
  let attemptedAt = 0;
  let failed = false;
  return async () => {
    const age = last ? Date.now() - Date.parse(last.fetchedAt) : Infinity;
    if (last && age < ttl && !failed) return { ...last, status: "fresh" };
    // Brief failure backoff; never overwrite the last successful fetch time.
    if (failed && Date.now() - attemptedAt < 60000) return last && age < maxAge ? { ...last, status: "stale" } : { status: "unavailable", data: null, fetchedAt: null };
    pending ??= (async () => {
      attemptedAt = Date.now();
      try {
        const data = await loader();
        last = { data, fetchedAt: new Date().toISOString() };
        failed = false;
        return { ...last, status: "fresh" };
      } catch {
        failed = true;
        return last && Date.now() - Date.parse(last.fetchedAt) < maxAge ? { ...last, status: "stale" } : { status: "unavailable", data: null, fetchedAt: null };
      }
    })().finally(() => { pending = null; });
    return pending;
  };
}

export const loadNews = createCachedSource(async () => parseNasaFeed(await fetchText(SOURCES.news)));
export const loadResearch = createCachedSource(async () => parseNasaFeed(await fetchText(SOURCES.research), true));
export const loadCrew = createCachedSource(async () => {
  const results = await Promise.allSettled([fetchText(SOURCES.people).then(JSON.parse), fetchText(SOURCES.spacecraft).then(JSON.parse), loadResearch()]);
  const roster = results[0].status === "fulfilled" ? results[0].value : null;
  const docked = results[1].status === "fulfilled" ? results[1].value : null;
  const reports = results[2].status === "fulfilled" ? results[2].value.data || [] : [];
  const expeditions = reports.flatMap(item => item.categories).map(category => Number(category.match(/^Expedition (\d+)$/)?.[1])).filter(Number.isFinite);
  const expedition = Math.max(Number(roster?.iss_expedition) || 0, ...expeditions);
  if (!Number.isInteger(expedition) || expedition < 1 || expedition > 150) throw new Error("No current expedition");
  let official = null;
  try { official = parseNasaCrew(await fetchText(`https://www.nasa.gov/mission/expedition-${expedition}/`), expedition); } catch { /* Explicitly labeled community fallback. */ }
  return buildCrew(official, roster, docked, expedition);
});
