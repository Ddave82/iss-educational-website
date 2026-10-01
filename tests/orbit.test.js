import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import * as THREE from "three";
import { getSubsolarPoint, getSceneSunDirection, getSunVector, getObserverSunElevation, isSatelliteSunlit } from "../src/lib/astronomy.js";
import { parseIssTle, predictOrbit } from "../src/lib/orbitPrediction.js";

const tle = JSON.parse(readFileSync(new URL("./fixtures/iss-tle.json", import.meta.url)));
const reference = new Date("2026-10-01T12:00:00Z");
const near = (actual, expected, tolerance) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not near ${expected}`);

test("solar declination follows seasons and UTC noon", () => {
  const equinox = getSubsolarPoint(new Date("2026-03-20T12:00:00Z"));
  near(equinox.latitude, 0, 0.3);
  near(equinox.longitude, 0, 3);
  near(getSubsolarPoint(new Date("2026-06-21T12:00:00Z")).latitude, 23.44, 0.1);
  near(getSubsolarPoint(new Date("2026-12-21T12:00:00Z")).latitude, -23.44, 0.1);
});

test("subsolar and antipodal points have opposite illumination", () => {
  const point = getSubsolarPoint(reference);
  near(getObserverSunElevation(reference, point.latitude, point.longitude), 90, 0.001);
  near(getObserverSunElevation(reference, -point.latitude, point.longitude + 180), -90, 0.001);
});

test("sun moves west approximately 90 degrees in six hours", () => {
  const a = getSubsolarPoint(reference);
  const b = getSubsolarPoint(new Date(+reference + 21600000));
  near(((b.longitude - a.longitude + 540) % 360) - 180, -90, 0.2);
});

test("globe UV alignment and follow rotation preserve geographic lighting", () => {
  const point = getSubsolarPoint(reference);
  const sceneSun = new THREE.Vector3(...getSceneSunDirection(reference));
  const phi = (point.longitude + 180) * Math.PI / 180;
  const theta = (90 - point.latitude) * Math.PI / 180;
  const objectNormal = new THREE.Vector3(-Math.cos(phi) * Math.sin(theta), Math.cos(theta), Math.sin(phi) * Math.sin(theta));
  const localSun = new THREE.Vector3(sceneSun.z, sceneSun.y, -sceneSun.x);
  near(objectNormal.dot(localSun), 1, 0.00001);
  const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(1.1, -2.5, 0.3));
  near(objectNormal.clone().applyQuaternion(rotation).dot(localSun.clone().applyQuaternion(rotation)), 1, 0.00001);
});

test("ISS in front of Earth is sunlit, directly behind Earth is eclipsed", () => {
  const sun = getSunVector(reference);
  const position = factor => Object.fromEntries(Object.entries(sun).map(([key, value]) => [key, value * factor]));
  assert.equal(isSatelliteSunlit(position(6800), reference), true);
  assert.equal(isSatelliteSunlit(position(-6800), reference), false);
});

test("SGP4 creates a finite 90-minute Earth-fixed path with plausible altitude", () => {
  const orbit = predictOrbit(tle, reference);
  assert.equal(orbit.points.length, 181);
  assert.equal(orbit.points.at(-1).timestamp - orbit.points[0].timestamp, 5400);
  for (const point of orbit.points) {
    assert.ok(Math.abs(point.latitude) < 52);
    assert.ok(Math.abs(point.longitude) <= 180);
    assert.ok(point.altitude > 350 && point.altitude < 500);
  }
  // Earth rotates beneath the orbit: unlike the old circle, it does not close.
  assert.ok(Math.abs(orbit.points.at(-1).longitude - orbit.points[0].longitude) > 5);
});

test("unrelated, stale, future and incomplete orbital elements are rejected", () => {
  assert.throws(() => parseIssTle({ ...tle, line1: tle.line1.replace("25544", "12345") }, +reference));
  assert.throws(() => parseIssTle(tle, +reference + 10 * 86400000));
  assert.throws(() => parseIssTle(tle, +reference - 10 * 86400000));
  assert.throws(() => parseIssTle({}, +reference));
});
