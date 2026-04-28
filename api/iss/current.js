const PRIMARY_SOURCE = "https://api.wheretheiss.at/v1/satellites/25544";
const FALLBACK_SOURCE = "http://api.open-notify.org/iss-now.json";
const REQUEST_TIMEOUT_MS = 12000;

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "ISS Explorer telemetry proxy"
      }
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function normalizePrimaryPayload(payload) {
  return {
    latitude: Number(payload.latitude),
    longitude: Number(payload.longitude),
    altitude: Number(payload.altitude),
    velocity: Number(payload.velocity),
    visibility: payload.visibility,
    footprint: Number(payload.footprint),
    timestamp: Number(payload.timestamp),
    source: "primary"
  };
}

function normalizeFallbackPayload(payload) {
  return {
    latitude: Number(payload.iss_position?.latitude),
    longitude: Number(payload.iss_position?.longitude),
    altitude: null,
    velocity: null,
    visibility: null,
    footprint: null,
    timestamp: Number(payload.timestamp),
    source: "fallback"
  };
}

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "s-maxage=5, stale-while-revalidate=25");

  if (request.method === "OPTIONS") {
    response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    return response.status(204).end();
  }

  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = await fetchJson(PRIMARY_SOURCE);
    return response.status(200).json(normalizePrimaryPayload(payload));
  } catch (primaryError) {
    try {
      const payload = await fetchJson(FALLBACK_SOURCE);
      return response.status(200).json(normalizeFallbackPayload(payload));
    } catch {
      return response.status(502).json({
        error: "ISS telemetry feed unavailable",
        detail: primaryError.message
      });
    }
  }
}
