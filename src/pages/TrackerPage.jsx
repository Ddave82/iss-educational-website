import { SidebarPanel } from "../components/panels/SidebarPanel";
import { PageHero } from "../components/ui/PageHero";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ErrorState, LoadingSkeleton } from "../components/ui/StateCards";
import { StatusPill } from "../components/ui/StatusPill";
import { formatDataAge, formatTimestamp } from "../lib/formatters";

export function TrackerPage({ telemetry, scene }) {
  const { status, error, lastUpdated, snapshot, history } = telemetry;
  const isLoading = status === "loading" && !snapshot;
  const isStale = status === "stale";

  return (
    <>
      <PageHero kicker="Live orbit" title="Live ISS Tracker">
        Follow the International Space Station as it orbits Earth.
      </PageHero>

      <section className="tracker-section tracker-page-section">
        <div className="tracker-page-status">
          <StatusPill status={status} error={error} />
          <span>Last updated: {formatTimestamp(lastUpdated)}</span>
          <span>Signal age: {formatDataAge(lastUpdated)}</span>
        </div>

        {isLoading ? <LoadingSkeleton label="Connecting to live ISS telemetry..." /> : null}
        {error ? (
          <ErrorState title={isStale ? "Showing last known position" : "Tracker feed offline"}>
            {error}
          </ErrorState>
        ) : null}

        <div className="tracker-grid">
          <div className="tracker-scene">{scene}</div>
          <SidebarPanel telemetry={telemetry} />
        </div>

        <div className="note-grid">
          <article className="panel note-card">
            <h2>Data source</h2>
            <p>
              Current ISS telemetry is requested from the public
              wheretheiss.at satellite endpoint. The app refreshes about every
              10 seconds while the page is open.
            </p>
          </article>
          <article className="panel note-card">
            <h2>Approximation note</h2>
            <p>
              Position, altitude, speed, daylight state, ground track, and
              recent trail are useful educational approximations. Network
              delays, feed outages, and orbital model updates can make values
              briefly stale.
            </p>
          </article>
          <article className="panel note-card">
            <h2>Recent path</h2>
            <p>
              The trail uses the last {history.length} live samples in this
              browser session. It builds after the page has collected several
              updates.
            </p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <SectionHeader kicker="Future enhancements" title="What the tracker does not fake">
          Country or ocean lookup is shown only when local geometry can resolve
          it. Day/night terminator rendering and richer pass overlays would
          require additional map logic and are left for a future tracker layer.
        </SectionHeader>
      </section>
    </>
  );
}
