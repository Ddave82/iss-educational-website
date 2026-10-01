import { eciToEcf, gstime } from "satellite.js";

const RAD = Math.PI / 180;
const normalize = (angle) => ((angle % 360) + 360) % 360;

// Low-precision solar ephemeris, J2000 equatorial coordinates. Suitable for
// the visual terminator and educational visibility estimates (not navigation).
export function getSunVector(date) {
  const days = date.getTime() / 86400000 + 2440587.5 - 2451545;
  const anomaly = normalize(357.528 + 0.9856003 * days) * RAD;
  const longitude = (normalize(280.460 + 0.9856474 * days) +
    1.915 * Math.sin(anomaly) + 0.02 * Math.sin(2 * anomaly)) * RAD;
  const obliquity = (23.439 - 0.0000004 * days) * RAD;
  return { x: Math.cos(longitude), y: Math.cos(obliquity) * Math.sin(longitude), z: Math.sin(obliquity) * Math.sin(longitude) };
}

export function getSubsolarPoint(date) {
  const sun = eciToEcf(getSunVector(date), gstime(date));
  return { latitude: Math.asin(sun.z) / RAD, longitude: Math.atan2(sun.y, sun.x) / RAD };
}

// Scene coordinates: +Y north, +Z Greenwich, +X 90° east.
export function getSceneSunDirection(date) {
  const sun = eciToEcf(getSunVector(date), gstime(date));
  return [sun.y, sun.z, sun.x];
}

export function getObserverSunElevation(date, latitude, longitude) {
  const sun = getSunVector(date);
  const declination = Math.asin(sun.z);
  const hourAngle = gstime(date) + longitude * RAD - Math.atan2(sun.y, sun.x);
  return Math.asin(Math.sin(latitude * RAD) * Math.sin(declination) +
    Math.cos(latitude * RAD) * Math.cos(declination) * Math.cos(hourAngle)) / RAD;
}

export function isSatelliteSunlit(position, date) {
  const sun = getSunVector(date);
  const projection = position.x * sun.x + position.y * sun.y + position.z * sun.z;
  const distanceSquared = position.x ** 2 + position.y ** 2 + position.z ** 2;
  return !(projection < 0 && distanceSquared - projection ** 2 < 6378.137 ** 2);
}
