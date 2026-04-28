import { useState } from "react";
import {
  fetchIssTle,
  predictVisibleIssPasses
} from "../lib/issPassPredictor";

const PASS_TIME_FORMATTER = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit"
});

function formatPassTime(timestamp) {
  return PASS_TIME_FORMATTER.format(new Date(timestamp));
}

function formatDuration(seconds) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return `${minutes} min`;
}

function formatCoordinateInput(value) {
  return Number.isFinite(value) ? value.toFixed(4) : "";
}

function resolveGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not available in this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      () => {
        reject(
          new Error(
            "Location permission was denied. Enter coordinates manually instead."
          )
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 600000
      }
    );
  });
}

export function PassPredictionPanel({ compact = false }) {
  const [latitudeInput, setLatitudeInput] = useState("");
  const [longitudeInput, setLongitudeInput] = useState("");
  const [passes, setPasses] = useState([]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function calculatePasses(coordinates) {
    setStatus("loading");
    setMessage("Calculating visible pass candidates...");

    try {
      const tle = await fetchIssTle();
      const predictedPasses = predictVisibleIssPasses(coordinates, tle);

      setLatitudeInput(formatCoordinateInput(coordinates.latitude));
      setLongitudeInput(formatCoordinateInput(coordinates.longitude));
      setPasses(predictedPasses);
      setStatus("ready");
      setMessage(
        predictedPasses.length
          ? "Times are estimates based on current orbital data. Re-check close to viewing time."
          : "No visible pass candidates found in the next 48 hours. Try again tomorrow."
      );
    } catch (error) {
      setPasses([]);
      setStatus("error");
      setMessage(error.message);
    }
  }

  async function handleUseLocation() {
    setStatus("loading");
    setMessage("Requesting your browser location...");

    try {
      const coordinates = await resolveGeolocation();
      await calculatePasses(coordinates);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  function handleManualSubmit(event) {
    event.preventDefault();
    calculatePasses({
      latitude: Number(latitudeInput),
      longitude: Number(longitudeInput)
    });
  }

  return (
    <div className={`pass-predictor${compact ? " pass-predictor-compact" : ""}`}>
      <div className="pass-actions">
        <button
          type="button"
          className="spot-cta"
          onClick={handleUseLocation}
          disabled={status === "loading"}
        >
          Use my location
        </button>
        <form className="coordinate-form" onSubmit={handleManualSubmit}>
          <label>
            <span>Lat</span>
            <input
              type="number"
              value={latitudeInput}
              min="-90"
              max="90"
              step="0.0001"
              placeholder="52.5200"
              onChange={(event) => setLatitudeInput(event.target.value)}
              aria-label="Latitude"
            />
          </label>
          <label>
            <span>Lon</span>
            <input
              type="number"
              value={longitudeInput}
              min="-180"
              max="180"
              step="0.0001"
              placeholder="13.4050"
              onChange={(event) => setLongitudeInput(event.target.value)}
              aria-label="Longitude"
            />
          </label>
          <button type="submit" disabled={status === "loading"}>
            Calculate
          </button>
        </form>
      </div>

      {message ? (
        <p className={`pass-message pass-message-${status}`} aria-live="polite">
          {message}
        </p>
      ) : null}

      {passes.length ? (
        <div className="pass-list" aria-label="Predicted visible ISS passes">
          {passes.map((pass) => (
            <article className="pass-card" key={`${pass.startTime}-${pass.endTime}`}>
              <strong>{formatPassTime(pass.startTime)}</strong>
              <span>
                {pass.startDirection} to {pass.endDirection} /{" "}
                {Math.round(pass.maxElevation)} deg max
              </span>
              <span>{formatDuration(pass.durationSeconds)} visible window</span>
            </article>
          ))}
        </div>
      ) : compact ? (
        <p className="pass-message">
          Enter a location to estimate upcoming visible passes. The result uses
          current TLE orbital data and should be checked again near viewing time.
        </p>
      ) : null}
    </div>
  );
}
