import { DataField } from "./DataField";

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "medium"
});

function formatCoordinate(value, positiveLabel, negativeLabel) {
  if (!Number.isFinite(value)) {
    return "Not available";
  }

  const direction = value >= 0 ? positiveLabel : negativeLabel;
  return `${Math.abs(value).toFixed(2)} deg ${direction}`;
}

function formatMetric(value, suffix, digits = 1) {
  if (!Number.isFinite(value)) {
    return "Not available";
  }

  return `${value.toFixed(digits)} ${suffix}`;
}

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return "No update yet";
  }

  return DATE_TIME_FORMATTER.format(new Date(timestamp));
}

function formatHeading(heading) {
  if (!Number.isFinite(heading)) {
    return "Not available";
  }

  const normalized = (heading + 360) % 360;
  const sectors = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const sector = sectors[Math.round(normalized / 45) % sectors.length];
  return `${normalized.toFixed(0)} deg ${sector}`;
}

function getStatusLabel(status, error) {
  if (status === "loading") {
    return "Connecting";
  }

  if (status === "stale") {
    return "Cached";
  }

  if (status === "offline") {
    return "Offline";
  }

  if (error) {
    return "Partial";
  }

  return "Live";
}

export function SidebarPanel({ telemetry }) {
  const { snapshot, status, error, lastUpdated, history } = telemetry;
  const visibility =
    snapshot?.visibility === "daylight"
      ? "Sunlit"
      : snapshot?.visibility === "eclipsed"
        ? "In Earth's shadow"
        : "Not available";

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
          <div className={`status-pill status-${status}`}>
            <span className="status-dot" />
            {getStatusLabel(status, error)}
          </div>
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
          />
          <DataField
            label="Speed"
            value={formatMetric(snapshot?.velocity, "km/h", 0)}
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
          />
          <DataField
            label="Direction"
            value={formatHeading(snapshot?.heading)}
            hint="Calculated from the latest live points"
          />
          <DataField
            label="Last update"
            value={formatTimestamp(lastUpdated)}
          />
        </div>
      </section>
    </div>
  );
}
