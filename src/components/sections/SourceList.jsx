const sources = [
  {
    label: "NASA Image and Video Library",
    description: "Searchable NASA images, videos, and audio used for the media gallery.",
    href: "https://images.nasa.gov/"
  },
  {
    label: "NASA Media Usage Guidelines",
    description: "Rules for NASA imagery, attribution, logos, and endorsement language.",
    href: "https://www.nasa.gov/multimedia/guidelines/index.html"
  },
  {
    label: "NASA Space Station Gallery",
    description: "Curated ISS imagery and educational station photo collections.",
    href: "https://www.nasa.gov/international-space-station/space-station-gallery/"
  },
  {
    label: "NASA Spot the Station",
    description: "Public station sighting and orbit reference information.",
    href: "https://www.nasa.gov/spot-the-station/"
  },
  {
    label: "Where the ISS at?",
    description: "HTTPS live ISS position endpoint used by the tracker.",
    href: "https://wheretheiss.at/w/developer"
  }
];

export function SourceList() {
  return (
    <footer className="source-section" id="sources">
      <div className="footer-hero">
        <div>
          <span className="section-kicker">Keep exploring</span>
          <h2>Every orbit tells a new story.</h2>
          <p>
            Use this site as a launchpad for learning about orbital science,
            international cooperation, and the view of Earth from space.
          </p>
        </div>
        <div className="footer-actions" aria-label="Footer shortcuts">
          <a href="#live-tracker">Track live</a>
          <a href="#media">View media</a>
          <a href="#top">Back to top</a>
        </div>
      </div>

      <div className="footer-lower">
        <div className="source-grid">
          {sources.map((source) => (
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

        <p className="footer-note">
          NASA material is credited as source material and is not used to imply
          endorsement. Third-party credits are preserved where NASA lists them.
        </p>
      </div>
    </footer>
  );
}
