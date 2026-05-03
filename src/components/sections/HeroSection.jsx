const HERO_IMAGE =
  "https://images-assets.nasa.gov/image/jsc2021e064215_alt/jsc2021e064215_alt~large.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1173&w=1920";

function formatLiveCoordinate(value, positiveLabel, negativeLabel) {
  if (!Number.isFinite(value)) {
    return "--";
  }

  return `${Math.abs(value).toFixed(1)} ${value >= 0 ? positiveLabel : negativeLabel}`;
}

function getHeroStatus(status) {
  if (status === "live") {
    return "Live signal";
  }

  if (status === "stale") {
    return "Last known orbit";
  }

  if (status === "offline") {
    return "Waiting for signal";
  }

  return "Connecting";
}

export function HeroSection({ telemetry }) {
  const { snapshot, status } = telemetry;

  return (
    <header className="hero-section" id="top">
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand-mark" href="#top" aria-label="ISS learning site home">
          <img className="brand-logo" src="/isslogo.png" alt="" aria-hidden="true" />
        </a>
        <div className="nav-links">
          <a href="#learn">Learn</a>
          <a href="#explore">Explore</a>
          <a href="#live-tracker">Tracker</a>
          <a href="#media">Media</a>
          <a href="#sources">Sources</a>
        </div>
      </nav>

      <div className="hero-grid">
        <div className="hero-copy-block">
          <span className="section-kicker">Orbiting laboratory</span>
          <h1>International Space Station</h1>
          <p>
            Follow the station in real time, look inside life in orbit, and
            explore how people from Earth work together 400 kilometers above us.
          </p>
          <div className="hero-actions" aria-label="Page shortcuts">
            <a className="button-primary" href="#live-tracker">
              Track the ISS
            </a>
            <a className="button-secondary" href="#learn">
              Start learning
            </a>
          </div>
        </div>

        <figure className="hero-visual">
          <img
            src={HERO_IMAGE}
            alt="The International Space Station photographed in orbit"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>
            Image source: NASA Image and Video Library. Credit information is
            preserved in the{" "}
            <a
              href="https://www.nasa.gov/international-space-station/space-station-gallery/"
              target="_blank"
              rel="noreferrer"
            >
              linked NASA gallery
            </a>
            .
          </figcaption>
        </figure>
      </div>

      <div className="hero-status-panel" aria-label="Current ISS signal">
        <div>
          <span>{getHeroStatus(status)}</span>
          <strong>{snapshot?.groundTrack || "Finding the station"}</strong>
        </div>
        <div>
          <span>Latitude</span>
          <strong>{formatLiveCoordinate(snapshot?.latitude, "N", "S")}</strong>
        </div>
        <div>
          <span>Longitude</span>
          <strong>{formatLiveCoordinate(snapshot?.longitude, "E", "W")}</strong>
        </div>
      </div>
    </header>
  );
}
