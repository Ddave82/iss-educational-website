import { useI18n } from "../../lib/i18n.jsx";

const ISS_STREAM_URL =
  "https://www.youtube.com/embed/zPH5KtjJFaQ?autoplay=1&mute=1&rel=0&modestbranding=1";

export function LivestreamSection({
  title,
  intro,
  fallbackActions
}) {
  const { localizedPath, t } = useI18n();
  const resolvedTitle = title || t.livestream.title;
  const resolvedIntro = intro || t.livestream.intro;
  const resolvedActions = fallbackActions || t.livestream.fallbackActions;

  return (
    <section className="livestream-section" id="livestream">
      <div className="section-heading-wide">
        <span className="section-kicker">{t.livestream.watchLive}</span>
        <h2>{resolvedTitle}</h2>
        <p>{resolvedIntro}</p>
      </div>

      <div className="livestream-grid">
        <div className="stream-frame">
          <iframe
            src={ISS_STREAM_URL}
            title={t.livestream.iframeTitle}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <aside className="stream-notes">
          <span className="section-kicker">{t.livestream.signalNotes}</span>
          <h3>{t.livestream.unavailable}</h3>
          <p>{t.livestream.body}</p>
          <div className="stream-actions">
            {resolvedActions.map((action) => (
              <a
                href={action.external ? action.href : localizedPath(action.href)}
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
