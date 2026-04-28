import {
  ecfToLookAngles,
  eciToEcf,
  gstime,
  propagate,
  twoline2satrec
} from "satellite.js";

const ISS_TLE_SOURCE = "https://api.wheretheiss.at/v1/satellites/25544/tles";
const EARTH_RADIUS_KM = 6378.137;
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;
const PREDICTION_HOURS = 48;
const STEP_SECONDS = 30;
const MIN_VISIBLE_ELEVATION_DEG = 10;
const MAX_OBSERVER_SUN_ELEVATION_DEG = -4;
const MAX_VISIBLE_PASSES = 3;

function toRadians(value) {
  return value * DEG_TO_RAD;
}

function toDegrees(value) {
  return value * RAD_TO_DEG;
}

function normalizeDegrees(value) {
  return ((value % 360) + 360) % 360;
}

function getJulianDate(date) {
  return date.getTime() / 86400000 + 2440587.5;
}

function getSunVector(date) {
  const daysSinceJ2000 = getJulianDate(date) - 2451545.0;
  const meanLongitude = normalizeDegrees(280.460 + 0.9856474 * daysSinceJ2000);
  const meanAnomaly = normalizeDegrees(357.528 + 0.9856003 * daysSinceJ2000);
  const meanAnomalyRad = toRadians(meanAnomaly);
  const eclipticLongitude = normalizeDegrees(
    meanLongitude +
      1.915 * Math.sin(meanAnomalyRad) +
      0.02 * Math.sin(2 * meanAnomalyRad)
  );
  const eclipticLongitudeRad = toRadians(eclipticLongitude);
  const obliquityRad = toRadians(23.439 - 0.0000004 * daysSinceJ2000);

  return {
    x: Math.cos(eclipticLongitudeRad),
    y: Math.cos(obliquityRad) * Math.sin(eclipticLongitudeRad),
    z: Math.sin(obliquityRad) * Math.sin(eclipticLongitudeRad)
  };
}

function getObserverSunElevation(date, latitude, longitude) {
  const sunVector = getSunVector(date);
  const rightAscension = Math.atan2(sunVector.y, sunVector.x);
  const declination = Math.asin(sunVector.z);
  const localSiderealTime = gstime(date) + toRadians(longitude);
  const hourAngle = localSiderealTime - rightAscension;
  const latitudeRad = toRadians(latitude);
  const elevation = Math.asin(
    Math.sin(latitudeRad) * Math.sin(declination) +
      Math.cos(latitudeRad) * Math.cos(declination) * Math.cos(hourAngle)
  );

  return toDegrees(elevation);
}

function isSatelliteSunlit(positionEci, date) {
  const sunVector = getSunVector(date);
  const satelliteDotSun =
    positionEci.x * sunVector.x +
    positionEci.y * sunVector.y +
    positionEci.z * sunVector.z;
  const satelliteDistanceSquared =
    positionEci.x ** 2 + positionEci.y ** 2 + positionEci.z ** 2;
  const distanceFromSunLineSquared =
    satelliteDistanceSquared - satelliteDotSun ** 2;

  return !(
    satelliteDotSun < 0 &&
    distanceFromSunLineSquared < EARTH_RADIUS_KM ** 2
  );
}

function azimuthToCompass(azimuthRadians) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW"
  ];
  const index = Math.round(normalizeDegrees(toDegrees(azimuthRadians)) / 22.5) %
    directions.length;

  return directions[index];
}

function finalizePass(pass) {
  return {
    startTime: pass.start.time.toISOString(),
    endTime: pass.end.time.toISOString(),
    peakTime: pass.peak.time.toISOString(),
    durationSeconds: Math.max(
      STEP_SECONDS,
      Math.round((pass.end.time - pass.start.time) / 1000)
    ),
    maxElevation: pass.peak.elevation,
    startDirection: azimuthToCompass(pass.start.azimuth),
    endDirection: azimuthToCompass(pass.end.azimuth)
  };
}

function validateCoordinates(latitude, longitude) {
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    throw new Error("Latitude must be between -90 and 90.");
  }

  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    throw new Error("Longitude must be between -180 and 180.");
  }
}

export async function fetchIssTle({ signal } = {}) {
  const response = await fetch(ISS_TLE_SOURCE, {
    signal,
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`ISS TLE request failed: ${response.status}`);
  }

  const payload = await response.json();

  if (!payload.line1 || !payload.line2) {
    throw new Error("ISS TLE response is incomplete.");
  }

  return payload;
}

export function predictVisibleIssPasses({ latitude, longitude }, tle) {
  validateCoordinates(latitude, longitude);

  const satrec = twoline2satrec(tle.line1, tle.line2);
  const observerGd = {
    latitude: toRadians(latitude),
    longitude: toRadians(longitude),
    height: 0
  };
  const passes = [];
  const startMs = Date.now();
  let activePass = null;

  for (
    let offsetSeconds = 0;
    offsetSeconds <= PREDICTION_HOURS * 3600;
    offsetSeconds += STEP_SECONDS
  ) {
    const time = new Date(startMs + offsetSeconds * 1000);
    const positionAndVelocity = propagate(satrec, time);
    const positionEci = positionAndVelocity.position;

    if (!positionEci || typeof positionEci === "boolean") {
      activePass = null;
      continue;
    }

    const gmst = gstime(time);
    const positionEcf = eciToEcf(positionEci, gmst);
    const lookAngles = ecfToLookAngles(observerGd, positionEcf);
    const elevation = toDegrees(lookAngles.elevation);
    const observerSunElevation = getObserverSunElevation(
      time,
      latitude,
      longitude
    );
    const visible =
      elevation >= MIN_VISIBLE_ELEVATION_DEG &&
      observerSunElevation <= MAX_OBSERVER_SUN_ELEVATION_DEG &&
      isSatelliteSunlit(positionEci, time);

    if (visible) {
      const sample = {
        time,
        elevation,
        azimuth: lookAngles.azimuth
      };

      activePass ??= {
        start: sample,
        end: sample,
        peak: sample
      };
      activePass.end = sample;

      if (sample.elevation > activePass.peak.elevation) {
        activePass.peak = sample;
      }
    } else if (activePass) {
      passes.push(finalizePass(activePass));
      activePass = null;

      if (passes.length >= MAX_VISIBLE_PASSES) {
        break;
      }
    }
  }

  if (activePass && passes.length < MAX_VISIBLE_PASSES) {
    passes.push(finalizePass(activePass));
  }

  return passes;
}
