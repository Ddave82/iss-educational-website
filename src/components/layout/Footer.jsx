const footerLinks = [
  { label: "Live Tracker", href: "/tracker" },
  { label: "Learn", href: "/learn" },
  { label: "See the ISS", href: "/see-the-iss" },
  { label: "Gallery", href: "/gallery" },
  { label: "Teachers", href: "/teachers" },
  { label: "About Data", href: "/about-data" }
];

export const dataSources = [
  {
    label: "Where the ISS at?",
    description: "HTTPS live ISS position and TLE endpoint used by the tracker and pass calculator.",
    href: "https://wheretheiss.at/w/developer"
  },
  {
    label: "NASA Image and Video Library",
    description: "Searchable NASA images, videos, and audio used for the media gallery.",
    href: "https://images.nasa.gov/"
  },
  {
    label: "NASA Station Facts",
    description: "Core ISS facts such as size, orbit time, partner agencies, and occupation history.",
    href: "https://www.nasa.gov/international-space-station/space-station-facts-and-figures/"
  },
  {
    label: "NASA Live",
    description: "Embedded NASA Live stream and external live programming link.",
    href: "https://www.nasa.gov/live/"
  }
];

export function Footer({ compact = false }) {
  return (
    <footer className={`source-section${compact ? " source-section-compact" : ""}`}>
      {!compact ? (
        <div className="footer-hero">
          <div>
            <span className="section-kicker">Keep exploring</span>
            <h2>Ready to explore the station?</h2>
            <p>
              Track the ISS live, learn the science behind orbit, and use the
              classroom resources for a short activity or a full lesson.
            </p>
          </div>
          <div className="footer-actions" aria-label="Footer shortcuts">
            <a href="/tracker">Track ISS live</a>
            <a href="/learn">Start learning</a>
          </div>
        </div>
      ) : null}

      <div className="footer-lower">
        <div className="footer-link-row" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        {!compact ? (
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
        ) : null}

        <p className="footer-note">
          NASA material is credited as source material and is not used to imply
          endorsement. Third-party credits are preserved where NASA lists them.
        </p>
      </div>
    </footer>
  );
}
