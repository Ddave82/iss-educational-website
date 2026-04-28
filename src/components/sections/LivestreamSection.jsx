const ISS_STREAM_URL =
  "https://www.youtube.com/embed/21X5lGlDOfg?rel=0&modestbranding=1";

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
          <h3>Why does the feed sometimes pause?</h3>
          <p>
            The ISS sends video through relay satellites and ground systems.
            When the station moves between coverage zones, station views can
            pause for a short time.
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
