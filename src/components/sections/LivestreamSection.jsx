const ISS_STREAM_URL =
  "https://www.youtube.com/embed/zPH5KtjJFaQ?autoplay=1&mute=1&rel=0&modestbranding=1";

export function LivestreamSection() {
  return (
    <section className="livestream-section" id="livestream">
      <div className="section-heading-wide">
        <span className="section-kicker">Watch live</span>
        <h2>NASA Live and station views.</h2>
        <p>
          NASA Live carries agency programming and links to Space Station Views
          when live ISS video is available. During signal handovers, station
          video may pause or show a holding screen.
        </p>
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
          <h3>NASA livestream is temporarily unavailable?</h3>
          <p>
            Live station feeds are not always active. The station may be
            switching cameras, passing through signal gaps, or the stream may
            be offline.
          </p>
          <div className="stream-actions">
            <a href="/tracker">Open live tracker</a>
            <a href="/gallery">Explore NASA imagery</a>
            <a
              href="https://www.youtube.com/watch?v=zPH5KtjJFaQ"
              target="_blank"
              rel="noreferrer"
            >
              Open stream on YouTube
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
