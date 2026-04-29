import { useEffect, useState } from "react";
import { FALLBACK_MEDIA_ITEMS, fetchIssMedia } from "../../lib/nasaMedia";

function normalizeGalleryKey(value) {
  return (value || "")
    .toLowerCase()
    .replace(/https?:\/\/[^?]+/g, (match) => match.replace(/\/$/, ""))
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function dedupeRenderedMedia(items) {
  const seen = new Set();

  return items.filter((item) => {
    const keys = [
      item.id,
      item.imageUrl?.split("?")[0],
      item.title,
      item.description?.slice(0, 100)
    ]
      .map(normalizeGalleryKey)
      .filter(Boolean);

    if (keys.some((key) => seen.has(key))) {
      return false;
    }

    keys.forEach((key) => seen.add(key));
    return true;
  });
}

export function MediaCard({ item, cta = "View source" }) {
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
            width="1024"
            height="768"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        )}
      </a>
      <div className="media-card-body">
        <span className="section-kicker">{item.credit}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <a href={item.sourceUrl} target="_blank" rel="noreferrer">
          {cta}
        </a>
      </div>
    </article>
  );
}

export function MediaGallery({
  limit,
  title = "Real station imagery for learning and wonder.",
  intro = "These images are loaded from NASA's public Image and Video Library when available. If the API is unreachable, curated NASA gallery items remain visible.",
  showHeader = true,
  cta = "View source"
}) {
  const [mediaItems, setMediaItems] = useState(FALLBACK_MEDIA_ITEMS);
  const [status, setStatus] = useState("loading");
  const visibleItems = dedupeRenderedMedia(mediaItems).slice(0, limit || mediaItems.length);

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
      {showHeader ? (
        <div className="section-heading-wide">
          <span className="section-kicker">NASA media library</span>
          <h2>{title}</h2>
          <p>{intro}</p>
        </div>
      ) : null}

      <div className="media-status-line" aria-live="polite">
        {status === "loading"
          ? "Loading NASA media..."
          : status === "fallback"
            ? "Showing curated NASA gallery fallbacks."
            : "Showing current NASA Image and Video Library results."}
      </div>

      {visibleItems.length ? (
        <div className="media-grid">
          {visibleItems.map((item) => (
            <MediaCard item={item} key={item.id} cta={cta} />
          ))}
        </div>
      ) : (
        <article className="panel empty-filter-card">
          <h3>No images available yet</h3>
          <p>
            NASA results can vary by request. Try again later.
          </p>
        </article>
      )}
    </section>
  );
}
