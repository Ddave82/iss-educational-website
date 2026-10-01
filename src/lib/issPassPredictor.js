import {
  ecfToLookAngles,
  eciToEcf,
  gstime,
  propagate
} from "satellite.js";

import { getObserverSunElevation, isSatelliteSunlit } from "./astronomy.js";
import { parseIssTle } from "./orbitPrediction.js";
export { fetchIssTle } from "./orbitPrediction.js";
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

export function predictVisibleIssPasses({ latitude, longitude }, tle) {
  validateCoordinates(latitude, longitude);

  const { satellite: satrec } = parseIssTle(tle);
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
