import { FactStrip } from "../components/sections/FactStrip";
import { MediaGallery } from "../components/sections/MediaGallery";
import { SidebarPanel } from "../components/panels/SidebarPanel";
import { PassPredictionPanel } from "../components/PassPredictionPanel";
import { FeatureCard } from "../components/ui/FeatureCard";
import { SectionHeader } from "../components/ui/SectionHeader";
import { StatusPill } from "../components/ui/StatusPill";
import { formatWholeMetric } from "../lib/formatters";
import { learningQuestions } from "../lib/learningQuestions";

const HERO_IMAGE =
  "https://images-assets.nasa.gov/image/jsc2021e064215_alt/jsc2021e064215_alt~large.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1173&w=1920";

const teacherPreview = [
  {
    title: "30-minute lesson plan",
    body: "A short class flow for orbit, microgravity, and live tracking.",
    href: "/learn#teacher-resources"
  },
  {
    title: "ISS quiz",
    body: "Simple questions with expandable answers for review or warmups.",
    href: "/learn#quiz"
  },
  {
    title: "Track one orbit activity",
    body: "Students observe how the ground track changes during one orbit.",
    href: "/learn#track-one-orbit"
  }
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

      <section className="learning-section">
        <SectionHeader kicker="Learn fast" title="Learn the ISS in 5 minutes">
          Start with the questions students ask most: what the station is, why
          orbit works, why astronauts float, and what people do there.
        </SectionHeader>
        <div className="feature-grid five-card-grid">
          {learningQuestions.map((topic) => (
            <FeatureCard
              title={topic.title}
              facts={topic.facts}
              href={topic.href}
              cta="Open module"
              key={topic.title}
            >
              {topic.teaser}
            </FeatureCard>
          ))}
        </div>
      </section>

      <section className="content-section split-section">
        <div>
          <span className="section-kicker">Viewing guide</span>
          <h2>Can you see the ISS tonight?</h2>
          <p>
            The ISS is best visible shortly before sunrise or after sunset,
            when the sky is dark but the station is still lit by the Sun. It
            looks like a bright moving star and crosses the sky in minutes.
          </p>
          <a className="button-primary" href="/see-the-iss">
            Check visible passes
          </a>
        </div>
        <article className="panel">
          <h3>Pass lookup</h3>
          <PassPredictionPanel compact />
        </article>
      </section>

      <section className="learning-section">
        <SectionHeader
          kicker="Classroom ready"
          title="For teachers, parents, and homeschoolers"
        >
          Use the live tracker as a shared observation tool, then connect it to
          motion, gravity, engineering, and Earth science.
        </SectionHeader>
        <div className="feature-grid three-card-grid">
          {teacherPreview.map((item) => (
            <FeatureCard title={item.title} href={item.href} key={item.title}>
              {item.body}
            </FeatureCard>
          ))}
        </div>
        <div className="section-cta-row">
          <a className="button-secondary" href="/learn#teacher-resources">
            Open teacher resources
          </a>
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
