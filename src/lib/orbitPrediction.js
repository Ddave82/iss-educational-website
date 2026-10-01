import { eciToGeodetic, gstime, propagate, twoline2satrec } from "satellite.js";

export const MAX_TLE_AGE_MS = 7 * 86400000;

export function parseIssTle(tle, now = Date.now()) {
  if (typeof tle?.line1 !== "string" || typeof tle?.line2 !== "string" ||
      tle.line1.length < 69 || tle.line2.length < 69 ||
      !/^1 25544[U ]/.test(tle.line1) || !/^2 25544 /.test(tle.line2)) {
    throw new Error("Invalid ISS orbital elements");
  }
  const satellite = twoline2satrec(tle.line1, tle.line2);
  const epoch = (satellite.jdsatepoch - 2440587.5) * 86400000;
  if (![epoch, satellite.no, satellite.ecco, satellite.inclo].every(Number.isFinite) ||
      satellite.no <= 0 || satellite.ecco < 0 || satellite.ecco >= 1 ||
      satellite.error || epoch > now + 86400000 || now - epoch > MAX_TLE_AGE_MS) {
    throw new Error("Orbital elements are out of date");
  }
  return { satellite, epoch };
}

export function predictOrbit(tle, start = new Date(), minutes = 90) {
  const { satellite, epoch } = parseIssTle(tle, start.getTime());
  const points = [];
  for (let seconds = 0; seconds <= minutes * 60; seconds += 30) {
    const date = new Date(start.getTime() + seconds * 1000);
    const state = propagate(satellite, date);
    if (!state.position || satellite.error) throw new Error("Orbit propagation failed");
    const geo = eciToGeodetic(state.position, gstime(date));
    const point = { latitude: geo.latitude * 180 / Math.PI, longitude: geo.longitude * 180 / Math.PI, altitude: geo.height, timestamp: date.getTime() / 1000 };
    if (!Object.values(point).every(Number.isFinite) || point.altitude < 100 || point.altitude > 1000) throw new Error("Invalid predicted position");
    points.push(point);
  }
  return { points, epoch };
}

let cachedTle;
let pendingTle;
export async function fetchIssTle() {
  if (cachedTle && Date.now() - cachedTle.fetchedAt < 300000) return cachedTle.data;
  if (pendingTle) return pendingTle;
  pendingTle = (async () => {
    let lastError;
    for (const url of ["/api/iss/tle", "https://api.wheretheiss.at/v1/satellites/25544/tles"]) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
        if (!response.ok) throw new Error("Orbital data unavailable");
        const data = await response.json();
        parseIssTle(data);
        cachedTle = { data, fetchedAt: Date.now() };
        return data;
      } catch (error) { lastError = error; }
    }
    throw lastError;
  })().finally(() => { pendingTle = null; });
  return pendingTle;
}
