import { useEffect, useState } from "react";
import { FALLBACK_MEDIA_ITEMS, fetchIssMedia } from "../../lib/nasaMedia";

function MediaCard({ item }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="media-card">
      <a
        className={`media-image-wrap${imageFailed ? " is-fallback" : ""}`}
        href={item.sourceUrl}
        target="_blank"
        rel="noreferrer"
      >
        {imageFailed ? (
          <span className="generated-fallback-visual" aria-hidden="true" />
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
      </a>
      <div className="media-card-body">
        <span className="section-kicker">{item.credit}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <a href={item.sourceUrl} target="_blank" rel="noreferrer">
          View source
        </a>
      </div>
    </article>
  );
}

export function MediaGallery() {
  const [mediaItems, setMediaItems] = useState(FALLBACK_MEDIA_ITEMS);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadMedia() {
      try {
        const items = await fetchIssMedia({ signal: controller.signal });
        setMediaItems(items);
        setStatus("live");
      } catch (error) {
        if (error.name !== "AbortError") {
          setMediaItems(FALLBACK_MEDIA_ITEMS);
          setStatus("fallback");
        }
      }
    }

    loadMedia();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section className="media-section" id="media">
      <div className="section-heading-wide">
        <span className="section-kicker">NASA media library</span>
        <h2>Real station imagery for learning and wonder.</h2>
        <p>
          These images are loaded from NASA's public Image and Video Library
          when available. If the API is unreachable, curated NASA gallery items
          remain visible.
        </p>
      </div>

      <div className="media-status-line" aria-live="polite">
        {status === "loading"
          ? "Loading NASA media..."
          : status === "fallback"
            ? "Showing curated NASA gallery fallbacks."
            : "Showing current NASA Image and Video Library results."}
      </div>

      <div className="media-grid">
        {mediaItems.map((item) => (
          <MediaCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
