const ISS_STREAM_URL =
  "https://www.youtube.com/embed/zPH5KtjJFaQ?autoplay=1&mute=1&rel=0&modestbranding=1";

export function LivestreamSection({
  title = "NASA Live and station views.",
  intro = "NASA Live carries agency programming and links to Space Station Views when live ISS video is available. During signal handovers, station video may pause or show a holding screen.",
  fallbackActions = [
    { label: "Open live tracker", href: "/tracker" },
    { label: "Explore NASA imagery", href: "/gallery" },
    {
      label: "Open stream on YouTube",
      href: "https://www.youtube.com/watch?v=zPH5KtjJFaQ",
      external: true
    }
  ]
}) {
  return (
    <section className="livestream-section" id="livestream">
      <div className="section-heading-wide">
        <span className="section-kicker">Watch live</span>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>

      <div className="livestream-grid">
        <div className="stream-frame">
          <iframe
            src={ISS_STREAM_URL}
            title="NASA Live stream"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <aside className="stream-notes">
          <span className="section-kicker">Signal notes</span>
          <h3>NASA livestream is temporarily unavailable</h3>
          <p>
            Live station feeds are not always active. The station may be
            switching cameras, passing through signal gaps, or the stream may
            be offline.
          </p>
          <div className="stream-actions">
            {fallbackActions.map((action) => (
              <a
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
                key={action.href}
              >
                {action.label}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
