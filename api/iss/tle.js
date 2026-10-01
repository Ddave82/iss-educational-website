import { createCachedSource, fetchText } from "../../server/stationSources.js";
import { parseIssTle } from "../../src/lib/orbitPrediction.js";

const loadTle = createCachedSource(async () => {
  const tle = JSON.parse(await fetchText("https://api.wheretheiss.at/v1/satellites/25544/tles"));
  parseIssTle(tle);
  return { line1: tle.line1, line2: tle.line2 };
}, 300000, 3600000);

export default async function handler(request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  if (request.method !== "GET") { response.statusCode = 405; response.setHeader("Allow", "GET"); return response.end(JSON.stringify({ error: "Method not allowed" })); }
  const result = await loadTle();
  response.statusCode = result.data ? 200 : 503;
  response.setHeader("Cache-Control", result.data ? "public, max-age=60, s-maxage=300" : "no-store");
  response.end(JSON.stringify(result.data || { error: "Orbital data unavailable" }));
}
