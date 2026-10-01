import { useI18n } from "../../lib/i18n.jsx";

const copy = {
  de: { title: "Dein Blick ins All.", body: "Eine Station. Drei Perspektiven. Entdecke, was gerade über uns passiert.", links: [["/tracker", "01", "Position verfolgen", "Die Erde in 3D. Die ISS im Blick."], ["/see-the-iss", "02", "Nächsten Überflug finden", "Dein Standort. Dein Moment am Himmel."], ["/learn", "03", "Leben im Orbit entdecken", "Wissenschaft, Alltag und große Fragen."]], orbit: "Umlaufzeit", note: "Schätzung aus aktueller Höhe", waiting: "Warte auf Höhendaten", stale: "Schätzung aus letzter bekannter Höhe" },
  en: { title: "Your window into orbit.", body: "One station. Three perspectives. Discover what's happening above us.", links: [["/tracker", "01", "Follow the station", "Earth in 3D. The ISS in sight."], ["/see-the-iss", "02", "Find your next sighting", "Your location. Your moment in the sky."], ["/learn", "03", "Discover life in orbit", "Science, everyday life and big questions."]], orbit: "Orbital period", note: "Estimate from current altitude", waiting: "Waiting for altitude data", stale: "Estimate from last known altitude" },
  da: { title: "Dit vindue til kredsløbet.", body: "Én station. Tre perspektiver. Oplev, hvad der sker over os.", links: [["/tracker", "01", "Følg rumstationen", "Jorden i 3D. ISS i sigte."], ["/see-the-iss", "02", "Find næste overflyvning", "Din placering. Dit øjeblik på himlen."], ["/learn", "03", "Oplev livet i kredsløb", "Videnskab, hverdag og store spørgsmål."]], orbit: "Omløbstid", note: "Estimat fra aktuel højde", waiting: "Venter på højdedata", stale: "Estimat fra sidst kendte højde" }
};
export function MissionBrief({ telemetry }) {
  const { language, localizedPath } = useI18n();
  const c = copy[language] || copy.en;
  const altitude = telemetry.snapshot?.altitude;
  // Circular-orbit approximation: T = 2π√(r³/μ), radius in km, μ in km³/s².
  const period = Number.isFinite(altitude) && altitude > 0 ? 2 * Math.PI * Math.sqrt((6371 + altitude) ** 3 / 398600.4418) / 60 : null;
  return <section className="mission-brief">
    <div className="mission-brief-heading"><div><span className="section-kicker">EXPLORE / 01</span><h2>{c.title}</h2><p>{c.body}</p></div>
      <div className="orbit-readout"><span>{c.orbit}</span><strong>{period ? period.toLocaleString(language, { maximumFractionDigits: 1 }) : "—"}<small> min</small></strong><span>{period ? (telemetry.status === "live" ? c.note : c.stale) : c.waiting}</span></div>
    </div>
    <div className="mission-links">{c.links.map(([path, number, title, description]) => <a href={localizedPath(path)} key={path}><span className="mission-number">{number} /</span><h3>{title}</h3><p>{description}</p><span className="mission-arrow" aria-hidden="true">↗</span></a>)}</div>
  </section>;
}
