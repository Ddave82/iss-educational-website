import { FactStrip } from "../components/sections/FactStrip";
import { MediaGallery } from "../components/sections/MediaGallery";
import { SidebarPanel } from "../components/panels/SidebarPanel";
import { SectionHeader } from "../components/ui/SectionHeader";
import { StatusPill } from "../components/ui/StatusPill";
import { formatWholeMetric } from "../lib/formatters";

const HERO_IMAGE =
  "https://images-assets.nasa.gov/image/jsc2021e064215_alt/jsc2021e064215_alt~large.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1173&w=1920";

const viewingTeasers = [
  "Best shortly after sunset or before sunrise",
  "Looks like a bright moving star",
  "Visibility depends on location, sky conditions, and orbit path"
];

const learningTeasers = [
  "Orbit, speed, and why the station keeps missing the ground",
  "Microgravity, floating astronauts, and daily life onboard",
  "Science, docking, spacewalks, and station operations"
];

export function HomePage({ telemetry, scene }) {
  const { snapshot, status, error } = telemetry;
  const liveSpeed = Number.isFinite(snapshot?.velocity)
    ? formatWholeMetric(snapshot.velocity, "km/h")
    : "about 27,600 km/h";

  return (
    <>
      <header className="home-hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy-block">
            <div className="hero-badge-row">
              <StatusPill status={status} error={error} />
              <span className="live-line">Currently orbiting Earth at {liveSpeed}</span>
            </div>
            <h1>International Space Station</h1>
            <p>
              Track the ISS live, learn how it works, and discover when you can
              see it from Earth.
            </p>
            <div className="hero-actions" aria-label="Homepage shortcuts">
              <a className="button-primary" href="/tracker">
                Track ISS live
              </a>
              <a className="button-secondary" href="/learn">
                Start learning
              </a>
            </div>
          </div>

          <figure className="hero-visual hero-visual-compact">
            <img
              src={HERO_IMAGE}
              alt="The International Space Station photographed in orbit"
              width="1920"
              height="1173"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>
              NASA imagery. Live ground track:{" "}
              <strong>{snapshot?.groundTrack || "finding station"}</strong>
            </figcaption>
          </figure>
        </div>
      </header>

      <FactStrip telemetry={telemetry} />

      <section className="tracker-section tracker-preview" id="live-tracker">
        <SectionHeader kicker="Live tracker" title="Where is the ISS right now?">
          The tracker updates the station position, draws its recent path, and
          shows live telemetry from the current orbit.
        </SectionHeader>
        <div className="tracker-grid">
          <div className="tracker-scene">{scene}</div>
          <SidebarPanel telemetry={telemetry} />
        </div>
        <div className="section-cta-row">
          <a className="button-primary" href="/tracker">
            Open full tracker
          </a>
        </div>
      </section>

      <section className="learning-section homepage-learn-teaser">
        <div>
          <SectionHeader kicker="Learn fast" title="Learn the ISS in 5 minutes">
            Start with a guided learning journey about orbit, microgravity,
            station life, science, docking, and spacewalks.
          </SectionHeader>
          <a className="button-primary" href="/learn">
            Open learning guide
          </a>
        </div>
        <div className="homepage-teaser-grid" aria-label="Learning guide preview">
          {learningTeasers.map((item) => (
            <article className="panel homepage-teaser-card" key={item}>
              <span aria-hidden="true" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section iss-viewing-teaser">
        <div>
          <span className="section-kicker">Viewing guide</span>
          <h2>Can you see the ISS tonight?</h2>
          <p>
            The ISS is easiest to spot shortly after sunset or before sunrise,
            when the sky is dark but the station is still lit by the Sun.
          </p>
          <a className="button-primary" href="/see-the-iss">
            Check visible passes
          </a>
        </div>
        <div className="viewing-teaser-grid" aria-label="ISS viewing basics">
          {viewingTeasers.map((item) => (
            <article className="panel viewing-teaser-card" key={item}>
              <span aria-hidden="true" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <MediaGallery
        limit={3}
        title="Featured NASA station views."
        intro="A small preview of real NASA imagery. Open the full gallery for more station visuals, Earth views, crew work, and research scenes."
        cta="View source"
      />
      <div className="section-cta-row">
        <a className="button-secondary" href="/gallery">
          Open full gallery
        </a>
      </div>

      <section className="final-cta">
        <h2>Ready to explore the station?</h2>
        <div className="hero-actions">
          <a className="button-primary" href="/tracker">
            Track ISS live
          </a>
          <a className="button-secondary" href="/learn">
            Start learning
          </a>
          <a className="button-secondary" href="/gallery#livestream">
            Watch NASA live
          </a>
        </div>
      </section>
    </>
  );
}
