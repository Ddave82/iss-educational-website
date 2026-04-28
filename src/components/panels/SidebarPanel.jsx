import { DataField } from "./DataField";
import { InfoTip } from "../ui/InfoTip";
import { StatusPill } from "../ui/StatusPill";
import {
  formatCoordinate,
  formatDataAge,
  formatHeading,
  formatMetric,
  formatTimestamp,
  formatVisibility,
  formatWholeMetric
} from "../../lib/formatters";

export function SidebarPanel({ telemetry }) {
  const { snapshot, status, error, lastUpdated, history } = telemetry;
  const visibility = formatVisibility(snapshot?.visibility);

  const trailWindow =
    history.length > 1
      ? `${history.length} points / ${(((history.length - 1) * 10) / 60).toFixed(1)} min trail`
      : "Building trail";

  return (
    <div className="sidebar-stack">
      <section className="panel hero-panel">
        <div className="panel-header">
          <div>
            <span className="panel-eyebrow">Mission Control</span>
            <h2>Live Telemetry</h2>
          </div>
          <StatusPill status={status} error={error} />
        </div>
        {error ? (
          <div className="alert-card">
            <strong>Data feed unstable</strong>
            <p>{error}</p>
          </div>
        ) : null}
      </section>

      <section id="live-data" className="panel scroll-target">
        <div className="section-heading">
          <h2>Live Data</h2>
          <span>{trailWindow}</span>
        </div>

        <div className="data-grid">
          <DataField
            label="Latitude"
            value={formatCoordinate(snapshot?.latitude, "N", "S")}
            emphasized
          />
          <DataField
            label="Longitude"
            value={formatCoordinate(snapshot?.longitude, "E", "W")}
            emphasized
          />
          <DataField
            label="Altitude"
            value={formatMetric(snapshot?.altitude, "km")}
            info={
              <InfoTip label="Altitude">
                Altitude is the station's height above Earth's surface. It
                changes slightly as the orbit is adjusted.
              </InfoTip>
            }
          />
          <DataField
            label="Speed"
            value={formatWholeMetric(snapshot?.velocity, "km/h")}
            info={
              <InfoTip label="Velocity">
                Velocity means speed plus direction. The station moves fast
                enough to circle Earth in roughly 90 minutes.
              </InfoTip>
            }
          />
          <DataField label="Visibility" value={visibility} />
          <DataField
            label="Ground track"
            value={snapshot?.groundTrack || "Not available"}
            hint={
              snapshot?.footprint
                ? `Footprint ${formatMetric(snapshot.footprint, "km", 0)}`
                : undefined
            }
            info={
              <InfoTip label="Ground track">
                Ground track is the place on Earth directly under the station's
                path.
              </InfoTip>
            }
          />
          <DataField
            label="Direction"
            value={formatHeading(snapshot?.heading)}
            hint="Calculated from the latest live points"
          />
          <DataField
            label="Last update"
            value={formatTimestamp(lastUpdated)}
            hint={formatDataAge(lastUpdated)}
          />
        </div>
      </section>
    </div>
  );
}
