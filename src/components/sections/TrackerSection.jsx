import { SidebarPanel } from "../panels/SidebarPanel";

export function TrackerSection({ telemetry, scene }) {
  return (
    <section className="tracker-section" id="live-tracker">
      <div className="section-heading-wide tracker-heading">
        <span className="section-kicker">Live orbit</span>
        <h2>Where is the ISS right now?</h2>
        <p>
          The tracker updates the station position, draws its recent path, and
          lets you rotate Earth to see the ground track below the orbit.
        </p>
      </div>

      <div className="tracker-grid">
        <div className="tracker-scene">{scene}</div>
        <SidebarPanel telemetry={telemetry} />
      </div>
    </section>
  );
}
