import { useState } from "react";
import {
  fetchIssTle,
  predictVisibleIssPasses
} from "../../lib/issPassPredictor";

const timelineEvents = [
  {
    year: "1998",
    title: "First modules launched",
    detail: "Zarya launched on Nov. 20, followed by Unity on Dec. 4."
  },
  {
    year: "Nov. 2, 2000",
    title: "First long-duration crew",
    detail: "Expedition 1 arrived and began continuous human presence in orbit."
  },
  {
    year: "2011",
    title: "Assembly completed",
    detail: "NASA and partners completed station assembly in fall 2011."
  },
  {
    year: "2025",
    title: "25 years inhabited",
    detail: "The ISS marked 25 years of continuous human presence."
  }
];

const glossaryTerms = [
  {
    term: "Orbit",
    definition: "A curved path around Earth. The ISS falls around Earth instead of falling down."
  },
  {
    term: "Microgravity",
    definition: "A near-weightless environment where people and experiments float."
  },
  {
    term: "Docking",
    definition: "When a spacecraft carefully connects to the station."
  },
  {
    term: "Module",
    definition: "A station room or section built for living, working, storage, or science."
  },
  {
    term: "Solar array",
    definition: "A wide panel that turns sunlight into electricity for the station."
  }
];

const scienceCards = [
  {
    title: "Cold Atom Lab",
    type: "Quantum physics",
    body:
      "A facility on the ISS chills atoms to extremely low temperatures so scientists can study quantum behavior in microgravity.",
    href: "https://science.nasa.gov/mission/cold-atom-laboratory/"
  },
  {
    title: "Protein crystal growth",
    type: "Medicine",
    body:
      "Protein crystals can grow larger and more uniformly in microgravity, helping researchers study structures used in drug development.",
    href: "https://www.nasa.gov/missions/station/iss-research/creating-new-and-better-drugs-with-protein-crystal-growth-experiments/"
  },
  {
    title: "Tissue chips",
    type: "Human health",
    body:
      "Small devices with living cells mimic human tissues, helping researchers study disease and test drugs in space.",
    href: "https://www.nasa.gov/missions/station/tissue-chips-investigate-diseases-test-drugs-on-the-space-station/"
  }
];

const scaleItems = [
  {
    label: "ISS end-to-end",
    value: "356 ft / 109 m",
    width: "100%"
  },
  {
    label: "Football field incl. end zones",
    value: "360 ft / 110 m",
    width: "100%"
  },
  {
    label: "Airbus A380 wingspan",
    value: "262 ft / 80 m",
    width: "73%"
  }
];

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

function PassPredictionPanel() {
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
    <div className="pass-predictor">
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
            />
          </label>
          <button type="submit" disabled={status === "loading"}>
            Calculate
          </button>
        </form>
      </div>

      {message ? (
        <p className={`pass-message pass-message-${status}`}>{message}</p>
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
      ) : null}
    </div>
  );
}

export function ExplorerSection() {
  return (
    <section className="explorer-section" id="explore">
      <div className="section-heading-wide">
        <span className="section-kicker">Explore deeper</span>
        <h2>See it, scale it, and speak space.</h2>
        <p>
          The station is not just a dot on a map. It is a real spacecraft you
          can sometimes spot in the sky, a giant structure, and a working lab.
        </p>
      </div>

      <div className="explorer-grid">
        <article className="spot-card">
          <span className="section-kicker">Spot the Station</span>
          <h3>Look up after sunset or before sunrise.</h3>
          <p>
            The ISS can look like a bright, fast-moving star. NASA's Spot the
            Station concept is simple: you need a dark sky below you and a
            sunlit station above you.
          </p>
          <PassPredictionPanel />
        </article>

        <article className="scale-card">
          <span className="section-kicker">ISS scale</span>
          <h3>Almost a football field across.</h3>
          <div className="scale-bars" aria-label="ISS size comparison">
            {scaleItems.map((item) => (
              <div className="scale-row" key={item.label}>
                <div className="scale-row-header">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="scale-track">
                  <span style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="timeline-panel">
        <div className="section-heading-wide compact-heading">
          <span className="section-kicker">Timeline</span>
          <h2>From first pieces to 25 years in orbit.</h2>
        </div>
        <div className="timeline-grid">
          {timelineEvents.map((event) => (
            <article className="timeline-item" key={event.year}>
              <strong>{event.year}</strong>
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="learning-grid extras-grid">
        <article className="glossary-card">
          <span className="section-kicker">Space words</span>
          <h3>Mini glossary for young explorers.</h3>
          <dl className="glossary-list">
            {glossaryTerms.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.definition}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="science-card">
          <span className="section-kicker">Real station science</span>
          <h3>Experiments that use microgravity.</h3>
          <div className="science-list">
            {scienceCards.map((card) => (
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                key={card.title}
              >
                <span>{card.type}</span>
                <strong>{card.title}</strong>
                <p>{card.body}</p>
              </a>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
