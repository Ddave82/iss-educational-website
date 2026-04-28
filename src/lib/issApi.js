const DIRECT_PRIMARY_SOURCE = "https://api.wheretheiss.at/v1/satellites/25544";
const LOCAL_PRIMARY_SOURCE = "/api/iss/current";
const LOCAL_FALLBACK_SOURCE = "/api/iss/fallback";
const REQUEST_TIMEOUT_MS = 15000;

function toFiniteNumber(value) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function withTimeout(resource, options = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  return fetch(resource, {
    ...options,
    signal: controller.signal,
    headers: {
      Accept: "application/json",
      ...options.headers
    }
  }).finally(() => {
    window.clearTimeout(timeoutId);
  });
}

function normalizePrimaryPayload(payload) {
  return {
    latitude: toFiniteNumber(payload.latitude),
    longitude: toFiniteNumber(payload.longitude),
    altitude: toFiniteNumber(payload.altitude),
    velocity: toFiniteNumber(payload.velocity),
    visibility: payload.visibility,
    footprint: toFiniteNumber(payload.footprint),
    timestamp: toFiniteNumber(payload.timestamp),
    source: payload.source || "primary"
  };
}

function normalizeFallbackPayload(payload) {
  return {
    latitude: toFiniteNumber(payload.iss_position?.latitude ?? payload.latitude),
    longitude: toFiniteNumber(payload.iss_position?.longitude ?? payload.longitude),
    altitude: null,
    velocity: null,
    visibility: null,
    footprint: null,
    timestamp: toFiniteNumber(payload.timestamp),
    source: payload.source || "fallback"
  };
}

function hasPosition(snapshot) {
  return Number.isFinite(snapshot.latitude) && Number.isFinite(snapshot.longitude);
}

function hasFullTelemetry(snapshot) {
  return (
    hasPosition(snapshot) &&
    Number.isFinite(snapshot.altitude) &&
    Number.isFinite(snapshot.velocity)
  );
}

async function fetchJson(url) {
  const response = await withTimeout(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchIssSnapshot() {
  let localSnapshot = null;

  try {
    const payload = await fetchJson(LOCAL_PRIMARY_SOURCE);
    localSnapshot = normalizePrimaryPayload(payload);

    if (hasFullTelemetry(localSnapshot)) {
      return localSnapshot;
    }
  } catch (localPrimaryError) {
    localSnapshot = null;
  }

  try {
    const payload = await fetchJson(DIRECT_PRIMARY_SOURCE);
    const directSnapshot = normalizePrimaryPayload(payload);

    if (hasFullTelemetry(directSnapshot)) {
      return directSnapshot;
    }
  } catch (directPrimaryError) {
    if (localSnapshot && hasPosition(localSnapshot)) {
      return localSnapshot;
    }

    try {
      const payload = await fetchJson(LOCAL_FALLBACK_SOURCE);
      const fallbackSnapshot = normalizeFallbackPayload(payload);

      if (hasPosition(fallbackSnapshot)) {
        return fallbackSnapshot;
      }
    } catch (fallbackError) {
      if (
        directPrimaryError.name === "AbortError" ||
        fallbackError.name === "AbortError"
      ) {
        throw new Error("The ISS data feed timed out.");
      }

      throw new Error("ISS data is not reachable right now.");
    }
  }

  if (localSnapshot && hasPosition(localSnapshot)) {
    return localSnapshot;
  }

  throw new Error("ISS data is not reachable right now.");
}
