import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseNasaCrew, parseNasaFeed, buildCrew, safeUrl, createCachedSource } from "../server/stationSources.js";
import { recentExperiments } from "../src/lib/experiments.js";
import { usableStationData } from "../src/hooks/useStationBrief.js";

const html = readFileSync(new URL("./fixtures/nasa-crew.html", import.meta.url), "utf8");
const xml = readFileSync(new URL("./fixtures/nasa-research.xml", import.meta.url), "utf8");
const now = Date.parse("2026-10-01T22:00:00Z");

test("NASA roster parses the actual station commander and seven members", () => {
  const crew = parseNasaCrew(html, 75);
  assert.equal(crew.length, 7);
  assert.equal(crew.find(p => p.name === "Jessica Meir").role, "commander");
  assert.equal(crew.find(p => p.name === "Pyotr Dubrov").role, "engineer");
});

test("changed or inactive NASA pages fail rather than returning an empty live roster", () => {
  assert.throws(() => parseNasaCrew(html.replaceAll("hds-meet-the-card", "changed-layout"), 75));
  assert.throws(() => parseNasaCrew(html.replace("Active Mission", "Past Mission"), 75));
  assert.throws(() => parseNasaCrew(html, 74));
});

test("only NASA-confirmed members get onboard status; spacecraft command does not override station command", () => {
  const official = [{ name: "Jessica Meir", role: "commander", status: "onboard" }];
  const roster = { people: [{ name: "Jessica Meir", position: "Flight Engineer", iss: true, launched: 1770974155 }, { name: "In Transit", iss: true }, { name: "Other Station", iss: false }] };
  const result = buildCrew(official, roster, {}, 75, now);
  assert.equal(result.members.length, 1);
  assert.equal(result.members[0].role, "commander");
  assert.equal(result.members[0].arrivedAt, null);
});

test("community fallback is explicit and excludes non-ISS astronauts", () => {
  const roster = { people: [{ name: "Test Person", position: "Commander", iss: true }, { name: "Other Station", iss: false }] };
  const result = buildCrew(null, roster, null, 75, now);
  assert.equal(result.official, false);
  assert.equal(result.members.length, 1);
  assert.equal(result.members[0].role, "crew");
  assert.equal(result.members[0].status, "reported");
});

test("arrival comes from an ISS vehicle manifest, never from launch time or a future docking", () => {
  const roster = { people: [{ name: "Test Person", iss: true, launched: 1770974155 }] };
  const docked = { spacecraft: [{ iss: true, crew: ["Test Person"], docked: 1771096500 }] };
  assert.equal(buildCrew(null, roster, docked, 75, now).members[0].arrivedAt, "2026-02-14T19:15:00.000Z");
  docked.spacecraft[0].docked = now / 1000 + 3600;
  assert.equal(buildCrew(null, roster, docked, 75, now).members[0].arrivedAt, null);
});

test("research RSS retains dates, credits and experiment mentions", () => {
  const reports = parseNasaFeed(xml, true, now);
  assert.equal(reports.length, 2);
  assert.ok(reports[0].image.startsWith("https://"));
  assert.equal(reports[0].publishedAt.slice(0, 10), "2026-09-30");
  assert.deepEqual(recentExperiments(reports).map(item => item.id), ["e4d", "venous", "ared"]);
  assert.ok(reports.every(item => !item.summary.includes("<")));
});

test("non-NASA URLs, scripts, credentials and malformed feeds are rejected", () => {
  for (const url of ["javascript:alert(1)", "http://www.nasa.gov/x", "https://nasa.gov.evil.example/x", "https://user@www.nasa.gov/x"]) assert.equal(safeUrl(url, ["nasa.gov"]), null);
  assert.throws(() => parseNasaFeed("<html>Service unavailable</html>"));
  assert.throws(() => parseNasaFeed(xml.replaceAll("https://www.nasa.gov/blogs/", "https://evil.example/blogs/"), true, now));
  assert.throws(() => parseNasaFeed(xml, true, Date.parse("2020-01-01")));
});

test("simultaneous source requests share one fetch", async () => {
  let count = 0;
  const cached = createCachedSource(async () => { count++; return ["report"]; });
  const [a, b] = await Promise.all([cached(), cached()]);
  assert.equal(count, 1);
  assert.deepEqual(a, b);
});

test("failed refresh preserves data and the original retrieval time", async () => {
  let fail = false;
  const cached = createCachedSource(async () => { if (fail) throw new Error("offline"); return ["last report"]; }, -1);
  const fresh = await cached(); fail = true;
  const stale = await cached();
  assert.equal(stale.status, "stale");
  assert.equal(stale.fetchedAt, fresh.fetchedAt);
  assert.deepEqual(stale.data, fresh.data);
});

test("expired saved content and initial failures are unavailable", async () => {
  let fail = false;
  const cached = createCachedSource(async () => { if (fail) throw new Error("offline"); return []; }, -1, -1);
  await cached(); fail = true;
  assert.equal((await cached()).status, "unavailable");
  const unavailable = createCachedSource(async () => { throw new Error("offline"); });
  assert.equal((await unavailable()).data, null);
});

test("client expires cached sections independently and keeps offline data marked stale", () => {
  const recent = { data: ["report"], fetchedAt: new Date(now - 60000).toISOString(), status: "fresh" };
  const old = { ...recent, fetchedAt: new Date(now - 25 * 3600000).toISOString() };
  const result = usableStationData({ crew: old, news: recent, research: recent }, true, now);
  assert.equal(result.crew.data, null);
  assert.equal(result.news.status, "stale");
  assert.equal(result.news.fetchedAt, recent.fetchedAt);
});
