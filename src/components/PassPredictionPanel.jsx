import { useMemo, useState } from "react";
import {
  fetchIssTle,
  predictVisibleIssPasses
} from "../lib/issPassPredictor";
import { useI18n } from "../lib/i18n.jsx";

function formatDuration(seconds, t) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return t.pass.duration(minutes);
}

function formatCoordinateInput(value) {
  return Number.isFinite(value) ? value.toFixed(4) : "";
}

function resolveGeolocation(t) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error(t.pass.geolocationUnavailable));
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
            t.pass.permissionDenied
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
  const { languageInfo, t } = useI18n();
  const [latitudeInput, setLatitudeInput] = useState("");
  const [longitudeInput, setLongitudeInput] = useState("");
  const [passes, setPasses] = useState([]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const passTimeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(languageInfo.intlLocale, {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit"
      }),
    [languageInfo.intlLocale]
  );

  async function calculatePasses(coordinates) {
    setStatus("loading");
    setMessage(t.pass.calculating);

    try {
      const tle = await fetchIssTle();
      const predictedPasses = predictVisibleIssPasses(coordinates, tle);

      setLatitudeInput(formatCoordinateInput(coordinates.latitude));
      setLongitudeInput(formatCoordinateInput(coordinates.longitude));
      setPasses(predictedPasses);
      setStatus("ready");
      setMessage(
        predictedPasses.length
          ? t.pass.estimates
          : t.pass.none
      );
    } catch (error) {
      setPasses([]);
      setStatus("error");
      setMessage(error.message);
    }
  }

  async function handleUseLocation() {
    setStatus("loading");
    setMessage(t.pass.requesting);

    try {
      const coordinates = await resolveGeolocation(t);
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
          {t.pass.useLocation}
        </button>
        <form className="coordinate-form" onSubmit={handleManualSubmit}>
          <label>
            <span>{t.pass.latitude}</span>
            <input
              type="number"
              value={latitudeInput}
              min="-90"
              max="90"
              step="0.0001"
              placeholder="52.5200"
              onChange={(event) => setLatitudeInput(event.target.value)}
              aria-label={t.pass.latitude}
            />
          </label>
          <label>
            <span>{t.pass.longitude}</span>
            <input
              type="number"
              value={longitudeInput}
              min="-180"
              max="180"
              step="0.0001"
              placeholder="13.4050"
              onChange={(event) => setLongitudeInput(event.target.value)}
              aria-label={t.pass.longitude}
            />
          </label>
          <button type="submit" disabled={status === "loading"}>
            {t.pass.calculate}
          </button>
        </form>
      </div>

      {message ? (
        <p className={`pass-message pass-message-${status}`} aria-live="polite">
          {message}
        </p>
      ) : null}

      {passes.length ? (
        <div className="pass-list" aria-label={t.pass.listAria}>
          {passes.map((pass) => (
            <article className="pass-card" key={`${pass.startTime}-${pass.endTime}`}>
              <strong>{passTimeFormatter.format(new Date(pass.startTime))}</strong>
              <span>
                {t.pass.direction(pass.startDirection, pass.endDirection, Math.round(pass.maxElevation))}
              </span>
              <span>{formatDuration(pass.durationSeconds, t)} {t.pass.visibleWindow}</span>
            </article>
          ))}
        </div>
      ) : compact ? (
        <p className="pass-message">
          {t.pass.emptyCompact}
        </p>
      ) : null}
    </div>
  );
}
