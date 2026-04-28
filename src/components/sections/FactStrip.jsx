import { formatTimestamp, formatWholeMetric } from "../../lib/formatters";
import { StatCard } from "../ui/StatCard";

function formatAltitude(value) {
  if (!Number.isFinite(value)) {
    return "About 400 km";
  }

  return `${value.toFixed(0)} km`;
}

function formatVelocity(value) {
  if (!Number.isFinite(value)) {
    return "About 27,600 km/h";
  }

  return formatWholeMetric(value, "km/h");
}

export function FactStrip({ telemetry }) {
  const { snapshot, lastUpdated } = telemetry;
  const facts = [
    {
      value: formatAltitude(snapshot?.altitude),
      label: "Current altitude",
      detail: "The exact height changes as orbit maintenance adjusts the station.",
      info: "Altitude is the station's height above Earth's surface."
    },
    {
      value: formatVelocity(snapshot?.velocity),
      label: "Orbital speed",
      detail: "Fast enough to circle Earth in roughly 90 minutes.",
      info: "Velocity means speed in a direction along the station's orbit."
    },
    {
      value: "About 16",
      label: "Orbits per day",
      detail: "The crew sees day and night many times in one Earth day."
    },
    {
      value: "Crewed",
      label: "Station status",
      detail: "A continuously inhabited orbital laboratory since November 2000."
    },
    {
      value: formatTimestamp(lastUpdated),
      label: "Last updated",
      detail: "Live telemetry refreshes about every 10 seconds when reachable.",
      info: "Telemetry is live measurement data from the station position feed."
    }
  ];

  return (
    <section className="fact-strip" aria-label="ISS quick facts">
      {facts.map((fact) => (
        <StatCard
          key={fact.label}
          value={fact.value}
          label={fact.label}
          detail={fact.detail}
          info={fact.info}
        />
      ))}
    </section>
  );
}
