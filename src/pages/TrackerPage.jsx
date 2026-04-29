import { LivestreamSection } from "../components/sections/LivestreamSection";
import { SidebarPanel } from "../components/panels/SidebarPanel";
import { ErrorState, LoadingSkeleton } from "../components/ui/StateCards";

export function TrackerPage({ telemetry, scene }) {
  const { status, error, snapshot, history } = telemetry;
  const isLoading = status === "loading" && !snapshot;
  const isStale = status === "stale";

  return (
    <>
      <section className="tracker-section tracker-page-section">
        <h1 className="sr-only">Live ISS Tracker</h1>
        <div className="tracker-grid tracker-page-layout">
          <div className="tracker-scene">{scene}</div>
          <div className="tracker-live-stack">
            {isLoading ? <LoadingSkeleton label="Connecting to live ISS telemetry..." /> : null}
            {error ? (
              <ErrorState title={isStale ? "Showing last known position" : "Tracker feed offline"}>
                {error}
              </ErrorState>
            ) : null}
            <SidebarPanel telemetry={telemetry} />
          </div>
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

      <LivestreamSection
        title="Live station view"
        intro="Watch NASA's live ISS stream when available."
        fallbackActions={[
          { label: "Explore NASA gallery", href: "/gallery" },
          { label: "Learn about the ISS", href: "/learn" }
        ]}
      />
    </>
  );
}
