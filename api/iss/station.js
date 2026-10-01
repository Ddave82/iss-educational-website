import { loadCrew, loadNews, loadResearch } from "../../server/stationSources.js";

export default async function handler(request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  if (request.method !== "GET") { response.statusCode = 405; response.setHeader("Allow", "GET"); return response.end(JSON.stringify({ error: "Method not allowed" })); }
  const [crew, news, research] = await Promise.all([loadCrew(), loadNews(), loadResearch()]);
  const allUnavailable = [crew, news, research].every(source => source.status === "unavailable");
  response.statusCode = allUnavailable ? 503 : 200;
  response.setHeader("Cache-Control", allUnavailable ? "no-store" : "public, max-age=60, s-maxage=300");
  response.end(JSON.stringify({ crew, news, research }));
}
