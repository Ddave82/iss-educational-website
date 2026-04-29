import { FactStrip } from "../components/sections/FactStrip";
import { MediaGallery } from "../components/sections/MediaGallery";
import { SidebarPanel } from "../components/panels/SidebarPanel";
import { SectionHeader } from "../components/ui/SectionHeader";
import { StatusPill } from "../components/ui/StatusPill";
import { formatWholeMetric } from "../lib/formatters";
import { useI18n } from "../lib/i18n.jsx";

const HERO_IMAGE =
  "https://images-assets.nasa.gov/image/jsc2021e064215_alt/jsc2021e064215_alt~large.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1173&w=1920";

export function HomePage({ telemetry, scene }) {
  const { snapshot, status, error } = telemetry;
  const { languageInfo, localizedPath, t } = useI18n();
  const liveSpeed = Number.isFinite(snapshot?.velocity)
    ? formatWholeMetric(snapshot.velocity, "km/h", languageInfo.intlLocale, t)
    : t.common.aboutVelocity.toLowerCase();

  return (
    <>
      <header className="home-hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy-block">
            <div className="hero-badge-row">
              <StatusPill status={status} error={error} />
              <span className="live-line">{t.home.liveLine(liveSpeed)}</span>
            </div>
            <h1>{t.home.title}</h1>
            <p>{t.home.intro}</p>
            <div className="hero-actions" aria-label="Homepage shortcuts">
              <a className="button-primary" href={localizedPath("/tracker")}>
                {t.home.actions.tracker}
              </a>
              <a className="button-secondary" href={localizedPath("/learn")}>
                {t.home.actions.learn}
              </a>
            </div>
          </div>

          <figure className="hero-visual hero-visual-compact">
            <img
              src={HERO_IMAGE}
              alt={t.home.heroAlt}
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>{t.home.figcaption(snapshot?.groundTrack)}</figcaption>
          </figure>
        </div>
      </header>

      <FactStrip telemetry={telemetry} />

      <section className="tracker-section tracker-preview" id="live-tracker">
        <SectionHeader kicker={t.home.trackerKicker} title={t.home.trackerTitle}>
          {t.home.trackerIntro}
        </SectionHeader>
        <div className="tracker-grid">
          <div className="tracker-scene">{scene}</div>
          <SidebarPanel telemetry={telemetry} />
        </div>
        <div className="section-cta-row">
          <a className="button-primary" href={localizedPath("/tracker")}>
            {t.home.actions.fullTracker}
          </a>
        </div>
      </section>

      <section className="learning-section homepage-learn-teaser">
        <div>
          <SectionHeader kicker={t.home.learnKicker} title={t.home.learnTitle}>
            {t.home.learnIntro}
          </SectionHeader>
          <a className="button-primary" href={localizedPath("/learn")}>
            {t.home.actions.learningGuide}
          </a>
        </div>
        <div className="homepage-teaser-grid" aria-label="Learning guide preview">
          {t.home.learningTeasers.map((item) => (
            <article className="panel homepage-teaser-card" key={item}>
              <span aria-hidden="true" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section iss-viewing-teaser">
        <div>
          <span className="section-kicker">{t.home.viewingKicker}</span>
          <h2>{t.home.viewingTitle}</h2>
          <p>{t.home.viewingIntro}</p>
          <a className="button-primary" href={localizedPath("/see-the-iss")}>
            {t.home.actions.passes}
          </a>
        </div>
        <div className="viewing-teaser-grid" aria-label="ISS viewing basics">
          {t.home.viewingTeasers.map((item) => (
            <article className="panel viewing-teaser-card" key={item}>
              <span aria-hidden="true" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <MediaGallery
        limit={3}
        title={t.home.galleryTitle}
        intro={t.home.galleryIntro}
        cta={t.media.viewSource}
      />
      <div className="section-cta-row">
        <a className="button-secondary" href={localizedPath("/gallery")}>
          {t.home.actions.gallery}
        </a>
      </div>

      <section className="final-cta">
        <h2>{t.home.finalTitle}</h2>
        <div className="hero-actions">
          <a className="button-primary" href={localizedPath("/tracker")}>
            {t.home.actions.tracker}
          </a>
          <a className="button-secondary" href={localizedPath("/learn")}>
            {t.home.actions.learn}
          </a>
          <a className="button-secondary" href={localizedPath("/gallery#livestream")}>
            {t.home.actions.nasaLive}
          </a>
        </div>
      </section>
    </>
  );
}
