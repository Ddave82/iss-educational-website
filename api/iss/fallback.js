const ISS_FALLBACK_URL = "http://api.open-notify.org/iss-now.json";
const REQUEST_TIMEOUT_MS = 7000;

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json"
      }
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const apiResponse = await fetchWithTimeout(ISS_FALLBACK_URL);

    if (!apiResponse.ok) {
      response.status(apiResponse.status).json({ error: "Fallback feed unavailable" });
      return;
    }

    const payload = await apiResponse.json();
    response.setHeader("Cache-Control", "s-maxage=5, stale-while-revalidate=25");
    response.status(200).json(payload);
  } catch {
    response.status(504).json({ error: "Fallback feed timeout" });
  }
}
