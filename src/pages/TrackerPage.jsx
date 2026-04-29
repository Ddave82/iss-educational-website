import { LivestreamSection } from "../components/sections/LivestreamSection";
import { SidebarPanel } from "../components/panels/SidebarPanel";
import { ErrorState, LoadingSkeleton } from "../components/ui/StateCards";
import { useI18n } from "../lib/i18n.jsx";

export function TrackerPage({ telemetry, scene }) {
  const { status, error, snapshot, history } = telemetry;
  const { t } = useI18n();
  const isLoading = status === "loading" && !snapshot;
  const isStale = status === "stale";

  return (
    <>
      <section className="tracker-section tracker-page-section">
        <h1 className="sr-only">{t.tracker.srTitle}</h1>
        <div className="tracker-grid tracker-page-layout">
          <div className="tracker-scene">{scene}</div>
          <div className="tracker-live-stack">
            {isLoading ? <LoadingSkeleton label={t.tracker.loading} /> : null}
            {error ? (
              <ErrorState title={isStale ? t.tracker.staleTitle : t.tracker.offlineTitle}>
                {error}
              </ErrorState>
            ) : null}
            <SidebarPanel telemetry={telemetry} />
          </div>
        </div>

        <div className="note-grid">
          {t.tracker.notes.map((note) => (
            <article className="panel note-card" key={note.title}>
              <h2>{note.title}</h2>
              <p>{typeof note.body === "function" ? note.body(history.length) : note.body}</p>
            </article>
          ))}
        </div>
      </section>

      <LivestreamSection
        title={t.tracker.liveTitle}
        intro={t.tracker.liveIntro}
        fallbackActions={t.tracker.fallback}
      />
    </>
  );
}
