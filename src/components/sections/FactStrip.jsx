function formatAltitude(value) {
  if (!Number.isFinite(value)) {
    return "400 km";
  }

  return `${value.toFixed(0)} km`;
}

function formatVelocity(value) {
  if (!Number.isFinite(value)) {
    return "28,000 km/h";
  }

  return `${value.toLocaleString("en-US", {
    maximumFractionDigits: 0
  })} km/h`;
}

export function FactStrip({ telemetry }) {
  const { snapshot } = telemetry;
  const facts = [
    {
      value: formatAltitude(snapshot?.altitude),
      label: "above Earth",
      detail: "Roughly 250 miles / 400 km straight up; the exact altitude changes."
    },
    {
      value: formatVelocity(snapshot?.velocity),
      label: "orbital speed",
      detail: "Fast enough to circle Earth in roughly 90 minutes."
    },
    {
      value: "16",
      label: "sunrises per day",
      detail: "The crew sees day and night many times in one Earth day."
    },
    {
      value: "292",
      label: "people visited",
      detail: "NASA count as of Apr. 27, 2026; continuously inhabited since Nov. 2000."
    }
  ];

  return (
    <section className="fact-strip" aria-label="ISS quick facts">
      {facts.map((fact) => (
        <article className="fact-card" key={fact.label}>
          <strong>{fact.value}</strong>
          <span>{fact.label}</span>
          <p>{fact.detail}</p>
        </article>
      ))}
    </section>
  );
}
