import { dataSources } from "../components/layout/Footer";
import { FeatureCard } from "../components/ui/FeatureCard";
import { PageHero } from "../components/ui/PageHero";
import { SectionHeader } from "../components/ui/SectionHeader";

const notes = [
  {
    title: "Live ISS telemetry",
    body: "The current position feed is requested from wheretheiss.at. In production the app calls the HTTPS endpoint directly. In local development, Vite proxy fallbacks are configured."
  },
  {
    title: "Update frequency",
    body: "The browser polls live ISS telemetry about every 10 seconds while the page is open. Last updated means the time the latest accepted telemetry point was received."
  },
  {
    title: "Approximate values",
    body: "Altitude, velocity, visibility, footprint, direction, and ground track are educational telemetry values and can be briefly stale if a request fails."
  },
  {
    title: "Pass predictions",
    body: "Visible pass estimates use the wheretheiss.at TLE endpoint and in-browser SGP4 calculations. They are useful estimates, not official viewing alerts."
  },
  {
    title: "NASA imagery",
    body: "Gallery images are loaded from NASA's Image and Video Library when available. Curated NASA gallery fallbacks remain visible if the API request fails."
  },
  {
    title: "Video limitations",
    body: "The embedded NASA Live feed can pause, switch programming, or be offline during camera handovers, signal gaps, or agency schedule changes."
  },
  {
    title: "Privacy",
    body: "The app does not include analytics or user tracking code. Browser location is requested only when a user chooses the pass lookup location button."
  }
];

export function AboutDataPage() {
  return (
    <>
      <PageHero kicker="Sources and credits" title="ISS Explorer Data Sources and Credits">
        Learn where ISS Explorer gets its live data, imagery, educational
        references, and what the limitations are.
      </PageHero>

      <section className="content-section">
        <SectionHeader kicker="Configured sources" title="Data used by this site">
          These are the sources currently configured in the codebase.
        </SectionHeader>
        <div className="source-grid">
          {dataSources.map((source) => (
            <a
              className="source-card"
              href={source.href}
              target="_blank"
              rel="noreferrer"
              key={source.href}
            >
              <strong>{source.label}</strong>
              <span>{source.description}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="learning-section">
        <SectionHeader kicker="How to read the data" title="Limitations and behavior">
          Live educational tools are most useful when they explain what they can
          and cannot guarantee.
        </SectionHeader>
        <div className="feature-grid">
          {notes.map((note) => (
            <FeatureCard title={note.title} key={note.title}>
              {note.body}
            </FeatureCard>
          ))}
        </div>
      </section>
    </>
  );
}
