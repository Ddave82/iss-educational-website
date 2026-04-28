const ISS_STREAM_URL =
  "https://www.youtube.com/embed/21X5lGlDOfg?rel=0&modestbranding=1";

export function LivestreamSection() {
  return (
    <section className="livestream-section" id="livestream">
      <div className="section-heading-wide">
        <span className="section-kicker">Watch live</span>
        <h2>Views from the station change every orbit.</h2>
        <p>
          NASA streams live video from the ISS when the station has a signal.
          During signal handovers, the stream may show a holding screen.
        </p>
      </div>

      <div className="livestream-grid">
        <div className="stream-frame">
          <iframe
            src={ISS_STREAM_URL}
            title="Live video from the International Space Station"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <aside className="stream-notes">
          <span className="section-kicker">Signal notes</span>
          <h3>Why does the feed sometimes pause?</h3>
          <p>
            The ISS talks to Earth through relay satellites and ground systems.
            When the station moves between coverage zones, live video can pause
            for a short time.
          </p>
          <a
            href="https://www.nasa.gov/live/"
            target="_blank"
            rel="noreferrer"
          >
            Open NASA Live
          </a>
        </aside>
      </div>
    </section>
  );
}
